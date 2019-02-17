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
                console.log("Dentro do axios: " + this, response.data)
                console.log(response.data[0].codes.lenght)
                const meme = response.data[0].codes.map(async(event, indice) => {

                    if (response.data[0].temporalityType === "Geral") {
                        event.statusBroadlUser.map(async (mapa, indez) => {
                            let nome = '';
                            console.log(event.idUser)
                            if (event.idUser !== undefined) {
                                if (response.data[0].to === "Child") {
                                    console.log("entrei aki")
                                    const listaCria = await axios.get(`child/indentifier/${mapa.idUser}`);
                                    nome = listaCria.data.name.firstName + " " + listaCria.data.name.surName;
                                    temporario.push({ numero: event.numberCode, name: nome, data: mapa.dateUser });
                                    return nome
                                } else {
                                    const listaAdult = axios.get(`adult/${mapa.idUser}`);
                                    nome = listaAdult.data.name.firstName + " " + listaAdult.data.name.surName;
                                    temporario.push({ numero: event.numberCode, name: nome, data: mapa.dateUser });
                                    return { numero: event.numberCode, name: nome, data: mapa.dateUser }
                                }
                            }

                        })
                    } else {
                        let nome = "";
                        if (response.data[0].to === "Child") {
                            const listaCria = axios.get(`child/indentifier/${event.statusUniqueUser}`)
                            nome = nome = listaCria.data.name.firstName + " " + listaCria.data.name.surName;
                            temporario.push({
                                numero: event.numberCode, name: nome, data: event.statusUniqueDate
                            });

                        } else {
                            const listaAdult = axios.get(`adult/${event.statusUniqueUser}`)
                            nome = listaAdult.data.name.firstName + " " + listaAdult.data.name.surName;
                            temporario.push({
                                numero: event.numberCode, name: nome, data: event.statusUniqueDate
                            });

                        }

                    }


                })
                console.log(meme)

                this.setState({

                    list: response.data,
                    Name: response.data[0].name,
                    Description: response.data[0].description,
                    TypePeople: response.data[0].to,
                    TypeValue: response.data[0].type,
                    Value: response.data[0].value,
                    Quant: response.data[0].amount,
                    TypeCog: response.data[0].temporalityType,
                    TypeTime: response.data[0].temporalityDate,
                    Date: response.data[0].validity,
                    codigos: response.data[0].codes
                })

                console.log(this.state.codigos)
                return temporario
            }).then((event) => {
                console.log("entrep", event)
                a = event
                this.setState({
                    stateuser: event,

                })

            }).then(() => {
                this.setState({
                    page: "Desconto"
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
                                        {a.map((desconto, indice) => {
                                            console.log(desconto, a)

                                            return (
                                                <tr key={desconto._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td >{desconto.numero} </td>
                                                    <td >{moment(desconto.dateUser).format("DD/MM/YYYY HH:mm")} </td>
                                                    <td >{desconto.idUser} </td>
                                                    <td >{this.state.TypePeople} </td>
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
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default VerDesconto;