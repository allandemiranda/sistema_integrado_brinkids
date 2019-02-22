import React from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import moment from 'moment';
import $ from 'jquery';
import TypesInput from '../TypesInput.js';
import ConfDadosAni from './ConfirmaDadosAniversariante.js'
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Aniversario.css';
import './css/style.css';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';

class VisualizarAniversario extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            list: [],
            Page: "Lista",

            TituloDoAni: "",
            NomeDoAni: "",
            IdadeDoAni: "",
            DataDoAni: "",
            HoraInicio: "",
            HoraFinal: "",
            QuantCrianca: "",
            QuantAdulto: "",
            DescriçãoDoAni: "",
            ObsDoAni: "",
            ValorPg: "",
            MetodoPg: "",
            AniAtual: "",

            //Lista do Aniversario
            NomeCrianca: "",
            IdadeCrianca: "",
            Adulto: "",
            ListaCria: [],
            ListaAdul: [],
            
        }
        this.requisicao = this.requisicao.bind(this);
        this.editar = this.editar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.excluir2 = this.excluir2.bind(this);
        this.inteval = this.inteval.bind(this);
        this.voltar = this.voltar.bind(this);
        this.changue = this.changue.bind(this);

        this.selecionar = this.selecionar.bind(this);
        this.salvar = this.salvar.bind(this);

        this.listaC = this.listaC.bind(this);

    }

    getFuncionario = () => {


        const a = getToken();
        const b = jwt.verify(a, config.secret_auth);

        axios.get(`/employees/${b.id}`)
            .then((response) => {

                this.setState({
                    nomeFunc: response.data[0].name.firstName + " " + response.data[0].name.surName,
                })

            })
            .catch((err) => console.log(err));

    }
    AddCrianca = (event) => {
        event.preventDefault();
        var erro = [];
        var i = this.state.ListaCria.length;
        if (this.state.NomeCrianca === "") {
            $("#name").addClass('errorBorder');
            erro.push("Nome da criança não pode ser em branco ou Quantidade de Crianças na lista de convidados foi excedida.");
        }
        if (this.state.IdadeCrianca === "") {
            $("#number").addClass('errorBorder');
            erro.push("Idade da criança não pode ser em branco.");
        }
        if ((i + 1) > this.state.QuantCrianca) {
            $("#name").addClass('errorBorder');
            $("#number").addClass('errorBorder');
            erro.push("Quantidade de Criança execidida.");
            alert("Você já adicionou a quantidade maxima de pessoas na lista de criança");
        }
        //Remove Class
        if (this.state.NomeCrianca != "" && i < this.state.QuantCrianca) {
            $("#name").removeClass('errorBorder');
        }
        if (this.state.IdadeCrianca != "" && i < this.state.QuantCrianca) {
            $("#number").removeClass('errorBorder');
        }
        if (erro.length > 0) {
            $("#alertDiv").addClass('alert-danger').removeClass('displaynone');
            return;
        }
        else {
            $("#alertDiv").addClass('displaynone');
            this.setState({
                ListaCria: update(this.state.ListaCria, { $push: [{ name: this.state.NomeCrianca, age: this.state.IdadeCrianca, type: "children", id: '"' }] }),
                NomeCrianca: "",
                IdadeCrianca: "",
            })
        }
    }
    AddAdulto = (event) => {
        event.preventDefault();
        var erro = [];
        var i = this.state.ListaAdul.length;
        if (this.state.Adulto === "") {
            $("#nameAdult").addClass('errorBorder');
            erro.push("Nome do Adulto não pode ser em branco ou Quantidade de adultos na lista de convidados excedida.");
        }
        else {
            $("#nameAdult").removeClass('errorBorder');
        }
        if ((i + 1) > this.state.QuantAdulto) {
            $("#nameAdult").addClass('errorBorder');
            erro.push("Quantidade de adultos excedida.");
            alert("Você já adicionou a quantidade maxima de pessoas na lista de adulto");
        }
        if (erro.length > 0) {
            $("#alertDiv").addClass('alert-danger').removeClass('displaynone');
            return;
        }
        else {
            $("#alertDiv").addClass('displaynone');
            this.setState({
                ListaAdul: update(this.state.ListaAdul, { $push: [{ name: this.state.Adulto, type: 'adult', id: '"' }] }),
                Adulto: "",
            })
        }
    }
    listaC(event) {
        this.setState({
            Page: "ListaC",
        })
    }
    changue(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    salvar(event) {
        console.log('entrei')
        var formData = new FormData();
        console.log(this.state.TituloDoAni)
        formData.append('title', String(this.state.TituloDoAni))
        formData.append('name', String(this.state.NomeDoAni))
        formData.append('age', String(this.state.IdadeDoAni))
        formData.append('start', String(this.state.HoraInicio))
        formData.append('end', String(this.state.HoraFinal))
        formData.append('description', String(this.state.DescriçãoDoAni))
        formData.append('observations', String(this.state.ObsDoAni))
        formData.append('value', String(this.state.ValorPg))
        formData.append('method', String(this.state.MetodoPg))
        formData.append('children', String(this.state.QuantCrianca))
        formData.append('adults', String(this.state.QuantAdulto))
        let guestLista = this.state.ListaAdul.concat(this.state.ListaCria)

        const data = {

            title: String(this.state.TituloDoAni),
            name: String(this.state.NomeDoAni),
            age: String(this.state.IdadeDoAni),
            start: this.state.HoraInicio,
            end: this.state.HoraFinal,
            description: String(this.state.DescriçãoDoAni),
            observations: String(this.state.ObsDoAni),
            value: String(this.state.ValorPg),
            method: String(this.state.MetodoPg),
            children: String(this.state.QuantCrianca),
            adults: String(this.state.QuantAdulto),
            guestList: guestLista,
            birthdayDate: moment(this.state.DataDoAni).format(),


        }
        console.log(data.start, typeof (data.start))
        // let guestList = this.state.ListaAdul.concat(this.state.ListaCria)
        // this.state.ListaAdul.map((guest) => {
        //     guest.type = guest.hasOwnProperty('idade') ? 'child' : 'adult';
        //     return guest;
        // })

        // formData.append('guestList', JSON.stringify(guestList));
        console.log(data)
        axios.put(`/birthday/${this.state.AniAtual._id}`, data)
            .then((response) => {


                this.props.history.push("/")

            })
            .catch((err) => console.log(err));
        // listaTemporaria.splice(event, 1);
        // this.setState({
        //     list: listaTemporaria,
        // })
    }
    editar(event) {
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

                            if (map.id === 13) {

                                podeentrar = true;

                            }

                        })

                        return podeentrar;

                    }).then((eventu) => {
                        if (eventu) {
                            this.setState({
                                Page: "FormularioCad"
                            })

                        } else {

                            alert("Acesso Negado. Você não possui permisão para estar nessa área!");

                        }
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));

    }
    voltar(event) {
        this.setState({
            Page: "Lista",
        })
    }
    inteval(event) {

    }
    excluir(event) {
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

                            if (map.id === 15) {

                                podeentrar = true;

                            }

                        })

                        return podeentrar;

                    }).then((eventu) => {
                        if (eventu) {
                            let listaTemporaria = this.state.list;
                            axios.delete(`/birthday/${listaTemporaria[event]._id}`)
                                .then((response) => {


                                    console.log(response.data);

                                })
                                .catch((err) => console.log(err));
                            listaTemporaria.splice(event, 1);
                            this.setState({
                                list: listaTemporaria,
                            })

                        } else {

                            alert("Acesso Negado. Você não possui permisão para estar nessa área!");

                        }
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));

    }
    excluir2(event, type) {
        if (type === "adulto") {
            let listaTemporaria = this.state.ListaAdul;
            listaTemporaria.splice(event, 1);
            this.setState({
                ListaAdul: listaTemporaria,
            })
        }
        if (type === "crianca") {
            let listaTemporaria = this.state.ListaCria;
            listaTemporaria.splice(event, 1);
            this.setState({
                ListaCria: listaTemporaria,
            })
        }
    }

    selecionar(event) {
        let aniversarioAtual = this.state.list[event];
        let listacria = [];
        let listaadult = [];
        aniversarioAtual.guestList.map((pessoa, indice) => {
            if (pessoa.type === "adult") {
                listaadult.push(pessoa);
            } else {
                listacria.push(pessoa);
            }
        })
        this.setState({
            TituloDoAni: aniversarioAtual.title,
            NomeDoAni: aniversarioAtual.birthdayPerson.name,
            IdadeDoAni: aniversarioAtual.birthdayPerson.age,
            DataDoAni: moment(aniversarioAtual.birthdayDate).format("MM/DD/YYYY"),
            HoraInicio: moment(aniversarioAtual.start).format("HH:mm"),
            HoraFinal: moment(aniversarioAtual.end).format("HH:mm"),
            QuantCrianca: aniversarioAtual.amount.children,
            QuantAdulto: aniversarioAtual.amount.adults,
            DescriçãoDoAni: aniversarioAtual.description,

            ObsDoAni: aniversarioAtual.observations,
            ValorPg: aniversarioAtual.payment.value,
            MetodoPg: aniversarioAtual.payment.method,
            Page: "ConfDadosAni",

            AniAtual: aniversarioAtual,
            ListaCria: listacria,
            ListaAdul: listaadult,
        })
        console.log("Data do aniversario q devia aparecer: ", aniversarioAtual.birthdayDate)
    }
    requisicao(event) {
        axios.get('/birthday')
            .then((response) => {
                this.setState({ list: response.data });
                console.log(response.data);
            })
            .catch((err) => console.log(err));
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
                            this.requisicao();
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
        this.Funcionario(14);
    }
    changueHoraI = (event) => {
        this.setState({

        })
    }
    render() {
        if (this.state.Page === "Lista") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li >Visualizar Aniversarios </li>
                        </ol >
                    </div>
                    <div className="graph-visual">
                        <h3 className="inner-tittle">Aniversarios </h3>
                        <div className="graph" >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Titulo</th>
                                        <th >Aniversariante</th>

                                        <th> Data </th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.list.map((findAdult, indice) => {


                                        return (
                                            <tr key={indice + 1}>
                                                <th scope="row">{indice + 1}</th>
                                                <td > {findAdult.title} </td>
                                                <td > {findAdult.birthdayPerson.name} </td>

                                                <td > {moment(findAdult.birthdayDate).format("DD/MM/YYYY")} </td>
                                                <td><button onClick={() => this.selecionar(indice)}><span className="glyphicon">&#x270f;</span></button> <button onClick={() => this.excluir(indice)}><span className="glyphicon">&#xe014;</span></button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.Page === "ConfDadosAni") {
            return (
                <div>
                    <ConfDadosAni Titulo={this.state.TituloDoAni} Name={this.state.NomeDoAni} Idade={this.state.IdadeDoAni}
                        Date={moment(this.state.DataDoAni)} HI={this.state.HoraInicio} HF={this.state.HoraFinal}
                        CC={this.state.QuantCrianca} AC={this.state.QuantAdulto} Valor={this.state.ValorPg} Metodo={this.state.MetodoPg}
                        Descricao={this.state.DescriçãoDoAni} Obs={this.state.ObsDoAni} />
                    <div className="text-center">
                        <button className="btn btn-md botao" onClick={this.voltar}>Voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.editar}>Editar</button>
                    </div>
                </div>
            )
        }
        if (this.state.Page === "FormularioCad") {
            return (

                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Aniversario </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" > Dados do Aniversariante </h3>
                        <div id="alertDiv" className="alert displaynone" role="alert">
                            <b>ERRO!</b> Ah algo de errado em seu formulario.
                        </div>

                        <div className="graph" >
                            <div className="form-group" >
                                <div className="row">
                                    <TypesInput cod={1} ClassDiv={"col-md-12 col-sm-12 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Título do Aniversário: "} type={"text"} id={"titulo"} name={"TituloDoAni"} Class={"form-control"} value={this.state.TituloDoAni} onChange={this.changue} />
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="row" >
                                    <TypesInput cod={1} ClassDiv={"col-md-10 col-sm-10 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Nome do Aniversáriante: "} type={"text"} id={"nome"} name={"NomeDoAni"} Class={"form-control"} value={this.state.NomeDoAni} onChange={this.changue} />
                                    <TypesInput cod={1} ClassDiv={"col-md-2 col-sm-2 col-xs-12"} ClassLabel={"LetraFormulario brlabel"} NameLabel={"Idade: "} type={"number"} id={"idade"} name={"IdadeDoAni"} Class={"form-control"} value={this.state.IdadeDoAni} onChange={this.changue} />
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="row" >
                                    <TypesInput cod={1} ClassDiv={"col-md-4 col-sm-4 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Data do Aniversario: "} type={"date"} id={"Data"} name={"DataDoAni"} Class={"form-control"} value={moment(this.state.DataDoAni).format("YYYY-MM-DD")} onChange={this.changue} />
                                    <TypesInput cod={1} ClassDiv={"col-md-4 col-sm-4 col-xs-12"} ClassLabel={"LetraFormulario brlabel"} NameLabel={"Hora incial: "} type={"time"} id={"HI"} name={"HoraInicio"} Class={"form-control"} value={this.state.HoraInicio} onChange={this.changue} />
                                    <TypesInput cod={1} ClassDiv={"col-md-4 col-sm-4 col-xs-12"} ClassLabel={"LetraFormulario brlabel"} NameLabel={"Hora Final: "} type={"time"} id={"HF"} name={"HoraFinal"} Class={"form-control"} value={this.state.HoraFinal} onChange={this.changue} />
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="row" >
                                    <TypesInput cod={1} ClassDiv={"col-md-6 col-sm-6 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Quantidade de Convidados Crianças: "} type={"number"} id={"QCC"} name={"QuantCrianca"} Class={"form-control"} value={this.state.QuantCrianca} onChange={this.changue} />
                                    <TypesInput cod={1} ClassDiv={"col-md-6 col-sm-6 col-xs-12"} ClassLabel={"LetraFormulario brlabel"} NameLabel={"Quantidade de Convidados Adultos: "} type={"number"} id={"QCA"} name={"QuantAdulto"} Class={"form-control"} value={this.state.QuantAdulto} onChange={this.changue} />
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="row" >
                                    <TypesInput cod={1} ClassDiv={"col-md-6 col-sm-6 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Valor Pago: "} type={"number"} id={"VP"} name={"ValorPg"} Class={"form-control"} placeholder={"R$"} value={this.state.ValorPg} onChange={this.changue} />
                                    <TypesInput cod={1} ClassDiv={"col-md-6 col-sm-6 col-xs-12"} ClassLabel={"LetraFormulario brlabel"} NameLabel={"Metodo de Pagamento: "} type={"text"} id={"MP"} name={"MetodoPg"} Class={"form-control"} value={this.state.MetodoPg} onChange={this.changue} />
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <h3 className="inner-tittle" > Descrição do Aniversário </h3>
                                        <br></br>
                                        <TypesInput cod={2} Label={0} cols={"50"} rows={"4"} id={"Descricao"} name={"DescriçãoDoAni"} Class={"form-control"} value={this.state.DescriçãoDoAni} onChange={this.changue} />
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <h3 className="inner-tittle" > Observações </h3>
                                        <br></br>
                                        <TypesInput cod={2} Label={0} cols={"50"} rows={"4"} id={"Observacoes"} name={"ObsDoAni"} Class={"form-control"} value={this.state.ObsDoAni} onChange={this.changue} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="text-center">
                            <button className="btn btn-md botao" onClick={this.voltar} >Cancelar</button>
                            <button className="btn btn-md botao" onClick={this.listaC} >Listas Crianças/Adultos</button>
                            <button className="btn btn-md botao botaoAvançar" onClick={this.salvar}>Salvar</button>
                        </div>

                    </div>
                </div>
            )
        }
        if (this.state.Page === "ListaC") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Aniversário </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="row">
                            <div id="alertDiv" className="alert displaynone" role="alert">
                                <b>ERRO!</b> Há algo de errado em seu formulário.
                        </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" >
                                    <h3 className="inner-tittle" > Lista de Crianças </h3>
                                    <div className="graph" >
                                        <form id="form-busca">
                                            <div className="form-group" >
                                                <div className="row" >
                                                    <TypesInput cod={1} ClassDiv={"col-md-8 col-sm-8 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Nome Completo: "} type={"text"} id={"name"} name={"NomeCrianca"} Class={"form-control"} value={this.state.NomeCrianca}
                                                        onChange={this.changue}
                                                    />
                                                    <TypesInput cod={1} ClassDiv={"col-md-3 col-sm-3 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Idade: "} type={"number"} id={"number"} name={"IdadeCrianca"} Class={"form-control"} value={this.state.IdadeCrianca}
                                                        onChange={this.changue}
                                                    />
                                                    <br></br>
                                                    <button className="btn botao" type="submit" onClick={this.AddCrianca}>Adicionar</button>
                                                    <ul id="mensagens-erro-crianca"></ul>
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
                                                        <th>Nome</th>
                                                        <th>Criança</th>
                                                        <th>Idade</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.ListaCria.map((crianca, indice) => {
                                                        console.log(this.state.ListaCria)
                                                        return (
                                                            <tr key={indice}>
                                                                <th scope="row">{(indice + 1)}</th>
                                                                <td > {crianca.name} </td>
                                                                <td > {crianca.nameChild} </td>
                                                                <td > {crianca.age} </td>
                                                                <td >
                                                                    <button onClick={() => this.excluir2(indice, "crianca")}><span className="glyphicon">&#xe014;</span></button>
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
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" >
                                    <h3 className="inner-tittle" > Lista de Adultos </h3>
                                    <div className="graph" >
                                        <form id="form-busca">
                                            <div className="form-group" >
                                                <div className="row" >
                                                    <TypesInput cod={1} ClassDiv={"col-md-12 col-sm-12 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Nome Completo: "} type={"text"} id={"nameAdult"} name={"Adulto"} Class={"form-control"}
                                                        value={this.state.Adulto} onChange={this.changue}
                                                    />
                                                    <br></br>
                                                    <button className="btn botao" type="submit" onClick={this.AddAdulto}>Adicionar</button>
                                                    <ul id="mensagens-erro-adulto"></ul>
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
                                                        <th>Nome</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.ListaAdul.map((adulto, indice) => {
                                                        return (
                                                            <tr key={indice}>
                                                                <th scope="row">{(indice + 1)}</th>
                                                                <td > {adulto.name} </td>
                                                                <td><button onClick={() => this.excluir2(indice, 'adulto')}><span className="glyphicon">&#xe014;</span></button></td>
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
                        <div className="text-center">

                            <button className="btn btn-md botao botaoAvançar" onClick={this.editar}>Voltar</button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default VisualizarAniversario; 