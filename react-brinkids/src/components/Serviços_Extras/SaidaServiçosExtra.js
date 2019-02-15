import React from 'react';
import axios from 'axios';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import Comprovant from '../Comprovante/comprovanteServicosextras';
import '../Comprovante/comprovante.css';
import tabelinha from '../Comprovante/tabelinha';
import $ from "jquery";
import { EventEmitter } from 'events';

import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
class SaidaServicosExtra extends React.Component {
    m
    constructor(props) {
        super(props)
        this.state = {
            carrinho: [],
            list: [], // lista dos dados que retornam da pesquisa  
            listConfirm: [], // Dados do Serviço Selecionado na checkBox   
            quantidade: [],
            page: "TelaInicial",//"Detalhamento",//
            Total: 0,
            FormaDePagamento: "Dinheiro",
            valorTotal: [],
            selectedSearch: "",
            dadosComprovante: [],
            objetocomprovante: [],
            comprovante: false,
            dadosComprovante: [],
            name: ""

        }
        this.Search = this.Search.bind(this);
        this.ChangeQuantidade = this.ChangeQuantidade.bind(this);
        this.FormaDePagamento = this.ChgangeFormadePagamento.bind(this);
        this.ChangeSearch = this.ChangeSearch.bind(this);
        this.excluir = this.excluir.bind(this);
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
                            alert("Acesso Negado. Você não possui permisão para estar nessa área!");
                        }
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));

    }
    componentWillMount() {
        this.Funcionario(21);
    }

    excluir(event) {
        const temporario = this.state.carrinho;
        temporario.splice(event, 1);
        this.setState({
            carrinho: temporario,
        })
    }
    // Faz a busca do Serviço:
    ChangeSearch(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    Search(event) {
        const a = getToken();
        const b = jwt.verify(a, config.secret_auth);
        axios.get(`/employees/${b.id}`)
            .then((response) => {
                let id = response.data[0].identifierEmployee.employeeData.officialPosition;
                console.log(response.data);
                this.setState({
                    FuncionarioLogado: response.data[0],
                    name: response.data[0].name.firstName + " " + response.data[0].name.surName,
                })
            })
            .catch((err) => console.log(err));


        axios.get(`/extraServices/search/${this.state.selectedSearch}`)
            .then((response) => {
                console.log(response.data)
                if (response.data.length === 0) {
                    alert("Nenhum Serviço Encontrado")
                    this.setState({ erro: "* Nenhum Serviço Encontrado." })
                } else {
                    console.log("Olar")
                    this.setState({ list: response.data });
                }
            })
            .catch((err) => console.log(err));
        // $.ajax({
        //     url: "/extraServices/search/" + this.state.selectedSearch,//
        //     dataType: 'json',
        //     type: 'GET',
        //     error: function (response) {
        //         if (response.length === 0) { this.setState({ erro: "* Erro no servidor" }) }
        //     },
        //     success: function (response) {    //Salva os dados na variácel LIST
        //         console.log(response.length)
        //         if (response.length === 0) {
        //             alert("Nenhum Serviço Encontrado")
        //             this.setState({ erro: "* Nenhum Serviço Encontrado." })
        //         } else {
        //             console.log("Olar")
        //             this.setState({ list: response });
        //         }
        //     }.bind(this)
        // });
    }

    // Salva AS informações dos serviços que apareceu na busca e foi selecionado.
    selected(identifier, indice) {
        let achou = false;

        //Desmarca A checkBox
        this.state.carrinho.forEach((produto, indice, array) => {
            //adiciona os produtos a lista
            if (produto.produto._id === identifier) {

                achou = true;
                //this.state.Total = this.state.Total - (produto.value * this.state.quantidade)
            }
        });
        // apaga o produto da lista
        if (!(achou)) {
            this.state.list.forEach((produto) => {
                if (produto._id === identifier) {
                    const temporario = {
                        produto, quan: this.state.quantidade[indice], Total: this.state.valorTotal[indice]
                    }
                    console.log(temporario);
                    this.state.carrinho.push(temporario);
                    //this.state.Total = this.state.Total + (produto.value * this.quantidade)
                }
            });
        }

        this.setState({ listConfirm: this.state.listConfirm });
        console.log(this.state.listConfirm)
        this.preenchido = true;
    }
    ChgangeFormadePagamento(event) {
        this.setState({ FormaDePagamento: event.target.value });
    }

    ChangeQuantidade(event) {
        let valorTemporario = this.state.valorTotal;
        let listatemporaria = this.state.quantidade;
        listatemporaria[event.target.name[2]] = event.target.value;
        valorTemporario[event.target.name[2]] = (this.state.list[event.target.name[2]].value * listatemporaria[event.target.name[2]])
        console.log(listatemporaria[event.target.name[2]]);

        this.setState({ quantidade: listatemporaria, valorTotal: valorTemporario });
        console.log(this.state.valorTotal);
    }

    TelaII = (event) => {
        this.setState({ page: "Detalhamento" });
        let valorTotalFinal = 0;

        this.state.carrinho.map((valor, indice) => {
            console.log(valor);
            valorTotalFinal = valorTotalFinal + valor.Total;
            console.log(valor.Total);
        })

        this.setState({
            Total: valorTotalFinal,
        })
    }

    Finalizar = (event) => {
        const dadosComprovante = {

            carrinho: this.state.carrinho,
            Total: this.state.Total,
            metodo: this.state.FormaDePagamento,
            name: this.state.name
            //ajeitar o comprovante
        }





        const data = {
            activity: "Serviços",
            action: 'Saida',
            dateOperation: new Date(),
            from: this.state.name, //ajsuta o id dps de fazer o login funcionar
            price: this.state.Total,
            priceMethod: this.state.FormaDePagamento

        }


        axios.post('/log', data)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    dadosComprovante: dadosComprovante
                })





            }).then((event) => {
                this.setState({
                    comprovante: true,
                });
                alert("Pagamento Concluido");
                setTimeout(() => {
                    this.setState({
                        carrinho: [],
                        list: [], // lista dos dados que retornam da pesquisa  
                        listConfirm: [], // Dados do Serviço Selecionado na checkBox   
                        quantidade: [],
                        page: "TelaInicial",//"Detalhamento",//
                        Total: 0,
                        FormaDePagamento: "Dinheiro",
                        valorTotal: [],
                        selectedSearch: "",
                        dadosComprovante: [],
                        objetocomprovante: [],
                        comprovante: false,
                        dadosComprovante: [],
                        name: ""
                    })
                }, 2000)
            })
            .catch((error) => {
                console.log(error)//LOG DE ERRO
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT

            })


        console.log(this.state.dadosComprovante);
    }


    render() {

        if (this.state.page === "carrinho") {
            return (
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
                            {this.state.carrinho.map((findproduct, indice) => {
                                return (
                                    <tr key={findproduct._id}>
                                        <th scope="row">{indice + 1}</th>
                                        <td > {findproduct.produto.name} </td>
                                        <td >{findproduct.produto.type} </td>
                                        <td>{findproduct.produto.unity}</td>
                                        <td> {findproduct.produto.value}</td>
                                        <input id="ticketNum" type="number" name={[0, indice]} value={findproduct.quan} onChange={this.ChangeQuantidade} ></input>
                                        <td>{findproduct.Total}</td>
                                        <td className="text-center">   <button onClick={() => this.excluir(indice)}><span className="glyphicon">&#xe014;</span></button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <button className="btn btn-md botao botaoAvançar" onClick={() => this.setState({ page: "TelaInicial" })}> Carrinho </button>
                </div>

            );
        }
        if (this.state.page === "TelaInicial") {
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
                                <input type="search" id="selectAdult" name="selectedSearch" className="form-control text-center" value={this.state.selectedSearch} onChange={this.ChangeSearch} placeholder="Pesquisar" />
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
                                                <input id="ticketNum" type="number" name={[0, indice]} value={this.state.quantidade[indice]} onChange={this.ChangeQuantidade} ></input>
                                                <td>{this.state.valorTotal[indice]}</td>
                                                <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selected(findproduct._id, indice)} /> </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link className="btn btn-md botao" to="/">Cancelar</Link>
                        <button className="btn btn-md botao botaoAvançar" onClick={() => this.setState({ page: "carrinho" })}> Carrinho </button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.TelaII}> Finalizar </button>
                    </div>
                </div>

            )
        }

        else if (this.state.page === "Detalhamento") {
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
                                            {this.state.carrinho.map((findproduct, indice) => {
                                                return (
                                                    <tr key={findproduct._id}>
                                                        <th scope="row">{indice + 1}</th>
                                                        <td > {findproduct.produto.name} </td>
                                                        <td >{findproduct.produto.type} </td>
                                                        <td>{findproduct.produto.unity}</td>
                                                        <td> {findproduct.produto.value}</td>
                                                        <td> {findproduct.quan} </td>
                                                        <td>{findproduct.Total}</td>
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
                                        <select id="FormaDePagamento" onChange={this.ChangeSearch} name="FormaDePagamento" className="form-control optionFomulario"   >
                                            <option value="Dinheiro" > Dinheiro </option>
                                            <option value="Cartão" >  Cartão </option>
                                        </select >
                                    </div>
                                </div>
                            </div >
                        </div>
                    </div>


                    {/* Responsável por fazer o comprovante aparecer */}
                    {this.state.comprovante && (<Comprovant
                        tabela={this.state.dadosComprovante}
                        serviso="PASSAPORTE"
                        teste={this.state.comprovante}
                    />)}

                    <div className="text-center">
                        <button className="btn btn-md botao" onClick={() => this.setState({ page: "TelaInicial" })}>voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.Finalizar}> Finalizar </button>
                    </div>
                </div>
            )
        }
    }
} export default SaidaServicosExtra;