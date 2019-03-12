import React , { Component } from 'react';
import axios from 'axios';
import $ from 'jquery'
import TypesInput from '../TypesInput.js';
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Desconto.css';
import './css/style.css';
import moment from 'moment';
import ComprovanteDesconto from '../Comprovante/comprovantedesconto.js';

class Desconto extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dadosComprovante:"",
            comprovante:false,
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
            erroDesconto:false,
        }

        this.ChangeValue = this.ChangeValue.bind(this);
       
        this.cancelar = this.cancelar.bind(this);
    }
    sair=()=>{
        this.props.history.push("/");
    }
    cancelar(evente) {
        this.sair();
    }
    //Bloco que muda o status para o atual do formulario.
    ChangeValue(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    //Função que Valida o Aniversario

    ValidaDesconto = (event) => {
        event.preventDefault();

        var erros = ValidaErros(this.state);
        if (erros.length > 0) {
            $("#alertDiv").addClass('alert-danger').removeClass('displaynone');
            $("#alertDiv").textContent = "<b>ERRO!<b> Ah algo de errado no seu formulário";
            return;
        }
        else {
            $("#alertDiv").addClass('displaynone');
            this.setState({
                page: "Temporaridade"
            })
        }
        function ValidaErros(desc) {

            var erros = [];
            //ADD Class
            if (desc.Name.length === 0) {
                $("#Nome").addClass('errorBorder');
                erros.push("O Nome não pode ser em branco");
            }
            if (desc.Description.length === 0) {
                $("#Description").addClass('errorBorder');
                erros.push("A Descrição do Desconto não pode ser em branco");
            }
            if (desc.TypePeople.length === 0) {
                $("#TP").addClass('errorBorder');
                erros.push("O Para Quem não pode ser em branco");
            }
            
            if (desc.TypeValue.length === 0) {
                $("#TV").addClass('errorBorder');
                erros.push("O Tipo não pode ser em branco");
            }
            if (desc.Value.length === 0) {
                $("#Value").addClass('errorBorder');
                erros.push("O Valor não pode ser em branco");
            }
            if (desc.Quant.length === 0) {
                $("#Quant").addClass('errorBorder');
                erros.push("A Quantidade não pode ser em branco");
            }

            //Removendo Class
            if (desc.Name.length != 0) {
                $("#Nome").removeClass('errorBorder');
            }
            if (desc.Description.length != 0) {
                $("#Description").removeClass('errorBorder');
            }
            if (desc.TypePeople.length != 0) {
                $("#TP").removeClass('errorBorder');
            }
            if (desc.TypeValue.length != 0) {
                $("#TV").removeClass('errorBorder');
            }
            if (desc.Value.length != 0) {
                $("#Value").removeClass('errorBorder');
            }
            if (desc.Quant.length != 0) {
                $("#Quant").removeClass('errorBorder');
            }
            return erros;
        }
    }

    ValidaTemporariedade = (event) => {
        event.preventDefault();

        console.log(this.state);

        var erros = [];

        if (this.state.TypeTime === "") {
            $("#TT").addClass('errorBorder');
            erros.push("Intervalo não pode ser em branco")
        }
        if (this.state.TypeCog === "") {
            $("#TC").addClass('errorBorder');
            erros.push("Tipo de Código não pode ser em branco")
        }
        if (this.state.Date === "") {
            $("#Date").addClass('errorBorder');
            erros.push("A Data não pode ser em branco")
        }
        //Remove Class
        if (this.state.TypeTime != "") {
            $("#TT").removeClass('errorBorder');
        }
        if (this.state.TypeCog != "") {
            $("#TC").removeClass('errorBorder');
        }
        if (this.state.Date != "") {
            $("#Date").removeClass('errorBorder');
        }
        //Valida erros
        if (erros.length > 0) {
            $("#alertDiv").addClass('alert-danger').removeClass('displaynone');
            return;
        }
        else {
            $("#alertDiv").addClass('displaynone');
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
                .then((response) => {
                    console.log(response.data)
                    this.setState({
                        list: response.data,
                        page: "MostraDesconto",
                        dadosComprovante:response.data,

                    })
                }).catch((error) => {
                    this.state.erroDesconto = true;
                    console.log(error)//LOG DE ERRO
                    //alert("Erro ao Gerar Desconto");
                    // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                    // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                    // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                })
        }
    }

    Imprimir = () => {
       this.setState({
        comprovante:true,
       })
    }
    NovoDesconto = () => {
        this.setState({
            page: "Desconto",
            Name: "",
            Description: "",
            Value: "",
            Quant: "",
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
                        <div id="alertDiv" className="alert displaynone" role="alert">
                            <b>ERRO!</b> Ah algo de errado em seu formulario.
                        </div>
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
                                            <label className="LetraFormulario" id="TP">Para:</label>
                                            <br></br>
                                            <label className="radio-inline"><input type="radio" id="Crianca" name="TypePeople" value="Child" onClick={this.ChangeValue} /><p className="LetraFormulario">  Criança</p></label>
                                            <label className="radio-inline"><input type="radio" id="Adulto" name="TypePeople" value="Adult" onClick={this.ChangeValue} /><p className="LetraFormulario">  Adulto</p></label>
                                            <br></br>
                                            <label className="LetraFormulario">Quantidade:</label>
                                            <input className="form-control" type="number" id="Quant" min={"0"} name="Quant" value={this.state.Quant} onChange={this.ChangeValue} />
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <label className="LetraFormulario" id="TV">Tipo:</label>
                                            <br></br>
                                            <label className="radio-inline"><input type="radio" id="Porcentagem" name="TypeValue" value="Porcentagem" onClick={this.ChangeValue} /><p className="LetraFormulario">   Porcentagem</p></label>
                                            <label className="radio-inline"><input type="radio" id="Fixo" name="TypeValue" value="Fixo" onClick={this.ChangeValue} /><p className="LetraFormulario">    Fixo</p></label>
                                            <br></br>
                                            <label className="LetraFormulario">Valor:</label>
                                            <input className="form-control" type="number" min="0" step=".01" id="Value" name="Value" value={this.state.Value} onChange={this.ChangeValue} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="text-center">
                               <a href="/Desconto"><button type="button"className="btn btn-md botao" >Cancelar</button></a>

                                <button className="btn btn-md botao botaoAvançar" onClick={this.ValidaDesconto}>Próximo</button>
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
                    <div className="container-fluid" >
                    </div>
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Desconto </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" >Temporaridade</h3>
                        <div id="alertDiv" className="alert displaynone" role="alert">
                            <b>ERRO!</b> Ah algo de errado em seu formulario.
                        </div>
                        <form>
                            <div className="graph" >
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <label className="LetraFormulario" id="TC">Tipo de Código:</label>
                                            <br></br>
                                            <label className="radio-inline"><input type="radio" id="Geral" name="TypeCog" value="Geral" onClick={this.ChangeValue} /><p className="LetraFormulario">Geral</p></label>
                                            <label className="radio-inline"><input type="radio" id="Unico" name="TypeCog" value="Unico" onClick={this.ChangeValue} /><p className="LetraFormulario">Único</p></label>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <label className="LetraFormulario" id="TT">Intervalo:</label>
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
                        </form >
                    </div>
                </div>
            )
        }
        else if (this.state.page === "MostraDesconto") {
            return (
                <div className="container-fluid" >
                    <div className="container-fluid" >
                        {this.state.erroDesconto &&
                            (<div className="alert lert-danger" role="alert" style ={{ background: "#ff6347",width: 100 + '%' }}>
                                <strong style={{ color: 'white' }}>Ocorreu um erro ao gerar o desconto</strong>
                            </div>)
                        }
                    </div>
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
                                        {this.state.list.codes.map((desconto, indice) => {
                                            return (
                                                <tr key={desconto._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td > {desconto.numberCode} </td>
                                                    <td >{this.state.list.type} </td>
                                                    <td >{this.state.list.value} </td>
                                                   {this.state.list.to==="Child"&&( <td >Criança </td>)}
                                                   {this.state.list.to==="Adult"&&( <td >Adulto </td>)}
                                                    <td >{this.state.list.temporalityType} </td>
                                                    <td >{this.state.list.temporalityDate} </td>
                                                    <td >{moment(this.state.list.validity).add(1,"days").format("DD/MM/YYYY")} </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <br></br>
                            {this.state.comprovante && (<ComprovanteDesconto
                        tabela={this.state.dadosComprovante}
                        serviso="PASSAPORTE"
                        teste={this.state.comprovante}
                    />)}
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