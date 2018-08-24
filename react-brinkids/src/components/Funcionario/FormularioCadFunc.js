import React from 'react';
import axios from 'axios';
import TypesInput from '../TypesInput.js';
import ConfirmaFunc from './ConfirmaFunc.js'

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Funcionario.css';
import './css/style.css';


class FormularioCadFunc extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            page: "FormularioCad",
            //PARTE PESSOAL
            firstName: "",
            surName: "",
            cpf: "",
            birthday: "",
            nacionality: "",
            maritalStatus: "",
            phoneNumber: "",
            email:"",
            sexuality: "",
            scholl: "",
            dad: "",
            mom: "",
            //Local de Nascimento
            cidadeNasc: "",
            UFLNasc: "",
            //Carteira de trabalho
            numberCT: "",
            serieCT: "",
            UFCT: "",
            PIS: "",
            DataEmissaoCT: "",
            LocalEmissaoCT: "",
            //RG
            RGLEmissao: "",
            RGUF: "",
            RGDateEmissao: "",
            //Titulo Eleitoral
            TNumero: "",
            TZona: "", 
            TSecao:"", 
            TUF:"",
            //Carteira de Rezevista
            CRNumero: "",
            CRSerie: "",
            CRCat: "",
            //Passaporte
            PNumero: "",
            PTipo: "",
            PPemissor: "",
            PDemissao: "",
            PDvalidade: "",
            //CNH:
            CNHReg: "",
            CNHCat: "",
            CNHDval: "",
            CNHObs: "",
            CNHLocal: "",
            CNHDemissao: "",
            //Funcionario
            CargAtual: "",
            DataAdmisao: "",
            RegInterno: "",
            //OBS
            observations: "",
        }

        this.Changescholl = this.Changescholl.bind(this);
        this.ChangeDad = this.ChangeDad.bind(this);
        this.ChangeMom = this.ChangeMom.bind(this);
        //Local de Nascimento
        this.ChangeCDN = this.ChangeCDN.bind(this);
        this.ChangeUFN = this.ChangeUFN.bind(this);
        //Carteira de trabalho
        this.ChangeNumberCT = this.ChangeNumberCT.bind(this);
        this.ChangeSerieCT = this.ChangeSerieCT.bind(this);
        this.ChangeUFCT = this.ChangeUFCT.bind(this);
        this.ChangePIS = this.ChangePIS.bind(this);
        this.ChangeDataEmissao = this.ChangeDataEmissao.bind(this);
        this.ChangeLocalEmissao = this.ChangeLocalEmissao.bind(this);
        //RG
        this.ChangeRGLEmissao = this.ChangeRGLEmissao.bind(this);
        this.ChangeRGUF = this.ChangeRGUF.bind(this);
        this.ChangeRGDateEmissao = this.ChangeRGDateEmissao.bind(this);
        //Titulo Eleitoral
        this.ChangeTNumero = this.ChangeTNumero.bind(this);
        this.ChangeTZona = this.ChangeTZona.bind(this);
        this.ChangeTSecao = this.ChangeTSecao.bind(this); 
        this.ChangeTUF = this.ChangeTUF.bind(this);
        //Carteira de Rezevista
        this.ChangeCRNumero = this.ChangeCRNumero.bind(this);
        this.ChangeCRSerie = this.ChangeCRSerie.bind(this);
        this.ChangeCRCat = this.ChangeCRCat.bind(this);
        //Passaporte
        this.ChangePNumero = this.ChangePNumero.bind(this);
        this.ChangePTipo = this.ChangePTipo.bind(this);
        this.ChangePPemissor = this.ChangePPemissor.bind(this);
        this.ChangePDemissao = this.ChangePDemissao.bind(this);
        this.ChangePDvalidade = this.ChangePDvalidade.bind(this);
        //CNH:
        this.ChangeCNHReg = this.ChangeCNHReg.bind(this);
        this.ChangeCNHCat = this.ChangeCNHCat.bind(this);
        this.ChangeCNHDval = this.ChangeCNHDval.bind(this);
        this.ChangeCNHObs = this.ChangeCNHObs.bind(this);
        this.ChangeCNHLocal = this.ChangeCNHLocal.bind(this);
        this.ChangeCNHDemissao = this.ChangeCNHDemissao.bind(this);
        //Funcionario
        this.ChangeCargAtual = this.ChangeCargAtual.bind(this);
        this.ChangeDataAdmisao = this.ChangeDataAdmisao.bind(this);
        this.ChangeRegInterno = this.ChangeRegInterno.bind(this);

        this.ChangeObs = this.ChangeObs.bind(this);
        
    }

    //Bloco que muda o status para o atual do formulario.
    Changescholl(event){this.setState({scholl: event.target.value});}

    ChangeDad(event){this.setState({dad: event.target.value});}
    
    ChangeMom(event){this.setState({mom: event.target.value});}

    ChangeCDN(event){this.setState({cidadeNasc:event.target.value});}

    ChangeUFN(event){this.setState({UFLNasc: event.target.value});}

    ChangeNumberCT(event){this.setState({numberCT: event.target.value});}

    ChangeSerieCT(event){this.setState({serieCT: event.target.value});}

    ChangeUFCT(event){this.setState({UFCT: event.target.value});}

    ChangePIS(event){this.setState({PIS: event.target.value});}    

    ChangeDataEmissao(event){this.setState({DataEmissaoCT: event.target.value});}

    ChangeLocalEmissao(event){this.setState({LocalEmissaoCT: event.target.value});}

    ChangeRGLEmissao(event){this.setState({RGLEmissao: event.target.value});}

    ChangeRGUF(event){this.setState({RGUF: event.target.value});}

    ChangeRGDateEmissao(event){this.setState({RGDateEmissao: event.target.value});}

    ChangeTNumero(event){this.setState({TNumero: event.target.value});} 

    ChangeTZona(event){this.setState({TZona: event.target.value});}

    ChangeTSecao(event){this.setState({TSecao: event.target.value});} 

    ChangeTUF(event){this.setState({TUF: event.target.value});}

    ChangeCRNumero(event){this.setState({CRNumero: event.target.value});}

    ChangeCRSerie(event){this.setState({CRSerie: event.target.value});}

    ChangeCRCat(event){this.setState({CRCat: event.target.value});}

    ChangePNumero(event){this.setState({PNumero: event.target.value});}

    ChangePTipo(event){this.setState({PTipo: event.target.value});}

    ChangePPemissor(event){this.setState({PPemissor: event.target.value});}

    ChangePDemissao(event){this.setState({PDemissao: event.target.value});}

    ChangePDvalidade(event){this.setState({PDvalidade: event.target.value});}

    ChangeCNHReg(event){this.setState({CNHReg: event.target.value});}

    ChangeCNHCat(event){this.setState({CNHCat: event.target.value});}

    ChangeCNHDval(event){this.setState({CNHDval: event.target.value});}

    ChangeCNHObs(event){this.setState({CNHObs: event.target.value});}

    ChangeCNHLocal(event){this.setState({CNHLocal: event.target.value});}

    ChangeCNHDemissao(event){this.setState({CNHDemissao: event.target.value});}

    ChangeCargAtual(event){this.setState({CargAtual: event.target.value});}

    ChangeDataAdmisao(event){this.setState({DataAdmisao: event.target.value});}

    ChangeRegInterno(event){this.setState({RegInterno: event.target.value});}

    ChangeObs(event){this.setState({observations: event.target.value});}
    

    componentWillMount(){
        //PARA TESTES
        // this.setState({firstName: "JOAO"});
        // this.setState({surName: "FIRMINO"});
        // this.setState({cpf: "000.000.000-00"});
        // this.setState({birthday: "2005-12-09"});
        // this.setState({nacionality: "Brasileira"});
        // this.setState({maritalStatus: "Solteiro"});
        // this.setState({phoneNumber: "00000.0000" });
        // this.setState({email: "teste@gmail.com.br"});
        // this.setState({sexuality: "Masculino"});
       console.log("/adult/filter/"+this.props.Name+"/name")
        axios.get("/adult/filter/"+this.props.Name+"/name")
        .then((response) => {
            console.log(response.data)
            if (isEmpty(response.data)) {
                alert("Nenhum adulto foi encontrado com essa busca")
            } 
            else {
                const data = new Date(response.data[0].birthday).toISOString();
                console.log("Data: " + data.slice(0, 10))
                this.setState({firstName: response.data[0].name.firstName});
                this.setState({surName: response.data[0].name.surName});
                this.setState({cpf: response.data[0].cpf});
                this.setState({birthday: data.slice(0, 10)});
                this.setState({nacionality: response.data[0].nacionality});
                this.setState({maritalStatus: response.data[0].maritalStatus});
                this.setState({phoneNumber: response.data[0].phone});
                this.setState({email: response.data[0].email});
                this.setState({sexuality: response.data[0].sexuality});
            }
        }).catch((error) => {
            console.log(error)//LOG DE ERRO
            // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
            // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
            // alert("Erro ao pegar o adulto escolhido: " + error.response.status + " --> " + error.response.data);
        })

        function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }
    }

    //Função que Valida o Funcionario
    ValidaFuncionario = (event) => {
        event.preventDefault();
        var erros = ValidaErros(this.state);
        if(erros.length > 0){
            alert("Houve erro(s) no preechimento do formulário");
            exibeMensagensDeErro(erros);
            return;
        }
        else {
            exibeMensagensDeErro(erros);
            this.setState({
                page: "ConfirmaCad"
            })
        }
        function ValidaErros (funcio){

            var erros = [];

            if (funcio.scholl.length === 0) {
                erros.push("A Escola não pode ser em branco");
            }
            if (funcio.dad.length === 0) {
                erros.push("O nome do Pai não pode ser em branco");
            }
            if (funcio.mom.length === 0) {
                erros.push("O nome do Mae não pode ser em branco");
            }
            if (funcio.cidadeNasc.length === 0) {
                erros.push("A Cidade de Nascimento não pode ser em branco");
            }
            if (funcio.UFLNasc.length === 0) {
                erros.push("A UF de Nascimento não pode ser em branco");
            }
            //Carteira de Trabalho
            if (funcio.numberCT.length === 0) {
                erros.push("A Numero da Carteira de Trabalho não pode ser em branco");
            }
            if (funcio.serieCT.length === 0) {
                erros.push("A Serie da Carteira de Trabalho não pode ser em branco");
            }
            if (funcio.UFCT.length === 0) {
                erros.push("A UF da Carteira de Trabalho não pode ser em branco");
            }
            if (funcio.PIS.length === 0) {
                erros.push("O PIS/PASEP da Carteira de Trabalho não pode ser em branco");
            }
            if (funcio.DataEmissaoCT.length === 0) {
                erros.push("A Data de Emissão da Carteira de Trabalho não pode ser em branco");
            }
            if (funcio.LocalEmissaoCT.length === 0) {
                erros.push("O Local de Emissão da Carteira de Trabalho não pode ser em branco");
            }
            //RG
            if (funcio.RGLEmissao.length === 0) {
                erros.push("O Local de Emissão do RG não pode ser em branco");
            }
            if (funcio.RGUF.length === 0) {
                erros.push("O UF do RG não pode ser em branco");
            }
            if (funcio.RGDateEmissao.length === 0) {
                erros.push("A Data de Emissão do RG não pode ser em branco");
            }
            //Titulo Eleitoral
            if (funcio.TNumero.length === 0) {
                erros.push("O Numero do Titulo de Eleitor não pode ser em branco");
            }
            if (funcio.TZona.length === 0) {
                erros.push("A Zona Eleitoral não pode ser em branco");
            }
            if (funcio.TSecao.length === 0) {
                erros.push("A Seção Eleitoral não pode ser em branco");
            }
            if (funcio.TSecao.length === 0) {
                erros.push("A UF do Titulo de Eleitor não pode ser em branco");
            }
            //Funcionario
            if (funcio.DataAdmisao.length === 0) {
                erros.push("A Data de Admissão do Funcionario não pode ser em branco");
            }
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
    
    /*FUNCAO FAZ VOLTAR PARA FORMULARIO*/
    VoltaparaFormulario = (event) => {
        this.setState({
            page: "FormularioCad"
        })
    }
    
    /*FUNCAO NOVO CADASTRO*/
    NovoCadastro = (event) => {
        var formData = new FormData();

        formData.append('gender', String(this.state.sexuality))
        formData.append('education', String(this.state.scholl))
        formData.append('fatherName', String(this.state.dad))
        formData.append('motherName', String(this.state.mom))
        formData.append('city', String(this.state.cidadeNasc))
        formData.append('state', String(this.state.UFLNasc))
            
        //Carteira de TRabalho
        formData.append('number', String(this.state.numberCT))
        formData.append('series', String(this.state.serieCT))
        formData.append('state', String(this.state.UFCT))
        formData.append('PIS_PASEP', String(this.state.PIS))
        formData.append('dateIssue', String(this.state.DataEmissaoCT))
        formData.append('placeIssue', String(this.state.LocalEmissaoCT))
            
        //RG
        formData.append('issuingBody', String(this.state.RGLEmissao))
        formData.append('state', String(this.state.RGUF))
        formData.append('dateIssue', String(this.state.RGDateEmissao))
            
        //Titulo de Eleitor
        formData.append('number', String(this.state.TNumero))
        formData.append('zone', String(this.state.TZona))
        formData.append('section', String(this.state.TSecao))
        formData.append('state', String(this.state.TUF))
            
        //Titulo de Rezervista
        formData.append('number', String(this.state.CRNumero))
        formData.append('series', String(this.state.CRSerie))
        formData.append('category', String(this.state.CRCat))

        //Passaporte
        formData.append('number', String(this.state.PNumero))
        formData.append('type', String(this.state.PTipo))
        formData.append('issuingCountry', String(this.state.PPemissor))
        formData.append('dateIssue', String(this.state.PDemissao))
        formData.append('expirationDate', String(this.state.PDvalidade))

        //CNH
        formData.append('record', String(this.state.CNHReg))
        formData.append('category', String(this.state.CNHCat))
        formData.append('expirationDate', String(this.state.CNHDval))
        formData.append('comments', String(this.state.CNHObs))
        formData.append('placeIssue', String(this.state.CNHLocal))
        formData.append('dateIssue', String(this.state.CNHDemissao))
            
        //Funcionario
        formData.append('officialPosition', String(this.state.CargAtual))
        formData.append('admissionDate', String(this.state.DataAdmisao))
        formData.append('record', String(this.state.RegInterno))

        //OBS
        formData.append('observations', String(this.state.observations))
    
        axios.post('/employees', formData)
        .then(function (response) {
            console.log(response)
            window.location.href = '/funcionario';
        }).catch(function (error) {
            console.log(error)//LOG DE ERRO
            console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
            console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
            alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
        })
    }
    
    /*FUNCAO CADASTRA CRIANÇA*/
    CadastrarFunc = (event) => {
        var formData = new FormData();

        formData.append('gender', String(this.state.sexuality))
        formData.append('education', String(this.state.scholl))
        formData.append('fatherName', String(this.state.dad))
        formData.append('motherName', String(this.state.mom))
        formData.append('city', String(this.state.cidadeNasc))
        formData.append('state', String(this.state.UFLNasc))
            
        //Carteira de TRabalho
        formData.append('number', String(this.state.numberCT))
        formData.append('series', String(this.state.serieCT))
        formData.append('state', String(this.state.UFCT))
        formData.append('PIS_PASEP', String(this.state.PIS))
        formData.append('dateIssue', String(this.state.DataEmissaoCT))
        formData.append('placeIssue', String(this.state.LocalEmissaoCT))
            
        //RG
        formData.append('issuingBody', String(this.state.RGLEmissao))
        formData.append('state', String(this.state.RGUF))
        formData.append('dateIssue', String(this.state.RGDateEmissao))
            
        //Titulo de Eleitor
        formData.append('number', String(this.state.TNumero))
        formData.append('zone', String(this.state.TZona))
        formData.append('section', String(this.state.TSecao))
        formData.append('state', String(this.state.TUF))
            
        //Titulo de Rezervista
        formData.append('number', String(this.state.CRNumero))
        formData.append('series', String(this.state.CRSerie))
        formData.append('category', String(this.state.CRCat))

        //Passaporte
        formData.append('number', String(this.state.PNumero))
        formData.append('type', String(this.state.PTipo))
        formData.append('issuingCountry', String(this.state.PPemissor))
        formData.append('dateIssue', String(this.state.PDemissao))
        formData.append('expirationDate', String(this.state.PDvalidade))

        //CNH
        formData.append('record', String(this.state.CNHReg))
        formData.append('category', String(this.state.CNHCat))
        formData.append('expirationDate', String(this.state.CNHDval))
        formData.append('comments', String(this.state.CNHObs))
        formData.append('placeIssue', String(this.state.CNHLocal))
        formData.append('dateIssue', String(this.state.CNHDemissao))
            
        //Funcionario
        formData.append('officialPosition', String(this.state.CargAtual))
        formData.append('admissionDate', String(this.state.DataAdmisao))
        formData.append('record', String(this.state.RegInterno))

        //OBS
        formData.append('observations', String(this.state.observations))

        axios.post('/employees', formData)
        .then(function (response) {
            console.log(response)            
            window.location.href = '/';
        }).catch(function (error) {
            console.log(error)//LOG DE ERRO
            console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
            console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
            alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
        })
    }

    render() {
        if(this.state.page === "FormularioCad") {
            return (
                <div className = "container-fluid" >
                    <div className = "sub-heard-part" >
                        <ol className = "breadcrumb m-b-0" >
                            <li > < a href = "/" > Home </a></li >
                            <li > Funcionário </li>
                            <li > Novo </li>
                        </ol >
                    </div>
                    <div className = "graph-visual" >
                        <h3 className = "inner-tittle" > Perfil </h3>
                        <form id="form-criança">
                            <div className = "graph" >
                                <h3 className = "inner-tittle" > Dados Pessoais </h3>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Nome: "} type = {"text"} id = {"nome"} name= {"nome"} Class = {"form-control"} value = {this.state.firstName}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Sobrenome: "} type = {"text"} id = {"Sbnome"} name= {"Sbnome"} Class = {"form-control"} value = {this.state.surName}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Data de Aniversario: "} type = {"date"} id = {"Data"} name= {"Data"} Class = {"form-control"} value={this.state.birthday} />
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Sexo:"} type = {"text"} id = {"sexo"} name = {"sexo"} Class = {"form-control"} value={this.state.sexuality}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"CPF: "} type = {"text"} id = {"number"} name= {"number"} Class = {"form-control"} value = {this.state.cpf}/>
                                    </div>
                                </div >
                                <div className = "form-group" >
                                    <div className = "row">
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Nacionalidade: "} type = {"text"} id = {"Nacionalidade"} name= {"Nacionalidade"} Class = {"form-control"} value={this.state.nacionality}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"EstadoCivil: "} type = {"text"} id = {"EstadoCivil"} name= {"EstadoCivil"} Class = {"form-control"} value={this.state.maritalStatus}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Numero: "} type = {"text"} id = {"Numero"} name= {"Numero"} Class = {"form-control"} value={this.state.phoneNumber}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row">
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"E-Mail: "} type = {"text"} id = {"email"} name= {"email"} Class = {"form-control"} value={this.state.email}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Escolaridade: "} type = {"text"} id = {"scholl"} name= {"scholl"} Class = {"form-control"} value={this.state.scholl} onChange={this.Changescholl}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row">
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Nome do Pai: "} type = {"text"} id = {"dad"} name= {"dad"} Class = {"form-control"} value={this.state.dad}  onChange={this.ChangeDad}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Nome da Mae: "} type = {"text"} id = {"mom"} name= {"mom"} Class = {"form-control"} value={this.state.mom}  onChange={this.ChangeMom}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row">
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Cidade de Nascimento: "} type = {"text"} id = {"LN"} name= {"LN"} Class = {"form-control"} value={this.state.cidadeNasc} onChange={this.ChangeCDN}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"UF de Nascimento: "} type = {"text"} id = {"UFN"} name= {"UFN"} Class = {"form-control"} value={this.state.UFLNasc} onChange={this.ChangeUFN}/>
                                    </div>
                                </div>
                            </div >
                            <br></br>
                            <div className = "graph" >
                                <h3 className = "inner-tittle" > Carteira de Trabalho </h3>
                                <div className = "row">
                                    <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Número: "} type = {"text"} id = {"NumberCT"} name= {"NumberCT"} Class = {"form-control"} value={this.state.numberCT} onChange={this.ChangeNumberCT}/>
                                    <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Série: "} type = {"text"} id = {"SerieCT"} name= {"SerieCT"} Class = {"form-control"} value={this.state.serieCT} onChange={this.ChangeSerieCT}/>
                                </div>
                                <br></br>
                                <div className = "row">
                                    <TypesInput cod = {1}  ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"PIS/PASEP: "} type = {"text"} id = {"PIS"} name= {"PIS"} Class = {"form-control"} value={this.state.PIS} onChange={this.ChangePIS}/>
                                    <TypesInput cod = {1}  ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"UF: "} type = {"text"} id = {"Se"} name= {"UFN"} Class = {"form-control"} value={this.state.UFCT} onChange={this.ChangeUFCT}/>
                                </div>
                                <br></br>
                                <div className = "row">
                                    <TypesInput cod = {1}  ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Data da Emissão: "} type = {"date"} id = {"CTDE"} name= {"CTDE"} Class = {"form-control"} value={this.state.DataEmissaoCT} onChange={this.ChangeDataEmissao}/>
                                    <TypesInput cod = {1}  ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Local da Emissão: "} type = {"text"} id = {"CTLE"} name= {"CTLE"} Class = {"form-control"} value={this.state.LocalEmissaoCT} onChange={this.ChangeLocalEmissao}/>
                                </div>
                            </div >
                            <br></br>
                            <div className = "graph" >
                                <h3 className = "inner-tittle" >RG </h3>
                                <div className = "row">
                                    <TypesInput cod = {1}  ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Local de Emissão: "} type = {"text"} id = {"RGLE"} name= {"RGLE"} Class = {"form-control"} value={this.state.RGLEmissao} onChange={this.ChangeRGLEmissao}/>
                                    <TypesInput cod = {1}  ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"UF: "} type = {"text"} id = {"RGUF"} name= {"RGUF"} Class = {"form-control"} value={this.state.RGUF} onChange={this.ChangeRGUF}/>
                                    <TypesInput cod = {1}  ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Data da Emissão: "} type = {"date"} id = {"RGDE"} name= {"RGDE"} Class = {"form-control"} value={this.state.RGDateEmissao} onChange={this.ChangeRGDateEmissao}/>
                                </div>
                            </div >
                            <br></br>
                            <div className = "graph" >
                                <h3 className = "inner-tittle" > Titulo de Eleitor </h3>
                                <div className = "row">
                                    <TypesInput cod = {1}  ClassDiv = {"col-md-12 col-sm-12 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Número: "} type = {"text"} id = {"TLNumero"} name= {"TLNumero"} Class = {"form-control"} value={this.state.TNumero} onChange={this.ChangeTNumero}/>
                                </div>
                                <br></br>
                                <div className = "row">
                                    <TypesInput cod = {1}  ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Zona Eleitoral: "} type = {"text"} id = {"TLLE"} name= {"TLLE"} Class = {"form-control"} value={this.state.TZona} onChange={this.ChangeTZona}/>
                                    <TypesInput cod = {1}  ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Seção Eleitorial: "} type = {"text"} id = {"TLUF"} name= {"TLUF"} Class = {"form-control"} value={this.state.TSecao} onChange={this.ChangeTSecao}/>
                                    <TypesInput cod = {1}  ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"UF: "} type = {"text"} id = {"TLDE"} name= {"TLDE"} Class = {"form-control"} value={this.state.TUF} onChange={this.ChangeTUF}/>
                                </div>
                            </div >
                            <br></br>
                            <div className = "graph" >
                                <h3 className = "inner-tittle" > Certidão de Rezervista </h3>
                                <div className = "row">
                                    <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Número:"} type = {"text"} id = {"CRNumero"} name= {"CRNumero"} Class = {"form-control"} value={this.state.CRNumero} onChange={this.ChangeCRNumero}/>
                                    <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Série:"} type = {"text"} id = {"CRSerie"} name= {"CRSerie"} Class = {"form-control"} value={this.state.CRSerie} onChange={this.ChangeCRSerie}/>
                                    <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Categoria:"} type = {"text"} id = {"CRCat"} name= {"CRCat"} Class = {"form-control"} value={this.state.CRCat} onChange={this.ChangeCRCat}/>
                                </div>
                            </div >
                            <br></br>
                            <div className = "graph" >
                                <h3 className = "inner-tittle" > Passaporte </h3>
                                <div className = "row">
                                    <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Número:"} type = {"text"} id = {"PNumero"} name= {"PNumero"} Class = {"form-control"} value={this.state.PNumero} onChange={this.ChangePNumero}/>
                                    <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Tipo:"} type = {"text"} id = {"PTipo"} name= {"PTipo"} Class = {"form-control"} value={this.state.PTipo} onChange={this.ChangePTipo}/>
                                </div>
                                <br></br>
                                <div className = "row">
                                    <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-3 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Pais Emissor:"} type = {"text"} id = {"PPais"} name= {"PPais"} Class = {"form-control"} value={this.state.PPemissor} onChange={this.ChangePPemissor}/>
                                    <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-3 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Data de Emissão:"} type = {"date"} id = {"PDE"} name= {"CRSerie"} Class = {"form-control"} value={this.state.PDemissao} onChange={this.ChangePDemissao}/>
                                    <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-3 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Data de Validade:"} type = {"date"} id = {"PDV"} name= {"CRCat"} Class = {"form-control"} value={this.state.PDvalidade} onChange={this.ChangePDvalidade}/>
                                </div>
                            </div >
                            <br></br>
                            <div className = "graph" >
                                <h3 className = "inner-tittle" > CNH </h3>
                                <div className = "row">
                                    <TypesInput cod = {1} ClassDiv = {"col-md-10 col-sm-8 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Registro:"} type = {"text"} id = {"CNHReg"} name= {"CNHReg"} Class = {"form-control"} value={this.state.CNHReg} onChange={this.ChangeCNHReg}/>
                                    <TypesInput cod = {1} ClassDiv = {"col-md-2 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Categoria:"} type = {"text"} id = {"CNHCat"} name= {"CNHCat"} Class = {"form-control"} value={this.state.CNHCat} onChange={this.ChangeCNHCat}/>
                                </div>
                                <br></br>
                                <div className = "row">
                                    <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Data de Validade:"} type = {"date"} id = {"CNHDV"} name= {"CNHDV"} Class = {"form-control"} value={this.state.CNHDval} onChange={this.ChangeCNHDval}/>
                                    <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Local de Emissão:"} type = {"text"} id = {"CNHL"} name= {"CNHL"} Class = {"form-control"} value={this.state.CNHLocal} onChange={this.ChangeCNHLocal}/>
                                    <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Data de Emissão:"} type = {"date"} id = {"CNHDemissao"} name= {"CNHDemissao"} Class = {"form-control"} value={this.state.CNHDemissao} onChange={this.ChangeCNHDemissao}/>
                                </div>
                                <br></br>
                                <div className = "row">
                                    <TypesInput cod = {2} ClassDiv = {"col-md-12 col-sm-12 col-xs-12"} Label = {true} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Observação:"} cols = {"50"} rows = {"4"} id = {"CNHObs"} name= {"CNHObs"} Class = {"form-control"} value={this.state.CNHObs} onChange={this.ChangeCNHObs}/>
                                </div>
                            </div >
                            <br></br>
                            <div className = "graph" >
                                <h3 className = "inner-tittle" > Funcionario </h3>
                                <div className = "row">
                                    <TypesInput cod = {3} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Cargo Atual:"} id = {"CargAtual"} name = {"CargAtual"} Class = {"form-control optionFomulario"} value={this.state.CargAtual} onChange={this.ChangeCargAtual}
                                        //VALORES QUE AS OPTIONS IRAM RECEBER, VAO DENTRO DO "valueOP" EM FORMA DE VETOR DE OBJETOS.
                                        valueOP = {[
                                            "Cuidador de Criança",
                                            "Recepcionista",
                                            "Limpador"
                                        ]}
                                    />
                                    <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Data de Admissão:"} type = {"date"} id = {"DataAdmisao"} name= {"DataAdmisao"} Class = {"form-control"} value={this.state.DataAdmisao} onChange={this.ChangeDataAdmisao}/>
                                    <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Registro Interno:"} type = {"text"} id = {"RegInt"} name= {"RegInt"} Class = {"form-control"} value={this.state.RegInterno} onChange={this.ChangeRegInterno}/>
                                </div>
                            </div >
                            <br></br>
                            <div className = "graph" >
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <h3 className = "inner-tittle" > Observações </h3>
                                            <br></br>
                                            <TypesInput cod = {2} Label = {false} cols = {"50"} rows = {"4"} id = {"Observacoes"} name= {"Observacoes"} Class = {"form-control"} value={this.state.observations} onChange={this.ChangeObs}/>
                                        </div>
                                    </div>
                                </div >
                            <br></br>
                            <div className="text-center">
                                <a className="btn btn-md botao" href="/">Cencelar</a>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.ValidaFuncionario}>Avançar</button>
                            </div>                      
                        </form >
                            <div>
                               <ul id="mensagens-erro" style={{color: "red"}}></ul>
                            </div>  
                    </div>
                </div>
            )
        }
        else if (this.state.page === "ConfirmaCad"){
            var Nome = this.state.firstName + " " + this.state.surName;
            return(
                <div className = "container-fluid">
                    <ConfirmaFunc
                        Name= {Nome}
                        Email = {this.state.email}
                        DateAni = {this.state.birthday}
                        Sexo = {this.state.sexuality}
                        Nacionalidade = {this.state.nacionality}
                        cpf = {this.state.cpf}
                        EstadoC = {this.state.maritalStatus}
                        Numero = {this.state.phoneNumber}
                        Escola = {this.state.scholl}
                        CidNasc = {this.state.cidadeNasc}
                        UFNasc = {this.state.UFLNasc}
                        Pai = {this.state.dad}
                        Mae = {this.state.mom}
                        Observacao = {this.state.observations}
                        //Carteira de Trabalho
                        CTNumber = {this.state.numberCT}
                        CTSerie = {this.state.serieCT}
                        CTPIS = {this.state.PIS}
                        CTUF = {this.state.UFCT}
                        CTData = {this.state.DataEmissaoCT}
                        CDLocal = {this.state.LocalEmissaoCT}
                        //Rg
                        RGUF = {this.state.RGUF}
                        RGData = {this.state.RGDateEmissao}
                        RGLocal = {this.state.RGLEmissao}
                        //Titulo de Eleitor
                        TENumero = {this.state.TNumero}
                        TEUF = {this.state.TUF}
                        TEZona = {this.state.TZona}
                        TESecao = {this.state.TSecao}
                        //Certidao de rezervista
                        CRNumero = {this.state.CRNumero}
                        CRSerie = {this.state.CRSerie}
                        CRCat = {this.state.CRCat}
                        //Passaporte
                        PNumero = {this.state.PNumero}
                        PTipo = {this.state.PTipo}
                        PPE = {this.state.PPemissor}
                        PDataE = {this.state.PDEmissao}
                        PDataV = {this.state.PDvalidade}
                        //CNH
                        CNReg = {this.state.CNHReg}
                        CNCat = {this.state.CNHCat}
                        CNLocal = {this.state.CNHLocal}
                        CNDateE = {this.state.CNHDemissao}
                        CNDataV = {this.state.CNHDval}
                        CNObs = {this.state.CNHObs}
                        //Funci
                        FCA = {this.state.CargAtual}
                        FDA = {this.state.DataAdmisao}
                        FRI = {this.state.RegInterno}
                        
                        Observacao = {this.state.observations}    
                    />
                    <br></br>
                    <div className="text-center">
                        <button className="btn btn-md botao" onClick = {this.VoltaparaFormulario}>Voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.NovoCadastro}>Novo Cadastro</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.CadastrarFunc}>Finalizar</button>
                    </div>
                </div>
            )
        }
    }

}

export default FormularioCadFunc;