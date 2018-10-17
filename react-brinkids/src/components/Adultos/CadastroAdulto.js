import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import ConfirmaAdulto from './ConfirmaAdulto.js';
import TypesInput from '../TypesInput.js';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/CadastroAdulto.css';
import './css/style.css';

import $ from "jquery";


class CadastroAdulto extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            page: "FormularioCad",
            firstName: "",
            surName: "",
            cpf: "",
            rg:"",
            birthday: "",
            nacionality: "",
            sexuality: "Masculino",
            phoneNumber: "",
            maritalStatus:" Casado",
            email:"",
            address:"",
            neighborhood:"",
            city:"",
            cep:"",           
            observations: "",
            file: "",
            number:"",
            state:"",
            country:"",


            
            // Estados Relacionado a busca de crianças
            childSearch: '',
            list:[],
            confirmaCrianca: [],
            erro:'',
            achado: false,
            kinship:'Outros',
        } 
     
        this.ChangeName = this.ChangeName.bind(this);
        this.ChangeSurname = this.ChangeSurname.bind(this);
        this.ChangeCpf = this.ChangeCpf.bind(this);
        this.ChangeRg = this.ChangeRg.bind(this);
        this.ChangeDate = this.ChangeDate.bind(this);
        this.ChangeNacio = this.ChangeNacio.bind(this);
        this.ChangeSexo = this.ChangeSexo.bind(this);
        this.ChangePhone = this.ChangePhone.bind(this);
        this.ChangeMarital = this.ChangeMarital.bind(this);
        this.ChangeEmail = this.ChangeEmail.bind(this);
        this.ChangeAddress = this.ChangeAddress.bind(this);
        this.ChangeNeighborhood = this.ChangeNeighborhood.bind(this);
        this.ChangeCity = this.ChangeCity.bind(this);
        this.ChangeCep = this.ChangeCep.bind(this);
        this.ChangeObs = this.ChangeObs.bind(this);
        this.Changekinship = this.Changekinship.bind(this);
        this.ChangeNumber = this.ChangeNumber.bind(this);
        this.ChangeCountry = this.ChangeCountry.bind(this);
        this.ChangeState = this.ChangeState.bind(this);
        
        //Relacionado a busca de crianças
        this.ChangechildSearch = this.ChangechildSearch.bind(this);
        this.Search = this.Search.bind(this)

    }

     // FUNCOES RELACIONADAS A BUSCA DE CRIANÇAS - Inicio 

        //Bloco que muda o status para o atual do formulario.
        ChangechildSearch(event){
        this.setState({childSearch: event.target.value});
        }  

        // Faz a busca das crianças
        Search(event){
            $.ajax({
                url: "http://localhost:3001/child/filter/" + this.state.childSearch,
                dataType:'json',
                type: 'GET',
                error: function(response){
                if( response.length === 0){this.setState({erro: "* Nenhum Criança Encontrada."})}           
                },
                success: function(response){    //Imprime os resutados encontrados na forma de tabela
                    console.log(response);
                    this.setState({achado: true});
                    this.setState({list: response});
                }.bind(this)
            });
        }

     /*BLOCO QUE VALIDA TODA A PARTE DO FORMULARIO*/
     ChildSearch = (event) => {
        event.preventDefault();
        console.log(this.state);
        var erros = ValidaErros(this.state);
        if(erros.length > 0){
            alert("Houve erro(s) no preechimento do formulário");
            exibeMensagensDeErro(erros);
            return;
        }
        else {
            //alert("Nenhem Erro Encontrado, Indo para pagina de Confirmação");
            exibeMensagensDeErro(erros);
            this.setState({
                page: "childSearchPage"
            })
        }

        function ValidaErros (adulto){

            var erros = [];

            if (adulto.firstName.length === 0) {
                erros.push("O Nome não pode estar em branco");
            }
            if (adulto.surName.length === 0) {
                erros.push("O Sobrenome não pode estar em branco");
            }
            if (adulto.cpf.length === 0){
                erros.push("O CPF não pode estar em branco");
            }
            if (adulto.birthday.length === 0) {
                erros.push("A Data não pode estar em branco");
            }
            if (adulto.nacionality.length === 0) {
                erros.push("A Nascinalidade não pode estar em branco");
            }
            if (adulto.file.length === 0) {
                erros.push("Precisamos da sua foto");
            }
            if (adulto.phoneNumber.length === 0){
                erros.push("O Telefone não pode estar em branco");
            }
            if (adulto.email.length === 0){
                erros.push("O Email não pode estar em branco");
            }
            if (adulto.address.length === 0){
                erros.push("O Endereço não pode estar em branco");
            }
            if (adulto.cep.length === 0){
                erros.push("O CEP não pode estar em branco");
            }
            if (adulto.number.length === 0){
                erros.push("O Número não pode estar em branco");
            }
            if (adulto.country.length === 0){
                erros.push("O País não pode estar em branco");
            }
            if (adulto.state.length === 0){
                erros.push("O Estado não pode estar em branco");
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

    // FUNCOES RELACIONADAS A BUSCA DE CRIANÇAS - Fim

    // Encaminha para a pagina confirma adulto 
    ValidaAdulto = (event) => {

        this.setState({
            page: "ConfirmaCad"
        })
    }

    //Bloco que muda o status para o atual do formulario.
    ChangeName(event){
        this.setState({firstName: event.target.value});
    }
    ChangeSurname(event){
        this.setState({surName: event.target.value});
    }
    ChangeCpf(event){
        this.setState({cpf: event.target.value});
    }
    ChangeRg(event){
        this.setState({rg: event.target.value});
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
    ChangePhone(event){
        this.setState({phoneNumber: event.target.value});
    }
    ChangeMarital(event){
        this.setState({maritalStatus: event.target.value});
    }
    ChangeEmail(event){
        this.setState({email: event.target.value});
    }
    ChangeAddress(event){
        this.setState({address: event.target.value});
    }
    ChangeNeighborhood(event){
        this.setState({neighborhood: event.target.value});
    }
    ChangeCity(event){
        this.setState({city: event.target.value});
    }
    ChangeCep(event){
        this.setState({cep: event.target.value});
    }
    ChangeObs(event){
        this.setState({observations: event.target.value});
    }
    ChangeState(event){
        this.setState({state: event.target.value});
    }
    ChangeCountry(event){
        this.setState({country: event.target.value});
    }
    ChangeNumber(event){
        this.setState({number: event.target.value});
    }


    Changekinship(evento, identifier){
        this.setState({kinship: evento.target.value})

        console.log('O estado foi atualizado: ${this.state.kinship}');

        this.state.confirmaCrianca.forEach((crianca) => {
            if (crianca._id === identifier) {
                crianca.kinship = evento.target.value
            }
        });

        this.setState({confirmaCrianca: this.state.confirmaCrianca});
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


    /*FUNCAO FAZ VOLTAR PARA FORMULARIO*/
    VoltaparaFormulario = (event) => {
        //alert("Voltando para pagina do Formulario");
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
        formData.append('birthday', String(this.state.birthday))
        formData.append('phone', String(this.state.phoneNumber))
        formData.append('street', String(this.state.address))
        formData.append('number', '') // Não possui esse campo no form
        formData.append('district', String(this.state.neighborhood))
        formData.append('city', String(this.state.city))
        formData.append('state', 'RN') // Não possui esse campo no form
        formData.append('country', 'Brasil') // Não possui esse campo no form
        formData.append('cep', String(this.state.cep))
        formData.append('nacionality', String(this.state.nacionality))
        formData.append('cpf', String(this.state.cpf))
        formData.append('email', String(this.state.email))
        formData.append('maritalStatus', String(this.state.maritalStatus))
        formData.append('rg', String(this.state.rg))
        formData.append('sexuality', String(this.state.sexuality))
        formData.append('observations', String(this.state.observations))

        axios.post('/adult', formData)
        .then(function (response) {
            console.log(response)
            //alert("Cadastro Finalizado, Redirecionando para um novo Cadastro")
            window.location.href = '/adult';
        }).catch(function (error) {
            console.log(error)//LOG DE ERRO
            console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
            console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
            alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
        })
    }

    /*FUNCAO CADASTRA ADULTO*/
    TheEnd= (event) => {
        var formData = new FormData();

        formData.append('file', this._dataURItoBlob(this.imageBase64))
        formData.append('firstName', String(this.state.firstName))
        formData.append('surName', String(this.state.surName))
        formData.append('birthday', String(this.state.birthday))
        formData.append('phone', String(this.state.phoneNumber))
        formData.append('street', String(this.state.address))
        formData.append('number', '123') // Não possui esse campo no form
        formData.append('district', String(this.state.neighborhood))
        formData.append('city', String(this.state.city))
        formData.append('state', 'RN') // Não possui esse campo no form
        formData.append('country', 'Brasil') // Não possui esse campo no form
        formData.append('cep', String(this.state.cep))
        formData.append('nacionality', String(this.state.nacionality))
        formData.append('cpf', String(this.state.cpf))
        formData.append('email', String(this.state.email))
        formData.append('maritalStatus', String(this.state.maritalStatus))
        formData.append('rg', String(this.state.rg))
        formData.append('sexuality', String(this.state.sexuality))
        formData.append('observations', String(this.state.observations))

        console.log(this.state.confirmaCrianca.map((child) => {
            return {identifier: child._id, kinship: child.kinship ? child.kinship : 'others'}
        }))

        formData.append('criancas', JSON.stringify(this.state.confirmaCrianca.map((child) => {
            return {identifier: child._id, kinship: child.kinship ? child.kinship : 'others'}
        })))

        axios.post('/adult', formData)
        .then(function (response) {
            console.log(response)
            alert("Cadastro Finalizado")
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

    selecionaCrianca(identifier) {
        let achou = false;

        this.state.confirmaCrianca.forEach((crianca, indice, array) => {
            if (crianca._id === identifier) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.list.forEach((crianca) => {
                if (crianca._id === identifier) {
                    this.state.confirmaCrianca.push(crianca);
                }
            });
        }

        this.setState({confirmaCrianca: this.state.confirmaCrianca});
    }

    
    render() {
        if(this.state.page === "FormularioCad") {
            return (
                <div className = "container-fluid" >
                    <div className = "sub-heard-part" >
                        <ol className = "breadcrumb m-b-0" >
                            <li > < a href = "/" > Home </a></li >
                            <li > Cadastro </li>
                            <li >Adulto </li>
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
                                                cod = {1}
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
                                        <div className = "col-md-6 col-sm-6 col-xs-12" >
                                            <label className = "LetraFormulario brlabel" > Sobrenome: </label>
                                            <input type = "text" id = "Sbnome" name = "Sbnome" className = "form-control" value={this.state.surName} onChange={this.ChangeSurname} />
                                        </div>
                                    </div>
                                </div>

                                <div className = "form-group" >
                                    <div className = "row">
                                        <div className = "col-md-6 col-sm-6 col-xs-12" >
                                            <label className = "LetraFormulario" > CPF: </label>
                                            <input type = "text" id = "number" name = "number" className = "form-control" value = {this.state.cpf} onChange={this.ChangeCpf} />
                                        </div>
                                        <div className = "col-md-6 col-sm-6 col-xs-12" >
                                            <label className = "LetraFormulario" > RG: </label>
                                            <input type = "text" id = "number" name = "number" className = "form-control" value = {this.state.rg} onChange={this.ChangeRg} />
                                        </div>
                                    </div>
                                </div >

                                <div className = "form-group" >
                                    <div className = "row" >
                                        <div className = "col-md-4 col-sm-4 col-xs-12" >
                                            <label className = "LetraFormulario brlabel" > Data de Nascimento: </label>
                                            <input type = "date" id = "Data" name = "Data" className = "form-control" placeholder = "dd / mm / aa" value={this.state.birthday}  onChange={this.ChangeDate} />
                                        </div>
                                        <div className = "col-md-4 col-sm-4 col-xs-12" >
                                            <label className = "LetraFormulario" > Nacionalidade: </label>
                                            <input type = "text" id = "Nacionalidade" name = "Nacionalidade" className = "form-control" value={this.state.nacionality} onChange={this.ChangeNacio} />
                                        </div>                                        
                                        <div className = "col-md-4 col-sm-4 col-xs-12" >
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
                                        <div className = "col-md-6 col-sm-6 col-xs-12" >
                                            <label className = "LetraFormulario" > Telefone: </label>
                                            <input type = "text" id = "phoneNumber" name = "phoneNumber" className = "form-control"  placeholder = "(00) 99999-9999"value = {this.state.phoneNumber} onChange={this.ChangePhone} />
                                        </div>
                                        <div className = "col-md-6 col-sm-6 col-xs-12" >
                                            <label className = "LetraFormulario" > Estado Civil: </label>
                                            <select id = "estadoCivil" name = "estadoCivil" className = "form-control optionFomulario" value={this.state.maritalStatus} onChange={this.ChangeMarital} >
                                                <option value = "Casado(a)" > Casado(a) </option>
                                                <option value = "Solteiro(a)" > Solterio(a) </option>                                                
                                                <option value = "Viúvo(a)" > Viúvo(a)</option>
                                                <option value = "Divorciado(a)" > Divorciado(a) </option>
                                            </select >
                                        </div>
                                    </div>
                                </div >

                                <div className = "form-group" >
                                    <div className = "row">
                                        <div className = "col-md-12 col-sm-12 col-xs-12" >
                                            <label className = "LetraFormulario" > Email: </label>
                                            <input type = "email" id = "email" name = "email" className = "form-control"  placeholder = "Exemplo@email.com" value = {this.state.email} onChange={this.ChangeEmail} />
                                        </div>
                                    </div>
                                </div >                               
                                
                                <div className = "form-group" >
                                    <div className = "row">
                                        <div className = "col-md-7 col-sm-6 col-xs-7" >
                                            <label className = "LetraFormulario" > Endereço: </label>
                                            <input type = "text" id = "endeco" name = "endeco" className = "form-control" value = {this.state.address} onChange={this.ChangeAddress} />
                                        </div>
                                        <div className = "col-md-3 col-sm-3 col-xs-3" >
                                            <label className = "LetraFormulario" > Bairro: </label>
                                            <input type = "text" id = "bairro" name = "bairro" className = "form-control" value={this.state.neighborhood} onChange={this.ChangeNeighborhood} />
                                        </div>
                                        <div className = "col-md-2 col-sm-3 col-xs-2" >
                                            <label className = "LetraFormulario" > Número: </label>
                                            <input type = "text" id = "cep" name = "cep" className = "form-control" value={this.state.number} onChange={this.ChangeNumber} />
                                        </div> 
                                    </div>
                                </div >

                                <div className = "form-group" >
                                    <div className = "row">
                                        <div className = "col-md-2 col-sm-6 col-xs-2" >
                                            <label className = "LetraFormulario" > CEP: </label>
                                            <input type = "text" id = "cep" name = "cep" className = "form-control" value={this.state.cep} onChange={this.ChangeCep} />
                                        </div>
                                        <div className = "col-md-4 col-sm-6 col-xs-4" >
                                            <label className = "LetraFormulario" > Cidade: </label>
                                            <input type = "text" id = "cidade" name = "cidade" className = "form-control" value = {this.state.city} onChange={this.ChangeCity} />
                                        </div> 
                                        <div className = "col-md-3 col-sm-6 col-xs-3" >
                                            <label className = "LetraFormulario" > Estado: </label>
                                            <input type = "text" id = "cep" name = "cep" className = "form-control" value={this.state.state} onChange={this.ChangeState} />
                                        </div>                                      
                                        <div className = "col-md-3 col-sm-6 col-xs-3" >
                                            <label className = "LetraFormulario" > País: </label>
                                            <input type = "text" id = "cep" name = "cep" className = "form-control" value={this.state.country} onChange={this.ChangeCountry} />
                                        </div> 
                                    </div>
                                </div >                         

                                <div className = "graph" >
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <h3 className = "inner-tittle" > Observações </h3>
                                            <br></br>
                                            <textarea className = "form-control" rows = "4" cols = "50" id="Observacoes" name="Observacoes" value={this.state.observations} onChange={this.ChangeObs}></textarea>
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
                                    <a className="btn btn-md botao" href="/">Cencelar</a>
                                    <button className="btn btn-md botao botaoAvançar" onClick={this.ChildSearch}>Avançar</button>
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
                    <ConfirmaAdulto
                        Name= {Nome}
                        Cpf = {this.state.cpf}
                        Rg = {this.state.rg}                
                        Date = {this.state.birthday}
                        Sexo = {this.state.sexuality}
                        Nacionalidade = {this.state.nacionality}                
                        PhoneNumber = {this.state.phoneNumber}
                        MaritalStatus ={this.state.maritalStatus}
                        Email = {this.state.email}
                        Address = {this.state.address}
                        Neighborhood = {this.state.address}
                        City = {this.state.city}
                        Cep = {this.state.cep}
                        Observation = {this.state.observations}
                        File = {this.state.file}
                        Number = {this.state.number}
                        Country = {this.state.country}
                        State = {this.state.state}
                    />

                     <div className="graph-visual" >
                    <br></br>
                    <br></br>
                    <div className="graph" >
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th >Nome</th>
                                    <th >Idade</th>
                                    <th >RG</th>
                                    <th className="text-center"> Parentesco </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.confirmaCrianca.map((findChild,indice) => {
                                       return (
                                            <tr key={findChild._id}>
                                                <th scope="row">{indice+1}</th>
                                                <td > {findChild.name.firstName} </td>
                                                <td >{findChild.birthday} </td>
                                                <td >{findChild.number} </td>
                                                <td className="text-center">
                                                    <select id="kinship" name="kinship" className="form-control optionFomulario" value={this.state.kinship} onChange={(event) => this.Changekinship(event, findChild._id)} >
                                                        <option value="others" > Outros </option>
                                                        <option value="children" > filho(a) </option>
                                                        <option value="Stepson" > Enteado(a) </option>
                                                        <option value="grandchildren"  > Neto(a) </option>
                                                        <option value="nephews"  > Sobrinho(a) </option>
                                                        <option value="Brother" > Irmão/Irmã </option>
                                                    </select >
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
                        <button className="btn btn-md botao" onClick = {this.VoltaparaFormulario}>Voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.NovoCadastro}>Novo Cadastro</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.TheEnd}>Finalizar</button>
                    </div>
                </div>
            )
        }

        else if (this.state.page === "childSearchPage") {
            {/* Imprime a tabela com a busca das crianças*/ }
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Cadastro </li>
                            <li >Adulto </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <h3 className="inner-tittle" > Buscar Criança</h3>
                            <div className=" text-center">
                                <input type="search" id="childSearch" name="childSearch" className="form-control" value={this.state.childSearch} onChange={this.ChangechildSearch} />
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
                                        <th >Idade</th>
                                        <th >RG</th>
                                        <th className="text-center"> Selecionar </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.list.map((findChild,indice) => {
                                        return (
                                            <tr key={findChild._id}>
                                                <th scope="row">{indice}</th>
                                                <td > {findChild.name.firstName} </td>
                                                <td >{findChild.birthday} </td>
                                                <td >{findChild.number} </td>
                                                <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaCrianca(findChild._id)} /> </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            <div className="text-center">
                                <a className="btn btn-md botao" href="/">Cancelar</a>
                                <button className="btn btn-md botao" onClick={this.VoltaparaFormulario}>Voltar</button>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.ValidaAdulto}> Adicinar Criança </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default CadastroAdulto;
