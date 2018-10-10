import React from 'react';
import axios from 'axios';
import TypesInput from '../TypesInput.js';
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Desconto.css';
import './css/style.css';


class Desconto extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            page: "Desconto",
            Name: "",
            Description: "",
            TypePeople: "",
            TypeValue: "",
            Value: "",
            Quant: "",
            TypeCog: "",
            TypeTime: "",
            Date: "",
            list: [],
        }

        this.ChangeValue = this.ChangeValue.bind(this);

    }

    //Bloco que muda o status para o atual do formulario.
    ChangeValue(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    //Função que Valida o Aniversario

    ValidaDesconto = (event) => {
        event.preventDefault();

        console.log(this.state);

        var erros = ValidaErros(this.state);

        if (erros.length > 0) {
            exibeMensagensDeErro(erros);
        }
        else {
            this.setState({
                page: "Temporaridade"
            })
        }
        function ValidaErros(desc) {

            var erros = [];

            if (desc.Name.length === 0) {
                erros.push("O Nome não pode ser em branco");
            }
            if (desc.Description.length === 0) {
                erros.push("A Descrição do Desconto não pode ser em branco");
            }
            if (desc.TypePeople.length === 0) {
                erros.push("O Para Quem não pode ser em branco");
            }
            if (desc.TypeValue.length === 0) {
                erros.push("O Tipo não pode ser em branco");
            }
            if (desc.Value.length === 0) {
                erros.push("O Valor não pode ser em branco");
            }
            if (desc.Quant.length === 0) {
                erros.push("A Quantidade não pode ser em branco");
            }
            console.log(erros);
            return erros;
        }

        function exibeMensagensDeErro(erros) {
            var ul = document.querySelector("#mensagens-erro");
            ul.innerHTML = "";

            erros.forEach(function (erro) {
                var li = document.createElement("li");
                li.textContent = erro;
                ul.appendChild(li);
            });
        }
    }

    ValidaTemporariedade = (event) => {
        event.preventDefault();

        console.log(this.state);

        var erros = [];

        if (this.state.TypeTime === "") {
            erros.push("Intervalo não pode ser em branco")
        }
        if (this.state.TypeCog === "") {
            erros.push("Tipo de Código não pode ser em branco")
        }
        if (this.state.Date === "") {
            erros.push("A Data não pode ser em branco")
        }
        if (erros.length > 0) {
            exibeMensagensDeErro(erros);
        }
        else {
            var formData = new FormData();

            formData.append('name', String(this.state.Name))
            formData.append('description', String(this.state.Description))
            formData.append('to', String(this.state.TypePeople))
            formData.append('amount', String(this.state.Quant))
            formData.append('type', String(this.state.TypeValue))
            formData.append('value', String(this.state.Value))
            formData.append('temporalityType', String(this.state.TypeCog))
            formData.append('temporalityDate', String(this.state.TypeTime))
            formData.append('validity', String(this.state.Date))

            axios.post('/discount', formData)
                .then(function (response) {
                    this.setState({ list: response.data });
                    console.log(response);
                    if (this.state.list.length > 0) {
                        this.setState({
                            page: "MostraDesconto"
                        })
                    }
                }).catch(function (error) {
                    console.log(error)//LOG DE ERRO
                    alert("Erro ao Gerar Desconto");
                    // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                    // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                    // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                })
        }

        function ConstroiListaDesconto() {
            console.log("Entrei dentro da função");
            console.log(this.state);
            axios.get(`/desconto/filter/${this.state.Name}`)
                .then((response) => {
                    console.log("Dentro do axios: " + this)
                    this.setState({ list: response.data });
                }).catch((error) => {
                    console.log(error)//LOG DE ERRO
                    // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                    // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                    // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
                })
        }

        function exibeMensagensDeErro(erros) {
            var ul = document.querySelector("#mensagens-erro");
            ul.innerHTML = "";

            erros.forEach(function (erro) {
                var li = document.createElement("li");
                li.textContent = erro;
                ul.appendChild(li);
            });
        }
    }

    Imprimir = () => {
        window.print(this.state.list);
    }
    NovoDesconto = () => {
        this.setState({
            page: "Desconto"
        })
    }

    render() {
        if (this.state.page === "Desconto") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Desconto </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" >Novo Desconto</h3>
                        <form>
                            <div className="graph" >
                                <div className="form-group">
                                    <div className="row">
                                        <TypesInput cod={1} ClassDiv={"col-md-12 col-sm-12 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Nome: "} type={"text"} id={"Nome"} name={"Name"} Class={"form-control"}
                                            value={this.state.Name} onChange={this.ChangeValue}
                                        />
                                        <TypesInput cod={2} ClassDiv={"col-md-12 col-sm-12 col-xs-12"} Label={"True"} ClassLabel={"LetraFormulario"} NameLabel={"Descrição: "} id={"Description"} cols={"50"} rows={"4"} name={"Description"} Class={"form-control"}
                                            value={this.state.Description} onChange={this.ChangeValue}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <label className="LetraFormulario">Para:</label>
                                            <br></br>
                                            <label className="radio-inline"><input type="radio" id="Crianca" name="TypePeople" value="Child" onClick={this.ChangeValue} /><p className="LetraFormulario">  Criança</p></label>
                                            <label className="radio-inline"><input type="radio" id="Adulto" name="TypePeople" value="Adult" onClick={this.ChangeValue} /><p className="LetraFormulario">  Adulto</p></label>
                                            <br></br>
                                            <label className="LetraFormulario">Quantidade:</label>
                                            <input className="form-control" type="number" id="Quant" name="Quant" value={this.state.Quant} onChange={this.ChangeValue} />
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <label className="LetraFormulario">Tipo:</label>
                                            <br></br>
                                            <label className="radio-inline"><input type="radio" id="Porcentagem" name="TypeValue" value="Porcentagem" onClick={this.ChangeValue} /><p className="LetraFormulario">   Porcentagem</p></label>
                                            <label className="radio-inline"><input type="radio" id="Fixo" name="TypeValue" value="Fixo" onClick={this.ChangeValue} /><p className="LetraFormulario">    Fixo</p></label>
                                            <br></br>
                                            <label className="LetraFormulario">Valor:</label>
                                            <input className="form-control" type="number" id="Value" name="Value" value={this.state.Value} onChange={this.ChangeValue} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="text-center">
                                <a className="btn btn-md botao" href="/">Cancelar</a>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.ValidaDesconto}>Proximo</button>
                            </div>
                            <div>
                                <ul id="mensagens-erro" style={{ color: "red" }}></ul>
                            </div>
                        </form >
                    </div>
                </div>
            )
        }

        else if (this.state.page === "Temporaridade") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Desconto </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" >Temporaridade</h3>
                        <form>
                            <div className="graph" >
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <label className="LetraFormulario">Tipo de Código:</label>
                                            <br></br>
                                            <label className="radio-inline"><input type="radio" id="Geral" name="TypeCog" value="Geral" onClick={this.ChangeValue} /><p className="LetraFormulario">Geral</p></label>
                                            <label className="radio-inline"><input type="radio" id="Unico" name="TypeCog" value="Unico" onClick={this.ChangeValue} /><p className="LetraFormulario">Único</p></label>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <label className="LetraFormulario">Intervalo:</label>
                                            <br></br>
                                            <label className="radio-inline"><input type="radio" id="Diario" name="TypeTime" value="Diario" onClick={this.ChangeValue} /><p className="LetraFormulario"> Diario</p></label>
                                            <label className="radio-inline"><input type="radio" id="Semanal" name="TypeTime" value="Semanal" onClick={this.ChangeValue} /><p className="LetraFormulario">Semanal</p></label>
                                            <label className="radio-inline"><input type="radio" id="Mensal" name="TypeTime" value="Mensal" onClick={this.ChangeValue} /><p className="LetraFormulario">Mensal</p></label>
                                            <br></br>
                                            <label className="radio-inline"><input type="radio" id="Anual" name="TypeTime" value="Anual" onClick={this.ChangeValue} /><p className="LetraFormulario">Anual</p></label>
                                            <label className="radio-inline"><input type="radio" id="Livre" name="TypeTime" value="Livre" onClick={this.ChangeValue} /><p className="LetraFormulario">Livre</p></label>
                                            <label className="radio-inline"><input type="radio" id="Unico" name="TypeTime" value="Unico" onClick={this.ChangeValue} /><p className="LetraFormulario">Unico</p></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <TypesInput cod={1} ClassDiv={"col-md-12 col-sm-12 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Data de Validade: "} type={"date"} id={"Date"} name={"Date"} Class={"form-control"}
                                            value={this.state.Date} onChange={this.ChangeValue}
                                        />
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="text-center">
                                <a className="btn btn-md botao" href="/">Cancelar</a>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.ValidaTemporariedade}>Gerar</button>
                            </div>
                            <div>
                                <ul id="mensagens-erro" style={{ color: "red" }}></ul>
                            </div>
                        </form >
                    </div>
                </div>
            )
        }
        else if (this.state.page === "MostraDesconto") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Desconto </li>
                        </ol>
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle">Descontos Gerados</h3>
                        <div className="graph" >
                            <div className="tables table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th>Codigo</th>
                                            <th>Tipo</th>
                                            <th>Valor</th>
                                            <th>Para</th>
                                            <th>Tipo C.</th>
                                            <th>Intervalo</th>
                                            <th>Validade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.list.map((desconto, indice) => {
                                            return (
                                                <tr key={desconto._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td > {desconto.codes.numberCode} </td>
                                                    <td >{desconto.type} </td>
                                                    <td >{desconto.value} </td>
                                                    <td >{desconto.to} </td>
                                                    <td >{desconto.temporalityType} </td>
                                                    <td >{desconto.temporalityDate} </td>
                                                    <td >{desconto.validity} </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <br></br>
                            <div className="text-center">
                                <button className="btn btn-md botao botaoAvançar" onClick={this.Imprimir}>Imprimir</button>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.NovoDesconto}>Novo Desconto</button>
                                <a className="btn btn-md botao" href="/">Home</a>
                            </div>
                            <div>
                                <ul id="mensagens-erro" style={{ color: "red" }}></ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

}

export default Desconto;