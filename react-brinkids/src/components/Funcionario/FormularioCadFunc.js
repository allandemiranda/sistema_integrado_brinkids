import React from 'react';
import axios from 'axios';
import TypesInput from '../TypesInput.js';

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
            DataEmissao: "",
            LocalEmissao: "",
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

    ChangeDataEmissao(event){this.setState({DataEmissao: event.target.value});}

    ChangeLocalEmissao(event){this.setState({LocalEmissao: event.target.value});}

    ChangeRGLEmissao(event){this.setState({RGLmissao: event.target.value});}

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

    ChangeObs(event){this.setState({observations: event.target.value});}


    

    componentWillMount(){
        //PARA TESTES
        this.setState({firstName: "JOAO"});
        this.setState({surName: "FIRMINO"});
        this.setState({cpf: "000.000.000-00"});
        this.setState({birthday: "05/05/2005"});
        this.setState({nacionality: "Brasileira"});
        this.setState({maritalStatus: "Solteiro"});
        this.setState({phoneNumber: "00000.0000" });
        this.setState({email: "teste@gmail.com.br"});
        this.setState({sexuality: "Masculino"});
        
        // axios.get("/adult/filter/"+this.props.Name)
        // .then(function (response) {
        //     console.log(response.data)
        //     if (isEmpty(response.data)) {
        //         alert("Nenhum adulto foi encontrado com essa busca")
        //     } 
        //     else {
        //         this.setState({firstName: response.data.name.firstName});
        //         this.setState({surName: response.data.name.surName});
        //         this.setState({cpf: response.data.cpf});
        //         this.setState({birthday: response.data.birthday});
        //         this.setState({nacionality: response.data.nacionality});
        //         this.setState({maritalStatus: response.data.maritalStatus});
        //         this.setState({phoneNumber: response.data.phoneNumber});
        //         this.setState({email: response.data.email});
        //         this.setState({sexuality: response.data.sexuality});
        //     }
        // }).catch(function (error) {
        //     console.log(error)//LOG DE ERRO
        //     console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
        //     console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
        //     alert("Erro ao pegar o adulto escolhido: " + error.response.status + " --> " + error.response.data);
        // })
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
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Nome: "} type = {"text"} id = {"nome"} name= {"nome"} Class = {"form-control"} value = {this.state.firstName}
                                        />
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Sobrenome: "} type = {"text"} id = {"Sbnome"} name= {"Sbnome"} Class = {"form-control"} value = {this.state.surName}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-3 col-sm-3 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Data de Aniversario: "} type = {"date"} id = {"Data"} name= {"Data"} Class = {"form-control"} value={this.state.birthday} />
                                        <TypesInput cod = {1} ClassDiv = {"col-md-3 col-sm-3 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Sexo:"} id = {"sexo"} name = {"sexo"} Class = {"form-control"} value={this.state.sexuality}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-3 col-sm-3 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"CPF: "} type = {"text"} id = {"number"} name= {"number"} Class = {"form-control"} value = {this.state.cpf}/>
                                    </div>
                                </div >
                                <div className = "form-group" >
                                    <div className = "row">
                                        <TypesInput cod = {1} ClassDiv = {"col-md-3 col-sm-3 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Nacionalidade: "} type = {"text"} id = {"Nacionalidade"} name= {"Nacionalidade"} Class = {"form-control"} value={this.state.nacionality}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-3 col-sm-3 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"EstadoCivil: "} type = {"text"} id = {"EstadoCivil"} name= {"EstadoCivil"} Class = {"form-control"} value={this.state.maritalStatus}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-3 col-sm-3 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Numero: "} type = {"text"} id = {"Numero"} name= {"Numero"} Class = {"form-control"} value={this.state.phoneNumber}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row">
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"E-Mail: "} type = {"text"} id = {"email"} name= {"email"} Class = {"form-control"} value={this.state.email}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"EstadoCivil: "} type = {"text"} id = {"EstadoCivil"} name= {"EstadoCivil"} Class = {"form-control"} value={this.state.scholl} onChange={this.Changescholl}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row">
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Nome do Pai: "} type = {"text"} id = {"dad"} name= {"dad"} Class = {"form-control"} value={this.state.dad} onChange={this.ChangeDad}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Nome da Mae: "} type = {"text"} id = {"mom"} name= {"mom"} Class = {"form-control"} value={this.state.mom} onChange={this.ChangeMom}/>
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
                            </div >
                            <br></br>
                            <div className = "graph" >
                                <h3 className = "inner-tittle" >RG </h3>
                            </div >
                            <br></br>
                            <div className = "graph" >
                                <h3 className = "inner-tittle" > Titulo de Eleitor </h3>
                            </div >
                            <br></br>
                            <div className = "graph" >
                                <h3 className = "inner-tittle" > Certidão de Rezervista </h3>
                            </div >
                            <br></br>
                            <div className = "graph" >
                                <h3 className = "inner-tittle" > Passaporte </h3>
                            </div >
                            <br></br>
                            <div className = "graph" >
                                <h3 className = "inner-tittle" > CNH </h3>
                            </div >
                            <br></br>
                            <div className = "graph" >
                                <h3 className = "inner-tittle" > Funcionario </h3>
                            </div >
                            <br></br>
                            <div className = "graph" >
                                <h3 className = "inner-tittle" > Observação </h3>
                            </div >
                        </form >
                    </div>
                </div>
            )
        }
    }
}

export default FormularioCadFunc;