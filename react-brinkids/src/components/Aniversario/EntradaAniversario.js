import React from 'react';
import update from 'react-addons-update';
import Webcam from 'react-webcam';
import axios from 'axios';
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
            aniversariante:[], // dados do evento atual
            page: "SelecionarTipoDeEntrada", //Responsável pela tela que esta.
            adultoSelecionado:[], // ADULTOS que foi selecionadaos para da entrada.
            criancaSelecionada:[], // CRIANÇA que foi selecionadaos para da entrada.
            listaCriancaDentro:[], // lista de crianças que deram entrada.
            listaAdultosDentro:[], // lista de adultos que deram entrada.
            list:[],
            //Lista Adultos
            name:"",
            type:"",
           }

        //Relacionado a atualização dos valores Caminho
        this.AdicinarFullNome = this.AdicinarFullNome.bind(this); //apontador 
    }

    //Relacionado a atualização dos valores Funções
    AdicinarFullNome(event) {
        this.setState({ firstName: event.target.value });
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

            //Requisição dados do evento atual  
            {/*$.ajax({
                url:
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
                        this.setState({ aniversariante: response });
                    }
                }.bind(this)
            });*/}

        }   
        
        AvancarConfAdulto = (event) =>{
            this.setState({
                page:"ConfirmaAdulto",
            })
        }

        FinalizarAdulto = (event) =>{
            this.setState({
                listaAdultosDentro: update(this.state.listaAdultosDentro, {$push: [{type:"adult", name: this.state.adultoSelecionado[0].name}]}),
                type: "",
                name: "",
                page:"SelecionarTipoDeEntrada",
            })


        } 
        
        AvancarCombinarCrianca = (event) =>{
            this.setState({
                page:"CombinarCrianca"
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
        this.state.aniversariante[0].guestList.forEach((adultos, indice, array) => {
            if (adultos._id === identifier) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.aniversariante[0].guestList.forEach((adultos) => {
                if (adultos._id === identifier) {
                    this.state.adultoSelecionado.push(adultos);
                }
            });
        }

        this.setState({ adultoSelecionado: this.state.adultoSelecionado });
        console.log(this.state.adultoSelecionado)
    } 
    // Salva AS informações das CRIANÇAS que apareceram na lista e foi selecionado.
    selectedKids(identifier) {
        let achou = false;
        //Desmarca A checkBox
        this.state.aniversariante[0].guestList.forEach((kids, indice, array) => {
            if (kids._id === identifier) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.aniversariante[0].guestList.forEach((kids) => {
                if (kids._id === identifier) {
                    this.state.criancaSelecionada.push(kids);
                }
            });
        }

        this.setState({ criancaSelecionada: this.state.criancaSelecionada });
        console.log(this.state.criancaSelecionada)
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
                                        <p>{/*this.state.aniversariante[0].birthdayPerson.name*/}</p>
                                    </div>
                                    <br></br>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-6 text-center">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Início: </b></h5>
                                        <p>{/*this.state.aniversariante[0].start*/}</p>
                                    </div>
                                    <br></br>
                                </div>
                                <div className="col-md-6 col-sm-6 text-center">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Fim: </b></h5>
                                        <p>{/*this.state.aniversariante[0].end*/}</p>
                                    </div>
                                    <br></br>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8 col-sm-4">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Quantidade de Crianças: </b></h5>
                                        <p>{/*this.state.aniversariante[0].amount.children */}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Já Entraram: </b></h5>
                                        <p>{/*this.sates.criancaDentro*/}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8 col-sm-4">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Quantidade de Adultos: </b></h5>
                                        <p>{/*this.state.aniversariante[0].amount.adults*/}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Já Entraram: </b></h5>
                                        <p>{/*this.state.listaAdultosDentro*/}</p>
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

        //TELA IIA - Se for Adulto:      
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
                                <h3 className="inner-tittle "> Entrada Adulto</h3>
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
                                    <tbody>
                                        {this.state.aniversariante[0].guestList.map((Adultlist, indice) => {
                                            if (Adultlist.type === "adul") {
                                                return (
                                                    <tr key={Adultlist._id}>
                                                        <th scope="row">{indice + 1}</th>
                                                        <td > {Adultlist.name} </td>
                                                        <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selectedAdult(Adultlist._id)} /> </td>
                                                    </tr>
                                                );
                                            }
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
                        <a className="btn btn-md botao" href="/">Cancelar</a>
                        <button className="btn btn-md botao" onClick={this.AvancarConfAdulto}> Avançar </button>                        
                        </div>
                    </div>
                </div>
            )
        }

        //TELA IIIA - Confimação entrada Adultos
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
                                <div className="col-md-12 col-sm-12 text-center">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Nome: </b></h5>
                                        <p>{this.state.adultoSelecionado[0].name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 text-center">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Nome Completo: </b></h5>
                                        <input type="text" id="FullName" name="FullName" className="form-control" className="text-center" placeholder="Seu Nome " value={this.state.adultoSelecionado[0].name} onChange={this.AdicinarFullNome} />
                                    </div>
                                </div>
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

        //TELA IIC - Se for Crianças:
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
                                    <tbody>
                                        {this.state.aniversariante[0].guestList.map((childlist, indice) => {
                                            if (childlist.type === "child") {
                                                return (
                                                    <tr key={childlist._id}>
                                                        <th scope="row">{indice + 1}</th>
                                                        <td > {childlist.name} </td>
                                                        <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selectedKids(childlist._id)} /> </td>
                                                    </tr>
                                                );
                                            }
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
                            <a className="btn btn-md botao" href="/">Cancelar</a>
                            <button className="btn btn-md botao" onClick={this.AvancarCombinarCrianca}> Avançar </button>                        
                        </div>
                    </div>
                </div>
            )
        }   

        //TELA IIIC - Combinar a entrada da criança da lista com uma que tem no sistema 
        if(this.state.page === "CombinarCrianca") {
            
        }        
    }
}

export default EntradaAniversario;
