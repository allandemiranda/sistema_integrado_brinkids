import React from 'react';
import axios from 'axios';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import Comprovant from '../Comprovante/comprovante';
import '../Comprovante/comprovante.css';
import tabelinha from '../Comprovante/tabelinha';
import $ from "jquery";

class SaidaServicosExtra extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            list: [], // lista dos dados que retornam da pesquisa  
            listConfirm: [], // Dados do Serviço Selecionado na checkBox   
            quantidade:'',
            page: "TelaInicial",//"Detalhamento",//
            formaDePagamento:"",
            Total:0,
            FormaDePagamento:"",
        }        
        this.Search = this.Search.bind(this);
        this.ChangeQuantidade = this.ChangeQuantidade.bind(this);
    }
    // Faz a busca do Serviço:
    Search(event) {
        $.ajax({
            url: "http://localhost:3001/",//
            dataType: 'json',
            type: 'GET',
            error: function (response) {
                if (response.length === 0) { this.setState({ erro: "* Erro no servidor" }) }
            },
            success: function (response) {    //Salva os dados na variácel LIST
                console.log(response.length)
                if (response.length === 0) {
                    alert("Nenhum Serviço Encontrado")
                    this.setState({ erro: "* Nenhum Serviço Encontrado." })
                } else {
                    console.log("Olar")
                    this.setState({ list: response });
                }
            }.bind(this)
        });
    }

    // Salva AS informações dos serviços que apareceu na busca e foi selecionado.
    selected(identifier) {
        let achou = false;

        //Desmarca A checkBox
        this.state.listConfirm.forEach((produto, indice, array) => {
            if (produto._id === identifier) {
                delete array[indice];
                achou = true;
                this.state.Total = this.state.Total - (produto.value * this.state.quantidade)
            }
        });

        if (!(achou)) {
            this.state.listConfirm.forEach((produto) => {
                if (produto._id === identifier) {
                    this.state.listConfirm.push(produto);
                    this.state.Total = this.state.Total + (produto.value * this.quantidade)
                }
            });
        }

        this.setState({ listConfirm: this.state.listConfirm });
        console.log(this.state.listConfirm)
        this.preenchido = true;
    }

    ChangeQuantidade(event) {
        this.setState({ quantidade: event.target.value });
    }

    TelaII =(event)=>{
        this.setState({ page: "Detalhamento"});
    }

    Finalizar =(event)=>{
        console.log(this.state.Total);

        var formData = new FormData();

        formData.append('extraServices', JSON.stringify(this.state.listConfirm.map((servico) => {
            return {id: servico._id, name: servico.name, type: servico.type, unity: servico.unity,value: servico.value}
        })))

        console.log(this.state.confirmaCrianca.map((servico) => {
            return {id: servico._id, name: servico.name, type: servico.type, unity: servico.unity,value: servico.value}
        }))

        axios.post('/extraServices', formData)
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
    }


    render() {
        
        if (this.state.page === "TelaInicial"){
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home  </a></li >
                            <li > Serviços Extras </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <div>
                                <h3 className="inner-tittle " >Saída</h3>
                            </div>
                            <div className=" text-center">
                                <input type="search" id="selectAdult" name="selectAdult" className="form-control text-center" value={this.state.selectedSearch} onChange={this.ChangeSearch} placeholder="Pesquisar" />
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
                                        <th >Tipo</th>
                                        <th> Unidade</th>
                                        <th> Valor/Unidade </th>
                                        <th> Quantidade </th>
                                        <th> Total </th>
                                        <th className="text-center"> Selecionar </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.list.map((findproduct, indice) => {
                                        return (
                                            <tr key={findproduct._id}>
                                                <th scope="row">{indice + 1}</th>
                                                <td > {findproduct.name} </td>
                                                <td >{findproduct.type} </td>
                                                <td>{findproduct.unity}</td> 
                                                <td> {findproduct.value}</td>
                                                <input id="ticketNum" type="number" name="ticketNum" value={this.quantidade} onChange={this.ChangeQuantidade} ></input>
                                                <td>{findproduct.value * this.quantidade}</td>
                                                <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selected(findproduct._id)} /> </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="text-center">
                        <a className="btn btn-md botao" href="/">Cancelar</a>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.TelaII}> Finalizar </button>
                    </div>
                </div>
    
            )
        }

        else if( this.state.page === "Detalhamento"){
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home  </a></li >
                            <li > Serviços Extras </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <div className="row">
                                <div>
                                    <h3 className="inner-tittle " >Detalhamento</h3>
                                </div>
                                <br></br>
                                <br></br>
                                <div className="graph" >
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th >Nome</th>
                                                <th >Tipo</th>
                                                <th> Unidade</th>
                                                <th> Valor/Unidade </th>
                                                <th> Quantidade </th>
                                                <th> Total </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.list.map((findproduct, indice) => {
                                                return (
                                                    <tr key={findproduct._id}>
                                                        <th scope="row">{indice + 1}</th>
                                                        <td > {findproduct.name} </td>
                                                        <td >{findproduct.type} </td>
                                                        <td>{findproduct.unity}</td>
                                                        <td> {findproduct.value}</td>
                                                        <td> {this.state.quantidade} </td>
                                                        <td>{findproduct.value * this.quantidade}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br></br>

                            <div className="form-group" >
                                <div className="row">
                                    <div className="col-md-7 col-sm-8 col-xs-8" >
                                        <h3 className="inner-tittle " >Valor Final: R$ {this.state.Total}</h3> 
                                    </div>
                                    <div className="col-md-5 col-sm-4 col-xs-4" >
                                        <label className="LetraFormulario" > Forma De Pagamento: </label>                                        
                                        <select id="FormaDePagamento" name="FormaDePagamento" className="form-control optionFomulario" value={this.state.FormaDePagamento}  >
                                            <option value="Dinheiro" > Dinheiro </option>
                                            <option value="Cartão" >  Cartão </option>                                            
                                        </select >
                                    </div>
                                </div>
                            </div > 
                        </div>
                    </div>
                    <div className="text-center">
                        <a className="btn btn-md botao" href="/">Cancelar</a>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.Finalizar}> Finalizar </button>
                    </div>
                </div>

            )
        }
    }
} export default SaidaServicosExtra;