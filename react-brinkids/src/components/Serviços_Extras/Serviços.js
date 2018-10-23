import React from 'react';
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import TypesInput from '../TypesInput.js';
import './estilo.css';
import axios from 'axios';

class Servico extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            indice: '',
            page: 'Lista',
            Nome: '',
            Tipo: 'Serviço',
            Text: 0,
            Quant: '',
            lista: [],

        }
        this.changueUnidade = this.changueUnidade.bind(this);
        this.changueQuant = this.changueQuant.bind(this);
        this.changueNome = this.changueNome.bind(this);
        this.changueTipo = this.changueTipo.bind(this);
        this.Cancelar = this.Cancelar.bind(this);
        this.Salvar = this.Salvar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.editar = this.editar.bind(this);
        this.Salvar2 = this.Salvar2.bind(this);

    }
    changueTipo(event) {
        this.setState({
            Tipo: event.target.value,
        })
    }
    changueNome(event) {
        this.setState({
            Nome: event.target.value,
        })
    }
    changueUnidade(event) {
        this.setState({
            Text: event.target.value,
        })
    }
    changueQuant(event) {
        this.setState({
            Quant: event.target.value,
        })
    }
    Salvar(event) {
        let listaTemporaria = this.state.lista;
        listaTemporaria.push({

            name: this.state.Nome,
            type: this.state.Tipo,
            unidade: this.state.Quant,
            preco: this.state.Text,

        });
        const data = {
            name: this.state.Nome,
            type: this.state.Tipo,
            text: this.state.Quant,
            quantity: this.state.Text,
        }

        axios.post('/extraServices', data)
            .then((response) => {


                console.log(response.data);

            })
            .catch((err) => console.log(err));

        this.setState({
            lista: listaTemporaria,
            page: 'Lista',
            Nome: '',
            Tipo: 'Serviço',
            Text: 0,
            Quant: '',
        });
    }
    componentWillMount() {

        axios.get('/extraServices')
            .then((response) => {


                console.log(response.data);
                this.setState({ lista: response.data });
            })
            .catch((err) => console.log(err));
    }
    Salvar2(event) {
        let listaTemporaria = this.state.lista;
        listaTemporaria[this.state.indice].name = this.state.Nome;
        listaTemporaria[this.state.indice].preco = this.state.Text;
        listaTemporaria[this.state.indice].type = this.state.Tipo;
        listaTemporaria[this.state.indice].unidade = this.state.Quant;
        const data = {
            name: this.state.Nome,
            preco: this.state.Text,
            type: this.state.Tipo,
            unidade: this.state.Quant,
        }
        axios.put(`/extraServices/${listaTemporaria[this.state.indice]._id}`, data)
            .then((response) => {


                console.log(response.data);

            })
            .catch((err) => console.log(err));
        this.setState({
            lista: listaTemporaria,
            page: 'Lista',
            Nome: '',
            Tipo: 'Serviço',
            Text: 0,
            Quant: '',
            indice: '',
        })
    }
    excluir(event, indice) {
        let listaTemporaria = this.state.lista;

       
        axios.delete(`/extraServices/${listaTemporaria[event]._id}`)
        .then((response) => {


            console.log(response.data);

        })
        .catch((err) => console.log(err));
        listaTemporaria.splice(event, 1);
        this.setState({
            lista: listaTemporaria,
        })
        console.log(event);

    }
    editar(event) {
        console.log(this.state.lista[event].preco);
        this.setState({
            Nome: this.state.lista[event].name,
            Tipo: this.state.lista[event].type,
            Text: this.state.lista[event].text,
            Quant: this.state.lista[event].quantity,
            page: 'Editar',
            indice: event,
        })
    }
    Cancelar(event) {
        this.setState({

            page: 'Lista',
            Nome: '',
            Tipo: 'Serviço',
            Text: 0,
            Quant: '',
        })
    }
    render() {

        if (this.state.page === 'Lista') {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Serviços </li>
                        </ol >
                    </div>
                    <div className="graph">
                        <div className="tables table-responsive">
                            <div className="graph" >


                                <div className="row" >

                                    <button className="btn btn-md botao botaoAvançar" onClick={() => this.setState({ page: 'Novo' })}>
                                        Novo
                                </button>
                                </div>
                            </div>
                            <table className="table table-hover">
                                <thead className="text-center">
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Tipo</th>
                                        <th>Unidade</th>
                                        <th>Valor/Unidade</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.lista.map((servico, indice) => {
                                        return (
                                            <tr key={indice}>
                                                <th scope="row">{(indice + 1)}</th>
                                                <td>{servico.name}</td>
                                                <td>{servico.type}</td>
                                                <td>{servico.text}</td>
                                                <td>{servico.quantity}</td>
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
        if (this.state.page === 'Novo') {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Serviços </li>
                            <li > Novo </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" > Novo </h3>
                        <div className="graph" >
                            <div className="graph" >


                                <div className="row" > <p className=" col-md-1">Nome:</p>
                                    <div className="col-md-4 col-sm-8 col-xs-12">
                                        <input type="text" className="form-control " onChange={this.changueNome} value={this.state.Nome}></input>
                                    </div>
                                </div>

                                <br></br>

                                <div className="row" > <p className="col-md-1 col-sm-8 col-xs-12">Tipo:</p>
                                    <div className="col-md-2 col-sm-8 col-xs-12">
                                        <select type="select" className=" form-control col-md-4 col-sm-8 col-xs-12 " value={this.state.Tipo} onChange={this.changueTipo} style={{ height: 47 + 'px' }}>
                                            <option value="Serviço">Serviço</option>
                                            <option value="Produto">Produto</option>
                                        </select>
                                    </div>
                                </div>

                                <br></br>

                                <div className="row" >  <p className="col-md-1 col-sm-8 col-xs-12" style={{ width: 10 + '%' }} >ValorP/unid:</p>
                                    <div className="col-md-4 col-sm-8 col-xs-12">

                                        <input type="number" id='forms' onChange={this.changueUnidade} value={this.state.Text} size='5' min='0' max='999' step=".50" />
                                    </div>
                                </div>
                                <br></br>

                                <div className="row" >  <p className="col-md-2 col-sm-8 col-xs-12" style={{ width: 10 + '%' }}>Unidade:</p>
                                    <div className="col-md-4 col-sm-8 col-xs-12">
                                        <input type="text" id='forms' onChange={this.changueQuant} value={this.state.Quant} size='10' />
                                    </div>
                                </div>
                                <br></br>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.Salvar} style={{ background: ' #2ab7ec' }}>Salvar</button>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.Cancelar} style={{ background: ' #2ab7ec' }}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.page === 'Editar') {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Serviços </li>
                            <li > Novo </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" > Novo </h3>
                        <div className="graph" >
                            <div className="graph" >


                                <div className="row" > <p className=" col-md-1">Nome:</p>
                                    <div className="col-md-4 col-sm-8 col-xs-12">
                                        <input type="text" className="form-control " onChange={this.changueNome} value={this.state.Nome}></input>
                                    </div>
                                </div>

                                <br></br>

                                <div className="row" > <p className="col-md-1 col-sm-8 col-xs-12">Tipo:</p>
                                    <div className="col-md-2 col-sm-8 col-xs-12">
                                        <select type="select" className=" form-control col-md-4 col-sm-8 col-xs-12 " value={this.state.Tipo} onChange={this.changueTipo} style={{ height: 47 + 'px' }}>
                                            <option value="Serviço">Serviço</option>
                                            <option value="Produto">Produto</option>
                                        </select>
                                    </div>
                                </div>

                                <br></br>

                                <div className="row" >  <p className="col-md-1 col-sm-8 col-xs-12" style={{ width: 10 + '%' }} >ValorP/unid:</p>
                                    <div className="col-md-4 col-sm-8 col-xs-12">

                                        <input type="number" id='forms' onChange={this.changueUnidade} value={this.state.Quant} size='5' min='0' max='999' step=".50" />
                                    </div>
                                </div>
                                <br></br>

                                <div className="row" >  <p className="col-md-2 col-sm-8 col-xs-12" style={{ width: 10 + '%' }}>Unidade:</p>
                                    <div className="col-md-4 col-sm-8 col-xs-12">
                                        <input type="text" id='forms' onChange={this.changueQuant} value={this.state.Text} size='10' />
                                    </div>
                                </div>
                                <br></br>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.Salvar2} style={{ background: ' #2ab7ec' }}>Salvar</button>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.Cancelar} style={{ background: ' #2ab7ec' }}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default Servico;