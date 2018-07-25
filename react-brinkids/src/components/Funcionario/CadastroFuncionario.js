import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import TypesInput from '../TypesInput.js';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Funcionario.css';
import './css/style.css';

//CADASTRO FUNCIONARIO


class CadastroFuncionario extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            page: "BuscaAdulto",
            Search: "",
        }
        this.ChangeSearch = this.ChangeSearch.bind(this)
    }

    ChangeSearch(event){
        this.setState({Search: event.target.value});
    }

    //FUNÇÂO QUE BUSCA OS USUARIOS ADULTOS E CRIA A TABELA.
    BuscaAdulto = (event) => {        
        event.preventDefault()
        console.log(this.state);
        var Tbody = document.querySelector("#CriaTabela");
        Tbody.innerHTML = "";
        var erros = ValidaErros(this.state.Search);
        if(erros.length > 0){
            alert("Houve erro(s) no preechimento do formulário");
            exibeMensagensDeErro(erros);
            return;
        }
        else {
            axios.get("/adult/filter/"+this.state.Search)
            .then(function (response) {
                console.log(response.data)
                if (isEmpty(response.data)) {
                    alert("Nenhum adulto foi encontrado com essa busca")
                } else {
                    for(var i = 0; i < response.data.length; i++){
                        var Tbody = document.querySelector("#CriaTabela");
                        var tr = document.createElement("tr");
                        var th = document.createElement("th");
                        var tdFirst = document.createElement("td");
                        var tdSur = document.createElement("td");
                        var tdCPF = document.createElement("td");
                        var tdInput = document.createElement("td");
                        var input = document.createElement("input");
                        th.setAttribute("scope","row")
                        th.innerHTML = [i];
                        tdFirst.innerHTML = response.data[i].name.firstName;
                        tdSur.innerHTML = response.data[i].name.surName;
                        tdCPF.innerHTML = response.data[i].cpf;
                        input.type = "checkbox";
                        input.id = "checkAdulto";
                        input.value = response.data[i].name.firstName +" "+ response.data[i].name.surName;
                        tr.appendChild(th);
                        tr.appendChild(tdFirst);
                        tr.appendChild(tdSur);
                        tr.appendChild(tdCPF);
                        tdInput.appendChild(input);
                        tr.appendChild(tdInput);
                        Tbody.appendChild(tr);

                    }
                }
            }).catch(function (error) {
                console.log(error)//LOG DE ERRO
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })
        }
        
        function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        function ValidaErros (busca){

            var erros = [];

            if (busca.length === 0) {
                erros.push("A Busca não pode ser em branco");
            }
            if (busca.length < 8) {
                erros.push("A Busca nao pode ter menos que 8 caracteres");
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
        if (this.state.page === "BuscaAdulto"){
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
                        <h3 className = "inner-tittle" > Selecionar Adulto </h3>
                        <div className = "graph" >
                            <div className = "graph" >
                                <form id="form-busca">
                                    <div className = "form-group" >
                                        <div className = "row" >
                                            <TypesInput cod = {1} ClassDiv = {"col-md-8 col-sm-8 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Nome: "} type = {"text"} id = {"name"} name= {"name"} Class = {"form-control"} 
                                                
                                                onChange = {this.ChangeSearch}
                                            />
                                            <div className = "col-md-1 col-sm-1 col-xs-12 text-center">
                                                <label className = "LetraFormulario brlabel">Ou</label>
                                            </div>
                                            <TypesInput cod = {1} ClassDiv = {"col-md-3 col-sm-3 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"CPF: "} type = {"text"} id = {"number"} name= {"number"} Class = {"form-control"} 
                                                
                                                onChange = {this.ChangeSearch}
                                            />
                                            <br></br>
                                            <button className="btn botao" type = "submit" onClick = {this.BuscaAdulto}>Buscar</button>
                                            <ul id="mensagens-erro"></ul>
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
                                                <th>First Name</th> 
                                                <th>Last Name</th> 
                                                <th>CPF</th>
                                                <th>Checkbox</th> 
                                            </tr>
                                        </thead> 
                                        <tbody id="CriaTabela"></tbody>
                                    </table>
                                </div>
                                <div className="text-center" style = {{marginTop: 20 + "px"}}>
                                    <button className="btn botao" type = "submit" onClick = {this.BuscaAdulto}>Proximo</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            )
        }
    }
}

export default CadastroFuncionario;
