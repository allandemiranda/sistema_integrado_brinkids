import React from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import TypesInput from '../TypesInput.js';
import ConfDadosAni from './ConfirmaDadosAniversariante.js'
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Aniversario.css';
import './css/style.css';


class CadastroAniversario extends React.Component {
    
    
    constructor(props){
        super(props);
        this.state = {
            page: "ConfListAni",
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

    //Bloco que muda o status para o atual do formulario.
    ChangeTitulo(event){this.setState({TituloDoAni: event.target.value});}

    ChangeName(event){this.setState({NomeDoAni: event.target.value});}

    ChangeIdade(event){this.setState({IdadeDoAni: event.target.value});}

    ChangeDate(event){this.setState({DataDoAni: event.target.value});}

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
            alert("Houve erro(s) no preechimento do formulário");
            exibeMensagensDeErro(erros);
            return;
        }

        else {
            exibeMensagensDeErro(erros);
            console.log("deu tudo certo")
            this.setState({
                page: "ConfDadosAni"
            })
        }

        function ValidaErros (ani){

            var erros = [];

            if (ani.TituloDoAni.length === 0) {
                erros.push("O Titulo não pode ser em branco");
            }
            if (ani.NomeDoAni.length === 0) {
                erros.push("O Nome do Aniversariante não pode ser em branco");
            }
            if (ani.IdadeDoAni.length === 0) {
                erros.push("A Idade do Aniversariante não pode ser em branco");
            }
            if (ani.DataDoAni.length === 0) {
                erros.push("A Data não pode ser em branco");
            }
            if (ani.HoraInicio.length === 0) {
                erros.push("A Hora Inicial não pode ser em branco");
            }
            if (ani.HoraFinal.length === 0) {
                erros.push("A Hora Final não pode ser em branco");
            }
            if (ani.QuantCrianca.length === 0) {
                erros.push("A Quantiade de Convidados Crianças não pode ser em branco");
            }
            if (ani.QuantAdulto.length === 0) {
                erros.push("A Quantiade de Convidados Adultos não pode ser em branco");
            }
            if (ani.ValorPg.length === 0) {
                erros.push("O Valor Pago pelo Aniversario não pode ser em branco");
            }
            if (ani.MetodoPg.length === 0) {
                erros.push("O Metodo de Pagamento do Aniversario não pode ser em branco");
            }
            if (ani.DescriçãoDoAni.length === 0) {
                erros.push("A Descrição do Aniversario não pode ser em branco");
            }
            console.log(erros);
            return erros;
        }

        function exibeMensagensDeErro(erros){
            var ul = document.querySelector("#mensagens-erro");
            ul.innerHTML = "";

            erros.forEach(function(erro){
                var li = document.createElement("li");
                li.textContent = erro;
                ul.appendChild(li);
            });
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

        if(this.state.NomeCrianca == ""){
            erro.push("Nome do Adulto não pode ser em branco.");
        }
        if(this.state.IdadeCrianca == ""){
            erro.push("Idade da criança não pode ser em branco.");
        }       
        if(erro.length > 0){
            exibeMensagensDeErro(erro);
        }
        else{
            exibeMensagensDeErro(erro);
            this.setState({
                ListaCria: update(this.state.ListaCria, {$push: [{nome: this.state.NomeCrianca, idade: this.state.IdadeCrianca}]}),
                NomeCrianca: "",
                IdadeCrianca: "",
            })
        }
        function exibeMensagensDeErro(erros){
            var ul = document.querySelector("#mensagens-erro-crianca");
            ul.innerHTML = "";

            erros.forEach(function(erro){
                var li = document.createElement("li");
                li.textContent = erro;
                ul.appendChild(li);
            });
        }
    }
    AddAdulto = (event) => {
        event.preventDefault();
        var erro = [];
        if(this.state.Adulto == ""){
            erro.push("Nome do Adulto não pode ser em branco.");
        }
        if(erro.length > 0){
            exibeMensagensDeErro(erro);
        }
        else{
            exibeMensagensDeErro(erro);
            this.setState({
                ListaAdul: update(this.state.ListaAdul, {$push: [{nome: this.state.Adulto}]}),
                Adulto: "",
            })
        }
        function exibeMensagensDeErro(erros){
            var ul = document.querySelector("#mensagens-erro-adulto");
            ul.innerHTML = "";

            erros.forEach(function(erro){
                var li = document.createElement("li");
                li.textContent = erro;
                ul.appendChild(li);
            });
        }
    }
    VaiConfListCnv = (event) => {
        this.setState({
            page: "ConfListConv"
        })
    }
    VoltaFormList = () => {
        this.setState({
            page: "ListaDeCriancaeAdulto"
        })
    }
    
    //Cadastro de Aniversario no Banco
    CadAni = () => {
        while(this.state.ListaCria.length < this.state.QuantCrianca){
            this.setState({
                ListaCria: update(this.state.ListaCria, {$push: [{nome: "FREE", idade: "FREE"}]}),
            })
        }
        while(this.state.ListaAdul.length < this.state.QuantAdulto){
            this.setState({
                ListaAdul: update(this.state.ListaAdul, {$push: [{nome: "FREE"}]}),
            })
        }
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
            window.location.href = '/';
        }).catch(function (error) {
            console.log(error)//LOG DE ERRO
            alert("Erro no Cadastro");
            // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
            // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
            // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
        })
    }
    NovoCadAni = () => {
        while(this.state.ListaCria.length < this.state.QuantCrianca){
            this.setState({
                ListaCria: update(this.state.ListaCria, {$push: [{nome: "FREE", idade: "FREE"}]}),
            })
        }
        while(this.state.ListaAdul.length < this.state.QuantAdulto){
            this.setState({
                ListaAdul: update(this.state.ListaAdul, {$push: [{nome: "FREE"}]}),
            })
        }
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
            alert("Erro no Cadastro");
            // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
            // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
            // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
        })
    }

    render() {
        if(this.state.page === "FormularioCad") {
            return (
                <div className = "container-fluid" >
                    <div className = "sub-heard-part" >
                        <ol className = "breadcrumb m-b-0" >
                            <li > < a href = "/" > Home </a></li >
                            <li > Aniversario </li>
                        </ol >
                    </div>
                    <div className = "graph-visual" >
                        <h3 className = "inner-tittle" > Dados do Aniversariante </h3>
                        <form id="form-criança">
                            <div className = "graph" >
                                <div className = "form-group" >
                                    <div className ="row">
                                        <TypesInput cod = {1} ClassDiv = {"col-md-12 col-sm-12 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Título do Aniversário: "} type = {"text"} id = {"titulo"} name= {"titulo"} Class = {"form-control"} value={this.state.TituloDoAni} onChange={this.ChangeTitulo} />
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-10 col-sm-10 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Nome do Aniversáriante: "} type = {"text"} id = {"nome"} name= {"nome"} Class = {"form-control"} value = {this.state.NomeDoAni} onChange={this.ChangeName}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-2 col-sm-2 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Idade: "} type = {"number"} id = {"idade"} name= {"idade"} Class = {"form-control"} value = {this.state.IdadeDoAni} onChange={this.ChangeIdade}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Data do Aniversario: "} type = {"date"} id = {"Data"} name= {"Data"} Class = {"form-control"} value = {this.state.DataDoAni} onChange={this.ChangeDate}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Hora incial: "} type = {"time"} id = {"HI"} name= {"HI"} Class = {"form-control"} value = {this.state.HoraInicio} onChange={this.ChangeHInicial}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Hora Final: "} type = {"time"} id = {"HF"} name= {"HF"} Class = {"form-control"} value = {this.state.HoraFinal} onChange={this.ChangeHFinal}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Quantidade de Convidados Crianças: "} type = {"number"} id = {"QCC"} name= {"QCC"} Class = {"form-control"} value = {this.state.QuantCrianca} onChange={this.ChangeQCria}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Quantidade de Convidados Adultos: "} type = {"number"} id = {"QCA"} name= {"QCA"} Class = {"form-control"} value = {this.state.QuantAdulto} onChange={this.ChangeQAdul}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Valor Pago: "} type = {"number"} id = {"QCC"} name= {"QCC"} Class = {"form-control"} placeholder = {"R$"} value = {this.state.ValorPg} onChange={this.ChangeValorPg}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Metodo de Pagamento: "} type = {"text"} id = {"QCA"} name= {"QCA"} Class = {"form-control"} value = {this.state.MetodoPg} onChange={this.ChangeMetodoPg}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <h3 className = "inner-tittle" > Descrição do Aniversario </h3>
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
                            <div>
                               <ul id="mensagens-erro" style={{color: "red"}}></ul>
                            </div>  
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
        else if(this.state.page === "ListaDeCriancaeAdulto"){
            return(
                <div className = "container-fluid" >
                    <div className = "sub-heard-part" >
                        <ol className = "breadcrumb m-b-0" >
                            <li > < a href = "/" > Home </a></li >
                            <li > Aniversario </li>
                        </ol >
                    </div>
                    <div className = "graph-visual" >
                        <div className = "row">
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
                                                                <td > {crianca.nome} </td>
                                                                <td > {crianca.idade} </td>
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
                                                    <TypesInput cod = {1} ClassDiv = {"col-md-12 col-sm-12 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Nome Completo: "} type = {"text"} id = {"name"} name= {"name"} Class = {"form-control"} 
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
                                                                <td > {adulto.nome} </td>
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
        else if(this.state.page === "ConfListAni"){
            return(
                <div className = "container-fluid" >
                    <div className = "sub-heard-part" >
                        <ol className = "breadcrumb m-b-0" >
                            <li > < a href = "/" > Home </a></li >
                            <li > Aniversario </li>
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
                                                    <td > {crianca.nome} </td>
                                                    <td > {crianca.idade} </td>
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
                                                    <td > {adulto.nome} </td>
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
                            <button className="btn btn-md botao botaoAvançar" onClick={this.CadAni}>Finalizar</button>
                        </div> 
                    </div> 
                </div>
            )
        }
    }

}

export default CadastroAniversario;