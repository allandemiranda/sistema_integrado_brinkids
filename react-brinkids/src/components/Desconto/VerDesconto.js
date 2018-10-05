import React from 'react';
import axios from 'axios';
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Desconto.css';
import './css/style.css';


class VerDesconto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Name: "exemplo",
            Description: "...................",
            TypePeople: "Criança",
            TypeValue: "Fixo",
            Value: "1000",
            Quant: "40",
            TypeCog: "Unico",
            TypeTime: "Mensal",
            Date: "05/12/2009",
            list: [],
        }

        axios.get(`/desconto/filter/${this.props.Nome}`)
            .then((response) => {
                console.log("Dentro do axios: " + this)
                this.setState({
                    list: response.data,
                    Name: response.data.name,
                    Description: response.data.description,
                    TypePeople: response.data.to,
                    TypeValue: response.data.type,
                    Value: response.data.value,
                    Quant: response.data.amount,
                    TypeCog: response.data.temporalityTaype,
                    TypeTime: response.data.temporalityDate,
                    Date: response.data.validity,
                });
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
                                        <input type="date" id="Validade" name="Validade" className="form-control" value={this.state.Date} disabled />
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
                                    <tr>
                                        <th scope="row">1</th>
                                        <td > Exemplo </td>
                                        <td > Criança </td>
                                        <td > Exemplo</td>
                                        <td > Exemplo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td > Exemplo </td>
                                        <td > Criança </td>
                                        <td > Exemplo</td>
                                        <td > mais de 1B</td>
                                    </tr>
                                    {/*  {this.state.list.map((desconto, indice) => {
                                            return (
                                                <tr key={desconto._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td >{desconto.codes.numberCode} </td>
                                                    <td >{desconto.codes.statusBoradlUser.dateUser} </td>
                                                    <td >{desconto.} </td>
                                                    <td >{desconto.to} </td>
                                                </tr>
                                            );
                                        })} */}
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
                                    <tr>
                                        <th scope="row">1</th>
                                        <td > Exemplo </td>
                                        <td > Criança </td>
                                        <td > Exemplo</td>
                                    </tr>
                                    {/*  {this.state.list.map((desconto, indice) => {
                                            return (
                                                <tr key={desconto._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td >{desconto.codes.numberCode} </td>
                                                    <td >{desconto.to} </td>
                                                    <td >{desconto.validity} </td>
                                                </tr>
                                            );
                                        })} */}
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