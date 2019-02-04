import React, { Component } from 'react';

import moment from 'moment';
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/all.css';
import '../../assets/sprints/solid.svg';
import '../Dashboard/css/style.css';
import '../Dashboard/css/Dashboard.css';
import axios from 'axios';
import TypesInput from '../TypesInput.js';
import $ from 'jquery';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,

	BarChart,
	Bar,
	ReferenceLine,
} from 'recharts';

const dados1 = [];
var dados2 = [];

class DashBoard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

			teste: false,
			aba: false,

			nome: [{}, {}],
			lista: [],

			adultospopup: false,

			Eventos: false,
			Eventospopup: false,

			crincaTab: "tab-current",
			adultoTab: "",
			aniversarioTab: "",
			noticiaTab: "",

			sectionCrianca: "content-current",
			sectionAdult: "",
			sectionAniversario: "",
			sectionNoticia: "",

			lista:[],

			nomeC: true,
			campoNome: '',
			sexo: true,
			campoSexo: '',
			cidade: true,
			campoCidade: '',
			idade: true,
			campoIdade: '',
			Mes: true,
			campoMes: '',

			listaBusca: [],
			listaGraf2: [],
		};
		this.mudar2 = this.mudar2.bind(this);
		this.mudar3 = this.mudar3.bind(this);
		this.selectCrianca = this.selectCrianca.bind(this);
		this.selectAdult = this.selectAdult.bind(this);
		this.selectAniversario = this.selectAniversario.bind(this);
		this.grafico = this.grafico.bind(this);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.mudarCampoNome = this.mudarCampoNome.bind(this);
		this.mudarCampoSexo = this.mudarCampoSexo.bind(this);
		this.mudarCampoCidade = this.mudarCampoCidade.bind(this);
		this.mudarCampoIdade = this.mudarCampoIdade.bind(this);
		this.mudarCampoMes = this.mudarCampoMes.bind(this);

	}
	mudarCampoNome(event) {
		this.setState({ campoNome: event.target.value });
	}
	mudarCampoSexo(event) {
		this.setState({ campoSexo: event.target.value });
	}
	mudarCampoCidade(event) {
		this.setState({ campoCidade: event.target.value });
	}
	mudarCampoIdade(event) {
		this.setState({ campoIdade: event.target.value });
	}
	mudarCampoMes(event) {
		this.setState({ campoMes: event.target.value });
	}
	selectCrianca(event) {
		this.setState({
			crincaTab: "tab-current",
			adultoTab: "",
			aniversarioTab: "",

			sectionCrianca: "content-current",
			sectionAdult: "",
			sectionAniversario: "",
		})
	}
	selectAdult(event) {
		this.setState({
			crincaTab: "",
			adultoTab: "tab-current",
			aniversarioTab: "",

			sectionCrianca: "",
			sectionAdult: "content-current",
			sectionAniversario: "",
		})
	}
	selectAniversario(event) {
		this.setState({
			crincaTab: "",
			adultoTab: "",
			aniversarioTab: "tab-current",

			sectionCrianca: "",
			sectionAdult: "",
			sectionAniversario: "content-current",
		})
	}

	mudar2() {
		!this.state.adultospopup ? this.setState({ adultospopup: true }) : this.setState({ adultospopup: false });


	}
	mudar3() {
		!this.state.Eventospopup ? this.setState({ Eventospopup: true }) : this.setState({ Eventospopup: false });


	}
	grafico(event) {
		for (var i = 1; i <= 30; i++) {
			let hj = moment().format("MM/DD/YYYY");
			var novo = moment(hj).subtract(i, 'days');
			
			console.log(novo.format("MM/DD/YYYY"));

			axios.get(`/TelaMKT/${novo.format("MM/DD/YYYY")}`)
				.then((response) => {
					console.log(response.data);
					this.setState({
						lista: response.data,
					})
					{/* Dados responsáveis por gerar o gráfico da tela 1 */ }
					dados1.push({
						name: response.data.name,
						Meninos: response.date.meninos,
						Meninas: response.date.meninas,
						Total: response.date.meninas + response.date.meninos,
					})
				})
				.catch((err) => console.log(err));

		}
	}
	// grafico(event) {
	// 	for (var i = 1; i <= 30; i++) {
	// 		let hj = moment().format("MM/DD/YYYY");
	// 		var novo = moment(hj).subtract(i, 'days').calendar();
	// 		console.log(novo);

	// 		axios.get('http://localhost:3001/TelaMKT' + novo)
	// 			.then((response) => {
	// 				console.log(response.data);
	// 				this.setState.lista.push(response.data);
	// 				{/* Dados responsáveis por gerar o gráfico da tela 1 */ }
	// 				dados1.push({
	// 					name: response.data.name,
	// 					Meninos: response.data.meninos,
	// 					Meninas: response.data.meninas,
	// 					Total: response.data.meninas + response.data.meninos,
	// 				})
	// 			})
	// 			.catch((err) => console.log(err));

	// 	}
	// }
	grafico1(event) {
		axios.get('http://localhost:3001/TelaMKT')
			.then((response) => {
				console.log(response.data);
				this.setState.lista.push(response.data);
				this.state.listaGraf2 = response.data;

				this.state.listaGraf2.map((dados2) => {
					{/* Dados responsáveis por gerar o gráfico da tela 2 */ }
					dados2.push({ name: response.data.nome, Meninos: response.data.meninos, Meninas: response.data.meninas })
				})
			})
			.catch((err) => console.log(err));
	}

	CampNome = (event) => {
		event.preventDefault();
		if (this.state.nomeC === true) {
			$("#Nome").addClass('displaynone');
			this.setState({
				nomeC: false,
				campoNome: "",
			})
		}
		else {
			$("#Nome").removeClass('displaynone');
			this.setState({
				nomeC: true,
			})
		}
	}

	CampSexo = (event) => {
		event.preventDefault();
		if (this.state.sexo === true) {
			$("#Sexo").addClass('displaynone');
			this.setState({
				sexo: false,
				campoSexo: "",
			})
		}
		else {
			$("#Sexo").removeClass('displaynone');
			this.setState({
				sexo: true,
			})
		}
	}

	CampCidade = (event) => {
		event.preventDefault();
		if (this.state.cidade === true) {
			$("#Cidade").addClass('displaynone');
			this.setState({
				cidade: false,
				campoCidade: "",
			})
		}
		else {
			$("#Cidade").removeClass('displaynone');
			this.setState({
				cidade: true,
			})
		}
	}

	CampIdade = (event) => {
		event.preventDefault();
		if (this.state.idade === true) {
			$("#Idade").addClass('displaynone');
			this.setState({
				idade: false,
				campoIdade: "",
			})
		}
		else {
			$("#Idade").removeClass('displaynone');
			this.setState({
				idade: true,
			})
		}
	}

	CampMes = (event) => {
		event.preventDefault();
		if (this.state.Mes === true) {
			$("#Mes").addClass('displaynone');
			this.setState({
				Mes: false,
				campoMes: "",
			})
		}
		else {
			$("#Mes").removeClass('displaynone');
			this.setState({
				Mes: true,
			})
		}
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
		console.log(value)
		console.log(target.name)
		console.log(this.state.selected)

		if (value === true) {
			this.state.listaBusca.push([this.state.selected], [value]);
			console.log(this.state.listaBusca)
		}
		if (value === false) {
			this.state.listaBusca.pop();
			this.state.listaBusca.pop();
			console.log(this.state.listaBusca)
		}
	}

	BuscarFinal = (event) => {
		event.preventDefault();

		console.log(this.state);

		var erros = [];

		if (this.state.campoNome === "" && this.state.campoSexo === "" && this.state.campoCidade === "" && this.state.campoIdade === "" && this.state.campoMes === "") {
			$("#Nome").addClass('errorBorder');
			$("#Sexo").addClass('errorBorder');
			$("#Cidade").addClass('errorBorder');
			$("#Idade").addClass('errorBorder');
			$("#Mes").addClass('errorBorder');
			erros.push("Busca não pode ser em branco");
		}
		else {
			$("#Nome").removeClass('errorBorder');
			$("#Sexo").removeClass('errorBorder');
			$("#Cidade").removeClass('errorBorder');
			$("#Idade").removeClass('errorBorder');
			$("#Mes").removeClass('errorBorder');
		}
		if (erros.length > 0) {
			$("#alertDiv").addClass('alert-danger').removeClass('displaynone');
			$("#SucessDiv").addClass('displaynone').removeClass('alert-success');
			return;
		}
		else {
			$("#alertDiv").addClass('displaynone').removeClass('alert-danger');
			$("#SucessDiv").addClass('alert-success').removeClass('displaynone');

			// axios.get()
			//     .then(function (response) {
			//         this.setState({ Lista: response.data });
			//         console.log(response);
			//         $("#SucessDiv").addClass('alert-success').removeClass('displaynone');
			//     }).catch(function (error) {
			//         console.log(error)//LOG DE ERRO
			//         $("#alertDiv").addClass('alert-danger').removeClass('displaynone');
			//         // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
			//         // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
			//         // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
			//     })

		}
	}

	render() {
		return (
			<div className="container-fluid" >
				<script src="js/jquery-1.10.2.min.js"></script>
				<script type="text/javascript" src="js/modernizr.custom.04022.js"></script>

				<div className="sub-heard-part" >
					<ol className="breadcrumb m-b-0" >
						<li > < a href="/" > Home </a></li >
						<li > Tela de Marketing </li >
					</ol >
				</div>

				<div id="tabs" class="tabs">
					<div class="graph">
						<nav>
							<ul>
								<li id="ddd" name="crincaTab" onClick={this.selectCrianca} className={this.state.crincaTab}><a class="icon-shop"><i class="far fa-chart-bar"></i> <span>Fluxo</span></a></li>
								<li name="adultoTab" onClick={this.selectAdult} className={this.state.adultoTab}><a class="icon-cup"><i class="fas fa-chart-pie"></i> <span>Dispersão</span></a></li>
								<li name="aniversarioTab" onClick={this.selectAniversario} className={this.state.aniversarioTab}><a class="icon-food"><i class="fab fa-grav"></i> <span>Busca</span></a></li>

							</ul>
						</nav>
						<div className="content tab">
							{/* INICIO - PRIMEIRA TELA  */}
							<section className={this.state.sectionCrianca} >
								<div className="graph">
									<h1 className="text-center"> Fluxo de Crianças na Loja</h1>
									<LineChart width={810} height={500} data={dados1} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
										<XAxis dataKey="name" />
										<YAxis />
										<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
										<Line type="monotone" dataKey="Meninos" stroke="#052963" activeDot={{ r: 8 }} />
										<Line type="monotone" dataKey="Meninas" stroke="#C71585" activeDot={{ r: 8 }} />
										<Line type="monotone" dataKey="Total" stroke="#008DE7" activeDot={{ r: 8 }} />

										<CartesianGrid strokeDasharray='3 3' />
										<Tooltip />
										<YAxis />
										<XAxis dataKey='name' />
										<Legend />
									</LineChart>
								</div>
								<br></br>
								<div className="text-center">
									<button className="btn botaoAvancar" onClick={this.grafico}>Atualizar</button>
								</div>
							</section>
							{/* FIM - PRIMEIRA TELA  */}

							{/* INICIO - SEGUNDA TELA  */}
							<section className={this.state.sectionAdult} >
								<div className="graph">
									<h1 className="text-center"> Dispersão de Crianças Registrada no Sistema </h1>
									<BarChart width={810} height={500} data={dados2}
										margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis />
										<Tooltip />
										<Legend />
										<ReferenceLine y={0} stroke='#000' />
										{/*<Tooltip content={<CustomTooltip />}/>*/}
										<Bar dataKey="Meninos" fill="#8884d8" />
										<Bar dataKey="Meninas" fill="#82ca9d" />
									</BarChart>
								</div>
								<br></br>
								<div className="text-center">
									<button className="btn botaoAvancar" onClick={this.grafico}>Atualizar</button>
								</div>
							</section>
							{/* FIM - SEGUNDATELA  */}

							{/* INICIO - TERCEIRA TELA  */}
							<section className={this.state.sectionAniversario}>
								<div class="graph graph-visual tables-main">
									<h1 className="text-center"> Busca por Crianças do Sistema </h1>
									<p></p>
									<div className="graph-visual">
										<div id="alertDiv" className="alert displaynone" role="alert">
											<b>ERRO!</b> Ah algo de errado em seu formulario ou busca.
                                        </div>
										<div id="SucessDiv" className="alert displaynone" role="alert">
											<b>Sucesso!</b> Busca Concluida.
                                        </div>
										<form id="busca-fluxo">
											<div className="row">
												<div className="col-md-1 col-sm-1 col-xs-1">
													<button className="btn botao tam" onClick={this.CampNome}><i class="fas fa-times"></i></button>
												</div>
												<TypesInput cod={1} ClassDiv={"col-md-11 col-sm-11 col-xs-11"} ClassLabel={"LetraFormulario"} NameLabel={"Nome: "} type={"text"} id={"Nome"} name={"Nome"} Class={"form-control"}
													value={this.state.campoNome} onChange={this.mudarCampoNome}
												/>
											</div>
											<div className="row">
												<div className="col-md-1 col-sm-1 col-xs-1">
													<button className="btn botao tam" onClick={this.CampSexo}><i class="fas fa-times"></i></button>
												</div>
												<TypesInput cod={1} ClassDiv={"col-md-11 col-sm-11 col-xs-11"} ClassLabel={"LetraFormulario"} NameLabel={"Sexo: "} type={"test"} id={"Sexo"} name={"Sexo"} Class={"form-control"}
													value={this.state.campoSexo} onChange={this.mudarCampoSexo} />
											</div>
											<div className="row">
												<div className="col-md-1 col-sm-1 col-xs-1">
													<button className="btn botao tam" onClick={this.CampCidade}><i class="fas fa-times"></i></button>
												</div>
												<TypesInput cod={1} ClassDiv={"col-md-11 col-sm-11 col-xs-11"} ClassLabel={"LetraFormulario"} NameLabel={"Cidade:"} type={"test"} id={"Cidade"} name={"Cidade"} Class={"form-control"}
													value={this.state.campoCidade} onChange={this.mudarCampoCidade} />
											</div>
											<div className="row">
												<div className="col-md-1 col-sm-1 col-xs-1">
													<button className="btn botao tam" onClick={this.CampMes}><i class="fas fa-times"></i></button>
												</div>
												<TypesInput cod={1} ClassDiv={"col-md-11 col-sm-11 col-xs-11"} ClassLabel={"LetraFormulario"} NameLabel={"Mes"} type={"test"} id={"Mes"} name={"Mes"} Class={"form-control"}
													value={this.state.campoMes} onChange={this.mudarCampoMes} />
											</div>
											<br></br>
											<div className="text-right">
												<button className="btn botaoAvancar " onClick={this.BuscarFinal}>Buscar</button>
											</div>
										</form>
									</div>
									<div class="tables table-responsive">
										<table class="table table-hover">
											<thead>
												<tr>
													<th>#</th>
													<th style={{ textAlign: "center" }}>Nome</th>
													<th style={{ textAlign: "center" }}>idade</th>
													<th style={{ textAlign: "center" }}>Sexo</th>
													<th style={{ textAlign: "center" }}>Anivesario</th>
													<th style={{ textAlign: "center" }}>Cidade</th>
													<th style={{ textAlign: "center" }}>Foto</th>
													<th style={{ textAlign: "center" }}>Ultima visita</th>
													<th style={{ textAlign: "center" }}> Responsável</th>
													<th style={{ textAlign: "center" }}> Email</th>
												</tr>
											</thead>
											<tbody>
												{/* {this.state.Lista.map((fluxo, indice) => {
                                                    return (
                                                        <tr key={fluxo._id}>
                                                            <th scope="row">{(indice + 1)}</th>
                                                            <td > {fluxo.} </td>
                                                            <td >{fluxo.} </td>
                                                            <td >{fluxo.} </td>
                                                            <td >{fluxo.} </td>
                                                            <td >{fluxo.} </td>
                                                            <td >{fluxo.} </td>
                                                            <td >{fluxo.} </td>
                                                            <td >{fluxo.} </td>
                                                            <td >{fluxo.} </td>
                                                            <td >{fluxo.} </td>
                                                            <td >{fluxo.} </td>
                                                            <td >{fluxo.} </td>
                                                        </tr>
                                                    );
                                                })}  */}
											</tbody>
										</table>
									</div>
								</div>
							</section>
							{/* FIM - TERCEIRA TELA  */}
						</div>
					</div>


				</div>

				{this.state.teste &&

					(<div className="graph">
						<button className="sidebar-icon styleButaoMenu" style={{ float: 'none' }} onClick={this.mudar2}>
							< span className="fa fa-bars" > </span>
						</button>
						{this.state.adultospopup &&

							(<div className="graph">
								<div className="tables table-responsive">
									<table className="table table-hover">
										<thead className="text-center">
											<tr >
												<th>#</th>
												<th>Nome</th>
												<th>Aniversariante</th>
											</tr>
										</thead>
									</table>
								</div>
							</div>)
						}


					</div>)

				}

				{this.state.Eventos &&

					<div className="graph">
						<button className="sidebar-icon styleButaoMenu" style={{ float: 'none' }} onClick={this.mudar3}>
							< span className="fa fa-bars" > </span>
						</button>       Eventos
					{this.state.Eventospopup &&

							(<div className="graph">
								<div className="tables table-responsive">
									<table className="table table-hover">
										<thead className="text-center">
											<tr>

												<th>Titulo</th>
												<th>Inicio</th>
												<th>Fim</th>
											</tr>
										</thead>
									</table>
								</div>
							</div>)
						}


					</div>

				}
			</div>
		);
	}
}
export default DashBoard;
