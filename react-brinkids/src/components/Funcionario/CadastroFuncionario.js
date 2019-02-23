import React from 'react';
import axios from 'axios';
import TypesInput from '../TypesInput.js';
import FormularioCad from './FormularioCadFunc.js';
import $ from 'jquery';
import { withRouter } from 'react-router';


// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Funcionario.css';
import './css/style.css';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
//CADASTRO FUNCIONARIO


class CadastroFuncionario extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "BuscaAdulto",
            Name: "",
            CPF: "",

            //States para a busca de adulto
            Adulto: "",
            list: [],
        }
        this.ChangeName = this.ChangeName.bind(this)
        this.ChangeCPF = this.ChangeCPF.bind(this)
        this.BuscaAdulto = this.BuscaAdulto.bind(this)
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
        this.Funcionario(8);
    }

    ChangeName(event) {
        this.setState({ Name: event.target.value });
    }
    ChangeCPF(event) {
        this.setState({ CPF: event.target.value });
    }

    //FUNÇÂO QUE BUSCA OS USUARIOS ADULTOS E CRIA A TABELA.
    BuscaAdulto(event) {
        event.preventDefault();



        //DIFERENÇA ENTRE BUSCA POR NOME E BUSCA POR CPF, AJUDAR O BACK.
        if (this.state.Name !== "") {
            var erros = ValidaErros(this.state.Name, 1);
            if (erros.length > 0) {
                $("#alertDiv").addClass('alert-danger').removeClass('displaynone');
                return;
            }
            else {
                $("#alertDiv").addClass('displaynone');

                axios.get(`/adult/filter/${this.state.Name}/name`)
                    .then((response) => {

                        if (isEmpty(response.data) || response.data.length === 0) {
                            //alert("Nenhum adulto foi encontrado com essa busca")
                        }
                        else {
                            this.setState({ list: response.data });
                        }
                    }).catch((error) => {
                        console.log(error)//LOG DE ERRO
                        // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                        // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                        //alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
                    })
            }
        }
        else {
            var erros = ValidaErros(this.state.CPF, 2);
            if (erros.length > 0) {
                $("#alertDiv").addClass('alert-danger').removeClass('displaynone');
                return;
            }
            else {
                $("#alertDiv").addClass('displaynone');
                axios.get(`/adult/filter/${this.state.CPF}/CPF`)
                    .then((response) => {
                        if (isEmpty(response.data) || response.data.length === 0) {
                            alert("Nenhum adulto foi encontrado com essa busca")
                        }
                        else {

                            this.setState({ list: response.data });
                        }
                    }).catch((error) => {
                        console.log(error)//LOG DE ERRO
                        // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                        // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                        //alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
                    })
            }
        }

        function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        function ValidaErros(busca, ind) {
            var erros = [];
            if (ind === 1) {
                if (busca.length === 0) {
                    $("#name").addClass('errorBorder');
                    $("#number").removeClass('errorBorder');
                    erros.push("A Busca não pode ser em branco");
                }
                // if (busca.length < 8) {
                //     $("#name").addClass('errorBorder');
                //     $("#number").removeClass('errorBorder');
                //     erros.push("A Busca nao pode ter menos que 8 caracteres");
                // }
                if (busca.length > 8) {
                    $("#name").removeClass('errorBorder');
                    $("#number").removeClass('errorBorder');
                }
            }
            else {
                if (busca.length === 0) {
                    $("#number").addClass('errorBorder');
                    $("#name").removeClass('errorBorder');
                    erros.push("A Busca não pode ser em branco");
                }
                // if (busca.length < 8) {
                //     $("#number").addClass('errorBorder');
                //     $("#name").removeClass('errorBorder');
                //     erros.push("A Busca nao pode ter menos que 8 caracteres");
                // }
                if (busca.length > 8) {
                    $("#number").removeClass('errorBorder');
                    $("#name").removeClass('errorBorder');
                }
            }
            return erros;
        }
    }

    selecionaAdulto = (Name) => {
        this.setState({
            Adulto: Name,
            page: "FormularioCadastro"
        })
    }

    render() {
        if (this.state.page === "BuscaAdulto") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Funcionário </li>
                            <li > Novo </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div id="alertDiv" className="alert displaynone" role="alert">
                            <b>ERRO!</b> Ah algo de errado em seu formulario.
                        </div>
                        <h3 className="inner-tittle" > Selecionar Adulto </h3>
                        <div className="graph" >
                            <div className="graph" >
                                <form id="form-busca">
                                    <div className="form-group" >
                                        <div className="row" >
                                            <TypesInput cod={1} ClassDiv={"col-md-8 col-sm-8 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Nome: "} type={"text"} id={"name"} name={"name"} Class={"form-control"}
                                                onChange={this.ChangeName}
                                            />
                                            <div className="col-md-1 col-sm-1 col-xs-12 text-center">
                                                <label className="LetraFormulario brlabel">Ou</label>
                                            </div>
                                            <TypesInput cod={1} ClassDiv={"col-md-3 col-sm-3 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"CPF: "} type={"text"} id={"number"} name={"number"} Class={"form-control"}
                                                onChange={this.ChangeCPF}
                                            />
                                            <br></br>
                                            <button className="btn botao" type="submit" onClick={this.BuscaAdulto}>Buscar</button>
                                            <ul id="mensagens-erro"></ul>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="graph">
                                <div className="tables table-responsive">
                                    <table className="table table-hover">
                                        <thead className="text-center">
                                            <tr>
                                                <th>#</th>
                                                <th>Nome </th>
                                                <th>Sobre nome</th>
                                                <th>CPF</th>
                                                <th>Selecionar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.list.map((findAdult, indice) => {
                                                return (
                                                    <tr key={findAdult._id}>
                                                        <th scope="row">{(indice + 1)}</th>
                                                        <td > {findAdult.name.firstName} </td>
                                                        <td >{findAdult.name.surName} </td>
                                                        <td >{findAdult.cpf} </td>
                                                        <td className="text-center">
                                                            <input type="submit" name="selectAdult" value="Click Aqui" onClick={() => this.selecionaAdulto(findAdult.name.firstName + " " + findAdult.name.surName)} />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.page === "FormularioCadastro") {
            return (
                <FormularioCad Name={this.state.Adulto} />
            )
        }
    }
}

export default withRouter(CadastroFuncionario);;