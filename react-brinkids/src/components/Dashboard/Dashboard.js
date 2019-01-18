import React from 'react';




import '../../assets/style/fontawesome.css';

import '../../assets/style/all.css';
import '../../assets/sprints/solid.svg';
import './css/Dashboard.css';
import crianca from './tabelas/crianças';
import adultos from './tabelas/adultos';
import eventos from './tabelas/eventos';
import noticias from './tabelas/noticias';
import '../Comprovante/comprovante.css';
import tabelinha from '../Comprovante/tabelinha';
import axios from 'axios';
import moment from 'moment';
//import { Tabs, Tab } from 'react-bootstrap-tabs';


class DashBoard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			comprovant: false,
			colaps: false,

			teste: false,
			aba: false,

			nome: [{}, {}],
			lista: [],
			popup: true,

			adultospopup: false,

			Eventos: false,
			Eventospopup: false,

			Noticias: false,
			noticiaspopup: false,

			crincaTab: "tab-current",
			adultoTab: "",
			aniversarioTab: "",
			noticiaTab: "",

			sectionCrianca: "content-current",
			sectionAdult: "",
			sectionAniversario: "",
			sectionNoticia: "",

		};
		this.mudar = this.mudar.bind(this);
		this.mudar2 = this.mudar2.bind(this);
		this.mudar3 = this.mudar3.bind(this);
		this.mudar4 = this.mudar4.bind(this);
		this.requisicao = this.requisicao.bind(this);
		this.inteval = this.inteval.bind(this);
		this.selectCrianca = this.selectCrianca.bind(this);
		this.selectAdult = this.selectAdult.bind(this);
		this.selectAniversario = this.selectAniversario.bind(this);
		this.selectNoticia = this.selectNoticia.bind(this);
		this.idade = this.idade.bind(this);
	}
	inteval(event) {

	}
	idade(event) {
		var birthDay = event;
		var age = Math.floor(moment(new Date()).diff(moment(birthDay), 'years', true));
		console.log(age);
		return age;
	}
	selectCrianca(event) {
		this.setState({
			crincaTab: "tab-current",
			adultoTab: "",
			aniversarioTab: "",
			noticiaTab: "",

			sectionCrianca: "content-current",
			sectionAdult: "",
			sectionAniversario: "",
			sectionNoticia: "",
		})
	}
	selectAdult(event) {
		this.setState({
			crincaTab: "",
			adultoTab: "tab-current",
			aniversarioTab: "",
			noticiaTab: "",

			sectionCrianca: "",
			sectionAdult: "content-current",
			sectionAniversario: "",
			sectionNoticia: "",
		})
	}
	selectAniversario(event) {
		this.setState({
			crincaTab: "",
			adultoTab: "",
			aniversarioTab: "tab-current",
			noticiaTab: "",

			sectionCrianca: "",
			sectionAdult: "",
			sectionAniversario: "content-current",
			sectionNoticia: "",
		})
	}
	selectNoticia(event) {
		this.setState({
			crincaTab: "",
			adultoTab: "",
			aniversarioTab: "",
			noticiaTab: "tab-current",

			sectionCrianca: "",
			sectionAdult: "",
			sectionAniversario: "",
			sectionNoticia: "content-current",
		})
	}
	requisicao(event) {
		axios.get('/product')
			.then((response) => {
				this.setState({ lista: response.data });
				console.log(response.data);
			})
			.catch((err) => console.log(err));
	}
	componentWillMount() {

		this.requisicao();
		this.inteval = setInterval(this.requisicao, 60000);

	}
	componentWillUnmount() {
		clearInterval(this.inteval);
	}
	mudar() {
		!this.state.colaps ? this.setState({ colaps: true }) : this.setState({ colaps: false });

	}
	mudar2() {
		!this.state.adultospopup ? this.setState({ adultospopup: true }) : this.setState({ adultospopup: false });


	}
	mudar3() {
		!this.state.Eventospopup ? this.setState({ Eventospopup: true }) : this.setState({ Eventospopup: false });


	}
	mudar4() {

		!this.state.noticiaspopup ? this.setState({ noticiaspopup: true }) : this.setState({ noticiaspopup: false });

	}
	render() {





		return (

			<div className="container-fluid" >
				<script src="js/jquery-1.10.2.min.js"></script>
				<script type="text/javascript" src="js/modernizr.custom.04022.js"></script>
				{this.state.popup &&

					(<div className="alert alert-success" role="alert">
						<strong>Tudo ok!</strong> O Limite De Crianças Não foi Atingido.
					</div>)
				}


				{!this.state.popup &&

					(<div className="alert alert-danger" role="alert">
						<strong>Aviso!</strong> O Limite De Crinaças Foi Atingido.
					</div>)

				}

				<div className="sub-heard-part" >
					<ol className="breadcrumb m-b-0" >
						<li > < a href="/" > Home </a></li >
						<li > DashBoard </li >
					</ol >
				</div>


				<div id="tabs" class="tabs">

					<div class="graph">
						<nav>
							<ul>
								<li id="ddd" name="crincaTab" onClick={this.selectCrianca} className={this.state.crincaTab}><a class="icon-shop"><span class="lnr lnr-user"></span> <span>Passaporte</span></a></li>

								<li name="aniversarioTab" onClick={this.selectAniversario} className={this.state.aniversarioTab}><a class="icon-food"><span class="lnr lnr-rocket"></span> <span>Aniversarios</span></a></li>


							</ul>
						</nav>
						<div className="content tab">
							<section className={this.state.sectionCrianca}  >
								<div class="graph graph-visual tables-main">
									<div class="tables">
										<table class="table table-hover">
											<thead>
												<tr>
													<th>#</th>
													<th style={{ textAlign: "center" }}>Criança</th>
													<th style={{ textAlign: "center" }}>Idade</th>
													<th style={{ textAlign: "center" }}>Restrição</th>
													<th style={{ textAlign: "center" }}>Obs.</th>
													<th style={{ textAlign: "center" }}>Entrada</th>
													<th style={{ textAlign: "center" }}>Gaveta</th>
													<th style={{ textAlign: "center" }}>Responsavel</th>
													<th style={{ textAlign: "center" }}>Parentesco</th>
													<th style={{ textAlign: "center" }}>Telefone</th>
													<th style={{ textAlign: "center" }}>Obs.</th>
												</tr>
											</thead>
											<tbody>
												{this.state.lista.map((event, index) => {
													return (
														<tr>
															<th scope="row" href="../foto-tirada-na-entrada">{index + 1}</th>
															<td style={{ textAlign: "center" }}><a style={{ color: "inherit" }} href="../perfil-da-criança">{event.children.name}</a></td>
															<td style={{ textAlign: "center" }}>{this.idade(event.children.birthday)}</td>
															<td style={{ textAlign: "center" }} onclick="alert('Texto com as Restrições da Criança!');"><a>SIM</a></td>
															<td style={{ textAlign: "center" }} onclick="alert('Texto com as Observações da Criança!');">SIM</td>
															<td style={{ textAlign: "center" }}>13:12h</td>
															<td style={{ textAlign: "center" }}>{event.belongings}</td>
															<td style={{ textAlign: "center" }}><a style={{ color: "inherit" }} href="../perfil-do-responsável">{event.adult.name}</a></td>
															<td style={{ textAlign: "center" }}>Pai</td>
															<td style={{ textAlign: "center" }}>{event.adult.phone}</td>
															<td style={{ textAlign: "center" }} onclick="alert('Texto com as Observações do Responsável!');"><a>SIM</a></td>
														</tr>
													);
												})}


											</tbody>
										</table>
									</div>
								</div>
							</section>
							<section className={this.state.sectionAniversario}>
								<div class="graph graph-visual tables-main">
									<div class="tables">
										<table class="table table-hover">
											<thead>
												<tr>
													<th>#</th>
													<th style={{ textAlign: "center" }}>Criança</th>
													<th style={{ textAlign: "center" }}>Idade</th>
													<th style={{ textAlign: "center" }}>Restrição</th>
													<th style={{ textAlign: "center" }}>Obs.</th>
													<th style={{ textAlign: "center" }}>Entrada</th>
													<th style={{ textAlign: "center" }}>Gaveta</th>
													<th style={{ textAlign: "center" }}>Responsavel</th>
													<th style={{ textAlign: "center" }}>Parentesco</th>
													<th style={{ textAlign: "center" }}>Telefone</th>
													<th style={{ textAlign: "center" }}>Obs.</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th scope="row" href="../foto-tirada-na-entrada">01</th>
													<td style={{ textAlign: "center" }}><a style={{ color: "inherit" }} href="../perfil-da-criança">Allan de Miranda</a></td>
													<td style={{ textAlign: "center" }}>10 anos</td>
													<td style={{ textAlign: "center" }} ><a onclick={() => alert('Texto com as Restrições da Criança!')}>SIM</a></td>
													<td style={{ textAlign: "center" }}>SIM</td>
													<td style={{ textAlign: "center" }}>13:12h</td>
													<td style={{ textAlign: "center" }}>5</td>
													<td style={{ textAlign: "center" }}><a style={{ color: "inherit" }} href="../perfil-do-responsável">Allan de Miranda</a></td>
													<td style={{ textAlign: "center" }}>Pai</td>
													<td style={{ textAlign: "center" }}>(84)91151610</td>
													<td style={{ textAlign: "center" }} onclick="alert('Texto com as Observações do Responsável!');"><a>SIM</a></td>
												</tr>

											</tbody>
										</table>
									</div>
								</div>
							</section>

						</div>
					</div>


				</div>



				}


			</div>
		);
	}
}
export default DashBoard;
