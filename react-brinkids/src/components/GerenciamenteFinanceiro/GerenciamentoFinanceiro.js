import React from 'react';




import '../../assets/style/fontawesome.css';

import '../../assets/style/all.css';
import './css/GF.css';
import axios from 'axios';
//import { Tabs, Tab } from 'react-bootstrap-tabs';


class GerenciamentoFinanceiro extends React.Component {
	constructor(props) {
		super(props);

		this.state = {


			GraficoTab: "tab-current",
			FluxoTab: "",

			sectionGrafico: "content-current",
			sectionFluxo: "",

		};
		this.selectGrafico = this.selectGrafico.bind(this);
		this.selectFluxo = this.selectFluxo.bind(this);
	}

	selectGrafico(event) {
		this.setState({
			GraficoTab: "tab-current",
			FluxoTab: "",

			sectionGrafico: "content-current",
			sectionFluxo: "",
		})
	}
	selectFluxo(event) {
		this.setState({
			GraficoTab: "",
			FluxoTab: "tab-current",

			sectionGrafico: "",
			sectionFluxo: "content-current",
		})
	}


	
	render() {
		return (

			<div className="container-fluid" >
				<script src="js/jquery-1.10.2.min.js"></script>
				<script type="text/javascript" src="js/modernizr.custom.04022.js"></script>

				<div className="sub-heard-part" >
					<ol className="breadcrumb m-b-0" >
						<li > < a href="/" > Home </a></li >
						<li > Gerenciamento Financeiro </li >
					</ol >
				</div>

				
				<div id="tabs" class="tabs">

					<div class="graph">
						<nav>
							<ul>
								<li id="GraficoTab" name="GraficoTab" onClick={this.selectGrafico} className={this.state.GraficoTab}><a><span class="far fa-chart-bar"></span> <span>Grafico</span></a></li>
								
								<li id="FluxoTab" name="FluxoTab" onClick={this.selectFluxo} className={this.state.FluxoTab}><a><span class="fas fa-chart-pie"></span> <span>Fluxo Operacional</span></a></li>


							</ul>
						</nav>
						<div className="content tab">
							<section className={this.state.sectionGrafico}  >
							<div class="graph graph-visual tables-main">
                                <div class="tables">
                                    <table class="table table-hover"> 
                                        <thead> 
                                            <tr> 
                                                <th>#</th> 
                                                <th style={{textAlign: "center"}}>Criança</th> 
                                                <th style={{textAlign: "center"}}>Idade</th>
                                                <th style={{textAlign: "center"}}>Restrição</th>
                                                <th style={{textAlign: "center"}}>Obs.</th>
                                                <th style={{textAlign: "center"}}>Entrada</th>
                                                <th style={{textAlign: "center"}}>Gaveta</th>
                                                <th style={{textAlign: "center"}}>Responsavel</th>
                                                <th style={{textAlign: "center"}}>Parentesco</th>
                                                <th style={{textAlign: "center"}}>Telefone</th>
                                                <th style={{textAlign: "center"}}>Obs.</th>
                                            </tr> 
                                        </thead> 
                                        <tbody> 
                                            <tr>
                                                <th scope="row" href="../foto-tirada-na-entrada">01</th> 
                                                <td style={{textAlign: "center"}}><a style={{color: "inherit"}} href="../perfil-da-criança">Allan de Miranda</a></td>
                                                <td style={{textAlign: "center"}}>10 anos</td>
                                                <td style={{textAlign: "center"}} onclick="alert('Texto com as Restrições da Criança!');"><a>SIM</a></td>
                                                <td style={{textAlign: "center"}} onclick="alert('Texto com as Observações da Criança!');">SIM</td>
                                                <td style={{textAlign: "center"}}>13:12h</td>
                                                <td style={{textAlign: "center"}}>5</td>
                                                <td style={{textAlign: "center"}}><a style={{color: "inherit"}} href="../perfil-do-responsável">Allan de Miranda</a></td>
                                                <td style={{textAlign: "center"}}>Pai</td>
                                                <td style={{textAlign: "center"}}>(84)91151610</td>
                                                <td style={{textAlign: "center"}} onclick="alert('Texto com as Observações do Responsável!');"><a>SIM</a></td>                                                
                                            </tr>
                                           
                                        </tbody> 
                                    </table>
                                </div>
                            </div>
							</section>
							<section className={this.state.sectionFluxo}>
							<div class="graph graph-visual tables-main">
                                <div></div>
								<div class="tables">
                                    <table class="table table-hover"> 
                                        <thead> 
                                            <tr> 
                                                <th>#</th> 
                                                <th style={{textAlign: "center"}}>Criança</th> 
                                                <th style={{textAlign: "center"}}>Idade</th>
                                                <th style={{textAlign: "center"}}>Restrição</th>
                                                <th style={{textAlign: "center"}}>Obs.</th>
                                                <th style={{textAlign: "center"}}>Entrada</th>
                                                <th style={{textAlign: "center"}}>Gaveta</th>
                                                <th style={{textAlign: "center"}}>Responsavel</th>
                                                <th style={{textAlign: "center"}}>Parentesco</th>
                                                <th style={{textAlign: "center"}}>Telefone</th>
                                                <th style={{textAlign: "center"}}>Obs.</th>
                                            </tr> 
                                        </thead> 
                                        <tbody> 
                                            <tr>
                                                <th scope="row" href="../foto-tirada-na-entrada">01</th> 
                                                <td style={{textAlign: "center"}}><a style={{color: "inherit"}} href="../perfil-da-criança">Allan de Miranda</a></td>
                                                <td style={{textAlign: "center"}}>10 anos</td>
                                                <td style={{textAlign: "center"}} ><a onclick={()=>alert('Texto com as Restrições da Criança!')}>SIM</a></td>
                                                <td style={{textAlign: "center"}}>SIM</td>
                                                <td style={{textAlign: "center"}}>13:12h</td>
                                                <td style={{textAlign: "center"}}>5</td>
                                                <td style={{textAlign: "center"}}><a style={{color: "inherit"}} href="../perfil-do-responsável">Allan de Miranda</a></td>
                                                <td style={{textAlign: "center"}}>Pai</td>
                                                <td style={{textAlign: "center"}}>(84)91151610</td>
                                                <td style={{textAlign: "center"}} onclick="alert('Texto com as Observações do Responsável!');"><a>SIM</a></td>                                                
                                            </tr>
                                           
                                        </tbody> 
                                    </table>
                                </div>
                            </div>
							</section>

						</div>
					</div>


				</div>
			</div>
		);
	}
}
export default GerenciamentoFinanceiro;
