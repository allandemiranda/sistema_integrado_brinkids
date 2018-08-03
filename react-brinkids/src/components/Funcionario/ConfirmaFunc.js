import React from 'react';

import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/style.css';
import './css/Cadastro_Funcionario.css';

class ConfirmaFuncionario extends React.Component {
    render() {
        return (
            <div className = "container-fluid" >
                <div className = "sub-heard-part" >
                    <ol className = "breadcrumb m-b-0" >
                        <li > < a href = "/" > Home </a></li >
                        <li > Funcionário </li>
                        <li > Novo </li>
                    </ol >
                </div>
                <div className = "graph-visual" >
                    <h3 className = "inner-tittle" > Confirmando Cadastro </h3>
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Dados Pessoais </h3>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Nome: </b></h5>
                                    <p>{this.props.Name}</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> E-Mail: </b></h5>
                                    <p>{this.props.email}</p>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Data de Aniversário: </b></h5>
                                    <p>{this.props.DateAni}</p>
                                    <p style ={{fontSize: 10 + "px"}}>OBS: A data está em formato americano, ler-se aaaa/dd/mm</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Sexo: </b></h5>
                                    <p>{this.props.Sexo}</p>
                                </div>    
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Nacionalidade: </b></h5>
                                    <p>{this.props.Nacionalidade}</p>
                                </div>                            
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> CPF: </b></h5>
                                    <p>{this.props.cpf}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Estado Civil: </b></h5>
                                    <p>{this.props.EstadoC}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Contato: </b></h5>
                                    <p>{this.props.Numero}</p>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Escolaridade: </b></h5>
                                    <p>{this.props.Escola}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Cidade de Nascimento: </b></h5>
                                    <p>{this.props.CidNasc}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Uf de Nascimento: </b></h5>
                                    <p>{this.props.UFNasc}</p>
                                </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Nome do Pai: </b></h5>
                                    <p>{this.props.Pai}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Nome da Mae: </b></h5>
                                    <p>{this.props.Mae}</p>
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Carteira de Trabalho </h3>
                    </div >
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > RG </h3>
                    </div >
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Titulo de Eleitor </h3>
                    </div >
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Certidão de Rezervista </h3>
                    </div >
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Passaporte </h3>
                    </div >
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > CNH </h3>
                    </div >
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Funcionario </h3>
                    </div >
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Observação </h3>
                    </div >
                </div>
            </div>
        )
    }
}

export default ConfirmaFuncionario;


