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
                                    <p>{this.props.Email}</p>
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
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Nome do Pai: </b></h5>
                                    <p>{this.props.Pai}</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Nome da Mae: </b></h5>
                                    <p>{this.props.Mae}</p>
                                </div>
                            </div>
                        </div>
                    </div >
                    <br></br>
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Carteira de Trabalho </h3>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Número: </b></h5>
                                    <p>{this.props.CTNumber}</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Série: </b></h5>
                                    <p>{this.props.CTSerie}</p>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-3 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> PIS/PASEP: </b></h5>
                                    <p>{this.props.CTPIS}</p>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> UF: </b></h5>
                                    <p>{this.props.CTUF}</p>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Data da Emissão: </b></h5>
                                    <p>{this.props.CTData}</p>
                                    <p style ={{fontSize: 10 + "px"}}>OBS: A data está em formato americano, ler-se aaaa/dd/mm</p>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Local da Emissão: </b></h5>
                                    <p>{this.props.CTLocal}</p>
                                </div>
                            </div>
                        </div>
                    </div >
                    <br></br>
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > RG </h3>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> UF: </b></h5>
                                    <p>{this.props.RGUF}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Data da Emissão: </b></h5>
                                    <p>{this.props.RGData}</p>
                                    <p style ={{fontSize: 10 + "px"}}>OBS: A data está em formato americano, ler-se aaaa/dd/mm</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Local da Emissão: </b></h5>
                                    <p>{this.props.RGLocal}</p>
                                </div>
                            </div>
                        </div>
                    </div >
                    <br></br>
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Titulo de Eleitor </h3>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Número: </b></h5>
                                    <p>{this.props.TENumero}</p>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> UF: </b></h5>
                                    <p>{this.props.TEUF}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Zona Eleitoral: </b></h5>
                                    <p>{this.props.TEZona}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Seção Eleitoral: </b></h5>
                                    <p>{this.props.TESecao}</p>
                                </div>
                            </div>
                        </div>
                    </div >
                    <br></br>
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Certidão de Rezervista </h3>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Número: </b></h5>
                                    <p>{this.props.CRNumero}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Série: </b></h5>
                                    <p>{this.props.CRserie}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Categoria: </b></h5>
                                    <p>{this.props.CRCat}</p>
                                </div>
                            </div>
                        </div>
                    </div >
                    <br></br>
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Passaporte </h3>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Número: </b></h5>
                                    <p>{this.props.PNumero}</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Tipo: </b></h5>
                                    <p>{this.props.PTipo}</p>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Pais Emissor: </b></h5>
                                    <p>{this.props.PPE}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Data de Emissão: </b></h5>
                                    <p>{this.props.PDataE}</p>
                                    <p style ={{fontSize: 10 + "px"}}>OBS: A data está em formato americano, ler-se aaaa/dd/mm</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Data de Validade: </b></h5>
                                    <p>{this.props.PDataV}</p>
                                    <p style ={{fontSize: 10 + "px"}}>OBS: A data está em formato americano, ler-se aaaa/dd/mm</p>
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > CNH </h3>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Registro: </b></h5>
                                    <p>{this.props.CNReg}</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Categoria: </b></h5>
                                    <p>{this.props.CNCat}</p>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Local de Emissão: </b></h5>
                                    <p>{this.props.CNLocal}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Data de Emissão: </b></h5>
                                    <p>{this.props.CNDataE}</p>
                                    <p style ={{fontSize: 10 + "px"}}>OBS: A data está em formato americano, ler-se aaaa/dd/mm</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Data de Validade: </b></h5>
                                    <p>{this.props.CNDataV}</p>
                                    <p style ={{fontSize: 10 + "px"}}>OBS: A data está em formato americano, ler-se aaaa/dd/mm</p>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Observação: </b></h5>
                                    <p>{this.props.CNObs}</p>
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Funcionario </h3>
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Cargo Atual: </b></h5>
                                    <p>{this.props.FCA}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Data de Admissão: </b></h5>
                                    <p>{this.props.FDA}</p>
                                    <p style ={{fontSize: 10 + "px"}}>OBS: A data está em formato americano, ler-se aaaa/dd/mm</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Registro Interno: </b></h5>
                                    <p>{this.props.FRI}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Observação </h3>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <p>{this.props.Observacao}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        )
    }
}

export default ConfirmaFuncionario;