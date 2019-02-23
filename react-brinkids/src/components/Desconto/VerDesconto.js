import React from 'react';
import axios from 'axios';
import moment from 'moment';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Desconto.css';
import './css/style.css';

var a;
class VerDesconto extends React.Component {

    constructor(props) {
        super(props);   
        this.state = {
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
            codigos: [],
            stateuser: [],
            libera: false,
            page: "",
        }


    }
    componentDidMount() {
        let temporario = [];
        axios.get(`/discount/verdesconto/${this.props.Nome}`)
            .then((response) => {
               console.log(response.data);

                this.setState({

                    list: response.data.dados,
                    Name: response.data.desconto.name,
                    Description: response.data.desconto.description,
                    TypePeople: response.data.desconto.to,
                    TypeValue: response.data.desconto.type,
                    Value: response.data.desconto.value,
                    Quant: response.data.desconto.amount,
                    TypeCog: response.data.desconto.temporalityType,
                    TypeTime: response.data.desconto.temporalityDate,
                    Date: response.data.desconto.validity,
                    codigos: response.data.desconto.codes
                })

                
            
            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })
    }

    render() {
        
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Desconto </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" >Visualizar Descontos</h3>
                        <form>
                            <div className="graph" >
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <label className="LetraFormulario">Nome:</label>
                                            <input type="text" id="name" name="name" className="form-control" value={this.state.Name} disabled />
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <label className="LetraFormulario">Descrição:</label>
                                            <textarea type="text" id="Descrição" name="Descrição" className="form-control" cols="50" rows="4" value={this.state.Description} disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-3 col-sm-3 col-xs-12">
                                            <label className="LetraFormulario"> Para:</label>
                                            <input type="text" id="Para" name="Para" className="form-control" value={this.state.TypePeople} disabled />
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-12">
                                            <label className="LetraFormulario">Quantidade:</label>
                                            <input type="text" id="Quant" name="Quant" className="form-control" value={this.state.Quant} disabled />
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-12">
                                            <label className="LetraFormulario">Tipo:</label>
                                            <input type="text" id="Tipo" name="Tipo" className="form-control" value={this.state.TypeValue} disabled />
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-12">
                                            <label className="LetraFormulario">Valor:</label>
                                            <input type="text" id="Valor" name="Valor" className="form-control" value={this.state.Value} disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4 col-xs-12">
                                            <label className="LetraFormulario">Tipo do Codigo:</label>
                                            <input type="text" id="TCod" name="TCod" className="form-control" value={this.state.TypeCog} disabled />
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-12">
                                            <label className="LetraFormulario">Intervalo:</label>
                                            <input type="text" id="Intervalo" name="Intervalo" className="form-control" value={this.state.TypeTime} disabled />
                                        </div>
                                        <div className="col-md-4 col-sm-4 col-xs-12">
                                            <label className="LetraFormulario">Validade:</label>
                                            <p id="Validade" name="Validade">{moment(this.state.Date).add(1, "days").format("DD/MM/YYYY")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form >
                        <div className="graph" >
                            <h3 className="inner-tittle" >Lista de Codigos Usados</h3>
                            <div className="tables table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th>Codigo</th>
                                            <th>Data</th>
                                            <th>Usuario</th>
                                            <th>Tipo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.list.map((desconto, indice) => {
                                            

                                            return (
                                                <tr key={desconto._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td >{desconto.number} </td>
                                                    <td >{moment(desconto.data).format("DD/MM/YYYY HH:mm")} </td>
                                                    <td >{desconto.name} </td>
                                                    {this.state.TypePeople === "Child" && (<td >Criança </td>)}
                                                    {this.state.TypePeople === "Adultd" && (<td >Adulto </td>)}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="graph" >
                            <h3 className="inner-tittle" >Lista de Codigos Gerados</h3>
                            <div className="tables table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th>Codigo</th>
                                            <th>Gerado</th>
                                            <th>Validade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.codigos.map((desconto, indice) => {
                                            return (
                                                <tr key={desconto._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td >{desconto.numberCode} </td>
                                                    {this.state.TypePeople === "Child" && (<td >Criança </td>)}
                                                    {this.state.TypePeople === "Adultd" && (<td >Adulto </td>)}
                                                    <td >{moment(this.state.Date).add(1, "days").format("DD/MM/YYYY")} </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br></br>
                        <div className="text-center">
                            <a className="btn btn-md botao" href="/Desconto">Voltar</a>
                        </div>
                    </div>
                </div>
            )
        
    }
}

export default VerDesconto;