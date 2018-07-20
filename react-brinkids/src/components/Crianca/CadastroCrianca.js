import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import ConfirmaCrianca from './ConfirmaCrianca.js';
import TypesInput from '../TypesInput.js';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Crianca.css';
import './css/style.css';





class CadastroCrianca extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            page: "FormularioCad",
            firstName: "",
            surName: "",
            number: "",
            birthday: "",
            nacionality: "",
            sexuality: "Masculino",
            restrictions: "",
            observations: "",
            file: ""
        }
        this.ChangeName = this.ChangeName.bind(this);
        this.ChangeSurname = this.ChangeSurname.bind(this);
        this.ChangeNumber = this.ChangeNumber.bind(this);
        this.ChangeDate = this.ChangeDate.bind(this);
        this.ChangeNacio = this.ChangeNacio.bind(this);
        this.ChangeSexo = this.ChangeSexo.bind(this);
        this.ChangeObs = this.ChangeObs.bind(this);
        this.ChangeRet = this.ChangeRet.bind(this);
    }
    //Bloco que muda o status para o atual do formulario.
    ChangeName(event){
        this.setState({firstName: event.target.value});
    }
    ChangeSurname(event){
        this.setState({surName: event.target.value});
    }
    ChangeNumber(event){
        this.setState({number: event.target.value});
    }
    ChangeDate(event){
        this.setState({birthday: event.target.value});
    }
    ChangeNacio(event){
        this.setState({nacionality: event.target.value});
    }
    ChangeSexo(event){
        this.setState({sexuality: event.target.value});
    }
    ChangeObs(event){
        this.setState({observations: event.target.value});
    }
    ChangeRet(event){
        this.setState({restrictions: event.target.value});
    }


    _dataURItoBlob(dataURI) { //Pega a foto e converte num formato específico para enviar ao servidor
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {type:mimeString});
    }


    /*BLOCO QUE VALIDA TODA A PARTE DO FORMULARIO*/
    ValidaCriança = (event) => {
        event.preventDefault();
        console.log(this.state);
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
        function ValidaErros (crianca){

            var erros = [];

            if (crianca.firstName.length === 0) {
                erros.push("O Nome não pode ser em branco");
            }
            if (crianca.surName.length === 0) {
                erros.push("O Sobrenome não pode ser em branco");
            }
            if (crianca.birthday.length === 0) {
                erros.push("A Data não pode ser em branco");
            }
            if (crianca.nacionality.length === 0) {
                erros.push("A Nascinalidade não pode ser em branco");
            }
            if (crianca.number.length > 11) {
                erros.push("O campo RG/CPF/Passaporte não pode ter mais de 11 digitos");
            }
            if (crianca.number.length < 8) {
                erros.push("O campo RG/CPF/Passaporte não pode ter menor que 8 digitos");
            }
            if (crianca.number.length === 0) {
                erros.push("O campo RG/CPF/Passaporte não pode ser em branco");
            }
            if (crianca.file.length === 0) {
                erros.push("Precisamos da sua foto");
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

        formData.append('file', this._dataURItoBlob(this.imageBase64))
        formData.append('firstName', String(this.state.firstName))
        formData.append('surName', String(this.state.surName))
        formData.append('number', String(this.state.number))
        formData.append('birthday', String(this.state.birthday))
        formData.append('nacionality', String(this.state.nacionality))
        formData.append('sexuality', String(this.state.sexuality))
        formData.append('restrictions', String(this.state.restrictions))
        formData.append('observations', String(this.state.observations))

        axios.post('/crianca', formData)
        .then(function (response) {
            console.log(response)
            window.location.href = '/crianca';
        }).catch(function (error) {
            console.log(error)//LOG DE ERRO
            console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
            console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
            alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
        })
    }

    /*FUNCAO CADASTRA CRIANÇA*/
    CadastrarCrianca = (event) => {
        var formData = new FormData();

        formData.append('file', this._dataURItoBlob(this.imageBase64))
        formData.append('firstName', String(this.state.firstName))
        formData.append('surName', String(this.state.surName))
        formData.append('number', String(this.state.number))
        formData.append('birthday', String(this.state.birthday))
        formData.append('nacionality', String(this.state.nacionality))
        formData.append('sexuality', String(this.state.sexuality))
        formData.append('restrictions', String(this.state.restrictions))
        formData.append('observations', String(this.state.observations))

        axios.post('/crianca', formData)
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



    /*BLOCO QUE TIRA FOTO DA WEBCAN*/
    setRef = (webcam) => {
        this.webcam = webcam;
    }
    capture = (event) => {
        event.preventDefault();
        var imagem = document.querySelector("#imagem");
        const imageSrc = this.webcam.getScreenshot();
        imagem.src = imageSrc;
        this.imageBase64 = imageSrc;
        this.setState({
            file: imageSrc
        })
    };


    render() {
        if(this.state.page === "FormularioCad") {
            return (
                <div className = "container-fluid" >
                    <div className = "sub-heard-part" >
                        <ol className = "breadcrumb m-b-0" >
                            <li > < a href = "/" > Home </a></li >
                            <li > Usuario </li>
                            <li > Crianças </li>
                        </ol >
                    </div>
                    <div className = "graph-visual" >
                        <h3 className = "inner-tittle" > Novo </h3>
                        <div className = "graph" >
                            <h3 className = "inner-tittle" > Perfil </h3>
                            <form id="form-criança">
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput
                                            cod = {1} // Type Input
                                            ClassDiv = {"col-md-6 col-sm-6 col-xs-12"}
                                            ClassLabel = {"LetraFormulario"}
                                            NameLabel = {"Nome: "}
                                            type = {"text"}
                                            id = {"nome"}
                                            name= {"nome"}
                                            Class = {"form-control"}
                                            value = {this.state.firstName}
                                            onChange = {this.ChangeName}
                                        />
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Sobrenome: "} type = {"text"} id = {"Sbnome"} name= {"Sbnome"} Class = {"form-control"} value = {this.state.surName} onChange={this.ChangeSurname}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Data de Nascimento: "} type = {"date"} id = {"Data"} name= {"Data"} placeholder = {"dd / mm / aa"} Class = {"form-control"} value={this.state.birthday}  onChange={this.ChangeDate}/>
                                        <div className = "col-md-6 col-sm-6 col-xs-12" >
                                            <label className = "LetraFormulario brlabel" > Sexo: </label>
                                            <select id = "sexo" name = "sexo" className = "form-control optionFomulario" value={this.state.sexuality} onChange={this.ChangeSexo} >
                                                <option value = "Masculino" > Masculino </option>
                                                <option value = "Feminino" > Feminino </option>
                                            </select >
                                        </div>
                                    </div>
                                </div >
                                <div className = "form-group" >
                                    <div className = "row">
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"RG/CPF/Passaporte: "} type = {"text"} id = {"number"} name= {"number"} Class = {"form-control"} value = {this.state.number}onChange={this.ChangeNumber}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Nacionalidade: "} type = {"text"} id = {"Nacionalidade"} name= {"Nacionalidade"} Class = {"form-control"} value={this.state.nacionality} onChange={this.ChangeNacio}/>
                                    </div>
                                </div >
                                <div className = "graph" >
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <h3 className = "inner-tittle" > Restrições </h3>
                                            <br></br>
                                            <TypesInput
                                                cod = {2} // Type TextArea
                                                Label = {0} //Se vai possuir um label
                                                cols = {"50"}
                                                rows = {"4"}
                                                id = {"Restricoes"} 
                                                name= {"Restricoes"} 
                                                Class = {"form-control"} 
                                                value={this.state.restrictions}
                                                onChange={this.ChangeRet}
                                            />
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <h3 className = "inner-tittle" > Observações </h3>
                                            <br></br>
                                            <TypesInput cod = {2} Label = {false} cols = {"50"} rows = {"4"} id = {"Observacoes"} name= {"Observacoes"} Class = {"form-control"} value={this.state.observations} onChange={this.ChangeObs}/>
                                        </div>
                                    </div>
                                </div >
                                <br></br>

                                <div className = "graph" >
                                    <div className="row text-center">
                                        <h4 className = "inner-tittle"> Tirando uma foto </h4>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <Webcam
                                                className = "webcan"
                                                audio={false}
                                                height={240}
                                                ref={this.setRef}
                                                screenshotFormat="image/png"
                                                width={320}
                                            />
                                            <button className="btn btn-md botao" onClick={this.capture}>Take a Photo</button>
                                            <br></br>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <img id="imagem" className="webcan" src={this.state.file}/>
                                        </div>
                                    </div>
                                </div >
                                <div className="text-center">
                                    <a className="btn btn-md botao" href="/crianca">Cencelar</a>
                                    <button className="btn btn-md botao botaoAvançar" onClick={this.ValidaCriança}>Avançar</button>
                                </div>
                                <div>
                                    <ul id="mensagens-erro" style={{color: "red"}}></ul>
                                </div>
                            </form >
                        </div >
                    </div>
                </div>
            )
        }
        else if (this.state.page === "ConfirmaCad"){
            var Nome = this.state.firstName + " " + this.state.surName;
            return(
                <div className = "container-fluid">
                    <ConfirmaCrianca
                        Name= {Nome}
                        Date = {this.state.birthday}
                        Sexo = {this.state.sexuality}
                        Nacionalidade = {this.state.nacionality}
                        Number = {this.state.number}
                        Restricao = {this.state.restrictions}
                        Observacao = {this.state.observations}
                        File = {this.state.file}
                    />
                    <br></br>
                    <div className="text-center">
                        <button className="btn btn-md botao" onClick = {this.VoltaparaFormulario}>Voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.NovoCadastro}>Novo Cadastro</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.CadastrarCrianca}>Finalizar</button>
                    </div>
                </div>
            )
        }
    }
}

export default CadastroCrianca;
