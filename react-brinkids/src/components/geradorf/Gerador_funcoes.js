import React from 'react'
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import lista from './lista';
import Cargo from './cargos';
import TypesInput from '../TypesInput';
import funcoes from './funcoes';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";
class Gerador extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Page: 'Lista',
            list: [],
            listadecargos: [],
            Name: '',
            Description: '',
            editar: false,
            listafuncoes: funcoes,
            funcoescheck: [],
            class: 'Operacional',
            indice: '',

            listaeditave: [],
        }
        this.changueselect = this.changueselect.bind(this);
        this.selecionaFuncao = this.selecionaFuncao.bind(this);
        this.Salvar = this.Salvar.bind(this);
        this.Salvar2 = this.Salvar2.bind(this);
        this.changue = this.changue.bind(this);
        this.editar = this.editar.bind(this);
        this.excluir = this.excluir.bind(this);

    }
    componentWillMount() {
        axios.get('/professionalPosition')
            .then((response) => {
                console.log(response.data);
                this.setState({ listadecargos: response.data });
            })
            .catch((err) => console.log(err));

        axios.get('/employees')
            .then((response) => {
                console.log(response.data);
                this.setState({ list: response.data });
            })
            .catch((err) => console.log(err));

    }
    Salvar2(event) {
        let temporario = this.state.listadecargos;
        console.log(temporario[this.state.indice]);
        let identifier = temporario[this.state.indice]._id;
        temporario[this.state.indice] = {
            name: this.state.Name,
            description: this.state.Description,
            class: this.state.class,
            funcions: this.state.funcoescheck,
        }


        var formData = new FormData();
        formData.append('name', this.state.Name);
        formData.append('description', this.state.Description);
        formData.append('classes', this.state.class);
        formData.append('functions', this.state.funcoescheck);

        axios.put(`professionalPosition/${identifier}`, formData)
            .then((response) => {
                console.log(response.data);

            })
            .catch((err) => console.log(err));

        this.setState({
            editar: false,
            Name: '',
            Description: '',
            Page: 'Lista',
            class: 'Operacional',
            listadecargos: temporario,
        })
        console.log(this.state.listadecargos);
    }
    editar(event) {
        let temporario = this.state.listadecargos[event];
        console.log(temporario);

        this.setState({
            editar: true,
            Name: temporario.name,
            Description: temporario.description,
            Page: 'Novo',
            class: temporario.classes,
            listaeditave: temporario,
            indice: event,
        })
    }
    excluir(event) {

        let listaTemporaria = this.state.listadecargos;
        let identifier = listaTemporaria[event]._id;
        
        axios.delete(`/professionalPosition/${identifier}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => console.log(err));

        listaTemporaria.splice(event, 1);
        this.setState({
            listadecargos: listaTemporaria,
        })
    }
    changue(event) {

        this.setState({
            [event.target.name]: event.target.value,
        })

    }
    Salvar(event) {
        var formData = new FormData();
        formData.append('name', this.state.Name);
        formData.append('description', this.state.Description);
        formData.append('classes', this.state.class);
        formData.append('functions', this.state.funcoescheck);
        const data = {
            name: this.state.Name,
            description: this.state.Description,
            classes: this.state.class,
            functions: this.state.funcoescheck,
        }
        axios.post(`/professionalPosition`, data)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => console.log(err));


        let listatemporaria = this.state.listadecargos;
        listatemporaria.push({
            class: this.state.class,
            name: this.state.Name,
            description: this.state.Description,
            funcions: this.state.funcoescheck
        });

        this.setState({
            listadecargos: listatemporaria,
            Name: '',
            Description: '',
            funcoescheck: [],
            Page: 'Lista',
            class: 'Operacional',
        });

    }
    selecionaFuncao(event) {
        let achou = false;

        this.state.funcoescheck.forEach((funcao, indice, array) => {
            if (funcao._id === event) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.listafuncoes.forEach((funcao) => {
                if (funcao._id === event) {
                    this.state.funcoescheck.push(funcao);
                }
            });
        }

        this.setState({ funcoescheck: this.state.funcoescheck });

    }
    changueselect(event) {

        this.state.list[event.target.value[0]].officialPosition = this.state.listadecargos[event.target.value[2]]

        console.log(this.state.list);

        var formData = new FormData();

        formData.append('identifier', String(this.state.list[event.target.value[0]].identifierEmployee._id));
        formData.append('officialPosition', String(this.state.listadecargos[event.target.value[2]]._id));

        console.log(this.state.list[event.target.value[0]].identifierEmployee._id, "-------", this.state.listadecargos[event.target.value[2]]._id)

        axios.put('/employees/rota', formData)
            .then(function (response) {
                console.log(response.data)
                // window.location.href = '/funcionario';
            }).catch(function (error) {
                console.log(error)//LOG DE ERRO
                console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
            })
    }
    render() {
        if (this.state.Page === 'Lista') {
            return (

                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Gerenciador De Funções </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" > Funcionarios </h3>
                        <div className="graph text-center" >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th >Nome</th>
                                        <th >CPF</th>
                                        <th className="text-center"> Cargo </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.list.map((findAdult, indice) => {


                                        return (
                                            <tr key={indice + 1}>
                                                <th scope="row">{indice + 1}</th>
                                                <td > {findAdult.name.firstName + ' ' + findAdult.name.surName} </td>
                                                <td > {findAdult.cpf} </td>
                                                <td className="text-center">
                                                    <div className="form-group">

                                                        <select className="form-control" style={{ height: 47 + 'px' }} id="exampleFormControlSelect2" onChange={this.changueselect}>

                                                            {this.state.listadecargos.map((cargos, indice1) => {
                                                                if (findAdult.identifierEmployee.employeeData.officialPosition === cargos._id) {
                                                                    console.log(cargos.name)
                                                                    console.log(findAdult.identifierEmployee.employeeData.officialPosition, "----", cargos._id)
                                                                    return (

                                                                        <option key={indice1 + 1} selected value={[indice, indice1]}  >{cargos.name}</option>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <option key={indice1 + 1} value={[indice, indice1]}>{cargos.name}</option>

                                                                    );
                                                                }

                                                            })}
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <button className="btn btn-md botao botaoAvançar" onClick={() => this.setState({ Page: 'Cargos' })}> Vizualizar cargos</button>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.Page === 'Cargos') {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Gerenciador De Funções </li>
                            <li > Lista De cargos </li>
                        </ol >
                    </div>
                    <div className="graph text-center">
                        <div className="tables table-responsive" >
                            <h3 className="inner-tittle" > Cargos </h3>
                            <table className="table table-hover">
                                <thead className="text-center">
                                    <tr>
                                        <th style={{textAlign:'center'}}>#</th>
                                        <th style={{textAlign:'center'}}>Nome</th>
                                        <th style={{textAlign:'center'}}>Classe</th>

                                        <th style={{textAlign:'center'}}> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.listadecargos.map((servico, indice) => {
                                        return (
                                            <tr key={indice}>
                                                <th scope="row" style={{textAlign:'center'}}>{(indice + 1)}</th>
                                                <td>{servico.name}</td>

                                                <td>{servico.class}</td>

                                                <td><button onClick={() => this.editar(indice)}><span className="glyphicon">&#x270f;</span></button> <button onClick={() => this.excluir(indice)}><span className="glyphicon">&#xe014;</span></button></td>

                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <button className="btn btn-md botao botaoAvançar" onClick={() => this.setState({ Page: 'Novo' })}>
                            Criar Novo Cargo
                                </button>
                        <button className="btn btn-md botao botaoAvançar" onClick={() => this.setState({ Page: 'Lista' })}>Voltar</button>
                    </div>
                </div>
            );
        }
        if (this.state.Page === 'Novo') {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Gerenciador De Funções </li>
                            <li > Criar Novo Cargo</li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" >Novo Cargo</h3>
                        <form>
                            <div className="graph" >
                                <div className="form-group">
                                    <div className="row">
                                        <TypesInput cod={1} ClassDiv={"col-md-12 col-sm-12 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Nome: "} type={"text"} id={"Nome"} name={"Name"} Class={"form-control"}
                                            value={this.state.Name} onChange={this.changue}
                                        />
                                        <TypesInput cod={2} ClassDiv={"col-md-12 col-sm-12 col-xs-12"} Label={"True"} ClassLabel={"LetraFormulario"} NameLabel={"Descrição: "} id={"Description"} cols={"50"} rows={"4"} name={"Description"} Class={"form-control"}
                                            value={this.state.Description} onChange={this.changue}
                                        />

                                    </div>
                                    <br></br><p className="col-md-1 col-sm-8 col-xs-12">Classe:</p><br></br>
                                    <div className="row" >
                                        <br></br>
                                        <div className="col-md-4 col-sm-8 col-xs-12">
                                            <select type="select" name="class" className=" form-control col-md-4 col-sm-8 col-xs-12 " value={this.state.class} onChange={this.changue} style={{ height: 47 + 'px' }}>
                                                <option value="Operacional">Operacional</option>
                                                <option value="Administrativo">Adminitrativo</option>
                                                <option value="Estrategico">Estrategico</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <h3 className="inner-tittle" >Funçoes</h3>
                                            <table className="table table-hover">
                                                <thead className="text-center">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Nome</th>


                                                        <th> </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.listafuncoes.map((servico, indice) => {
                                                        return (
                                                            <tr key={indice}>
                                                                <th scope="row">{(indice + 1)}</th>
                                                                <td>{servico.funcao}</td>
                                                                <td><input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaFuncao(servico._id)} /></td>

                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="text-center">
                                <Link className="btn btn-md botao" to="/">Cancelar</Link>
                                {!this.state.editar && (<button className="btn btn-md botao botaoAvançar" onClick={this.Salvar}>Salvar</button>)}
                                {this.state.editar && (<button className="btn btn-md botao botaoAvançar" onClick={this.Salvar2}>Salvar</button>)}
                            </div>
                            <div>
                                <ul id="mensagens-erro" style={{ color: "red" }}></ul>
                            </div>
                        </form >
                    </div>
                </div>
            );
        }
    }
}
export default Gerador;    