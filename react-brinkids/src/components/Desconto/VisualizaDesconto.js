import React from 'react';
import axios from 'axios';
import GeraDesconto from './CadastroDesconto.js';
import VerDesconto from './VerDesconto.js';
import moment from 'moment';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Desconto.css';
import './css/style.css';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';

class VisualizaDesconto extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            page: "VisualizarDesconto",
            Nome: "",
            list_descontos: [],
        }

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
                            axios.get(`/discount`)
                                .then((response) => {
                                    console.log("Dentro do axios: " + this)
                                    this.setState({ list_descontos: response.data });
                                }).catch((error) => {
                                    console.log("Não deu certo");
                                    console.log(error)//LOG DE ERRO
                                    // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                                    // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                                    // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
                                })
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
        this.Funcionario(28);
    }
    VerDesconto = (name) => {
        this.setState({
            page: "VerDesconto",
            Nome: name,
        })
    }
    ExcluirDesconto = (name) => {
        console.log("Fui Clicado");
        axios.delete(`/discount/filter/${name}`)
            .then((response) => {
                axios.get(`/discount`)
                    .then((response) => {
                        console.log("Dentro do axios: " + this)
                        this.setState({ list_descontos: response.data, page: "VisualizarDesconto", });
                    }).catch((error) => {
                        console.log("Não deu certo");
                        console.log(error)//LOG DE ERRO
                        // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                        // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                        // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
                    })

                alert("Desconto Excluido!");
            }).catch((error) => {
                console.log(error);
                alert("Erro encontrado: " + error);
            })
    }
    GeraDesconto = () => {
        this.setState({
            page: "GeraDesconto"
        })
    }

    render() {
        if (this.state.page === "VisualizarDesconto") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Desconto </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" >Lista de Descontos</h3>
                        <div className="graph" >
                            <h3 className="inner-tittle" >Descontos</h3>
                            <div className="tables table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th>Nome</th>
                                            <th>Para</th>
                                            <th>Tipo</th>
                                            <th>Valor</th>
                                            <th>Intervalo</th>
                                            <th>Validade</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.list_descontos.map((desconto, indice) => {
                                            console.log(desconto)
                                            return (
                                                <tr key={desconto._id}>
                                                    <th id="paddingNome" scope="row">{(indice + 1)}</th>
                                                    <td id="paddingNome" >{desconto.name} </td>
                                                   {desconto.to ==="Child" &&(<td id="paddingNome" >Criança </td>)}
                                                   {desconto.to ==="Adult" &&(<td id="paddingNome" >Adulto </td>)}
                                                    {<td id="paddingNome" >{desconto.type} </td>}
                                                    <td id="paddingNome" >{desconto.value} </td>
                                                    <td id="paddingNome" >{desconto.temporalityDate} </td>
                                                    <td id="paddingNome" >{moment(desconto.validity).add(1, "days").format("DD/MM/YYYY")} </td>
                                                    <td >
                                                        <button className="btn botao btn-xs" onClick={() => this.VerDesconto(desconto._id)}><i className="fa fa-eye"></i></button>
                                                        <button className="btn botao btn-xs" onClick={() => this.ExcluirDesconto(desconto._id)}><i className="fa fa-trash-o"></i></button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br></br>
                        <div className="text-center">
                            <a className="btn btn-md botao" href="/">Home</a>
                            <button className="btn btn-md botao botaoAvançar" onClick={this.GeraDesconto}>Novo</button>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.page === "GeraDesconto") {
            return (
                <GeraDesconto />
            )
        }
        else if (this.state.page === "VerDesconto") {
            return (
                <VerDesconto Nome={this.state.Nome} />
            )
        }
    }
}

export default VisualizaDesconto;