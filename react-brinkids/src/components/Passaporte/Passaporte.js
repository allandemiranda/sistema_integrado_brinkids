import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import ConfirmaAdulto from '../Adultos/ConfirmaAdulto.js';
import TypesInput from '../TypesInput.js';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import moment from 'moment';
import Comprovant from '../Comprovante/comprovante';
import '../Comprovante/comprovante.css';
import tabelinha from '../Comprovante/tabelinha';
import $ from "jquery";



class Passport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayfinal:[],
            //Responsável por saber qual página vai renderizar:
            page: "SelectAdult",//ConfirmAdult SelectAdult Finalize
            selectedSearch: '', // Salva o nome que é colocado na barra de busca
            list: [], //recebe do banco os dados da pessoa que foi buscada
            listConect: [], // recebe os dados das crianças ligadas aos adultos [Passaporte]
            //Tela I:
            listConfirmAdult: [], // Dados do Responsável Selecionado na checkBox
            erro: '',
            //achado: false,    
            confirmAdult: '',
            //Tela III:        
            kidTthatCame: [],
            listConfirmKids: [], // Dados das crianças Selecionadas na checkBox
            //TEla IV:
            obs: '',
            rest: '',
            phone: '',
            file: '', // recebe a imagem 
            currentdate: [],
            preenchido: false, // Variável que vai dizer se foi selecionado alguma coisa
            horaEntradaCriança: '', // Váriável que recebe a hora que a crianaça da entrada na loja. Aparece na telaIV
            kinshipConfirm:'',
            comprovante: false,
            no:tabelinha,
        }

        //Relacionado a busca
        this.ChangeSearch = this.ChangeSearch.bind(this);
        this.SearchAdult = this.SearchAdult.bind(this);
        this.SearchChild = this.SearchChild.bind(this);


        //Relacionado a atualização dos valores Caminho
        this.ChangeObs = this.ChangeObs.bind(this); //apontador 
        this.ChangeRest = this.ChangeRest.bind(this);
        this.ChangePhone = this.ChangePhone.bind(this);

        this.TelaIII = this.TelaIII.bind(this);
    }
    
    //Relacionado a atualização dos valores Funções
    ChangeObs(event) {
        this.setState({ obs: event.target.value });
    }
    ChangeRest(event) {
        this.setState({ rest: event.target.value });
    }
    ChangePhone(event) {
        this.setState({ phone: event.target.value });
    }
    Changekinship(event) {
        this.setState({ kinshipConfirm: event.target.value });
    }

    // FUNCOES RELACIONADAS A BUSCA Do RESPOSÁVEL - Inicio 
    //Bloco que muda o status para o atual do formulario.
    ChangeSearch(event) {
        this.setState({ selectedSearch: event.target.value });
    }

    

    // Faz a busca do responsável:
    SearchAdult(event) {
        let erros = ValidaErros(this.state.selectedSearch);

        if(erros.length === 0){
            alert("A Busca não pode ser em branco");
        }
        else if (erros.length < 8){
            alert("A Busca nao pode ter menos que 8 caracteres");
        }
        else {
            $.ajax({
                url: "http://localhost:3001/adult/filter/" + this.state.selectedSearch + "/name",//url: "https://ab64b737-4df4-4a30-88df-793c88b5a8d7.mock.pstmn.io/passaporte", //
                dataType: 'json',
                type: 'GET',
                error: function (response) {
                    if (response.length === 0) { this.setState({ erro: "* Erro no servidor" }) }
                },
                success: function (response) {    //Salva os dados do responsável na variácel LIST
                    console.log(response.length)
                    if (response.length === 0) {
                        alert("Erro: Nenhum Responásel Encontrado")
                        this.setState({ erro: "* Nenhum Responásel Encontrado." })
                    } else {
                        console.log("Olar")
                        this.setState({ list: response });
                    }
                }.bind(this)
            });
        }

        function ValidaErros (busca){
            let erros = [];
            if (busca.length === 0) {
                erros.push("A Busca não pode ser em branco");
            }
            if (busca.length < 8) {
                erros.push("A Busca nao pode ter menos que 8 caracteres");
            }
            return erros;
        }
        function exibeMensagensDeErro(erros){
            var ul = document.querySelector("#mensagens-erro");
            ul.innerHTML = "";
            erros.forEach(function(erro){
                var li = document.createElement("li");
                li.textContent = erro;
                ul.appendChild(li);
            });
        }
    }

    // Salva AS informações do ADULTO que apareceu na busca e foi selecionado.
    selectedAdult(identifier) {
        let achou = false;

        //Desmarca A checkBox
        this.state.listConfirmAdult.forEach((adult, indice, array) => {
            if (adult._id === identifier) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.list.forEach((adult) => {
                if (adult._id === identifier) {
                    this.state.listConfirmAdult.push(adult);
                }
            });
        }

        this.setState({ listConfirmAdult: this.state.listConfirmAdult });
        console.log(this.state.listConfirmAdult)
        this.preenchido = true;
    }
    // FUNCOES RELACIONADAS A BUSCA Do RESPOSÁVEL- Fim

    // FUNCOES RELACIONADAS A BUSCA DAS CRIANÇAS - Inicio 
    //Bloco que muda o status para o atual do formulario.
    ChangeSearch(event) {
        this.setState({ selectedSearch: event.target.value });
    }

    // Faz a busca das Crianças:
    SearchChild(event){
        let erros = ValidaErros(this.state.selectedSearch);

        if(erros.length === 0){
            alert("A Busca não pode ser em branco");
        }
        else if (erros.length < 8){
            alert("A Busca não pode ser em branco");
        }
        else {
            $.ajax({
                url: "http://localhost:3001/child/filter/" + this.state.selectedSearch,//url: "https://ab64b737-4df4-4a30-88df-793c88b5a8d7.mock.pstmn.io/passaporte",//
                dataType: 'json',
                type: 'GET',
                error: function (response) {
                    if (response.length === 0) { this.setState({ erro: "* Nenhuma Criança Encontrada." }) }
                },
                success: function (response) {    //Salva os dados do responsável na variácel LIST
                    console.log(response);
                    //this.setState({ achado: true });
                    this.setState({ list: response });
                }.bind(this)
            });
        }

        function ValidaErros (busca){
            let erros = [];
            if (busca.length === 0) {
                erros.push("A Busca não pode ser em branco");
            }
            if (busca.length < 8) {
                erros.push("A Busca nao pode ter menos que 8 caracteres");
            }
            return erros;
        }
        function exibeMensagensDeErro(erros){
            var ul = document.querySelector("#mensagens-erro");
            ul.innerHTML = "";
            erros.forEach(function(erro){
                var li = document.createElement("li");
                li.textContent = erro;
                ul.appendChild(li);
            });
        }
    }
    

    // Salva AS informações das CRIANÇAS que apareceu na busca e foi selecionado.
    selectedKids(identifier) {
        let achou = false;
        //Desmarca A checkBox
        this.state.listConfirmKids.forEach((kids, indice, array) => {
            if (kids._id === identifier) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.list.forEach((kids) => {
                if (kids._id === identifier) {
                    this.state.listConfirmKids.push(kids);
                }
            });
        }

        this.setState({ listConfirmKids: this.state.listConfirmKids });
        console.log(this.state.listConfirmKids)
    }
    // FUNCOES RELACIONADAS A BUSCA DAS CRIANÇAS - Fim


    // FUNÇOES DO BOTÃO AVANÇAR - INICIO 
    // Encaminha para a tela II
    TelaII = (event) => {
        if (this.preenchido == true) {
            this.setState({
                page: "ConfirmAdult",
                obs: this.state.listConfirmAdult[0].observations,
                phone: this.state.listConfirmAdult[0].phone,
            })
        }
        else {
            alert(" Selecione um Responsável ")
                this.setState({
                    page: "SelectAdult",
                    selectedSearch: '',
                    preenchido: false,
                })
        }
    }

    // Encaminha para a tela III
    TelaIII(event) {
        // Nós já temos o adulto. Precisamos dar um loop nas crianças do adulto para pegar se ID e fazer
        // uma requisição para pegar seus dados.
        const criancas = this.state.listConfirmAdult[0].children.map(async (crianca) => {
            const response = await axios.get(`/child/indentifier/${crianca.identifier}`);
            return response.data;
        });

        criancas.forEach(async (c) => {
            const crianca = await c;
            this.setState({
                listConect: [...this.state.listConect, crianca]
            })
        })

        this.setState({
            page: "SelectKids",
            selectedSearch: '',
            list:[],
        });


        // Função responsável por pegar o identificador que está relacionado ao adulto e fazer uma requisição dos dados das crianças 
        // $.ajax({
        //     url: "http://localhost:3001/adult/filter/" + this.state.listConfirmAdult[0].children.identifier + "/name",// url: "https://ab64b737-4df4-4a30-88df-793c88b5a8d7.mock.pstmn.io/passaporte",
        //     dataType: 'json',
        //     type: 'GET',
        //     error: function (response) {
        //         if (response.length === 0) { this.setState({ erro: "* Erro no servidor" }) }
        //     },
        //     success: function (response) {    //Salva os dados do responsável na variácel LIST
        //         console.log("Olar2")
        //         this.setState({ listConect: response });
        //     }.bind(this)
        // });
    }

    // Encaminha para a tela IV
    TelaIV = (event) => {
        this.setState({
            page: "ConfirmKids",
            obs: this.state.listConfirmKids.observations,
            rest: this.state.listConfirmKids.restrictions,
            file: Array(this.state.listConfirmKids.length),
        })
    }

    // Encaminha para a tela V
    TelaV = (event) => {
        this.setState({
            page: "Finalize"
        })
        let lista = [...this.state.listConfirmAdult,{belongings: "1",
        employee: "Rozinha dos Santos"},...this.state.listConfirmKids];
        console.log("Eu sou a lista suprema que está sendo debugada: ", lista)
        this.setState({
            arrayfinal:lista,
        })
        alert("Cadastrado");
        console.log(this.state.arrayfinal);
    }

    // Encaminha para a tela VI
    Comprovante = (event) => {        
        this.setState({
            comprovante:true,            
        })
        alert("Cadastrado");
        console.log(this.state.arrayfinal);
        this.TheEnd();
    }
    // FUNÇOES DO BOTÃO AVANÇAR - FIM  

    //Essa parte é de responsabilidade de Marcos Paulo, talvez isso dê errado, mas tentá-lo-ei...
    //Só quero pegar o que preciso na rota.
    //O new Date().getTime() recebe o valor em milisegundos, por isso, dividindo por 60000 converto em minutos.
    //Começando o formulário para enviar no JSON:
    /*FUNCAO CADASTRA ADULTO*/
    TheEnd= (event) => {
        var formData = new FormData();
        var listAdult = new Array();
        var listCria = new Array();
        var i;
        for(i = 0; i < this.state.listConfirmKids.length; i++){
            formData.append('photo', String(this.state.listConfirmKids[0]._id))
            formData.append('service', 'Passaporte')
            formData.append('time', moment().format())
            formData.append('belongings', '0')
            listCria.push(String(this.state.listConfirmKids[i]._id))
            listCria.push(this.state.listConfirmKids[i].name.firstName + this.state.listConfirmKids[i].name.surName)
            listCria.push(this.state.listConfirmKids[i].birthday)
            listCria.push(this.state.listConfirmKids[i].restrictions)
            listCria.push(this.state.listConfirmKids[i].observations)
            listAdult.push(this.state.listConfirmAdult[0]._id)
            listAdult.push(this.state.listConfirmAdult[0].name.firstName + this.state.listConfirmAdult[0].name.surName)
            listAdult.push(this.state.listConfirmAdult[0].phone)
            listAdult.push(this.state.obs)
            formData.append('children', listCria)
            formData.append('adult', listAdult)
        };
        console.log('Meu form é esse:')
        console.log(formData);
        //Fim do formulário;
        axios.post('/product', formData)
        .then(function (response) {
            console.log(response)
            alert("Cadastro Finalizado")
            window.location.href = '/';
        }).catch(function (error) {
            console.log(error)//LOG DE ERRO
            console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
            console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
            alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
        })
        //Fim da parte Marcos.
    }
    // FUNÇOES DO BOTÃO VOLTART TELA - INICIO 
    // Voltar par Tela I
    VoltarTelaI = (event) => {
        this.setState({
            page: "SelectAdult",
            listConfirmAdult: [],
        })
    }
    // Voltar par Tela II
    VoltarTelaII = (event) => {
        this.setState({
            page: "ConfirmAdult"
        })
    }

    // Voltar par Tela III
    VoltarTelaIII = (event) => {
        this.setState({
            page: "SelectKids",
            listConfirmKids:[],

        })
    }

    // Voltar par Tela IV
    VoltarTelaIV = (event) => {
        this.setState({
            page: "ConfirmKids"
        })
    }

    // FUNÇOES DO BOTÃO VOLTART TELA - FIM

    //  FUNÇOES RELACIONADADS A TIRADA DA FOTO - INÍCIO 

    /*BLOCO QUE TIRA FOTO DA WEBCAN*/
    setRef = (webcam) => {
        this.webcam = webcam;
    }
    capture = (event, identifier, indice_da_foto) => {      
        event.preventDefault();

        /*
        (Gabriel): Este código pega a foto e liga para a criança específica.
        Primeiro, selecionamos todas as imagens de dentro do DOM -> #1
        Segundo, Pegamos a foto e armazenamos para trabalhar com ela -> #2
        Terceiro, inserimos a foto dentro do HTML específico dela -> #3
        Quarto, Relacionamos a foto com a sua criança -> #4
        Quinto, Alteramos seu valor no estado e renderizamos na tela -> #5            
        */
        var imagem = document.querySelectorAll("#imagem"); // #1
        const imageSrc = this.webcam.getScreenshot(); // #2
        imagem[indice_da_foto].src = imageSrc; // #3

        this.state.listConfirmKids.map((kid, indice) => { // #4
            console.log(identifier);
            if (kid._id === identifier){
                kid.fotoFamily = this.state.file[indice_da_foto];
            }
        })

        const novaListaCriancas = this.state.listConfirmKids;

        this.setState({listConfirmKids: novaListaCriancas}); // #5

    };
    //  FUNÇOES RELACIONADADS A TIRADA DA FOTO - FIM

    // FUNÇÃO QUE SALVA O MOMENTO ATUAL NA VARIÁVEL horaEntradaCriança


    render() {
        // //TELA I - Busca do responsável
        if (this.state.page === "SelectAdult") {
            {/* Imprime a tabela com a busca dos Adultos*/ }
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Passaporte </li>
                        </ol >
                    </div> 

                    <div className="graph-visual" >
                        <div className="graph" >
                            <div>
                                <h3 className="inner-tittle " >Selecionar Responsável</h3>
                            </div>
                            <div className=" text-center">
                                <input type="search" id="selectAdult" name="selectAdult" className="form-control text-center" value={this.state.selectedSearch} onChange={this.ChangeSearch} placeholder="Pesquisar" />
                                <button type="button" className="btn btn-md botao botaoAvançar" onClick={this.SearchAdult}> Pesquisar </button>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="graph" >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th >Nome</th>
                                        <th >Telefone</th>
                                        <th className="text-center"> Selecionar </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.list.map((findAdult, indice) => {
                                        return (
                                            <tr key={findAdult._id}>
                                                <th scope="row">{indice + 1}</th>
                                                <td > {findAdult.name.firstName + " " + findAdult.name.surName} </td>
                                                <td >{findAdult.phone} </td>
                                                <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selectedAdult(findAdult._id)} /> </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            <div className="text-center">
                                <a className="btn btn-md botao" href="/">Cancelar</a>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.TelaII}> Avançar </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        //TELA II - Confirma Dados Adultos:
        else if (this.state.page === "ConfirmAdult") {
            console.log(`Console.log: ${typeof (this.state.listConfirmAdult)}`);
            console.log(this.state.listComfirm)
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Passaporte </li>
                        </ol >
                    </div>
                    <div className="graph-visual">
                        <div className="graph-visual" >
                            <div className="graph">
                                <h3 className="inner-tittle" style={{ marginTop: -10 + "px" }} > Perfil - Confirmando Cadastro</h3>
                                <div className="row">
                                    <div className="col-md-7 col-sm-12 text-center">
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                            <img src={"http://localhost:3000/img-users/" + this.state.listConfirmAdult[0].photo} />
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-sm-12 text-center">
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Nome: </b></h5>
                                            <p>{this.state.listConfirmAdult[0].name.firstName + " " + this.state.listConfirmAdult[0].name.surName}</p>
                                        </div>
                                        <br></br>
                                        <div className="graph" style={{ padding: 10 + "px", paddingBottom: 25 + "px", paddingTop: -13 + "px" }}>
                                            <h5 className="ltTitulo"><b> Telefone: </b></h5>
                                            <input type="text" id="phoneNumber" name="phoneNumber" className="form-control" className="text-center" placeholder="(00) 99999-9999" value={this.state.phone} onChange={this.ChangePhone} />
                                        </div>
                                        <br></br>
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Idade: </b></h5>                                        
                                            <p>{moment(this.state.listConfirmAdult[0].birthday).toNow(true)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="graph-visual" >
                            <div className="graph" style={{ padding: 10 + "px" }} >
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <h3 className="inner-tittle" > Observações </h3>
                                        <br></br>
                                        <textarea className="form-control" rows="4" cols="50" id="Observacoes" name="Observacoes" value={this.state.obs} onChange={this.ChangeObs}></textarea>
                                    </div>
                                </div>
                            </div >
                        </div>
                    </div>
                    <div className="text-center">
                        <a className="btn btn-md botao" href="/">Cancelar</a>
                        <button className="btn btn-md botao" onClick={this.VoltarTelaI}>Voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.TelaIII}> Avançar </button>
                    </div>
                </div>
            )
        }

        //TELA III - Busca pelas crianças 
        else if (this.state.page === "SelectKids") {
            return (
                <div className="container-fluid">
                    <div className="container-fluid" >
                        <div className="sub-heard-part" >
                            <ol className="breadcrumb m-b-0" >
                                <li > < a href="/" > Home </a></li >
                                <li > Passaporte</li>
                            </ol >
                        </div>
                        <div className="graph-visual" >
                            <div className="graph" >
                                <div>
                                    <h3 className="inner-tittle " >Selecionar Crianças</h3>
                                </div>
                                <div className=" text-center">
                                    <input type="search" id="selectKids" name="selectKids" className="form-control text-center" value={this.state.selectedSearch} onChange={this.ChangeSearch} placeholder="Pesquisar" />
                                    <button type="button" className="btn btn-md botao botaoAvançar" onClick={this.SearchChild}> Pesquisar </button>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="graph" >
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th >Nome</th>
                                            <th >Aniversário </th>
                                            <th className="text-center"> Selecionar </th>
                                        </tr>
                                    </thead>
                                    <tbody> {/* LISTA DE CRIANÇAS QUE JA FORAM CADASTRADAS - Falta modificar para aparecer o nome*/}
                                        {this.state.listConect.map((findKids, indice) => {
                                            return (
                                                <tr key={findKids._id}>
                                                    <th scope="row">{indice + 1}</th>
                                                    <td > {findKids.name.firstName + " " + findKids.name.surName} </td>
                                                    <td >{findKids.birthday} </td>
                                                    <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selectedKids(findKids._id)} /> </td>
                                                </tr>
                                            );
                                        })}
                                        {this.state.list.map((findKids, indice) => {
                                            return (
                                                <tr key={findKids._id}>
                                                    <th scope="row">{indice + 1}</th>
                                                    <td > {findKids.name.firstName + " " + findKids.name.surName} </td>
                                                    <td >{findKids.phone} </td>
                                                    <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selectedKids(findKids._id)} /> </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <a className="btn btn-md botao" href="/">Cancelar</a>
                        <button className="btn btn-md botao" onClick={this.VoltarTelaII}>Voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.TelaIV}> Avançar </button>
                    </div>
                </div>
            )
        }

        //TELA IV - Confirmação das crianças na entrada do passaporte
        else if (this.state.page === "ConfirmKids") {
            return (
                <div className="containerfluid">
                    <div className="sub-heard-part">
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Passaporte </li>
                        </ol >
                    </div>
                    <div className="graph-visual">
                        <h3 className="inner-tittle" > Confirmando Cadastro </h3>
                        <div className="graph">
                            <div className="row">
                                {this.state.listConfirmKids.map((Criançasqueentrarao, indice) => {
                                    return (
                                        <div className="container-fluid" >
                                            <h3 className="inner-tittle" > Perfil Criança {indice + 1}  </h3>
                                            <div className="graph-visual" >
                                                <div className="row">
                                                    <div className="col-md-8 col-sm-12">
                                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                                            <h5 className="ltTitulo"><b> Nome Criança: </b></h5>
                                                            <p>{Criançasqueentrarao.name.firstName + " " + Criançasqueentrarao.name.surName}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-12">
                                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                                            <h5 className="ltTitulo"><b> Idade: </b></h5>
                                                            <p>{moment(Criançasqueentrarao.birthday, "YYYYMMDD").toNow(true)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-8 col-sm-12">
                                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                                            <h5 className="ltTitulo"><b> Nome Responsável: </b></h5>
                                                            <p>{this.state.listConfirmAdult[0].name.firstName + " " + this.state.listConfirmAdult[0].name.surName}</p></div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-12">
                                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                                            <h5 className="ltTitulo"><b> Data de Nascimento: </b></h5>
                                                            <p>{this.state.listConfirmAdult[0].birthday}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br></br>
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                                            <h5 className="ltTitulo text-center"><b> Entrada: </b></h5>
                                                            <p className="text-center">{this.horaEntradaCriança = moment().format('LTS')}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="graph" style={{ padding: 10 + "px", paddingBottom: 45 + "px", paddingTop: -13 + "px"  }}>
                                                            <h5 className="ltTitulo text-center"><b> Parentesco: </b></h5>
                                                                <select id="kinship" name="kinship" className="form-control optionFomulario"  onChange={(event) => this.Changekinship(event, Criançasqueentrarao._id)} >
                                                                <option value="others" > Outros </option>
                                                                <option value="children" > filho(a) </option>
                                                                <option value="Stepson" > Enteado(a) </option>
                                                                <option value="grandchildren"  > Neto(a) </option>
                                                                <option value="nephews"  > Sobrinho(a) </option>
                                                                <option value="Brother" > Irmão/Irmã </option>
                                                            </select >
                                                        </div>
                                                    </div>
                                                </div>
                                                <br></br>
                                                <div className="graph" >
                                                    <div className="row">
                                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                                            <h3 className="inner-tittle" > Observações </h3>
                                                            <br></br>
                                                            <textarea className="form-control" rows="4" cols="50" id="Observacoes" name="Observacoes" value={this.state.obs} onChange={this.ChangeObs}></textarea>
                                                        </div>
                                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                                            <h3 className="inner-tittle" > Restrições </h3>
                                                            <br></br>
                                                            <textarea className="form-control" rows="4" cols="50" id="restrictions" name="restrictions" value={this.state.rest} onChange={this.ChangeRest}></textarea>
                                                        </div>
                                                    </div>
                                                </div >
                                                <div className="graph" >
                                                    <div className="row text-center">
                                                        <h4 className="inner-tittle"> Tirando uma foto </h4>
                                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                                            <Webcam
                                                                className="webcan"
                                                                audio={false}
                                                                height={240}
                                                                ref={this.setRef}
                                                                screenshotFormat="image/png"
                                                                width={320}
                                                            />
                                                            <button className="btn btn-md botao" onClick={(event) => {this.capture(event, Criançasqueentrarao._id, indice)}}>Tirar Foto</button>
                                                            <br></br>
                                                        </div>
                                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                                            <img id="imagem" className="webcan" src={Criançasqueentrarao.fotoFamily} />
                                                        </div>
                                                    </div>
                                                </div >
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <a className="btn btn-md botao" href="/">Cancelar</a>
                        <button className="btn btn-md botao" onClick={this.VoltarTelaIII}>Voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.TelaV}> Avançar </button>
                    </div>
                </div>
            )
        }

        //TELA V - Checagem dos dados finais na entrada do passaporte
        else if (this.state.page === "Finalize") {

            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Passaporte </li>
                        </ol >
                    </div>
                    <div className="graph-visual">
                        <div className="graph-visual" >
                            <h3 className="inner-tittle" style={{ marginTop: -10 + "px" }} > Perfil - Confirmação Final</h3>
                            <div className="row">
                                {/*QUADRO CONFIMAÇÃO FINAL ADULTOS - INÍCIO*/}
                                <div className="graph" >
                                    <h3 className="inner-tittle " style={{ marginTop: -10 + "px", marginLeft: 40 + "%" }} >Responsável </h3>
                                    <div className="row">
                                        <div className="col-md-7 col-sm-12 text-center">
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                                <img src={"http://localhost:3000/img-users/" + this.state.listConfirmAdult[0].photo} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-12 text-center">
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Nome: </b></h5>
                                                <p>{this.state.listConfirmAdult[0].name.firstName + " " + this.state.listConfirmAdult[0].name.surName}</p>
                                            </div>
                                            <br></br>
                                            <div className="graph" style={{ padding: 10 + "px"}}>
                                                <h5 className="ltTitulo"><b> Telefone: </b></h5>
                                                <p> {this.state.listConfirmAdult[0].phone}</p>
                                                </div>
                                            <br></br>
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Idade: </b></h5>
                                                <p>{moment(this.state.listConfirmAdult[0].birthday, "YYYYMMDD").toNow(true)}</p>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="graph-visual" >
                                        <div className="graph" style={{ padding: 10 + "px" }} >
                                            <div className="row">
                                                <div className="col-md-12 col-sm-12 col-xs-12">
                                                    <h3 className="inner-tittle" > Observações </h3>
                                                    <br></br>
                                                    <div className="graph" style={{ padding: 10 + "px" }} >                                                    
                                                        <p>{this.state.listConfirmAdult[0].observations}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div >
                                    </div>                                
                                </div>
                                {/*QUADRO CONFIMAÇÃO FINAL ADULTOS - FIM*/}
                                <div><br></br></div>
                                {/*QUADRO CONFIMAÇÃO FINAL CRIANÇAS- INÍCIO*/}
                                {this.state.listConfirmKids.map((Criançasqueentrarao, indice) => {
                                    return(
                                    <div className="graph" >
                                        <h3 className="inner-tittle " style={{ marginTop: -10 + "px", marginLeft: 45 + "%" }} > Criança {indice+1}</h3>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 text-center">
                                                <div className="graph" style={{ padding: 10 + "px" }}>
                                                    <h5 className="ltTitulo"><b> Nome: </b></h5>
                                                    <p>{Criançasqueentrarao.name.firstName + " " + Criançasqueentrarao.name.surName}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div className="row">
                                            <div className="col-md-7 col-sm-12 text-center">
                                                <div className="graph" style={{ padding: 10 + "px" }}>
                                                    <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                                    <img src={"http://localhost:3000/img-users/" + Criançasqueentrarao.photo} />
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-sm-12 text-center">     
                                                <div className="graph" style={{ padding: 10 + "px" }}>
                                                    <h5 className="ltTitulo"><b> Parentesco: </b></h5>
                                                    <p>{Criançasqueentrarao.kinship}</p>
                                                </div>
                                                <br></br>
                                                <div className="row">
                                                    <div className="col-md-7 col-sm-12 text-center">
                                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                                            <h5 className="ltTitulo"><b> Sexo: </b></h5>
                                                            <p>{Criançasqueentrarao.sexuality}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5 col-sm-12 text-center">
                                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                                            <h5 className="ltTitulo"><b> Idade: </b></h5>
                                                            <p>{moment(Criançasqueentrarao.birthday, "YYYYMMDD").toNow(true)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div className="graph" style={{ padding: 10 + "px" }} >
                                        <div className="row">                                        
                                                <div className="col-md-12 col-sm-12 col-xs-12">
                                                    <h3 className="inner-tittle" > Observações </h3>
                                                    <br></br>
                                                    <div className="graph" style={{ padding: 10 + "px" }} >                                                    
                                                        <p>{Criançasqueentrarao.observations}</p>
                                                    </div> </div>
                                            </div>
                                        </div >                                     
                                        <div><br></br></div>                                      
                                    </div> 
                                    )                                    
                                })}
                                {/*QUADRO CONFIMAÇÃO FINAL Crianças  - FIM*/}
                            </div>
                        </div>
                    </div>
                    <Comprovant
                        teste={this.state.comprovante}
                        tabela={this.state.arrayfinal}
                        serviso="PASSAPORTE"
                        
                    />
                    <div className="text-center">
                        <a className="btn btn-md botao" href="/">Cancelar</a>   
                        <button className="btn btn-md botao" onClick={this.VoltarTelaIV}>Voltar</button>                     
                        <button className="btn btn-md botao botaoAvançar" onClick={this.Comprovante}> Finalizar </button>
                    </div>
                </div>
            )
        }
    }
}

export default Passport;