import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
//import ConfirmaAdulto from './ConfirmaAdulto.js';
import TypesInput from '../TypesInput.js';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';

import $ from "jquery";


class Passport extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            //Responsável por saber qual página vai renderizar:
            page: "SelectAdult",

            //Tela I:
            selectAdult:'',
            list:[],
            erro:'',
            achado: false,    
            confirmAdult:'', // Dados do Responsável
        } 
        
        //Relacionado a busca
        this.ChangeSearch = this.ChangeSearch.bind(this);
        this.Search = this.Search.bind(this)

    }

    // FUNCOES RELACIONADAS A BUSCA Do RESPOSÁVEL - Inicio 
        //Bloco que muda o status para o atual do formulario.
        ChangeSearch(event) {
            this.setState({ selectAdult: event.target.value });
        }

        // Faz a busca do responsável:
        Search(event) {
            $.ajax({
                url: "http://localhost:3001/child/filter/" + this.state.selectAdult,
                dataType: 'json',
                type: 'GET',
                error: function (response) {
                    if (response.length === 0) { this.setState({ erro: "* Nenhum Responásel Encontrado." }) }
                },
                success: function (response) {    //Salva os dados do responsável na variácel LIST
                    console.log(response);
                    this.setState({ achado: true });
                    this.setState({ list: response });
                }.bind(this)
            });
        }
    // FUNCOES RELACIONADAS A BUSCADo RESPOSÁVEL- Fim
   
    // Salva AS informações do ADULTO que apareceu na busca e foi selecionado.
    selectedAdult(identifier) {
        let achou = false;

        //Desmarca A checkBox
        this.state.confirmAdult.forEach((adult, indice, array) => {
            if (adult._id === identifier) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.list.forEach((adult) => {
                if (adult._id === identifier) {
                    this.state.confirmAdult.push(adult);
                }
            });
        }

        this.setState({confirmAdult: this.state.confirmAdult});
    }

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

    render() {  
        //TELA I   
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
                                <input type="search" id="selectAdult" name="selectAdult" className="form-control text-center" value={this.state.selectAdult} onChange={this.ChangeSearch} placeholder="Pesquisar"/>
                                <button type="button" className="btn btn-md botao botaoAvançar" onClick={this.Search}> Pesquisar </button>
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
                                    {this.state.list.map((findAdult) => {
                                        let indexTable = 1;
                                        return (
                                            <tr key={findAdult._id}>
                                                <th scope="row">{indexTable}</th>
                                                <td > {findAdult.name.firstName} </td>
                                                <td >{findAdult. phoneNumber} </td>
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
        //TELA II
        else if (this.state.page === "ConfirmAdult") {
            return (
                
                <div className="text-center">
                <h3 className="inner-tittle" > Pesquisar Responsável</h3> 
                    <a className="btn btn-md botao" href="/">Cancelar</a>
                    <button className="btn btn-md botao botaoAvançar" onClick={this.TelaIII}> Avançar </button>
                </div>
            )
        }
        
        //TELA III
        else if (this.state.page === "SelectKids") {
            return (
                <div className="text-center">
                    <a className="btn btn-md botao" href="/">Cancelar</a>
                    <button className="btn btn-md botao botaoAvançar" onClick={this.TelaIV}> Avançar </button>
                </div>
            )
        }

        //TELA IV
        else if (this.state.page === "ConfirmKids") {
            return (
                <div className="text-center">
                    <a className="btn btn-md botao" href="/">Cancelar</a>
                    <button className="btn btn-md botao botaoAvançar" onClick={this.TelaV}> Avançar </button>
                </div>
            )
        }

        //TELA V
        else if (this.state.page === "Finalize") {
            return (
                <div className="text-center">
                    <a className="btn btn-md botao" href="/">Cancelar</a>
                    <button className="btn btn-md botao botaoAvançar" onClick={this.Comprovante}> Finalizar </button>
                </div>
            )
        }
    }
}

export default Passport;
