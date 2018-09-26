import React from 'react';
import axios from 'axios';
import TypesInput from '../TypesInput.js';
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Desconto.css';
import './css/style.css';


class Desconto extends React.Component {
    
    
    constructor(props){
        super(props);
        this.state = {
            page: "Desconto",
            Name: "",
            Description: "",
            TypePeople: "",
            TypeValue: "",
            Value: "",
            Quant: "",
        }

        this.ChangeValue = this.ChangeValue.bind(this);

    }

    //Bloco que muda o status para o atual do formulario.
    ChangeValue(event){
        this.setState({[event.target.name]: event.target.value});
    }


    //Função que Valida o Aniversario

    ValidaDesconto = (event) => {
        event.preventDefault();

        console.log(this.state);

        
    

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
        if(this.state.page === "Desconto"){
            return (
                <div className = "container-fluid" >
                    <div className = "sub-heard-part" >
                        <ol className = "breadcrumb m-b-0" >
                            <li > < a href = "/" > Home </a></li >
                            <li > Desconto </li>
                        </ol >
                    </div>
                    <div className = "graph-visual" >
                        <h3 className = "inner-tittle" >Novo Desconto</h3>
                        <form>
                            <div className = "graph" >
                                <div className="form-group">
                                    <div className="row">
                                        <TypesInput cod = {1} ClassDiv = {"col-md-12 col-sm-12 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Nome: "} type = {"text"} id = {"Nome"} name= {"Name"} Class = {"form-control"} 
                                            value = {this.state.Name} onChange = {this.ChangeValue}
                                        />
                                        <TypesInput cod = {2} ClassDiv = {"col-md-12 col-sm-12 col-xs-12"} Label = {"True"} ClassLabel = {"LetraFormulario"} NameLabel = {"Descrição: "} id = {"Description"} cols={"50"} rows = {"4"} name= {"Description"} Class = {"form-control"} 
                                            value = {this.state.Description} onChange = {this.ChangeValue}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <label className="LetraFormulario">Para:</label>
                                            <br></br>
                                            <label class="radio-inline"><input type="radio" id="Crianca" name="TypePeople" value="Child" onClick = {this.ChangeValue}/><p className="LetraFormulario">  Criança</p></label>
                                            <label class="radio-inline"><input type="radio" id="Adulto" name="TypePeople" value="Adult" onClick = {this.ChangeValue}/><p className="LetraFormulario">  Adulto</p></label>
                                            <br></br>
                                            <label className="LetraFormulario">Quantidade:</label>
                                            <input className="form-control" type="number" id="Quant" name="Quant" value={this.state.Quant} onChange = {this.ChangeValue}/>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <label className="LetraFormulario">Tipo:</label>
                                            <br></br>
                                            <label class="radio-inline"><input type="radio" id="Porcentagem" name="TypeValue" value="Porcentagem" onClick = {this.ChangeValue}/><p className="LetraFormulario">   Porcentagem</p></label>
                                            <label class="radio-inline"><input type="radio" id="Fixo" name="TypeValue" value="Fixo" onClick = {this.ChangeValue}/><p className="LetraFormulario">    Fixo</p></label>
                                            <br></br>
                                            <label className="LetraFormulario">Valor:</label>
                                            <input className="form-control" type="number" id="Value" name="Value" value={this.state.Value} onChange = {this.ChangeValue}/>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                            <br></br>
                            <div className="text-center">
                                <a className="btn btn-md botao" href="/">Cencelar</a>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.ValidaDesconto}>Proximo</button>
                            </div> 
                            <div>
                                <ul id="mensagens-erro" style={{color: "red"}}></ul>
                            </div>                       
                        </form >
                    </div>
                </div>
            )
        }
    }

}

export default Desconto;