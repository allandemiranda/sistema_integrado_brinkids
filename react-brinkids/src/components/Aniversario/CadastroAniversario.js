import React from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import $ from 'jquery';
import TypesInput from '../TypesInput.js';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";
import ConfDadosAni from './ConfirmaDadosAniversariante.js';
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Aniversario.css';
import './css/style.css';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
import moment from 'moment';


class CadastroAniversario extends React.Component {
    
    
    constructor(props){
        super(props);
        this.state = {
            page: "FormularioCad",
            //Dados do Aniversariante
            TituloDoAni:"",
            NomeDoAni:"",
            IdadeDoAni:"",
            DataDoAni:"",
            HoraInicio:"",
            HoraFinal:"",
            QuantCrianca:"",
            QuantAdulto:"",
            DescriçãoDoAni:"",
            ObsDoAni:"",
            ValorPg:"",
            MetodoPg:"",
            //Lista do Aniversario
            NomeCrianca: "",
            IdadeCrianca: "",
            Adulto: "",
            ListaCria: [],
            ListaAdul: [],
            //lista2: [{nome: '', idade: '', adulto: ''}, {}]
            erroCadastro: false,
        }

        this.ChangeTitulo = this.ChangeTitulo.bind(this);
        this.ChangeName = this.ChangeName.bind(this);
        this.ChangeIdade = this.ChangeIdade.bind(this);
        this.ChangeDate = this.ChangeDate.bind(this);
        this.ChangeHInicial = this.ChangeHInicial.bind(this);
        this.ChangeHFinal = this.ChangeHFinal.bind(this);
        this.ChangeQCria = this.ChangeQCria.bind(this);
        this.ChangeQAdul = this.ChangeQAdul.bind(this);
        this.ChangeDescricao = this.ChangeDescricao.bind(this);
        this.ChangeObs = this.ChangeObs.bind(this);
        this.ChangeValorPg = this.ChangeValorPg.bind(this);
        this.ChangeMetodoPg = this.ChangeMetodoPg.bind(this);
        this.ChangeNameCrianca = this.ChangeNameCrianca.bind(this);
        this.ChangeNameAdulto = this.ChangeNameAdulto.bind(this);
        this.ChangeIdadeCrianca = this.ChangeIdadeCrianca.bind(this);
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
        this.Funcionario(12);
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
    //Bloco que muda o status para o atual do formulario.
    ChangeTitulo(event){this.setState({TituloDoAni: event.target.value});}

    ChangeName(event){this.setState({NomeDoAni: event.target.value});}

    ChangeIdade(event){this.setState({IdadeDoAni: event.target.value});}

    ChangeDate(event){this.setState({DataDoAni: event.target.value});console.log(event.target.value)}

    ChangeHInicial(event){this.setState({HoraInicio: event.target.value});}

    ChangeHFinal(event){this.setState({HoraFinal: event.target.value});}

    ChangeQCria(event){this.setState({QuantCrianca: event.target.value});}

    ChangeQAdul(event){this.setState({QuantAdulto: event.target.value});}

    ChangeDescricao(event){this.setState({DescriçãoDoAni: event.target.value});}

    ChangeObs(event){this.setState({ObsDoAni: event.target.value});}

    ChangeValorPg(event){this.setState({ValorPg: event.target.value});}

    ChangeMetodoPg(event){this.setState({MetodoPg: event.target.value});}

    ChangeNameCrianca(event){this.setState({NomeCrianca: event.target.value});}
    
    ChangeNameAdulto(event){this.setState({Adulto: event.target.value});}
    
    ChangeIdadeCrianca(event){this.setState({IdadeCrianca: event.target.value});}

    //Função que Valida o Aniversario
    ValidaAniversaio = (event) => {
        event.preventDefault();
        var erros = ValidaErros(this.state);

        if(erros.length > 0){
            $("#alertDiv").addClass('alert-danger').removeClass('displaynone');
            return;
        }
        else {
            $("#alertDiv").addClass('displaynone');
            this.setState({
                page: "ConfDadosAni"
            })
        }

        function ValidaErros (ani){

            var erros = [];

            if (ani.TituloDoAni.length === 0) {
                $("#titulo").addClass('errorBorder');
                erros.push("O Titulo não pode ser em branco");
            }
            if (ani.NomeDoAni.length === 0) {
                $("#nome").addClass('errorBorder');
                erros.push("O Nome do Aniversariante não pode ser em branco");
            }
            if (ani.IdadeDoAni.length === 0) {
                $("#idade").addClass('errorBorder');
                erros.push("A Idade do Aniversariante não pode ser em branco");
            }
            if (ani.DataDoAni.length === 0) {
                $("#Data").addClass('errorBorder');
                erros.push("A Data não pode ser em branco");
            }
            if (ani.HoraInicio.length === 0) {
                $("#HI").addClass('errorBorder');
                erros.push("A Hora Inicial não pode ser em branco");
            }
            if (ani.HoraFinal.length === 0) {
                $("#HF").addClass('errorBorder');
                erros.push("A Hora Final não pode ser em branco");
            }
            if(ani.HoraInicio === ani.HoraFinal){
                $("#HI").addClass('errorBorder');
                $("#HF").addClass('errorBorder');
                erros.push("A Hora Final não pode ser igual a Inicial");
            }
            if (ani.QuantCrianca.length === 0) {
                $("#QCC").addClass('errorBorder');
                erros.push("A Quantiade de Convidados Crianças não pode ser em branco");
            }
            if (ani.QuantAdulto.length === 0) {
                $("#QCA").addClass('errorBorder');
                erros.push("A Quantiade de Convidados Adultos não pode ser em branco");
            }
            if (ani.ValorPg.length === 0) {
                $("#VP").addClass('errorBorder');
                erros.push("O Valor Pago pelo Aniversario não pode ser em branco");
            }
            if (ani.MetodoPg.length === 0) {
                $("#MP").addClass('errorBorder');
                erros.push("O Metodo de Pagamento do Aniversario não pode ser em branco");
            }
            if (ani.DescriçãoDoAni.length === 0) {
                $("#Descricao").addClass('errorBorder');
                erros.push("A Descrição do Aniversario não pode ser em branco");
            }
            
            //REMOVENDO CLASSE
            if (ani.TituloDoAni.length > 0) {
                $("#titulo").removeClass('errorBorder');
            }
            if (ani.NomeDoAni.length > 0) {
                $("#nome").removeClass('errorBorder');
            }
            if (ani.IdadeDoAni.length > 0) {
                $("#idade").removeClass('errorBorder');
            }
            if (ani.DataDoAni.length > 0) {
                $("#Data").removeClass('errorBorder');
            }
            if (ani.HoraInicio.length > 0 && ani.HoraInicio != ani.HoraFinal) {
                $("#HI").removeClass('errorBorder');
            }
            if (ani.HoraFinal.length > 0 && ani.HoraInicio != ani.HoraFinal) {
                $("#HF").removeClass('errorBorder');
            }
            if (ani.QuantCrianca.length > 0) {
                $("#QCC").removeClass('errorBorder');
            }
            if (ani.QuantAdulto.length > 0) {
                $("#QCA").removeClass('errorBorder');
            }
            if (ani.ValorPg.length > 0) {
                $("#VP").removeClass('errorBorder');
            }
            if (ani.MetodoPg.length > 0) {
                $("#MP").removeClass('errorBorder');
            }
            if (ani.DescriçãoDoAni.length > 0) {
                $("#Descricao").removeClass('errorBorder');
            }
            return erros;
        }
    }   
    VoltaFormAni = () => {
        this.setState({
            page: "FormularioCad"
        })
    }
    AvancaListConv = () => {
        this.setState({
            page: "FormularioListaConv"
        })
    }
    
    //Funções Adicionam na Lista de Aniversario
    AddCrianca = (event) => {
        event.preventDefault();
        var erro = [];

        if(this.state.NomeCrianca === ""){
            $("#name").addClass('errorBorder');
            erro.push("Nome da criança não pode ser em branco.");
        }
        if(this.state.IdadeCrianca === ""){
            $("#number").addClass('errorBorder');
            erro.push("Idade da criança não pode ser em branco.");
        }
        //Remove Class
        if(this.state.NomeCrianca != ""){
            $("#name").removeClass('errorBorder');
        }
        if(this.state.IdadeCrianca != ""){
            $("#number").removeClass('errorBorder');
        }      
        if(erro.length > 0){
            $("#alertDiv").addClass('alert-danger').removeClass('displaynone');
            return;
        }
        else {
            $("#alertDiv").addClass('displaynone');
            this.setState({
                ListaCria: update(this.state.ListaCria, {$push: [{name: this.state.NomeCrianca, age: this.state.IdadeCrianca, type:"children",id:'"'}]}),
                NomeCrianca: "",
                IdadeCrianca: "",
            })
        }
    }
    AddAdulto = (event) => {
        event.preventDefault();
        var erro = [];
        if(this.state.Adulto === ""){
            $("#nameAdult").addClass('errorBorder');
            erro.push("Nome do Adulto não pode ser em branco.");
        }
        else{
            $("#nameAdult").removeClass('errorBorder'); 
        }
        if(erro.length > 0){
            $("#alertDiv").addClass('alert-danger').removeClass('displaynone');
            return;
        }
        else {
            $("#alertDiv").addClass('displaynone');
            this.setState({
                ListaAdul: update(this.state.ListaAdul, {$push: [{name: this.state.Adulto,type:'adult',id:'"'}]}),
                Adulto: "",
            })
        }
    }
    VaiConfListCnv = (event) => {
        this.setState({
            page: "ConfListConv"
        })
    }
    VoltaFormList = () => {
        this.setState({
            page: "FormularioListaConv"
        })
    }
    
    //Cadastro de Aniversario no Banco
    CadAni = () => {
        
        var formData = new FormData();

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
        
        const data={
            
            title: String(this.state.TituloDoAni),
            name:String(this.state.NomeDoAni),
            age:String(this.state.IdadeDoAni),
            start:String(this.state.HoraInicio),
            end:String(this.state.HoraFinal),
            description:String(this.state.DescriçãoDoAni),
            observations:String(this.state.ObsDoAni),
            value:String(this.state.ValorPg),
            method:String(this.state.MetodoPg),
            children:String(this.state.QuantCrianca),
            adults: String(this.state.QuantAdulto),
            guestList: guestLista,
            birthdayDate: moment(this.state.DataDoAni).format(),


        }
        console.log(data)
        console.log(this.state.DataDoAni)
        // Gabriel pegou as duas listas de adulto e criança, transformou numa lista só,
        // adicionou uma nova informação que vai precisar no banco de dados e enviou num único campo
        // chamado guestList
        
        // this.state.ListaAdul.map((guest) => {
        //     guest.type = guest.hasOwnProperty('idade') ? 'child' : 'adult';
        //     return guest;
        // })
        // console.log(guestList)
        // formData.append('guestList', guestList)
        //--------Codigo Aqui------------
        //formData.append('', String(this.state.UFLNasc))
    
        axios.post('/birthday', data)
        .then((response) =>{
            
            console.log(response)
            
            
        }).catch( (error)=> {
            console.log(error)//LOG DE ERRO
            // alert("Erro no Cadastro");
            // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
            // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
            //alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
            this.state.errocadastro = true;
        })
    }
   
    NovoCadAni = () => {
        var formData = new FormData();

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
        //--------Codigo Aqui------------
        //formData.append('', String(this.state.UFLNasc))
    
        axios.post('/birthdayParty', formData)
        .then(function (response) {
            console.log(response)
            window.location.href = '/aniversario';
        }).catch(function (error) {
            console.log(error)//LOG DE ERRO
            // alert("Erro no Cadastro");
            // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
            // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
            //alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
            this.state.errocadastro = true;
        })
    }

    render() {
        if(this.state.page === "FormularioCad") {
            return (
                <div className = "container-fluid" >
                    <div className = "sub-heard-part" >
                        <ol className = "breadcrumb m-b-0" >
                            <li > < a href = "/" > Home </a></li >
                            <li > Aniversário </li>
                        </ol >
                    </div>
                    <div className = "graph-visual" >
                        <h3 className = "inner-tittle" > Dados do Aniversariante </h3>
                        <div id="alertDiv" className = "alert displaynone" role = "alert">
                            <b>ERRO!</b> Há algo de errado em seu formulário.
                        </div>
                        <form id="form-criança">
                            <div className = "graph" >
                                <div className = "form-group" >
                                    <div className ="row">
                                        <TypesInput cod = {1} ClassDiv = {"col-md-12 col-sm-12 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Título do Aniversário: "} type = {"text"} id = {"titulo"} name= {"titulo"} Class = {"form-control"} value={this.state.TituloDoAni} onChange={this.ChangeTitulo} />
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-10 col-sm-10 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Nome do Aniversariante: "} type = {"text"} id = {"nome"} name= {"nome"} Class = {"form-control"} value = {this.state.NomeDoAni} onChange={this.ChangeName}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-2 col-sm-2 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Idade: "} type = {"number"}  min = {"0"} id = {"idade"} name= {"idade"} Class = {"form-control"} value = {this.state.IdadeDoAni} onChange={this.ChangeIdade}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Data do Aniversário: "} type = {"date"} id = {"Data"} name= {"Data"} Class = {"form-control"} value = {this.state.DataDoAni} onChange={this.ChangeDate}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Hora incial: "} type = {"time"} id = {"HI"} name= {"HI"} Class = {"form-control"} value = {this.state.HoraInicio} onChange={this.ChangeHInicial}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Hora Final: "} type = {"time"} id = {"HF"} name= {"HF"} Class = {"form-control"} value = {this.state.HoraFinal} onChange={this.ChangeHFinal}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Quantidade de Convidados Crianças: "} type = {"number"}  min = {"0"} id = {"QCC"} name= {"QCC"} Class = {"form-control"} value = {this.state.QuantCrianca} onChange={this.ChangeQCria}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Quantidade de Convidados Adultos: "} type = {"number"}  min = {"0"} id = {"QCA"} name= {"QCA"} Class = {"form-control"} value = {this.state.QuantAdulto} onChange={this.ChangeQAdul}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Valor Pago: "} type = {"number"}  min = {"0"}  id = {"VP"} name= {"VP"} Class = {"form-control"} placeholder = {"R$"} value = {this.state.ValorPg} onChange={this.ChangeValorPg}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Método de Pagamento: "} type = {"text"} id = {"MP"} name= {"MP"} Class = {"form-control"} value = {this.state.MetodoPg} onChange={this.ChangeMetodoPg}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <h3 className = "inner-tittle" > Descrição do Aniversário </h3>
                                            <br></br>
                                            <TypesInput cod = {2} Label = {0} cols = {"50"} rows = {"4"} id = {"Descricao"} name= {"Descricao"} Class = {"form-control"} value={this.state.DescriçãoDoAni} onChange={this.ChangeDescricao} />
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <h3 className = "inner-tittle" > Observações </h3>
                                            <br></br>
                                            <TypesInput cod = {2} Label = {0} cols = {"50"} rows = {"4"} id = {"Observacoes"} name= {"Observacoes"} Class = {"form-control"} value={this.state.ObsDoAni} onChange={this.ChangeObs}/>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                            <br></br>
                            <div className="text-center">
                                <a className="btn btn-md botao" href="/">Cencelar</a>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.ValidaAniversaio}>Avançar</button>
                            </div>                      
                        </form >
                    </div>
                </div>
            )
        }
        else if(this.state.page === "ConfDadosAni"){
            return(
                <div>
                    <ConfDadosAni Titulo = {this.state.TituloDoAni} Name = {this.state.NomeDoAni} Idade = {this.state.IdadeDoAni}
                     Date = {this.state.DataDoAni} HI = {this.state.HoraInicio} HF = {this.state.HoraFinal} 
                     CC = {this.state.QuantCrianca} AC = {this.state.QuantAdulto} Valor = {this.state.ValorPg} Metodo ={this.state.MetodoPg}
                     Descricao = {this.state.DescriçãoDoAni} Obs = {this.state.ObsDoAni}/>
                    <div className="text-center">
                        <button className="btn btn-md botao" onClick={this.VoltaFormAni}>Voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.AvancaListConv}>Avançar</button>
                    </div> 
                </div> 
            )
        }
        else if(this.state.page === "FormularioListaConv"){
            return(
                <div className = "container-fluid" >
                    <div className = "sub-heard-part" >
                        <ol className = "breadcrumb m-b-0" >
                            <li > < a href = "/" > Home </a></li >
                            <li > Aniversário </li>
                        </ol >
                    </div>
                    <div className = "graph-visual" >
                        <div className = "row">
                            <div id="alertDiv" className = "alert displaynone" role = "alert">
                                <b>ERRO!</b> Há algo de errado em seu formulário.
                            </div>
                            <div className = "col-md-6 col-sm-12">
                                <div className = "graph" >
                                    <h3 className = "inner-tittle" > Lista de Crianças </h3>
                                    <div className = "graph" >
                                    <form id="form-busca">
                                        <div className = "form-group" >
                                            <div className = "row" >
                                                <TypesInput cod = {1} ClassDiv = {"col-md-8 col-sm-8 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Nome Completo: "} type = {"text"} id = {"name"} name= {"name"} Class = {"form-control"} value = {this.state.NomeCrianca} 
                                                    onChange = {this.ChangeNameCrianca}
                                                />
                                                <TypesInput cod = {1} ClassDiv = {"col-md-3 col-sm-3 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Idade: "} type = {"number"} id = {"number"} name= {"number"} Class = {"form-control"} value = {this.state.IdadeCrianca}
                                                    onChange = {this.ChangeIdadeCrianca}
                                                />
                                                <br></br>
                                                <button className="btn botao" type = "submit" onClick = {this.AddCrianca}>Adicionar</button>
                                                <ul id="mensagens-erro-crianca"></ul>
                                            </div>
                                        </div>
                                    </form>                        
                                </div>
                                    <br></br>
                                    <br></br>
                                    <div className = "graph">
                                        <div className ="tables table-responsive">
                                            <table className ="table table-hover"> 
                                                <thead className = "text-center"> 
                                                    <tr> 
                                                        <th>#</th> 
                                                        <th>Name</th> 
                                                        <th>Idade</th> 
                                                    </tr>
                                                </thead> 
                                                <tbody>
                                                    {this.state.ListaCria.map((crianca, indice) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{(indice + 1)}</th>
                                                                <td > {crianca.name} </td>
                                                                <td > {crianca.age} </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className = "col-md-6 col-sm-12">
                                <div className = "graph" >
                                    <h3 className = "inner-tittle" > Lista de Adultos </h3>
                                    <div className = "graph" >
                                        <form id="form-busca">
                                            <div className = "form-group" >
                                                <div className = "row" >
                                                    <TypesInput cod = {1} ClassDiv = {"col-md-12 col-sm-12 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Nome Completo: "} type = {"text"} id = {"nameAdult"} name= {"nameAdult"} Class = {"form-control"} 
                                                        value = {this.state.Adulto} onChange = {this.ChangeNameAdulto}
                                                    />
                                                    <br></br>
                                                    <button className="btn botao" type = "submit" onClick = {this.AddAdulto}>Adicionar</button>
                                                    <ul id="mensagens-erro-adulto"></ul>
                                                </div>
                                            </div>
                                        </form>                        
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <div className = "graph">
                                        <div className ="tables table-responsive">
                                            <table className ="table table-hover"> 
                                                <thead className = "text-center"> 
                                                    <tr> 
                                                        <th>#</th> 
                                                        <th>Nome</th> 
                                                    </tr>
                                                </thead> 
                                                <tbody>
                                                    {this.state.ListaAdul.map((adulto, indice) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{(indice + 1)}</th>
                                                                <td > {adulto.name} </td>
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
                            <a className= "btn btn-md botao" href="\">Cancelar</a>
                            <button className="btn btn-md botao botaoAvançar" onClick={this.VaiConfListCnv}>Avançar</button>
                        </div> 
                    </div> 
                </div>
            )
        }
        else if(this.state.page === "ConfListConv"){
            return(
                <div className = "container-fluid" >
                    <div className="container-fluid" >
                        {this.state.erroCadastro &&
                            (<div className="alert lert-danger" role="alert" style ={{ background: "#ff6347",width: 100 + '%' }}>
                                <strong style ={{color: 'white'}}>Ocorreu um erro no Cadastro</strong>
                            </div>)
                        }
                    </div>

                    <div className = "sub-heard-part" >
                        <ol className = "breadcrumb m-b-0" >
                            <li > < a href = "/" > Home </a></li >
                            <li > Aniversário </li>
                        </ol >
                    </div>
                    <div className = "graph-visual" >
                        <div className = "graph">
                            <h3 className = "inner-tittle" > Lista de Crianças </h3>
                            <div className ="tables table-responsive">
                                <table className ="table table-hover"> 
                                    <thead className = "text-center"> 
                                        <tr> 
                                            <th>#</th> 
                                            <th>Name</th> 
                                            <th>Idade</th> 
                                        </tr>
                                    </thead> 
                                    <tbody>
                                        {this.state.ListaCria.map((crianca, indice) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td > {crianca.name} </td>
                                                    <td > {crianca.age} </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className = "graph">
                            <h3 className = "inner-tittle" > Lista de Adultos </h3>
                            <div className ="tables table-responsive">
                                <table className ="table table-hover"> 
                                    <thead className = "text-center"> 
                                        <tr> 
                                            <th>#</th> 
                                            <th>Nome</th> 
                                        </tr>
                                    </thead> 
                                    <tbody>
                                        {this.state.ListaAdul.map((adulto, indice) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td > {adulto.name} </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-md botao botaoAvançar" onClick={this.VoltaFormList}>Voltar</button>
                            <button className="btn btn-md botao botaoAvançar" onClick={this.NovoCadAni}>Novo Cadastro</button>
                            <Link className="btn btn-md botao botaoAvançar" to="/" onClick={this.CadAni}>Finalizar</Link>
                        </div> 
                    </div> 
                </div>
            )
        }
    }

}

export default CadastroAniversario;