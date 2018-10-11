import React from 'react';
import axios from 'axios';
import TypesInput from '../TypesInput.js';
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Evento.css';
import './css/style.css';


class CadastroEvento extends React.Component {
    
    
    constructor(props){
        super(props);
        this.state = {
            Titulo: "",
            DateTimeBegin: "",
            DateTimeEnd: "",
            Description: "",
            Location: "",
            Color: "--",
        }

        this.ChangeValue = this.ChangeValue.bind(this);

    }

    //Bloco que muda o status para o atual do formulario.
    ChangeValue(event){
        this.setState({[event.target.name]: event.target.value});
    }


    //Função que Valida o Aniversario

    ValidaEvento = (event) => {
        event.preventDefault();

        console.log(this.state);

        var erros = ValidaErros(this.state);
        
        if(erros.length > 0){
            exibeMensagensDeErro(erros);
        }
        else {
            var formData = new FormData();

            formData.append('title', String(this.state.Titulo))
            formData.append('opening', String(this.state.DateTimeBegin))
            formData.append('closing', String(this.state.DateTimeEnd))
            formData.append('description', String(this.state.Description))
            formData.append('address', String(this.state.Location))
            formData.append('color', String(this.state.Color)) 
            
            axios.post('/event', formData)
            .then(function (response) {
                alert("Evento Criado Com Sucesso!");
                console.log(response);
                window.location.href = '/';
            }).catch(function (error) {
                console.log(error)//LOG DE ERRO
                alert("Erro ao Criar Evento");
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
            })
            
        } 

        function ValidaErros (event){

            var erros = [];

            if (event.Titulo.length === 0) {
                erros.push("O Titulo não pode ser em branco");
            }
            if (event.DateTimeBegin.length === 0) {
                erros.push("A Data e a Hora Inicial não pode ser em branco");
            }
            if (event.DateTimeEnd.length === 0) {
                erros.push("A Data e a Hora Final não pode ser em branco");
            }
            if (event.Description.length === 0) {
                erros.push("A Descrição não pode ser em branco");
            }
            if (event.Location.length === 0) {
                erros.push("A Localização não pode ser em branco");
            }
            if (event.Color === "--") {
                erros.push("Escolha uma Cor");
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

    render() {
        return (
            <div className = "container-fluid" >
                <div className = "sub-heard-part" >
                    <ol className = "breadcrumb m-b-0" >
                        <li > < a href = "/" > Home </a></li >
                        <li > Evento </li>
                    </ol >
                </div>
                <div className = "graph-visual" >
                    <h3 className = "inner-tittle" >Novo Evento</h3>
                    <form>
                        <div className = "graph" >
                            <div className="form-group">
                                <div className="row">
                                    <TypesInput cod = {1} ClassDiv = {"col-md-12 col-sm-12 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Titulo: "} type = {"text"} id = {"Titulo"} name= {"Titulo"} Class = {"form-control"} 
                                        value = {this.state.Titulo} onChange = {this.ChangeValue}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-12 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Data Inicial: "} type = {"datetime-local"} id = {"DateTimeBegin"} name= {"DateTimeBegin"} Class = {"form-control"} 
                                        value = {this.state.DateTimeBegin} onChange = {this.ChangeValue}
                                    />
                                    <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-12 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Data Final: "} type = {"datetime-local"} id = {"DateTimeEnd"} name= {"DateTimeEnd"} Class = {"form-control"} 
                                            value = {this.state.DateImeEnd} onChange = {this.ChangeValue}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <TypesInput cod = {2} ClassDiv = {"col-md-6 col-sm-12 col-xs-12"} Label = {true} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Descrição:"} cols = {"50"} rows = {"4"} id = {"Description"} name= {"Description"} Class = {"form-control"} 
                                            value={this.state.Description} onChange={this.ChangeValue}/>
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <TypesInput cod = {1} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Local: "} type = {"text"} id = {"Location"} name= {"Location"} Class = {"form-control"} 
                                        value = {this.state.Location} onChange = {this.ChangeValue}
                                        />
                                        <label className="LetraFormulario brlabel">Cor</label>
                                        <select id ="Color" name="Color" Class ="form-control optionFomulario" value = {this.state.Color} onChange = {this.ChangeValue}>
                                            <option value = "">--</option>
                                            <option value = "blue" className = "opt1">Azul</option>
                                            <option value = "violet" className = "opt2">Violeta</option>
                                            <option value = "green" className = "opt3">Verde</option>
                                            <option value = "orange" className = "opt4">Laranja</option>
                                            <option value = "yellow" className = "opt5">Amarelo</option>
                                            <option value = "red" className = "opt6">Vermelho</option>
                                            <option value = "aqua" className = "opt7">Azul claro</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>    
                        <br></br>
                        <div className="text-center">
                            <a className="btn btn-md botao" href="/">Cancelar</a>
                            <button className="btn btn-md botao botaoAvançar" onClick={this.ValidaEvento}>Criar Evento</button>
                        </div>                      
                    </form >
                    <div>
                        <ul id="mensagens-erro" style={{color: "red"}}></ul>
                    </div>  
                </div>
            </div>
        )
    }

}

export default CadastroEvento;