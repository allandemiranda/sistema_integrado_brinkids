import React from 'react'
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import lista from './lista.js';
import Cargo from './cargos.js';
import TypesInput from '../TypesInput.js';



class Gerador extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Page: 'Lista',
            list: lista,
            listadecargos: Cargo,
            evento: null,
            listafuncoes: [],
        }
        this.changueselect = this.changueselect.bind(this);
        this.selecionaFuncao = this.selecionaFuncao.bind(this);
    }
    selecionaFuncao(event){

    }
    changueselect(event) {
        this.setState({ evento: event });
        console.log(`Option selected:`, event.target.indice);
    }
    render() {
        if (this.state.Page === 'Lista') {
            return (

                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Gerenciador De Funções </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" > Funcionarios </h3>
                        <div className="graph" >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th >Nome</th>
                                        <th >CPF</th>
                                        <th className="text-center"> Cargo </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.list.map((findAdult, indice) => {

                                        return (
                                            <tr key={indice + 1}>
                                                <th scope="row">{indice + 1}</th>
                                                <td > {findAdult.name.firstName + ' ' + findAdult.name.surName} </td>
                                                <td > {findAdult.cpf} </td>
                                                <td className="text-center">
                                                    <div className="form-group">

                                                        <select className="form-control" style={{ height: 47 + 'px' }} id="exampleFormControlSelect2" onChange={this.changueselect}>
                                                            <option>{findAdult.officialPosition.name}</option>
                                                            {this.state.listadecargos.map((cargos, indice1) => {
                                                                return (
                                                                    <option key={indice1 + 1}>{cargos.name}</option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <button className="btn btn-md botao botaoAvançar" onClick={() => this.setState({ Page: 'Cargos' })}> Vizualizar cargos</button>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.Page === 'Cargos') {
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
                            <h3 className="inner-tittle" > Cargos </h3>
                            <table className="table table-hover">
                                <thead className="text-center">
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Classe</th>

                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.listadecargos.map((servico, indice) => {
                                        return (
                                            <tr key={indice}>
                                                <th scope="row">{(indice + 1)}</th>
                                                <td>{servico.name}</td>

                                                <td>{servico.classe}</td>

                                                <td><button onClick={() => this.editar(indice)}><span className="glyphicon">&#x270f;</span></button> <button onClick={() => this.excluir(indice)}><span className="glyphicon">&#xe014;</span></button></td>

                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <button className="btn btn-md botao botaoAvançar" onClick={() => this.setState({ Page: 'Novo' })}>
                            Criar Novo Cargo
                                </button>
                    </div>
                </div>
            );
        }
        if (this.state.Page === 'Novo') {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Desconto </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" >Novo Cargo</h3>
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
                                            <h3 className="inner-tittle" >Funçoes</h3>
                                            <table className="table table-hover">
                                                <thead className="text-center">
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Nome</th>
                                                        <th>Classe</th>

                                                        <th> </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.listadecargos.map((servico, indice) => {
                                                        return (
                                                            <tr key={indice}>
                                                                <th scope="row">{(indice + 1)}</th>
                                                                <td>{servico.name}</td>

                                                                <td>{servico.classe}</td>

                                                                <td><input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaFuncao(servico._id)} /></td>

                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="text-center">
                                <a className="btn btn-md botao" href="/">Cencelar</a>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.ValidaDesconto}>Proximo</button>
                            </div>
                            <div>
                                <ul id="mensagens-erro" style={{ color: "red" }}></ul>
                            </div>
                        </form >
                    </div>
                </div>
            );
        }
    }
}
export default Gerador;    