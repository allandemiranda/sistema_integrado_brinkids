import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import ConfirmaAdulto from '../Adultos/ConfirmaAdulto.js';
import TypesInput from '../TypesInput.js';
import Pessoas from "./temgenteaq";

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';

import $ from "jquery";
import temgenteaq from './temgenteaq.js';


class Passport extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            //Responsável por saber qual página vai renderizar:
            page: "ConfirmKids",//ConfirmAdult
            selectedSearch:'', // Salva o nome que é colocado na barra de busca
            list:[], //recebe do banco os dados da pessoa que foi buscada

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
            file: "",
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

    HorarioAtual(event){
        let now = new Date;
        console.log(now.getDate() + " de " + now.getMonth()  + " de " + now.getFullYear()+ ' ' + now.getHours() +":"+ now.getMinutes() +":"+ now.getSeconds());

    }
    // FUNCOES RELACIONADAS A BUSCA Do RESPOSÁVEL - Inicio 
        //Bloco que muda o status para o atual do formulario.
        ChangeSearch(event) {
            this.setState({ selectedSearch: event.target.value });
        }

        // Faz a busca do responsável:
        SearchAdult(event) {
            $.ajax({
                url: "http://localhost:3001/adult/filter/" + this.state.selectedSearch + "/name",
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
                url: "http://localhost:3001/child/filter/" + this.state.selectedSearch,
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
            this.setState({
                page: "ConfirmAdult",
                obs: this.state.listConfirmAdult[0].observations,
                phone: this.state.listConfirmAdult[0].phone,
            })
        }

        // Encaminha para a tela III
        TelaIII = (event) => {
            this.setState({
                page: "SelectKids"
            })
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
    
    componentWillMount(){// Vê com gabriel o caminho 
        return(
            <tbody>
                {this.state.list.map((kidTthatCame,indice) => {
                    return (
                        <tr key={kidTthatCame._id}>
                            <th scope="row">{indice+1}</th>
                            <td > {kidTthatCame.name.firstName + " " + kidTthatCame.name.surName} </td>
                            <td >{kidTthatCame.birthday} </td>
                            <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selectedKids(kidTthatCame._id)} /> </td>
                        </tr>
                    );
                })}
            </tbody>                                        
        )
    }


    render() {  
        //TELA I - Busca do responsável
        if (this.state.page === "SelectAdult") {
            {/* Imprime a tabela com a busca dos Adultos*/ }
            return (                
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Passport </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                        <div>
                            <h3 className="inner-tittle " >Selecionar Responsável</h3>
                        </div>
                            <div className=" text-center">
                                <input type="search" id="selectAdult" name="selectAdult" className="form-control text-center" value={this.state.selectedSearch} onChange={this.ChangeSearch} placeholder="Pesquisar"/>
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
                                                <th scope="row">{indice+1}</th>
                                                <td > {findAdult.name.firstName + " "+ findAdult.name.surName} </td>
                                                <td >{findAdult.birthday} </td>
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
            console.log(`Console.log: ${typeof(this.state.listConfirmAdult)}`);
            console.log(this.state.listComfirm)
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Passport </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" > Confirmando Cadastro </h3>
                        <div className="graph" >
                            <h3 className="inner-tittle" > Perfil </h3>
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Nome: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].name.firstName + " " + this.state.listConfirmAdult[0].name.surName}</p>
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b>  CPF: </b> </h5>
                                        <p> {this.state.listConfirmAdult[0].cpf} </p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b>  RG: </b> </h5>
                                        <p> {this.state.listConfirmAdult[0].rg} </p>
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className="row" >
                                <div className="col-md-4 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Data de Nascimento: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].birthday}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Nacionalidade: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].nacionality}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Sexo: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].sexuality}</p>
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Telefone: </b></h5>
                                        <input type="text" id="phoneNumber" name="phoneNumber" className="form-control" placeholder="(00) 99999-9999" value={this.state.phone} onChange={this.ChangePhone} />
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Estado Civil: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].maritalStatus}</p>
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className='row'>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="graph ">
                                        <h5 className="ltTitulo"> <b> Email:</b> </h5>
                                        <p> {this.state.listConfirmAdult[0].email}</p>
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Endereço: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].address[0].street}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-10">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Bairro: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].address[0].district}</p>
                                    </div>
                                </div>
                                <div className="col-md-2 col-sm-2">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Número: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].address[0].number}</p>
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className="row">
                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> CEP: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].address[0].cep}</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Cidade: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].address[0].city}</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Estado: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].address[0].state}</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> País: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].address[0].country}</p>
                                    </div>
                                </div>
                            </div>

                            <br></br>
                            <div className="row">
                                <div className = "graph" >
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <h3 className = "inner-tittle" > Observações </h3>
                                            <br></br>
                                            <textarea className = "form-control" rows = "4" cols = "50" id="Observacoes" name="Observacoes" value={this.state.obs} onChange={this.ChangeObs}></textarea>
                                        </div>
                                    </div>
                                </div >                                                         
                                    
                                <div className="col-md-6 col-sm-12 text-center">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                        <img src={"http://localhost:3000/img-users/" +this.state.listConfirmAdult[0].photo} />
                                    </div>
                                </div>
                            </div>
                            <br></br>
                        </div >
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
                                <li > Passport </li>
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
                        <button className="btn btn-md botao" onClick={this.VoltarTelaII}>Voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.TelaIV}> Avançar </button>
                    </div>
                </div>
            )
        }

        //TELA IV - Confirmação das crianças na entrada do passaporte
        else if (this.state.page === "ConfirmKids") {
        {/*
            Foto (nova foto que será tirada juntas responsável e criança, e ficará armazenado no drive para sempre)
            ==Nome da criança
            Idade da criança
            ==Nome do responsável
            Idade do responsável
            Parentesco do responsável (deve ser uma lista semelhante ao cadastro de um novo usuário adulto)
                Caso o usuário já tenha gravado em seu cadastro como responsável da dita criança, retorne a lista com o parentesco salvo.
                Caso o responsável nessa opção deseje alterar o parentesco, esta mudança não deve ser registrada no perfil do usuário.
                Caso será uma criança dita qual não tem relação de parentesco salva no sistema, inicie a lista com a opção outros.
            Data e hora de entrada (data e hora do sistema)
            ==Restrições ( deve ser um input com valuer=””, pois devem aparecer novas restrições temporárias)
            ==Observações ( deve ser um input com valuer=””, pois devem aparecer novas observações temporárias)

                Os botões finais dependerá da lógica escolhida de exibição este requisito.

            OBS: Nenhum dos input’s devem atualizar o documento children (perfil da Criança), eles são temporários.                        
       /// */} 
        this.HorarioAtual();          
        return (                
            <div className="container-fluid" >
                   {/* <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Passaporte </li>

                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" > Confirmando Cadastro </h3>
                        <div className="graph" >
                            <h3 className="inner-tittle" > Perfil Criança </h3>

                            <div className="row">
                                <div className="col-md-8 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Nome: </b></h5>
                                        <p>{this.state.listConfirmKids[0].name.firstName + " " + this.state.listConfirmKids[0].name.surName}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Data de Nascimento: </b></h5>
                                        <p>{this.state.listConfirmKids[0].birthday}</p>
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className="row">
                                <div className="col-md-8 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Nome: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].name.firstName + " " + this.state.listConfirmAdult[0].name.surName}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Data de Nascimento: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].birthday}</p>
                                    </div>
                                </div>
                            </div> 

                            <div className="row"> // FALTA AJEITA OS CAMINHOS DA INFORMAÇÃO 
                                <div className="col-md-6 col-sm-12">
                                <div className="graph" style={{ padding: 10 + "px" }}>
                                <select id="kinship" name="kinship" className="form-control optionFomulario" value={this.state.kinship} onChange={(event) => this.Changekinship(event, findChild._id)} >
                                    <option value="others" > Outros </option>
                                    <option value="children" > filho(a) </option>
                                    <option value="Stepson" > Enteado(a) </option>
                                    <option value="grandchildren"  > Neto(a) </option>
                                    <option value="nephews"  > Sobrinho(a) </option>
                                    <option value="Brother" > Irmão/Irmã </option>
                                </select >
                                </div>
                            </div>
                                <div className="col-md-6 col-sm-12">
                                <div className="graph" style={{ padding: 10 + "px" }}>
                                                 // Data e hora de entrada
                                </div>
                                </div>

                            </div>

                            <br></br>
                            <div className="row">
                                <div className = "graph" >
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <h3 className = "inner-tittle" > Observações </h3>
                                            <br></br>
                                            <textarea className = "form-control" rows = "4" cols = "50" id="Observacoes" name="Observacoes" value={this.state.obs} onChange={this.ChangeObs}></textarea>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <h3 className = "inner-tittle" > Observações </h3>
                                            <br></br>
                                            <textarea className = "form-control" rows = "4" cols = "50" id="restrictions" name="restrictions" value={this.state.rest} onChange={this.ChangeRest}></textarea>
                                        </div>                                        
                                    </div>
                                </div >                                                         
                                    

                        // Foto criança + responsável
                                <div className = "graph" >
                                    <div className="row text-center">
                                        <h4 className = "inner-tittle"> Tirando uma foto </h4>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <Webcam
                                                className = "webcan"
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
                                            <img id="imagem" className="webcan" src={this.state.file}/>
                                        </div>
                                    </div>
                                </div >                        
                    </div>*/}
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
                    <button className="btn btn-md botao" onClick = {this.VoltarTelaIV}>Voltar</button>                        
                    <button className="btn btn-md botao botaoAvançar" onClick={this.Comprovante}> Finalizar </button>
                </div>
            )
        }
    }
}

export default Passport;
