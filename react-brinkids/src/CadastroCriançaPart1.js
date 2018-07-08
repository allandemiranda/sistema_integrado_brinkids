import React from 'react';
import $ from 'jquery';


// CSS Layout
import './css/bootstrap.min.css';
import './css/font-awesome.css';
import './css/formulario_Criança.css';
import './css/style.css';





class CadastroCriançaPart1 extends React.Component {
    /*BLOCO QUE VALIDA TODA A PARTE DO FORMULARIO
    COMO TAMBEM FAZ A REQUESIÇÃO POST*/
    ValidaCriança(event){
        event.preventDefault();
        var form = document.querySelector("#form-criança");
        var data = PegaCriancadoForm(form);
        var crianca = 
        {
            "nome": String(data.nome),
            "sobrenome": String(form.Sbnome.valu),
            "data": String(data.Data),
            "nacionalidade": String(data.Nacionalidade),
            "sexo": String(data.sexo),
            "RG": String(data.RG),
            "CPF": String(data.CPF),
            "passaporte": String(data.Passaporte),
            "restricoes": String(data.Restricoes),
            "observacoes": String(data.Observacoes)
        }
        var erros = ValidaErros(data);
        
        if(erros.length > 0){
            alert("Houve erro(s) no preechimento do formulário");
            exibeMensagensDeErro(erros);
            return;
        }
        else {
            $.ajax({
                method:"POST",
                //url:
                data: JSON.stringify(crianca), //Função para transformar o objeto em JSON
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                success: function(data) {
                    alert("Dados enviados!");
                    form.reset();
                    console.log(data);
                    exibeMensagensDeErro(erros);
                    //window.location.href = "gLogin.html";
                },
                error: function(data) {
                    alert("Erro ao enviar os dados, tente novamente"+ " " + data.status + " " + data.statusText);
                    console.log(data);
                    exibeMensagensDeErro(erros);
                }
            })    
        }
    
        function PegaCriancadoForm (form){
            var Criança = {
                Nome: form.nome.value,
                Sobrenome: form.Sbnome.value,
                Data: form.Data.value,
                Nacionalidade: form.Nacionalidade.value,
                Sexo: form.sexo.value,
                RG: form.RG.value,
                CPF: form.CPF.value,
                Passaporte: form.Passaporte.value,
                Restricoes: form.Restricoes.value,
                Observacoes: form.Observacoes.value
                }

            return Criança;
        }

        function ValidaErros (crianca){
	
            var erros = [];
        
            if (crianca.Nome.length == 0) {
                erros.push("O Nome não pode ser em branco");
            }
            if (crianca.Sobrenome.length == 0) {
                erros.push("O Sobrenome não pode ser em branco");
            }
            if (crianca.Nacionalidade.length == 0) {
                erros.push("A Nascinalidade não pode ser em branco");
            }
            if (crianca.RG.length != 9) {
                erros.push("O RG precisa ter 9 digitos");
            }
            if (crianca.CPF.length != 11) {
                erros.push("O CPF precisa ter 11 digitos");
            }
            if (crianca.Passaporte.length != 8) {
                erros.push("O Numero do Passaporte precisa ter 8 numeros");
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
    
    render() {
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
                        <form id="form-criança" onSubmit={this.ValidaCriança}>
                            <div className = "form-group" >
                                <div className = "row" >
                                    <div className = "col-md-6 col-sm-6 col-xs-12" >
                                        <label className = "LetraFormulario" > Nome: </label>
                                        <input type = "text" id = "nome" name = "nome" className = "form-control" />
                                    </div>   
                                    <div className = "col-md-6 col-sm-6 col-xs-12" >
                                        <label className = "LetraFormulario brlabel" > Sobrenome: </label>
                                        <input type = "text" id = "Sbnome" name = "Sbnome" className = "form-control" />
                                    </div>  
                                </div> 
                            </div>
                            <div className = "form-group" >
                                <div className = "row" >
                                    <div className = "col-md-4 col-sm-4 col-xs-12" >
                                        <label className = "LetraFormulario brlabel" > Data de Nascimento: </label>
                                        <input type = "date" id = "Data" name = "Data" className = "form-control" placeholder = "dd / mm / aa" />
                                    </div>
                                    <div className = "col-md-4 col-sm-4 col-xs-12" >
                                        <label className = "LetraFormulario" > Nacionalidade: </label>
                                        <input type = "text" id = "Nacionalidade" name = "Nacionalidade" className = "form-control" />
                                    </div>
                                    <div className = "col-md-4 col-sm-4 col-xs-12" >
                                        <label className = "LetraFormulario brlabel" > Sexo: </label>
                                        <select id = "sexo" name = "sexo" className = "form-control optionFomulario" >
                                            <option value = "Masculino" > Masculino </option> 
                                            <option value = "Feminino" > Feminino </option>
                                        </select > 
                                    </div>
                                </div>
                            </div >
                            <div className = "form-group" >
                                <div className = "row">
                                    <div className = "col-md-4 col-sm-4 col-xs-12" >
                                        <label className = "LetraFormulario" > RG: </label>
                                        <input type = "text" id = "RG" name = "RG" className = "form-control" />
                                    </div>
                                    <div className = "col-md-4 col-sm-4 col-xs-12" >
                                        <label className = "LetraFormulario brlabel" > CPF: </label>
                                        <input type = "text" id = "CPF" name = "CPF" className = "form-control" />
                                    </div>
                                    <div className = "col-md-4 col-sm-4 col-xs-12" >
                                        <label className = "LetraFormulario brlabel" > Passaporte: </label>
                                        <input type = "text" id = "Passaporte" name = "Passaporte" className = "form-control" />
                                    </div>
                                </div>
                            </div >
                            <div className = "graph" >
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <h3 className = "inner-tittle" > Restrições </h3>
                                        <br></br>
                                        <textarea className = "form-control" rows = "4" cols = "50" id="Restricoes" name="Restricoes"></textarea>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-12">
                                        <h3 className = "inner-tittle" > Observações </h3>
                                        <br></br>
                                        <textarea className = "form-control" rows = "4" cols = "50" id="Observacoes" name="Observacoes"></textarea>
                                    </div>
                                </div>
                            </div >
                            <div className="text-center">
                                <a className="btn btn-md botãoVoltar" id="CancCrianca" href="/">Cencelar</a>
                                <button className="btn btn-md botãoAvançar" id="CriaCrianca">Foto</button>
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
}

export default CadastroCriançaPart1;