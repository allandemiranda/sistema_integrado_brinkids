import React from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import $ from 'jquery';
import TypesInput from '../TypesInput.js';
import ConfDadosAni from './ConfirmaDadosAniversariante.js'
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Aniversario.css';
import './css/style.css';

class VisualizarAniversario extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            list: [],
            Page: "Lista",

            TituloDoAni: "",
            NomeDoAni: "",
            IdadeDoAni: "",
            DataDoAni: "",
            HoraInicio: "",
            HoraFinal: "",
            QuantCrianca: "",
            QuantAdulto: "",
            DescriçãoDoAni: "",
            ObsDoAni: "",
            ValorPg: "",
            MetodoPg: "",
        }
        this.requisicao = this.requisicao.bind(this);
        this.editar = this.editar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.inteval = this.inteval.bind(this);

    }
    editar(event) {
        let aniversarioAtual = this.state.list[event];
        this.setState({
            TituloDoAni: aniversarioAtual.title,
            NomeDoAni: aniversarioAtual.birthdayPerson.name,
            IdadeDoAni: aniversarioAtual.birthdayPerson.age,
            DataDoAni: aniversarioAtual.start,
            HoraInicio: aniversarioAtual,
            HoraFinal: aniversarioAtual,
            QuantCrianca: aniversarioAtual,
            QuantAdulto: aniversarioAtual,
            DescriçãoDoAni: aniversarioAtual,
        
            ObsDoAni: aniversarioAtual,
            ValorPg: aniversarioAtual,
            MetodoPg: aniversarioAtual,
        })
    }
    requisicao(event) {
        axios.get('/birthday')
            .then((response) => {
                this.setState({ list: response.data });
                console.log(response.data);
            })
            .catch((err) => console.log(err));
    }
    componentWillMount() {

        this.requisicao();
        this.inteval = setInterval(this.requisicao, 60000);

    }

    render() {
        if (this.state.Page === "Lista") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li >Visualizar Aniversarios </li>
                        </ol >
                    </div>
                    <div className="graph-visual">
                        <h3 className="inner-tittle">Aniversarios </h3>
                        <div className="graph" >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Titulo</th>
                                        <th >Aniversariante</th>
                                        <th >Responsavel</th>
                                        <th> Data </th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.list.map((findAdult, indice) => {


                                        return (
                                            <tr key={indice + 1}>
                                                <th scope="row">{indice + 1}</th>
                                                <td > {findAdult.title} </td>
                                                <td > {findAdult.birthdayPerson.name} </td>
                                                <td > {findAdult.cpf} </td>
                                                <td > {findAdult.start} </td>
                                                <td><button onClick={() => this.editar(indice)}><span className="glyphicon">&#x270f;</span></button> <button onClick={() => this.excluir(indice)}><span className="glyphicon">&#xe014;</span></button></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.Page === "ConfDadosAni") {
            return (
                <div>
                    <ConfDadosAni Titulo={this.state.TituloDoAni} Name={this.state.NomeDoAni} Idade={this.state.IdadeDoAni}
                        Date={this.state.DataDoAni} HI={this.state.HoraInicio} HF={this.state.HoraFinal}
                        CC={this.state.QuantCrianca} AC={this.state.QuantAdulto} Valor={this.state.ValorPg} Metodo={this.state.MetodoPg}
                        Descricao={this.state.DescriçãoDoAni} Obs={this.state.ObsDoAni} />
                    <div className="text-center">
                        <button className="btn btn-md botao" onClick={this.VoltaFormAni}>Voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.AvancaListConv}>Avançar</button>
                    </div>
                </div>
            )
        }
    }
}
export default VisualizarAniversario; 