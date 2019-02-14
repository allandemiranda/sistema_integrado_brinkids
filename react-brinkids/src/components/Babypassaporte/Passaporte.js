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
import Comprovant from '../Comprovante/comprovantedeEntrada';
import '../Comprovante/comprovante.css';
import tabelinha from '../Comprovante/tabelinha';
import $ from "jquery";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
import { Num } from './favetas';
class Passport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayfinal: [],
            //Responsável por saber qual página vai renderizar:
            page: "SelectAdult",//ConfirmAdult SelectAdult Finalize
            selectedSearch: '', // Salva o nome que é colocado na barra de busca
            list: [], //recebe do banco os dados da pessoa que foi buscada
            listConnect: [], // recebe os dados das crianças ligadas aos adultos [Passaporte]
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
            obsCrianca: '',
            rest: '',
            phone: '',
            file: '', // recebe a imagem 
            currentdate: [],
            horaEntradaCriança: '', // Váriável que recebe a hora que a crianaça da entrada na loja. Aparece na telaIV
            kinshipConfirm: '',
            comprovante: false,
            no: tabelinha,
            dadosComprovante: [],
            kinship: [],
            nomeFuncionario: "",

        }

        //Relacionado a busca
        this.ChangeSearch = this.ChangeSearch.bind(this);
        this.SearchAdult = this.SearchAdult.bind(this);
        this.SearchChild = this.SearchChild.bind(this);
        this.Changekinship = this.Changekinship.bind(this);


        //Relacionado a atualização dos valores Caminho
        this.ChangeObs = this.ChangeObs.bind(this); //apontador 
        this.ChangeObsCrianca = this.ChangeObsCrianca.bind(this);
        this.ChangeRest = this.ChangeRest.bind(this);
        this.ChangePhone = this.ChangePhone.bind(this);

        this.TelaIII = this.TelaIII.bind(this);
    }
    Funcionario = (number) => {
        const a = getToken();
        const b = jwt.verify(a, config.secret_auth);
    
        axios.get(`/employees/${b.id}`)
          .then((response) => {
            let id = response.data[0].identifierEmployee.employeeData.officialPosition;
    
    
    
            axios.get(`/professionalPosition/indentifier/${id}`)
              .then((response) => {
                let functions;
                return response.data.functions;
              }).then((event) => {
                let podeentrar = false;
                event.map((map) => {
                  if (map.id === number) {
                    podeentrar = true;
                  }
                })
                return podeentrar;
              }).then((event) => {
                if (event) {
                  
                } else {
                  this.props.history.push("/");
                  alert("você nao tem permissao para entrar aki")
                }
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
    
      }
      componentWillMount() {
        this.Funcionario(19);
      }
    

    //Relacionado a atualização dos valores Funções
    ChangeObs(event) {
        this.setState({ obs: event.target.value });
    }
    ChangeObsCrianca(event, identifier, indice) {
        console.log(event.target.value);
        let listatemporaria = this.state.listConfirmKids;
        listatemporaria.forEach((crianca, indice) => {
            if (crianca._id === identifier) {
                crianca.observations = event.target.value;
            }
        });
        this.setState({
            listConfirmKids: listatemporaria,
        })
    }
    ChangeRest(event, identifier, indice) {
        console.log(event.target.value);
        let listatemporaria = this.state.listConfirmKids;
        listatemporaria.forEach((crianca, indice) => {
            if (crianca._id === identifier) {
                crianca.restrictions = event.target.value;
            }
        });
        this.setState({
            listConfirmKids: listatemporaria,
        })
    }
    ChangePhone(event) {
        this.setState({ phone: event.target.value });
    }
    Changekinship(event, identifier, indice) {
        console.log(event.target.value);
        let listatemporaria = this.state.listConfirmKids;
        listatemporaria.forEach((crianca, indice) => {
            if (crianca._id === identifier) {
                console.log(event.target.value);
                if (event.target.value === "others") {
                    this.state.kinship[indice] = "Outros";
                }
                else if (event.target.value === "children") {
                    this.state.kinship[indice] = "Filho(a)";
                }
                else if (event.target.value === "Stepson") {
                    this.state.kinship[indice] = "Enteado(a)";
                }
                else if (event.target.value === "grandchildren") {
                    this.state.kinship[indice] = "Neto(a)";
                }
                else if (event.target.value === "nephews") {
                    this.state.kinship[indice] = "Sobrinho(a)";
                }
                else if (event.target.value === "Brother") {
                    this.state.kinship[indice] = "Irmã(o)";
                }
            }
        });
    }

    // FUNCOES RELACIONADAS A BUSCA Do RESPOSÁVEL - Inicio 
    //Bloco que muda o status para o atual do formulario.
    ChangeSearch(event) {
        this.setState({ selectedSearch: event.target.value });
    }



    // Faz a busca do responsável:
    async  SearchAdult(event) {
        let erros = this.state.selectedSearch;
        console.log(await Num())
        if (erros.length === 0) {
            alert("A Busca não pode ser em branco");
        }
        else if (erros.length < 8) {
            alert("A Busca nao pode ter menos que 8 caracteres");
        }
        else {
            axios.get(`/adult/filter/${this.state.selectedSearch}/name`)
                .then((response) => {

                    if (response.data.length === 0) {
                        alert("Erro: Nenhum Responsável Encontrado")
                        this.setState({ erro: "* Nenhum Responásel Encontrado." })
                    } else {
                        console.log("Olar")
                        this.setState({ list: response.data });
                    }
                    // window.location.href = '/';
                }).catch((error) => {


                })
            // // $.ajax({
            // //     url: "/adult/filter/" + this.state.selectedSearch + "/name",//url: "https://ab64b737-4df4-4a30-88df-793c88b5a8d7.mock.pstmn.io/passaporte", //
            // //     dataType: 'json',
            // //     type: 'GET',
            // //     error: function (response) {
            // //         if (response.length === 0) { this.setState({ erro: "* Erro no servidor" }) }
            // //     },
            // //     success: function (response) {    //Salva os dados do responsável na variácel LIST
            // //         console.log(response.length)
            // //         if (response.length === 0) {
            // //             alert("Erro: Nenhum Responsável Encontrado")
            // //             this.setState({ erro: "* Nenhum Responásel Encontrado." })
            // //         } else {
            // //             console.log("Olar")
            // //             this.setState({ list: response });
            // //         }
            // //     }.bind(this)
            // });
        }
    }

    // Salva AS informações do ADULTO que apareceu na busca e foi selecionado.
    selectedAdult(adult) {
        this.setState({
            listConfirmAdult: adult,
            page: "ConfirmAdult",
            phone:adult.phone,
            obs:adult.observations
        })


    }
    // FUNCOES RELACIONADAS A BUSCA Do RESPOSÁVEL- Fim

    // FUNCOES RELACIONADAS A BUSCA DAS CRIANÇAS - Inicio 
    //Bloco que muda o status para o atual do formulario.
    ChangeSearch(event) {

        const b = jwt.verify(getToken(), config.secret_auth);


        axios.get(`/adult/${b.id}`)
            .then((response) => {

                const name = response.data.name.firstName + " " + response.data.name.surName;
                this.setState({
                    nomeFuncionario: response.data.name.firstName + " " + response.data.name.surName
                })
                console.log(name)
            }).catch((err) => {
                console.log(err);
            });


        this.setState({ selectedSearch: event.target.value });
    }

    // Faz a busca das Crianças:
    SearchChild(event) {
        let erros = this.state.selectedSearch;

        if (erros.length === 0) {
            alert("A Busca não pode ser em branco");
        }
        else if (erros.length < 8) {
            alert("A Busca nao pode ter menos que 8 caracteres");
        }
        else {
            axios.get(`/child/filter/${this.state.selectedSearch}`)
                .then((response) => {
                    if (response.data.length === 0) { this.setState({ erro: "* Nenhuma Criança Encontrada." }) } else {
                        this.setState({ list: response.data });
                    }
                    // window.location.href = '/';
                }).catch((error) => {


                })

        }
    }


    // Salva AS informações das CRIANÇAS que apareceu na busca e foi selecionado.
    selectedKids(kid) {
        const childFind = this.state.listConfirmKids.findIndex((child) => child._id === kid._id);

        if (childFind === -1) {
            this.state.listConfirmKids.push(kid);
        } else {
            this.state.listConfirmKids.splice(childFind, 1);
        }
    }
    // FUNCOES RELACIONADAS A BUSCA DAS CRIANÇAS - Fim


    // FUNÇOES DO BOTÃO AVANÇAR - INICIO 
    // Encaminha para a tela II
    TelaII = (event) => {
        if (this.state.listConfirmAdult.length != 0) {
            this.setState({
                page: "ConfirmAdult",
                obs: this.state.listConfirmAdult.observations,
                phone: this.state.listConfirmAdult.phone,
            })
        }
        else {
            alert(" Selecione um Responsável ")
            this.setState({
                selectedSearch: '',
            })
        }
    }

    // Encaminha para a tela III
    TelaIII(event) {
        // Nós já temos o adulto. Precisamos dar um loop nas crianças do adulto para pegar se ID e fazer
        // uma requisição para pegar seus dados.
        console.log(this.state.listConfirmAdult.children[0])
        if (this.state.listConfirmAdult.children[0] === null) {

        } else {

            const criancas = this.state.listConfirmAdult.children.map(async (crianca) => {
                const response = await axios.get(`/child/indentifier/${crianca.identifier}`);
                return response.data;
            });

            criancas.forEach(async (c) => {
                const crianca = await c;
                this.setState({
                    listConnect: [...this.state.listConnect, crianca]
                })
            })
        }
        this.setState({
            page: "SelectKids",
            selectedSearch: '',
            list: [],
        });


        // Função responsável por pegar o identificador que está relacionado ao adulto e fazer uma requisição dos dados das crianças 
        // $.ajax({
        //     url: "/adult/filter/" + this.state.listConfirmAdult.children.identifier + "/name",// url: "https://ab64b737-4df4-4a30-88df-793c88b5a8d7.mock.pstmn.io/passaporte",
        //     dataType: 'json',
        //     type: 'GET',
        //     error: function (response) {
        //         if (response.length === 0) { this.setState({ erro: "* Erro no servidor" }) }
        //     },
        //     success: function (response) {    //Salva os dados do responsável na variácel LIST
        //         console.log("Olar2")
        //         this.setState({ listConnect: response });
        //     }.bind(this)
        // });
    }

    // Encaminha para a tela IV
    TelaIV = (event) => {
        if (this.state.listConfirmAdult.length != 0) {
            this.setState({
                page: "ConfirmKids",
                obsCrianca: this.state.listConfirmKids[0].observations,
                rest: this.state.listConfirmKids[0].restrictions,
                file: Array(this.state.listConfirmKids.length),
            })
            console.log(this.state.listConfirmKids);

        }
        else {
            alert(" Selecione um Responsável ")
        }
    }

    // Encaminha para a tela V
    TelaV = async (event) => {


        var formData = new FormData();
        var listCria = [];

        const adulto = {
            _id: this.state.listConfirmAdult._id,
            name: this.state.listConfirmAdult.name.firstName + ' ' + this.state.listConfirmAdult.name.surName,
            phone: this.state.listConfirmAdult.phone,
            observations: this.state.obs,
        };
        var i;
        for (i = 0; i < this.state.listConfirmKids.length; i++) {
            const crianca = {
                _id: String(this.state.listConfirmKids[i]._id),
                name: this.state.listConfirmKids[i].name.firstName + ' ' + this.state.listConfirmKids[i].name.surName,
                birthday: new Date(this.state.listConfirmKids[i].birthday),
                restrictions: this.state.listConfirmKids[i].restrictions,
                observations: this.state.listConfirmKids[i].observations,
                photo: this.state.listConfirmKids[i].fotoFamily
            }

            listCria.push(crianca);
        };
        this.setState({
            dadosComprovante: {

                photo: String(this.state.listConfirmKids[0]._id),
                service: "Baby Passaporte",
                time: moment().format(),
                belongings: await Num(),
                children: listCria,
                adult: adulto,
                funcionario: this.state.nomeFuncionario
                //ajeitar o comprovante
            }
        })
        this.setState({
            page: "Finalize"
        })

    }

    // Encaminha para a tela VI
    Comprovante = (event) => {
        this.TheEnd();
    }
    // FUNÇOES DO BOTÃO AVANÇAR - FIM  

    //Essa parte é de responsabilidade de Marcos Paulo, talvez isso dê errado, mas tentá-lo-ei...
    //Só quero pegar o que preciso na rota.
    //O new Date().getTime() recebe o valor em milisegundos, por isso, dividindo por 60000 converto em minutos.
    //Começando o formulário para enviar no JSON:
    /*FUNCAO CADASTRA ADULTO*/
    TheEnd = async (event) => {
        var formData = new FormData();
        var listCria = [];

        const adulto = {
            _id: this.state.listConfirmAdult._id,
            name: this.state.listConfirmAdult.name.firstName + ' ' + this.state.listConfirmAdult.name.surName,
            phone: this.state.phone,
            observations: this.state.obs,
        };

        for (var i = 0; i < this.state.listConfirmKids.length; i++) {
            const crianca = {
                _id: String(this.state.listConfirmKids[i]._id),
                name: this.state.listConfirmKids[i].name.firstName + ' ' + this.state.listConfirmKids[i].name.surName,
                birthday: new Date(this.state.listConfirmKids[i].birthday),
                restrictions: this.state.listConfirmKids[i].restrictions,
                observations: this.state.listConfirmKids[i].observations,
                photo: this.state.listConfirmKids[i].fotoFamily,
                kinship: this.state.kinship[i],
            }
            console.log(this.state.kinship[i])
            listCria.push(crianca);
        };

        formData.append('photo', this.state.listConfirmKids[0].fotoFamily)
        formData.append('service', 'Baby Passaporte')
        formData.append('time', moment().format())
        formData.append('belongings', await Num())
        formData.append('children', JSON.stringify(listCria))
        formData.append('adult', JSON.stringify(adulto));
        formData.append('funcionario', this.state.nomeFuncionario);


        //Fim do formulário;

        axios.post('/product', formData)
            .then((response) => {
                console.log(response.data, "olaa");
                this.setState({
                    dadosComprovante: {
                        i: response.data,
                        funcionario: this.state.nomeFuncionario
                    }
                })



                // window.location.href = '/';
            }).then(() => {


                this.setState({

                    comprovante: true,
                })

            }).then(() => {
               
                setTimeout((event) => {
                    this.props.history.push("/");
                    
                }, 100);
            }).catch((error) => {
                console.log(error)//LOG DE ERRO

                console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT

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
            page: "ConfirmAdult",
            listConnect: [],
        })
    }

    // Voltar par Tela III
    VoltarTelaIII = (event) => {
        this.setState({
            page: "SelectKids",
            listConfirmKids: [],

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
            if (kid._id === identifier) {
                kid.fotoFamily = imageSrc;
            }
        })

        const novaListaCriancas = this.state.listConfirmKids;

        this.setState({ listConfirmKids: novaListaCriancas }); // #5

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
                            <li > Baby Passaporte </li>
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
                                                <td className="text-center">    <button name="selectchild" onClick={() => this.selectedAdult(findAdult)}><span className="glyphicon">&#xe065;</span></button> </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            <div className="text-center">
                                <Link className="btn btn-md botao" to="/">Cancelar</Link>

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
                            <li > Baby Passaporte </li>
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
                                            <img src={this.state.listConfirmAdult.photo} />
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-sm-12 text-center">
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Nome: </b></h5>
                                            <p>{this.state.listConfirmAdult.name.firstName + " " + this.state.listConfirmAdult.name.surName}</p>
                                        </div>
                                        <br></br>
                                        <div className="graph" style={{ padding: 10 + "px", paddingBottom: 25 + "px", paddingTop: -13 + "px" }}>
                                            <h5 className="ltTitulo"><b> Telefone: </b></h5>
                                            <input type="text" id="phoneNumber" name="phoneNumber" className="form-control" className="text-center" placeholder="(00) 99999-9999" value={this.state.phone} onChange={this.ChangePhone} />
                                        </div>
                                        <br></br>
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Idade: </b></h5>
                                            <p>{moment(this.state.listConfirmAdult.birthday).toNow(true)}</p>
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
                        <Link className="btn btn-md botao" to="/">Cancelar</Link>
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
                                <li > Baby Passaporte</li>
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
                                        {this.state.listConnect.map((findKids, indice) => {

                                            return (
                                                <tr key={findKids._id}>
                                                    <th scope="row">{indice + 1}</th>
                                                    <td > {findKids.name.firstName + " " + findKids.name.surName} </td>
                                                    <td >{moment(findKids.birthday).add(1,"days").format('DD/MM/YYYY')} </td>
                                                    <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selectedKids(findKids)} /> </td>
                                                </tr>
                                            );
                                        })}
                                        {this.state.list.map((findKids, indice) => {
                                            return (
                                                <tr key={findKids._id}>
                                                    <th scope="row">{this.state.listConnect.length + 1}</th>
                                                    <td > {findKids.name.firstName + " " + findKids.name.surName} </td>
                                                    <td >{moment(findKids.birthday).format('DD/MM/YYYY')}  </td>
                                                    <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selectedKids(findKids)} /> </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link className="btn btn-md botao" to="/">Cancelar</Link>
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
                            <li > Baby Passaporte </li>
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
                                                            <p>{this.state.listConfirmAdult.name.firstName + " " + this.state.listConfirmAdult.name.surName}</p></div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-12">
                                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                                            <h5 className="ltTitulo"><b> Data de Nascimento: </b></h5>
                                                            <p>{moment(this.state.listConfirmAdult.birthday).format('DD/MM/YYYY')} </p>
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
                                                        <div className="graph" style={{ padding: 10 + "px", paddingBottom: 45 + "px", paddingTop: -13 + "px" }}>
                                                            <h5 className="ltTitulo text-center"><b> Parentesco: </b></h5>
                                                            <select id="kinship" name="kinship" className="form-control optionFomulario" onChange={(event) => this.Changekinship(event, Criançasqueentrarao._id, indice)} >
                                                                <option value="others" > Outros </option>
                                                                <option value="children" > Filho(a) </option>
                                                                <option value="Stepson" > Enteado(a) </option>
                                                                <option value="grandchildren"  >Neto(a) </option>
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
                                                            <textarea className="form-control" rows="4" cols="50" id="Observacoes" name="observacoes" value={Criançasqueentrarao.observations} onChange={(event) => this.ChangeObsCrianca(event, Criançasqueentrarao._id, indice)}></textarea>
                                                        </div>
                                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                                            <h3 className="inner-tittle" > Restrições </h3>
                                                            <br></br>
                                                            <textarea className="form-control" rows="4" cols="50" id="restrictions" name="restrictions" value={Criançasqueentrarao.restrictions} onChange={(event) => this.ChangeRest(event, Criançasqueentrarao._id, indice)}></textarea>
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
                                                            <button className="btn btn-md botao" onClick={(event) => { this.capture(event, Criançasqueentrarao._id, indice) }}>Tirar Foto</button>
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
                        <Link className="btn btn-md botao" to="/">Cancelar</Link>
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
                            <li > Baby Passaporte </li>
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
                                                <img src={this.state.listConfirmAdult.photo} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-12 text-center">
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Nome: </b></h5>
                                                <p>{this.state.listConfirmAdult.name.firstName + " " + this.state.listConfirmAdult.name.surName}</p>
                                            </div>
                                            <br></br>
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Telefone: </b></h5>
                                                <p> {this.state.phone}</p>
                                            </div>
                                            <br></br>
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Idade: </b></h5>
                                                <p>{moment(this.state.listConfirmAdult.birthday, "YYYYMMDD").toNow(true)}</p>

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
                                                        <p>{this.state.obs}</p>
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
                                    return (
                                        <div className="graph" >
                                            <h3 className="inner-tittle " style={{ marginTop: -10 + "px", marginLeft: 45 + "%" }} > Criança {indice + 1}</h3>
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
                                                        <img src={Criançasqueentrarao.photo} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5 col-sm-12 text-center">
                                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                                        <h5 className="ltTitulo"><b> Parentesco: </b></h5>
                                                        <p>{this.state.kinship[indice]}</p>
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
                    {this.state.comprovante && (<Comprovant
                        tabela={this.state.dadosComprovante}
                        serviso="BABY PASSAPORTE"
                        teste={this.state.comprovante}
                    />)}


                    <div className="text-center">

                        <Link to="/" className="btn btn-md botao">Cancelar  </Link>
                        <button className="btn btn-md botao" onClick={this.VoltarTelaIV}>Voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.Comprovante}> Finalizar </button>
                    </div>
                </div>
            )
        }
    }
}

export default Passport;