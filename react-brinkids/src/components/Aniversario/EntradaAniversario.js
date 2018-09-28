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


class EntradaAniversario extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //Responsável por saber qual página vai renderizar:
            page: "SelecionarTipoDeEntrada", //Responsável pela tela que esta.
            listaAdulta:[], // Onde está a lista de ADULTOS que virão para a festa
            listaCrianca:[], // Onde está a lista de CRIANÇAS que virão para a festa
            adultosDentro:[], // lista de ADULTOS que ja deram entrada
            criancasDentro:[], // lista de CRIANÇAS que ja deram entrada
            adultoSelecionado:"", // ADULTOS que foi selecionadaos para da entrada
            criancaSadultoSelecionado:"", // CRIANÇA que foi selecionadaos para da entrada
            list:[],
           }

        //Relacionado a atualização dos valores Caminho
        this.AdicinarFullNome = this.AdicinarFullNome.bind(this); //apontador 
    }

    //Relacionado a atualização dos valores Funções
    AdicinarFullNome(event) {
        this.setState({ obs: event.target.value });
    }    


    // FUNÇOES RELACIONADAS A BOTÕES - INICIO     
        SelecionarCrianca = (event) => {
            this.setState({
                page: "EntradaCrianca",
            })
        }

        SelecionarAdulto = (event) => {
            this.setState({
               page: "EntradaAdulto",                
            })            
        }   
        
        AvancarConfAdulto = (event) =>{
            this.setState({
                page:"ConfirmaAdulto",
            })
        }

        FinalizarAdulto = (event) =>{
            this.setState({
                page:"ConfirmaAdulto",
            })
        }        
    // FUNÇOES RELACIONADAS A BOTÕES - FIM
    

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

    // Salva AS informações dos ADULTOS que apareceram na lista e foi selecionado.
    selectedAdulto(identifier) {
        let achou = false;
        //Desmarca A checkBox
        this.state.listaAdulta.forEach((adultos, indice, array) => {
            if (adultos._id === identifier) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.list.forEach((adultos) => {
                if (adultos._id === identifier) {
                    this.state.listaAdulta.push(adultos);
                }
            });
        }

        this.setState({ listaAdulta: this.state.listaAdulta });
        console.log(this.state.listaAdulta)
    } 
    selectedKids(identifier) {
        let achou = false;
        //Desmarca A checkBox
        this.state.listaCrianca.forEach((kids, indice, array) => {
            if (kids._id === identifier) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.list.forEach((kids) => {
                if (kids._id === identifier) {
                    this.state.listaCrianca.push(kids);
                }
            });
        }

        this.setState({ listaCrianca: this.state.listaCrianca });
        console.log(this.state.listaCrianca)
    }  

    render() {
        // //TELA I - Seleção adulto ou criança 
        if (this.state.page === "SelecionarTipoDeEntrada") {
            {/* Imprime a tabela com a busca dos Adultos*/ }
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Entrada Aniversásrio </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <div className="row">
                                <div>
                                    <h3 className="inner-tittle " >Aniversário</h3>
                                </div>
                                <div className="col-md-12 col-sm-12 ">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Aniversariante: </b></h5>
                                        <p>{/*this.state.listConfirmAdult[0].name.firstName + " " + this.state.listConfirmAdult[0].name.surName*/}</p>
                                    </div>
                                    <br></br>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-6 text-center">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Início: </b></h5>
                                        <p>{/*this.state.listConfirmAdult[0].name.firstName + " " + this.state.listConfirmAdult[0].name.surName*/}</p>
                                    </div>
                                    <br></br>
                                </div>
                                <div className="col-md-6 col-sm-6 text-center">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Fim: </b></h5>
                                        <p>{/*this.state.listConfirmAdult[0].name.firstName + " " + this.state.listConfirmAdult[0].name.surName*/}</p>
                                    </div>
                                    <br></br>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8 col-sm-4">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Quantidade de Crianças: </b></h5>
                                        <p>{/*this.state.listConfirmAdult[0].name.firstName + " " + this.state.listConfirmAdult[0].name.surName*/}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Já Entraram: </b></h5>
                                        <p>{/*this.state.listConfirmAdult[0].name.firstName + " " + this.state.listConfirmAdult[0].name.surName*/}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8 col-sm-4">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Quantidade de Adultos: </b></h5>
                                        <p>{/*this.state.listConfirmAdult[0].name.firstName + " " + this.state.listConfirmAdult[0].name.surName*/}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Já Entraram: </b></h5>
                                        <p>{/*this.state.listConfirmAdult[0].name.firstName + " " + this.state.listConfirmAdult[0].name.surName*/}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="graph" >
                        <div className="text-center">
                            <button className="btn btn-md botao" onClick={this.SelecionarCrianca}> Criança</button>
                            <button className="btn btn-md botao" onClick={this. SelecionarAdulto}> Adulto </button>
                        </div>
                    </div>
                </div>
            )
        }

        //TELA II - Se for Adulto:      
        if (this.state.page === "EntradaAdulto") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Entrada Aniversário </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <div>
                                <h3 className="inner-tittle " >Entrada Adulto</h3>
                            </div>
                            <div className="row">

                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="graph" >
                        <div className="text-center">
                            <button className="btn btn-md botao" onClick={this.FinalizarAdulto}> Cancelar </button>
                            <button className="btn btn-md botao" onClick={this.AvancarConfAdulto}> Avançar </button>                        
                        </div>
                    </div>
                </div>
            )
        }

        //TELA III - Confimação entrada Adultos
        if (this.state.page === "ConfirmaAdulto") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Entrada Aniversário </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <div>
                                <h3 className="inner-tittle " > Confirmar Entrada Adultos </h3>
                            </div>
                            <div className="row">
                                
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="graph" >
                        <div className="text-center">
                            <button className="btn btn-md botao" onClick={this.FinalizarAdulto}> Finalizar </button>
                        </div>
                    </div>
                </div>
            )
        }               

        //TELA IV - Se for Crianças:
        if(this.state.page === "EntradaCrianca"){
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Entrada Aniversário </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <div>
                                <h3 className="inner-tittle " >Entrada Crianças</h3>
                            </div>
                            <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th >Nome</th>                                            
                                            <th className="text-center"> Selecionar </th>
                                        </tr>
                                    </thead>
                                    <tbody> {/* LISTA de pessoas que estaram no Aniversário */}
                                        {this.state.listaAdulta.map((crianca, indice) => {
                                            return (
                                                <tr key={crianca._id}>
                                                    <th scope="row">{indice + 1}</th>
                                                    <td > {crianca.name.firstName + " " + crianca.name.surName} </td>                                                    
                                                    <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selectedKids(crianca._id)} /> </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="graph" >
                        <div className="text-center">
                            <button className="btn btn-md botao" onClick={this.FinalizarAdulto}> Cancelar </button>
                            <button className="btn btn-md botao" onClick={this.AvancarConfAdulto}> Avançar </button>                        
                        </div>
                    </div>
                </div>
            )
        }   

        //TELA V - Confirmação entrada crianças
        if(this.state.page === "ConfirmaCrianca") {
            
        }        
    }
}

export default EntradaAniversario;
