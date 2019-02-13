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
// import { getToken } from "../Login/service/auth";
// import jwt from 'jsonwebtoken';
// import config from '../Login/service/config';
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
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';


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

			lista: [],

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
			menina: 0,
			menino: 0,
			listaBusca: [],
			listaGraf2: [],
			listaGraf: []
		};
		this.mudar2 = this.mudar2.bind(this);
		this.mudar3 = this.mudar3.bind(this);
		this.selectCrianca = this.selectCrianca.bind(this);
		this.selectAdult = this.selectAdult.bind(this);
		this.selectAniversario = this.selectAniversario.bind(this);
		this.grafico = this.grafico.bind(this);
		this.grafico1 = this.grafico1.bind(this);

		this.handleInputChange = this.handleInputChange.bind(this);
		this.mudarCampoNome = this.mudarCampoNome.bind(this);
		this.mudarCampoSexo = this.mudarCampoSexo.bind(this);
		this.mudarCampoCidade = this.mudarCampoCidade.bind(this);
		this.mudarCampoIdade = this.mudarCampoIdade.bind(this);
		this.mudarCampoMes = this.mudarCampoMes.bind(this);

	}
	Funcionario = async (number) => {
		const a = getToken();
		const b = jwt.verify(a, config.secret_auth);

		axios.get(`/employees/${b.id}`)
			.then((response) => {
				let id = response.data[0].identifierEmployee.employeeData.officialPosition;



				axios.get(`/professionalPosition/indentifier/${id}`)
					.then((response) => {
						let functions;
						return response.data.functions;
					}).then((event) => {
						let podeentrar = false;
						event.map((map) => {
							if (map.id === number) {
								podeentrar = true;
							}
						})
						return podeentrar;
					}).then(async (event) => {
						if (event) {
							const response = await axios.post(`/tela-mkt/mkt/busca`);
							console.log(response.data)
							let temporario = [];
							response.data.map((event) => {
								event.children.map((mape) => {
									if (mape.kinship === "children" && mape.identifier !== null) {
										temporario.push({
											name: mape.identifier.name.firstName + " " + mape.identifier.name.surName,
											idade: Math.floor(moment(new Date()).diff(moment(mape.identifier.birthday), 'years', true)),
											sexo: mape.identifier.sexuality,
											aniversario: moment(mape.identifier.birthday).format("DD/MM/YYYY"),
											cidade: event.address.city,
											foto: mape.identifier.photo,
											visita: "nao da",
											responsavel: event.name.firstName + " " + event.name.surName,
											email: event.email,

										})
										let temporarioss =moment(mape.identifier.birthday).format("DD/MM/YYYY");
										console.log(moment(temporarioss).format("DD"),"===",temporarioss)
									}
								})
							})
							this.setState({
								listaBusca: temporario
							})
						} else {
							this.props.history.push("/");
							alert("você nao tem permissao para entrar aki")
						}
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));

	}
	componentWillMount() {
		this.Funcionario(31);
	}
	componentDidMount() {

		this.grafico();
		this.grafico1();

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
		console.log(typeof(event.target.value))
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
		let listadedatas = [];

		const lista = [];
		for (var i = 0; i < 15; i++) {
			let hj = moment().format("MM/DD/YYYY");
			var novo = moment(hj).subtract(i, 'days');

			const a = moment(novo).format("MM/DD/YYYY")

			lista.push(a);

		}
		const datas = lista.map(async (crianca, index) => {

			const a = moment(crianca).startOf('day').toDate();


			const response = await axios.get(`/tela-mkt/mkt/${moment(a)}`);
			return response.data;
		});
		var listafinal = [];
		Promise.all(datas).then((listagraficos) => {

			const mala = [];
			const mip = "olaaa";
			listagraficos.map((event, indice) => {
				if (event.length !== 0) {
					mala.push(event)
				}
			})


			return mala
		}).then((credo) => {

			const passaport = [];
			const aniversario = [];

			credo.map((live, index) => {

				live.map((dado, indez) => {

					if (dado.activity === "Passaporte") {

						passaport.push(dado);

					} else if (dado.activity === "Aniversario") {

						aniversario.push(dado);

					}
				})
			})

			const passe = {

				passaporte: passaport,
				aniversario: aniversario,

			}

			return passe;

		}).then((lista) => {

			const tot = [];

			const datas = lista.aniversario.map(async (crianca, index) => {
				const axior = await axios.get(`/child/indentifier/${crianca.to}`);

				var temporario = null;
				if (axior.data !== null) {
					temporario = {
						dia: moment(crianca.dateOperation).format("DD/MM"),
						sexo: axior.data.sexuality,
					}

				}
				const retu = {
					temporario, child: axior.data
				}
				return retu;
			});

			const datase = lista.passaporte.map(async (crianca, index) => {
				const axior = await axios.get(`/child/indentifier/${crianca.id}`);

				var temporario = null;
				if (axior.data !== null) {
					temporario = {
						dia: moment(crianca.dateOperation).format("DD/MM"),
						sexo: axior.data.sexuality,
					}
				}
				const retu = {
					temporario, child: axior.data
				}
				return retu;



			});
			const envio = datas.concat(datase)

			return envio;

		}).then((file) => {

			Promise.all(file).then((god) => {

				let lista = [];
				god.map((event, indice) => {

					var menino = 0;
					var menina = 0;

					if (event.child !== null) {
						if (event.child.sexuality === "Feminino") {
							menina = menina + 1;
						} else if (event.child.sexuality === "Masculino") {
							menino = menino + 1;
						}
						lista.push({ name: event.temporario.dia, Meninos: menino, Meninas: menina, Total: menino + menina })
					}
				})

				for (var p = 0; p < lista.length; p++) {
					for (var y = 1; y <= lista.length - 1; y++) {

						if (lista[p].name === lista[y].name) {

							lista[p].Meninos = lista[p].Meninos + lista[y].Meninos;
							lista[p].Meninas = lista[p].Meninas + lista[y].Meninas;
							lista[p].Total = lista[p].Total + lista[y].Total
							lista.splice(y, 1)

						}
					}
				}

				return lista;
			}).then((pilo) => {
				this.setState({
					listaGraf: pilo
				})
			})
		});
	}

	async grafico1(event) {
		let menino1 = 0;
		let menina1 = 0;
		let menino2 = 0;
		let menina2 = 0;
		let menino3 = 0;
		let menina3 = 0;
		let menino4 = 0;
		let menina4 = 0;
		let menino5 = 0;
		let menina5 = 0;
		let menino6 = 0;
		let menina6 = 0;
		let menino7 = 0;
		let menina7 = 0;
		let menino8 = 0;
		let menina8 = 0;

		let menino9 = 0;
		let menina9 = 0;
		let temporario = [];
		const response = await axios.get(`/child`);
		response.data.map((event) => {

			var age = Math.floor(moment(new Date()).diff(moment(event.birthday), 'years', true));
			if (age >= 0 && age <= 2) {
				if (event.sexuality === "Masculino") {
					menino1++;
				} else if (event.sexuality === "Femenino") {
					menina1++;
				}


			} else if (age >= 3 && age <= 4) {
				if (event.sexuality === "Masculino") {
					menino2++;
				} else if (event.sexuality === "Femenino") {
					menina2++;
				}


			} else if (age >= 5 && age <= 6) {
				if (event.sexuality === "Masculino") {
					menino3++;
				} else if (event.sexuality === "Femenino") {
					menina3++;
				}


			} else if (age >= 7 && age <= 8) {
				if (event.sexuality === "Masculino") {
					menino4++;
				} else if (event.sexuality === "Femenino") {
					menina4++;
				}


			} else if (age >= 9 && age <= 10) {
				if (event.sexuality === "Masculino") {
					menino5++;
				} else if (event.sexuality === "Femenino") {
					menina5++;
				}


			} else if (age >= 11 && age <= 12) {
				if (event.sexuality === "Masculino") {
					menino6++;
				} else if (event.sexuality === "Femenino") {
					menina6++;
				}


			} else if (age >= 13 && age <= 14) {
				if (event.sexuality === "Masculino") {
					menino7++;
				} else if (event.sexuality === "Femenino") {
					menina7++;
				}


			} else if (age >= 15 && age <= 16) {
				if (event.sexuality === "Masculino") {
					menino8++;
				} else if (event.sexuality === "Femenino") {
					menina8++;
				}


			} else if (age >= 17 && age <= 18) {
				if (event.sexuality === "Masculino") {
					menino9++;
				} else if (event.sexuality === "Femenino") {
					menina9++;
				}


			}
		})
		temporario.push(
			{ name: "0 á 2", Meninos: menino1, Meninas: menina1 },
			{ name: "3 á 4", Meninos: menino2, Meninas: menina2 },
			{ name: "5 á 6", Meninos: menino3, Meninas: menina3 },
			{ name: "7 á 8", Meninos: menino4, Meninas: menina4 },
			{ name: "9 á 10", Meninos: menino5, Meninas: menina5 },
			{ name: "11 á 12", Meninos: menino6, Meninas: menina6 },
			{ name: "13 á 14", Meninos: menino7, Meninas: menina7 },
			{ name: "15 á 16", Meninos: menino8, Meninas: menina8 },
			{ name: "17 á 18", Meninos: menino9, Meninas: menina9 },
		)
		this.setState({
			listaGraf2: temporario
		})
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

	BuscarFinal = async (event) => {
		if (this.state.campoNome !== "") {

			if (this.state.campoSexo !== "") {

				if (this.state.campoCidade !== "") {

					if (this.state.campoMes !== "") {
						let temporario = [];
						this.state.listaBusca.map((event) => {
							if (event.name === this.state.campoNome && event.sexo === this.state.campoSexo && event.cidade === this.state.campoCidade && moment(event.aniversario).format("DD") === this.state.campoMes) {
								temporario.push(event);
							}
						})
						this.setState({
							listaBusca: temporario,
						})
					} else {
						let temporario = [];
						this.state.listaBusca.map((event) => {
							if (event.name === this.state.campoNome && event.sexo === this.state.campoSexo && event.cidade === this.state.campoCidade) {
								temporario.push(event);
							}
						})
						this.setState({
							listaBusca: temporario,
						})
					}
				} else if (this.state.campoMes !== "") {
					let temporario = [];
					this.state.listaBusca.map((event) => {
						if (event.name === this.state.campoNome && event.sexo === this.state.campoSexo && moment(event.aniversario).format("DD") === this.state.campoMes) {
							temporario.push(event);
						}
					})
					this.setState({
						listaBusca: temporario,
					})
				}
			} else if (this.state.campoCidade !== "") {

				if (this.state.campoMes !== "") {
					let temporario = [];
					this.state.listaBusca.map((event) => {
						if (event.name === this.state.campoNome && event.cidade === this.state.campoCidade && moment(event.aniversario).format("DD") === this.state.campoMes) {
							temporario.push(event);
						}
					})
					this.setState({
						listaBusca: temporario,
					})
				} else {
					let temporario = [];
					this.state.listaBusca.map((event) => {
						if (event.name === this.state.campoNome && event.cidade === this.state.campoCidade) {
							temporario.push(event);
						}
					})
					this.setState({
						listaBusca: temporario,
					})
				}
			} else if (this.state.campoMes !== "") {
				let temporario = [];
				this.state.listaBusca.map((event) => {
					if (event.name === this.state.campoNome && moment(event.aniversario).format("DD") === this.state.campoMes) {
						temporario.push(event);
					}
				})
				this.setState({
					listaBusca: temporario,
				})
			} else {
				let temporario = [];
				this.state.listaBusca.map((event) => {
					if (event.name === this.state.campoNome) {
						temporario.push(event);
					}
				})
				this.setState({
					listaBusca: temporario,
				})
			}


		} else if (this.state.campoCidade !== "") {
			if (this.state.campoSexo !== "") {

				if (this.state.campoMes !== "") {
					let temporario = [];
					this.state.listaBusca.map((event) => {
						if (event.sexo === this.state.campoSexo && moment(event.aniversario).format("DD") === this.state.campoMes) {
							temporario.push(event);
						}
					})
					this.setState({
						listaBusca: temporario,
					})

				} else {
					let temporario = [];
					this.state.listaBusca.map((event) => {
						if (event.sexo === this.state.campoSexo && event.cidade === this.state.campoCidade) {
							temporario.push(event);
						}
					})
					this.setState({
						listaBusca: temporario,
					})
				}
			} else if (this.state.campoMes !== "") {
				let temporario = [];
				this.state.listaBusca.map((event) => {
					if (moment(event.aniversario).format("DD") === this.state.campoMes ) {
						temporario.push(event);
					}
				})
				this.setState({
					listaBusca: temporario,
				})

			} else {
				let temporario = [];
				this.state.listaBusca.map((event) => {
					if (event.cidade === this.state.campoCidade) {
						temporario.push(event);
					}
				})
				this.setState({
					listaBusca: temporario,
				})
			}


		} else if (this.state.campoSexo !== "") {

			if (this.state.campoMes !== "") {
				let temporario = [];
				this.state.listaBusca.map((event) => {
					if (event.sexo === this.state.campoSexo && moment(event.aniversario).format("DD") === this.state.campoMes) {
						temporario.push(event);
					}
				})
				this.setState({
					listaBusca: temporario,
				})

			} else {
				let temporario = [];
				this.state.listaBusca.map((event) => {
					if (event.sexo === this.state.campoSexo) {
						temporario.push(event);
					}
				})
				this.setState({
					listaBusca: temporario,
				})


			}


		} else if (this.state.campoMes !== "") {
			console.log(moment(event.aniversario).format("DD"))
			let temporario = [];
			this.state.listaBusca.map((event) => {
				if (moment(event.aniversario).format("DD") === this.state.campoMes) {
					temporario.push(event);
				}
			})
			this.setState({
				listaBusca: temporario,
			})
		} else {
			const response = await axios.post(`/tela-mkt/mkt/busca`);
			console.log(response.data)
			let temporario = [];
			response.data.map((event) => {
				event.children.map((mape) => {
					if (mape.kinship === "children" && mape.identifier !== null) {
						temporario.push({
							name: mape.identifier.name.firstName + " " + mape.identifier.name.surName,
							idade: Math.floor(moment(new Date()).diff(moment(mape.identifier.birthday), 'years', true)),
							sexo: mape.identifier.sexuality,
							aniversario: moment(mape.identifier.birthday).format("DD/MM/YYYY"),
							cidade: event.address.city,
							foto: mape.identifier.photo,
							visita: "nao da",
							responsavel: event.name.firstName + " " + event.name.surName,
							email: event.email,

						})
						console.log(moment(mape.identifier.birthday).format("M"))
					}
				})
			})
			this.setState({
				listaBusca: temporario
			})
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
								<li id="ddd" name="crincaTab" onClick={this.selectCrianca} className={this.state.crincaTab}><a className="icon-shop"><i className="far fa-chart-bar"></i> <span>Fluxo</span></a></li>
								<li name="adultoTab" onClick={this.selectAdult} className={this.state.adultoTab}><a class="icon-cup"><i className="fas fa-chart-pie"></i> <span>Dispersão</span></a></li>
								<li name="aniversarioTab" onClick={this.selectAniversario} className={this.state.aniversarioTab}><a className="icon-food"><i className="fab fa-grav"></i> <span>Busca</span></a></li>

							</ul>
						</nav>
						<div className="content tab">
							{/* INICIO - PRIMEIRA TELA  */}
							<section className={this.state.sectionCrianca} >
								<div className="graph">
									<h1 className="text-center"> Fluxo de Crianças na Loja</h1>
									<LineChart width={810} height={500} data={this.state.listaGraf} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
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
									<BarChart width={810} height={500} data={this.state.listaGraf2}
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
									<button className="btn botaoAvancar" onClick={this.grafico1}>Atualizar</button>
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
												<TypesInput cod={1} ClassDiv={"col-md-11 col-sm-11 col-xs-11"} ClassLabel={"LetraFormulario"} NameLabel={"Mês"} type={"test"} id={"Mes"} name={"Mes"} Class={"form-control"}
													value={this.state.campoMes} onChange={this.mudarCampoMes} />
											</div>
											<br></br>
											<div className="text-right">
												<input type="button" className="btn botaoAvancar " value="Busca" onClick={this.BuscarFinal} />
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
													<th style={{ textAlign: "center" }}>Anivesário</th>
													<th style={{ textAlign: "center" }}>Cidade</th>
													<th style={{ textAlign: "center" }}>Foto</th>
													<th style={{ textAlign: "center" }}>Última visita</th>
													<th style={{ textAlign: "center" }}>Responsável</th>
													<th style={{ textAlign: "center" }}>Email</th>
												</tr>
											</thead>
											<tbody>
												{this.state.listaBusca.map((fluxo, indice) => {
													return (
														<tr key={fluxo._id}>
															<th scope="row">{(indice + 1)}</th>
															<td > {fluxo.name} </td>
															<td >{fluxo.idade} </td>
															<td >{fluxo.sexo} </td>
															<td >{fluxo.aniversario} </td>
															<td >{fluxo.cidade} </td>
															<td >foto</td>
															<td >{fluxo.visita} </td>
															<td >{fluxo.responsavel} </td>
															<td >{fluxo.email} </td>
														</tr>
													);
												})}
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
