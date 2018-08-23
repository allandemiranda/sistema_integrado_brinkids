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
            page: "SelectAdult",//ConfirmAdult
            selectedSearch:'', // Salva o nome que é colocado na barra de busca
            list:[], //recebe do banco os dados da pessoa que foi buscada

            //Tela I:
            listConfirmAdult: [], // Dados do Responsável Selecionado na checkBox
            erro:'',
           //achado: false,    
            confirmAdult:'',
            //Tela II:
            listConfirmKids: [], // Dados das crianças Selecionadas na checkBox

        }

        //Relacionado a busca
        this.ChangeSearch = this.ChangeSearch.bind(this);
        this.SearchAdult = this.SearchAdult.bind(this);
        this.SearchChild = this.SearchChild.bind(this);

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
                page: "ConfirmAdult"
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
                page: "ConfirmKids"
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
            //let Nome = this.state.listConfirmAdult[0].name.firstName + " " + this.state.listConfirmAdult[0].name.surName;
            console.log(`Console.log: ${typeof(this.state.listConfirmAdult)}`);
            console.log(this.state.listComfirm)
{/*
            return (
                <div className="container-fluid">
                    <ConfirmaAdulto
                    Name= {this.state.listConfirmAdult[0].name.firstName + " " + this.state.listConfirmAdult[0].name.surName}
                    Cpf = {this.state.listConfirmAdult[0].cpf}
                    Rg = {this.state.listConfirmAdult[0].rg}                
                    Date = {this.state.listConfirmAdult[0].birthday}
                    Sexo = {this.state.listConfirmAdult[0].sexuality}
                    Nacionalidade = {this.state.listConfirmAdult[0].nacionality}                
                    PhoneNumber = {this.state.listConfirmAdult[0].phone}
                    MaritalStatus ={this.state.listConfirmAdult[0].maritalStatus}
                    Email = {this.state.listConfirmAdult[0].email}
                    Address = {this.state.listConfirmAdult[0].address[0].street}
                    Neighborhood = {this.state.listConfirmAdult[0].address[0].district}
                    City = {this.state.listConfirmAdult[0].address[0].city}
                    Cep = {this.state.listConfirmAdult[0].address[0].cep}
                    Observation = {this.state.listConfirmAdult[0].observations}
                    File = {this.state.listConfirmAdult[0].photo}
                    Number = {this.state.listConfirmAdult[0].address[0].number}
                    Country = {this.state.listConfirmAdult[0].address[0].country}
                    State = {this.state.listConfirmAdult[0].address[0].state}
                    />                   
                    <div className="text-center">
                        <a className="btn btn-md botao" href="/">Cancelar</a>
                        <button className="btn btn-md botao" onClick = {this.VoltarTelaI}>Voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.TelaIII}> Avançar </button>
                    </div>
                </div>                
            )
*/}
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Cadastro </li>
                            <li > Adulto </li>
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
                                        <p>{this.state.listConfirmAdult[0].phone}</p>
                                    </div>
                                </div>
                                {/* 
                                 <div className = "col-md-6 col-sm-6 col-xs-12" >
                                    <label className = "LetraFormulario" > Telefone: </label>
                                   <input type = "text" id = "phoneNumber" name = "phoneNumber" className = "form-control"  placeholder = "(00) 99999-9999"value = {this.state.listConfirmAdult[0].phone} onChange={this.ChangePhone} />
                                </div>                            
                                */}
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
                            {/*                           
                                <div className="col-md-6 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Observações: </b></h5>
                                        <p>{this.state.listConfirmAdult[0].observations}</p>
                                    </div>
                                </div>
                            */}
 
                                <div className = "graph" >
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <h3 className = "inner-tittle" > Observações </h3>
                                            <br></br>
                                            <textarea className = "form-control" rows = "4" cols = "50" id="Observacoes" name="Observacoes" value={this.state.listConfirmAdult[0].observations} onChange={this.ChangeObs}></textarea>
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
                                            <th >Telefone</th>
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

        //TELA IV
        else if (this.state.page === "ConfirmKids") {
            return (
                <div className="text-center">
                    <a className="btn btn-md botao" href="/">Cancelar</a>
                    <button className="btn btn-md botao" onClick = {this.VoltarTelaIII}>Voltar</button>                        
                    <button className="btn btn-md botao botaoAvançar" onClick={this.TelaV}> Avançar </button>
                </div>
            )
        }

        //TELA V
        else if (this.state.page === "Finalize") {
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
