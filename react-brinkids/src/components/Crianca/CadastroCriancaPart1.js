import React from 'react';
import $ from 'jquery';
import Webcam from 'react-webcam';


// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/formulario_Crianca.css';
import './css/style.css';





class CadastroCriançaPart1 extends React.Component {
    /*BLOCO QUE VALIDA TODA A PARTE DO FORMULARIO
    COMO TAMBEM FAZ A REQUESIÇÃO POST*/
    ValidaCriança = (event) => {
        event.preventDefault();
        var form = document.querySelector("#form-criança");
        var data = PegaCriancadoForm(form);
        var crianca =
        {
            "firstName": String(data.Nome),
            "surName": String(data.Sbnome),
            "number": String(data.Number),
            "birthday": String(data.Data),
            "nacionality": String(data.Nacionalidade),
            "sexuality": String(data.Sexo),
            "restrictions": String(data.Restricoes),
            "observations": String(data.Observacoes)
        }
        var erros = ValidaErros(data);
        
        if(erros.length > 0){
            alert("Houve erro(s) no preechimento do formulário");
            exibeMensagensDeErro(erros);
            return;
        }
        else {
            console.log(data);
            /*$.ajax({
                method:"POST",
                url:"/crianca",
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
            })*/
        }

        function PegaCriancadoForm (form){
            var Crianca = {
                Nome: form.nome.value,
                Sbnome: form.Sbnome.value,
                Data: form.Data.value,
                Nacionalidade: form.Nacionalidade.value,
                Sexo: form.sexo.value,
                Number: form.number.value,
                Restricoes: form.Restricoes.value,
                Observacoes: form.Observacoes.value,
                Imagem: form.imagem.src,
                }

            return Crianca;
        }

        function ValidaErros (crianca){

            var erros = [];

            if (crianca.Nome.length == 0) {
                erros.push("O Nome não pode ser em branco");
            }
            if (crianca.Sbnome.length == 0) {
                erros.push("O Sobrenome não pode ser em branco");
            }
            if (crianca.Nacionalidade.length == 0) {
                erros.push("A Nascinalidade não pode ser em branco");
            }
            if (crianca.Number.length > 11) {
                erros.push("O campo não pode ter mais de 11 digitos");
            }
            if (crianca.Number.length < 8) {
                erros.push("O campo não pode ter menor que 8 digitos");
            }
            if (crianca.Number.length == 0) {
                erros.push("O campo não pode ser em branco");
            }
            if (crianca.Imagem.src == {}) {
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
    /*BLOCO QUE TIRA FOTO DA WEBCAN*/
    setRef = (webcam) => {
        this.webcam = webcam;
    }
    capture = (event) => {
        event.preventDefault();
        var imagem = document.querySelector("#imagem"); 
        const imageSrc = this.webcam.getScreenshot();
        imagem.src = imageSrc;
  
    };
    

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
                        <form id="form-criança">
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
                                    <div className = "col-md-6 col-sm-6 col-xs-12" >
                                        <label className = "LetraFormulario brlabel" > Data de Nascimento: </label>
                                        <input type = "date" id = "Data" name = "Data" className = "form-control" placeholder = "dd / mm / aa" />
                                    </div>
                                    <div className = "col-md-6 col-sm-6 col-xs-12" >
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
                                    <div className = "col-md-6 col-sm-6 col-xs-12" >
                                        <label className = "LetraFormulario" > RG/CPF/Passaporte: </label>
                                        <input type = "text" id = "number" name = "number" className = "form-control" />
                                    </div>
                                    <div className = "col-md-6 col-sm-6 col-xs-12" >
                                        <label className = "LetraFormulario" > Nacionalidade: </label>
                                        <input type = "text" id = "Nacionalidade" name = "Nacionalidade" className = "form-control" />
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
                                        <img id="imagem" className="webcan"/>
                                    </div>
                                </div>
                            </div >
                            <div className="text-center">
                                <a className="btn btn-md botao" id="CancCrianca" href="/">Cencelar</a>
                                <button className="btn btn-md botao botaoAvançar" id="CriaCrianca" onClick={this.ValidaCriança}>Avançar</button>
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
