import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import ConfirmaAdulto from '../Adultos/ConfirmaAdulto.js';
import TypesInput from '../TypesInput.js';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import moment from 'moment'

import $ from "jquery";


class Passport extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            //Responsável por saber qual página vai renderizar:
            page: "SelectAdult",//ConfirmAdult
            selectedSearch:'', // Salva o nome que é colocado na barra de busca
            list:[], //recebe do banco os dados da pessoa que foi buscada
            listConect:[], // recebe os dados das crianças ligadas aos adultos [Passaporte]
            //Tela I:
            listConfirmAdult: [], // Dados do Responsável Selecionado na checkBox
            erro:'',
           //achado: false,    
            confirmAdult:'',            
            //Tela III:        
            kidTthatCame:[],
            listConfirmKids: [], // Dados das crianças Selecionadas na checkBox
            //TEla IV:
            obs:'',
            rest:'',
            phone:'',
            file: '',
            currentdate:[],
            preenchido: false, // Variável que vai dizer se foi selecionado alguma coisa
            horaEntradaCriança:'', // Váriável que recebe a hora que a crianaça da entrada na loja. Aparece na telaIV
        }

        //Relacionado a busca
        this.ChangeSearch = this.ChangeSearch.bind(this);
        this.SearchAdult = this.SearchAdult.bind(this);
        this.SearchChild = this.SearchChild.bind(this);
        

        //Relacionado a atualização dos valores Caminho
        this.ChangeObs = this.ChangeObs.bind(this); //apontador 
        this.ChangeRest = this.ChangeRest.bind(this);
        this.ChangePhone= this.ChangePhone.bind(this);
        

    }
    //Relacionado a atualização dos valores Funções
       ChangeObs(event) {
            this.setState({ obs: event.target.value });
        }
        ChangeRest(event) {
            this.setState({ rest: event.target.value });
        } 
        ChangePhone (event){
            this.setState({ phone: event.target.value });   
        }
        Changekinship(event){
            this.setState({ kinshipConfirm: event.target.value }); 
        }

    // FUNCOES RELACIONADAS A BUSCA Do RESPOSÁVEL - Inicio 
        //Bloco que muda o status para o atual do formulario.
        ChangeSearch(event) {
            this.setState({ selectedSearch: event.target.value });
        }

        // Faz a busca do responsável:
        SearchAdult(event) {
            $.ajax({
                url: "https://ab64b737-4df4-4a30-88df-793c88b5a8d7.mock.pstmn.io/passaporte", //url: "http://localhost:3001/adult/filter/" + this.state.selectedSearch + "/name",
                dataType: 'json',
                type: 'GET',
                error: function (response) {
                    if (response.length === 0) { this.setState({ erro: "* Erro no servidor" }) }
                },
                success: function (response) {    //Salva os dados do responsável na variácel LIST
                    console.log(response.length)
                    if (response.length === 0) {
                        alert("Erro esc")
                        this.setState({ erro: "* Nenhum Responásel Encontrado." })
                    } else {
                        console.log("Olar")
                        this.setState({ list: response });
                    }
                }.bind(this)
            });
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
        SearchChild(event) {
            $.ajax({
                url: "https://ab64b737-4df4-4a30-88df-793c88b5a8d7.mock.pstmn.io/passaporte",//url: "http://localhost:3001/child/filter/" + this.state.selectedSearch,
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

            this.setState({ listConfirmKids: this.state.listConfirmKids});
            console.log(this.state.listConfirmKids)
        }
    // FUNCOES RELACIONADAS A BUSCA DAS CRIANÇAS - Fim
   

    // FUNÇOES DO BOTÃO AVANÇAR - INICIO 
        // Encaminha para a tela II
        TelaII = (event) => {
            if(this.preenchido == true){
                this.setState({
                    page: "ConfirmAdult",
                    obs: this.state.listConfirmAdult[0].observations,
                    phone: this.state.listConfirmAdult[0].phone,
                })
            }
            else{
                alert(" Selecione um Responsável "),
                this.setState({
                    page: "SelectAdult",
                    selectedSearch:'',
                    preenchido: false,
                })
            }
        }

        // Encaminha para a tela III
        TelaIII = (event) => {
            this.setState({
                page: "SelectKids",
                selectedSearch: '',
            })
            // Função responsável por pegar o identificador que está relacionado ao adulto e fazer uma requisição dos dados das crianças 
            $.ajax({
                url: "http://localhost:3001/adult/filter/" + this.state.listConfirmAdult[0].children.identifier + "/name",// url: "https://ab64b737-4df4-4a30-88df-793c88b5a8d7.mock.pstmn.io/passaporte",
                dataType: 'json',
                type: 'GET',
                error: function (response) {
                    if (response.length === 0) { this.setState({ erro: "* Erro no servidor" }) }
                },
                success: function (response) {    //Salva os dados do responsável na variácel LIST
                    console.log("Olar2")
                    this.setState({ listConect: response });
                }.bind(this)
            });
        }

        // Encaminha para a tela IV
        TelaIV = (event) => {
            this.setState({
                page: "ConfirmKids",
                obs: this.state.listConfirmKids[0].observations,
                rest: this.state.listConfirmKids[0].restrictions,
            })
        }

        // Encaminha para a tela V
        TelaV = (event) => {
            this.setState({
                page: "Finalize"
            })
        }

        // Encaminha para a tela VI
        Comprovante = (event) => {
            alert("Encaminhar para o comprovante");
        }
    // FUNÇOES DO BOTÃO AVANÇAR - FIM   

    // FUNÇOES DO BOTÃO VOLTART TELA - INICIO 
        // Voltar par Tela I
        VoltarTelaI = (event) => {
            this.setState({
                page: "SelectAdult"
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
                page: "SelectKids"
            })
        }

        // Voltar par Tela IV
        VoltarTelaII = (event) => {
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
        capture = (event) => {
            event.preventDefault();
            var imagem = document.querySelector("#imagem");
            const imageSrc = this.webcam.getScreenshot();
            imagem.src = imageSrc;
            this.imageBase64 = imageSrc;
            this.setState({
                file: imageSrc
            })
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
                                        <div className="graph" style={{ padding: 10 + "px", paddingBottom: 45 + "px", paddingTop: -13 + "px" }}>
                                            <h5 className="ltTitulo"><b> Telefone: </b></h5>
                                            <input type="text" id="phoneNumber" name="phoneNumber" className="form-control"className="text-center" placeholder="(00) 99999-9999" value={this.state.phone} onChange={this.ChangePhone} />
                                        </div>
                                        <br></br>
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Idade: </b></h5>
                                            <p>{moment(this.state.listConfirmAdult[0].birthday, "YYYYMMDD").fromNow()}</p>
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
                        {/*<button className="btn btn-md botao" onClick={this.VoltarTelaI}>Voltar</button>*/}
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
                                        {this.state.listConfirmAdult[0].children.map((findKids,indice) => {
                                            return (
                                                <tr key={findKids._id}>
                                                    <th scope="row">{indice+1}</th>
                                                    <td > {findKids.identifier} </td>
                                                    <td >{findKids.phone} </td>
                                                    <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selectedKids(findKids._id)} /> </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    
                                    <tbody>
                                        {this.state.list.map((findKids,indice) => {
                                            return (
                                                <tr key={findKids._id}>
                                                    <th scope="row">{indice+1}</th>
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
                        {/*<button className="btn btn-md botao" onClick={this.VoltarTelaII}>Voltar</button>*/}
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
                                                            <p>{moment(Criançasqueentrarao.birthday, "YYYYMMDD").fromNow()}</p>
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
                                                <div className="Row">
                                                    <div className="col-md-6 col-sm-12">//
                                                        <div className="col-md-6 col-sm-12">
                                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                                <h5><b> Entrada: </b></h5>
                                                                <p>{this.horaEntradaCriança = moment().format('LTS')}</p>
                                                            </div>
                                                        </div>
                                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                                            {/*<select id="kinship" name="kinship" className="form-control optionFomulario" value={this.state.kinship} onChange={(event) => this.Changekinship(event, findChild._id)} >
                                                                <option value="others" > Outros </option>
                                                                <option value="children" > filho(a) </option>
                                                                <option value="Stepson" > Enteado(a) </option>
                                                                <option value="grandchildren"  > Neto(a) </option>
                                                                <option value="nephews"  > Sobrinho(a) </option>
                                                                <option value="Brother" > Irmão/Irmã </option>
                                                            </select >*/}
                                                        </div>
                                                    </div>
                                                </div>
                                                <br></br>
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


                                                <br></br>

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
                                                            <button className="btn btn-md botao" onClick={this.capture}>Take a Photo</button>
                                                            <br></br>
                                                        </div>
                                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                                            <img id="imagem" className="webcan" src={this.state.file} />
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
                        {/*<button className="btn btn-md botao" onClick={this.VoltarTelaIII}>Voltar</button>*/}
                        <button className="btn btn-md botao botaoAvançar" onClick={this.TelaV}> Avançar </button>
                    </div>
                </div>                
            )                
        }

        //TELA V - Checagem dos dados finais na entrada do passaporte
        else if (this.state.page === "Finalize") {
            {/*
            Confirmação dos dados cadastrados. Deve conter o perfil do responsável e de todas as crianças associadas a este responsável que irão usar o serviço Passaporte.
            Deve conter nesta tela:
                Alertas iniciais.
                Perfil:
                    Quando Reponsável: Foto (do perfil),Nome, Idade, Telefone, Observações
                    Quando Criança: Foto (do perfil), Nome, Idade, Parentesco, Sexo, Restrições, Observações.
                Existiram dois botões:
                Cancelar:
                    Cancelar tudo e volta para /home
                Finalizar:
                    Ao confirmar os dados a tela principal irá ser encaminhada para /home e abrirá uma nova janela para imprimir o comprovante de entrada.
    
            Comprovante para entrada do passaporte
            Comprovante com a descrição da entrada. O modelo já existe e está disponível no drive do projeto. Esta tela será impressa pelo impressora de cupom, portanto deve está dentro dos padrões para isso. Se possível conter função para exibir a tela de impressão sem a  necessidade de clicar em imprimir.
    
            Interação da entrada do passaporte com o status da criança no sistema
            Deve responder a todas a solicitações de busca de usuário adult e children, assim como o retorno de dados específicos do usuário selecionado para a interação no front. ao finalizar todas as interações, os dados devem ser criados no documento “dashboards” para manutenção do status do serviço.
    
            Extra:
            ATENÇÃO! O desenvolvedor Back deve está junto ao desenvolvedor front, pois este requisito apresenta uma dificuldade maior que as enfrentadas nas telas desenvolvidas anteriormente.
            */}
            return (
                <div className="text-center">
                    <a className="btn btn-md botao" href="/">Cancelar</a>
                    {/*<button className="btn btn-md botao" onClick = {this.VoltarTelaIV}>Voltar</button> */}                       
                    <button className="btn btn-md botao botaoAvançar" onClick={this.Comprovante}> Finalizar </button>
                </div>
            )
        }
    }
}

export default Passport;
