import React, { Component } from 'react';
import Modal from 'react-modal';
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
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};
class DashBoard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			perfilAtual: [],
			listaCriancas: [],
			Page: "Principal",
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
			listapesq: [],
			listaGraf2: [],
			listaGraf: [],
			modalIsOpen: false,
			photo: "",
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
	openModal = (event) => {
		this.setState({
			modalIsOpen: true,
			photo: event
		});

	}

	afterOpenModal = (event) => {
		// references are now sync'd and can be accessed.
		this.subtitle.style.color = '#f00';
	}

	closeModal = (event) => {
		this.setState({ modalIsOpen: false });
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
											idAdult: event._id,
											idCria: mape.identifier._id

										})
										let temporarioss = moment(mape.identifier.birthday).format("DD/MM/YYYY");
										console.log(moment(temporarioss).format("DD"), "===", temporarioss)
									}
								})
							})
							this.setState({
								listapesq: temporario,
								listaBusca: temporario,
							})
						} else {
							this.props.history.push("/");
							alert("Acesso Negado. Você não possui permisão para estar nessa área!");
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
		console.log(typeof (event.target.value))
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
	voltar = (event) => {
		this.setState({
			Page: "Principal",
			listaFuncionarios: [],
			perfilAtual: [],
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

		var lista3 = [];
		for (var i = 0; i < 15; i++) {
			let hj = moment().format("MM/DD/YYYY");
			var novo = moment(hj).subtract(i, 'days');

			const a = moment(novo).format("MM/DD/YYYY")

			lista3.push(a);

		}
		const datas = lista3.map(async (crianca, index) => {

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
			var total = 0;
			const datas = lista.aniversario.map(async (crianca, index) => {
				const axior = await axios.get(`/child/indentifier/${crianca.to}`);
				let retu;
				var temporario = null;

				if (axior.data !== null) {
					temporario = {
						dia: moment(lista3[index]).format("DD/MM"),
						sexo: axior.data.sexuality,
					}
					retu = {
						temporario, child: axior.data
					}

				} else {

					temporario = {
						dia: moment(lista3[index]).format("DD/MM"),

					}
					retu = {
						temporario,
					}
				}
				return retu;
			});

			const datase = lista.passaporte.map(async (crianca, index) => {
				const axior = await axios.get(`/child/indentifier/${crianca.id}`);

				var temporario = null;
				let retu;
				if (axior.data !== null) {
					temporario = {
						dia: moment(lista3[index]).format("DD/MM"),
						sexo: axior.data.sexuality,
					}
					retu = {
						temporario, child: axior.data
					}

				} else {

					temporario = {
						dia: moment(lista3[index]).format("DD/MM"),

					}
					retu = {
						temporario,
					}
				}


				return retu;



			});
			const envio = datas.concat(datase)

			return envio;

		}).then((file) => {

			Promise.all(file).then((god) => {

				let lista2 = [];
				god.map((event, indice) => {

					var menino = 0;
					var menina = 0;

					if (event.child !== undefined) {

						if (event.child.sexuality === "Feminino") {
							menina = menina + 1;
						} else if (event.child.sexuality === "Masculino") {
							menino = menino + 1;
						}
						lista2.push({ name: event.temporario.dia, Meninos: menino, Meninas: menina, Total: menino + menina })
					} else {
						lista2.push({ name: event.temporario.dia, Meninos: menino, Meninas: menina, Total: menino + menina })
					}
				})

				for (var p = 0; p < lista2.length; p++) {
					for (var y = 1; y <= lista2.length - 1; y++) {

						if (p === lista2.length - 1) {

						} else if (lista2[p].name === lista2[y].name) {

							lista2[p].Meninos = lista2[p].Meninos + lista2[y].Meninos;
							lista2[p].Meninas = lista2[p].Meninas + lista2[y].Meninas;
							lista2[p].Total = lista2[p].Total + lista2[y].Total
							lista2.splice(y, 1)

						}
					}
				}

				return lista2;
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
				} else if (event.sexuality === "Feminino") {
					menina1++;
				}


			} else if (age >= 3 && age <= 4) {
				if (event.sexuality === "Masculino") {
					menino2++;
				} else if (event.sexuality === "Feminino") {
					menina2++;
				}


			} else if (age >= 5 && age <= 6) {
				if (event.sexuality === "Masculino") {
					menino3++;
				} else if (event.sexuality === "Feminino") {
					menina3++;
				}


			} else if (age >= 7 && age <= 8) {
				if (event.sexuality === "Masculino") {
					menino4++;
				} else if (event.sexuality === "Feminino") {
					menina4++;
				}


			} else if (age >= 9 && age <= 10) {
				if (event.sexuality === "Masculino") {
					menino5++;
				} else if (event.sexuality === "Feminino") {
					menina5++;
				}


			} else if (age >= 11 && age <= 12) {
				if (event.sexuality === "Masculino") {
					menino6++;
				} else if (event.sexuality === "Feminino") {
					menina6++;
				}


			} else if (age >= 13 && age <= 14) {
				if (event.sexuality === "Masculino") {
					menino7++;
				} else if (event.sexuality === "Feminino") {
					menina7++;
				}


			} else if (age >= 15 && age <= 16) {
				if (event.sexuality === "Masculino") {
					menino8++;
				} else if (event.sexuality === "Feminino") {
					menina8++;
				}


			} else if (age >= 17 && age <= 18) {
				if (event.sexuality === "Masculino") {
					menino9++;
				} else if (event.sexuality === "Feminino") {
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
	changuePageC = (event) => {

		axios.get(`/child/indentifier/${event}`)
			.then((response) => {

				this.setState({
					perfilAtual: response.data,
					Page: "Pcrianca",
				});
			}).catch((err) => {

			});
	}
	cahnguePageA = (event) => {
		axios.get(`/adult/${event}`)
			.then((response) => {
				const criancas = response.data.children.map(async (crianca, index) => {
					const response = await axios.get(`/child/indentifier/${crianca.identifier}`);
					return response.data;
				});

				Promise.all(criancas).then((listaCriancas) => {

					this.setState({
						listaFuncionarios: listaCriancas,

						perfilAtual: response.data,
						Page: "Padulto",
					})
				});



			}).catch((err) => {

			});






	}
	BuscarFinal = async (event) => {
		if (this.state.campoNome !== "") {

			if (this.state.campoSexo !== "") {

				if (this.state.campoCidade !== "") {

					if (this.state.campoMes !== "") {
						let temporario = [];
						this.state.listapesq.map((event) => {
							if (event.name === this.state.campoNome && event.sexo === this.state.campoSexo && event.cidade === this.state.campoCidade && moment(event.aniversario).format("DD") === this.state.campoMes) {
								temporario.push(event);
							}
						})
						this.setState({
							listaBusca: temporario,
						})
					} else {
						let temporario = [];
						this.state.listapesq.map((event) => {
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
					this.state.listapesq.map((event) => {
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
					this.state.listapesq.map((event) => {
						if (event.name === this.state.campoNome && event.cidade === this.state.campoCidade && moment(event.aniversario).format("DD") === this.state.campoMes) {
							temporario.push(event);
						}
					})
					this.setState({
						listaBusca: temporario,
					})
				} else {
					let temporario = [];
					this.state.listapesq.map((event) => {
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
				this.state.listapesq.map((event) => {
					if (event.name === this.state.campoNome && moment(event.aniversario).format("DD") === this.state.campoMes) {
						temporario.push(event);
					}
				})
				this.setState({
					listaBusca: temporario,
				})
			} else {
				let temporario = [];
				this.state.listapesq.map((event) => {
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
					this.state.listapesq.map((event) => {
						if (event.sexo === this.state.campoSexo && moment(event.aniversario).format("DD") === this.state.campoMes) {
							temporario.push(event);
						}
					})
					this.setState({
						listaBusca: temporario,
					})

				} else {
					let temporario = [];
					this.state.listapesq.map((event) => {
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
				this.state.listapesq.map((event) => {
					if (moment(event.aniversario).format("DD") === this.state.campoMes &&event.cidade === this.state.campoCidade) {
						temporario.push(event);
					}
				})
				this.setState({
					listaBusca: temporario,
				})

			} else {
				let temporario = [];
				this.state.listapesq.map((event) => {
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
				this.state.listapesq.map((event) => {
					if (event.sexo === this.state.campoSexo && moment(event.aniversario).format("DD") === this.state.campoMes) {
						temporario.push(event);
					}
				})
				this.setState({
					listaBusca: temporario,
				})

			} else {
				let temporario = [];
				this.state.listapesq.map((event) => {
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
			this.state.listapesq.map((event) => {
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
							idAdult: event._id,
							idCria: mape.identifier._id

						})
						console.log(moment(mape.identifier.birthday).format("M"))
					}
				})
			})
			this.setState({
				listapesq: temporario,
				listaBusca: temporario,
			})
		}

	}
	render() {
		if (this.state.Page === "Principal") {
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
					<Modal
						isOpen={this.state.modalIsOpen}
						onAfterOpen={this.afterOpenModal}
						onRequestClose={this.closeModal}
						style={customStyles}
						contentLabel="Example Modal"
						ariaHideApp={false}
					>

						<h2 ref={subtitle => this.subtitle = subtitle}></h2>
						<button onClick={this.closeModal}>close</button>
						<img id='fotopreview' style={{ width: 'auto', height: 'auto', maxWidth: 250 + 'px' }} src={this.state.photo} />
					</Modal>
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
										<BarChart width={810} height={500} data={this.state.listaGraf}
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
											<Bar dataKey="Total" fill="#8A2BE2	" />
										</BarChart>
										{/* <LineChart width={810} height={500} data={this.state.listaGraf} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
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
									</LineChart> */}
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
														console.log(fluxo)
														return (
															<tr key={fluxo._id}>
																<th scope="row">{(indice + 1)}</th>
																<td><a style={{ color: "inherit" }} onClick={() => this.changuePageC(fluxo.idCria)}>{fluxo.name}</a>  </td>
																<td >{fluxo.idade} </td>
																<td >{fluxo.sexo} </td>
																<td >{fluxo.aniversario} </td>
																<td >{fluxo.cidade} </td>
																<td onClick={() => this.openModal(fluxo.foto)} >Foto</td>
																<td >{fluxo.visita} </td>
																<td ><a style={{ color: "inherit" }} onClick={() => this.cahnguePageA(fluxo.idAdult)}>{fluxo.responsavel} </a></td>
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
		if (this.state.Page === "Padulto") {
			function converter(evento) {
				const data = evento.match(/([T,\w\*]+)/g);
				const dia = data[2].split(/[T]/g);

				return dia[0] + "-" + data[1] + '-' + data[0];
			}

			return (
				<div className="container-fluid" >
					<div className="sub-heard-part" >

						<ol className="breadcrumb m-b-0" >
							<li > < a hre="/" > Home </a></li >
							<li > Vizualizar </li>
							<li > Perfil </li>
						</ol >
					</div>
					<div className="graph-visual" >
						<h3 className="inner-tittle" > Vizualizar Perfil Adulto </h3>

						<div className="graph" >
							<h3 className="inner-tittle" > Perfil
                            </h3>
							<div className="row">
								<div className="col-md-4 col-sm-4 text-center">
									<div className="graph" >
										<h5 className="ltTitulo"><b>  </b></h5>

										<img id='fotopreview' style={{ width: 'auto', height: 'auto', maxWidth: 250 + 'px' }} src={this.state.perfilAtual.photo} />
										{this.state.editar && (
											<div>
												<button className="btn btn-md botao botaoAvançar" style={{ background: ' #2ab7ec' }}><label>
													Trocar imagem <span className="glyphicon">&#xe065;</span>

													<input id="tipofile" type="file" name="foto" defaultValue="" />
												</label>
												</button>
											</div>)
										}
									</div>
								</div>

								<div className="col-md-4 col-sm-6">
									<div className="graph" style={{ padding: 10 + "px" }} >
										<h5 className="ltTitulo"><b> Nome: </b></h5>
										<p>{this.state.perfilAtual.name.firstName}</p>
									</div>
									<br></br>
									<div className="graph" style={{ padding: 10 + "px" }} >
										<h5 className="ltTitulo"><b> Sobrenome: </b></h5>
										<p>{this.state.perfilAtual.name.surName}</p>
									</div>
								</div>

								<div className="col-md-4 col-sm-6 col-xs-12" >
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b>  CPF: </b> </h5>
										<p>{this.state.perfilAtual.cpf} </p>
									</div>
									<br></br>
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b>  RG: </b> </h5>
										<p> {this.state.perfilAtual.rg} </p>
									</div>
								</div>
							</div>

							<br></br>

							<div className="row" >
								<div className="col-md-4 col-sm-12">
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b> Data de Nascimento: </b></h5>
										<p>{converter(this.state.perfilAtual.birthday)}</p>
									</div>
								</div>
								<div className="col-md-4 col-sm-4 col-xs-12" >
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b> Nacionalidade: </b></h5>
										<p>{this.state.perfilAtual.nacionality}</p>
									</div>
								</div>
								<div className="col-md-4 col-sm-4 col-xs-12" >
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b> Sexo: </b></h5>
										<p>{this.state.perfilAtual.sexuality}</p>
									</div>
								</div>
							</div>

							<br></br>

							<div className="row">
								<div className="col-md-4 col-sm-12 col-xs-12">
									<div className="graph " style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b> Email:</b></h5>
										{!this.state.editar && (<p>{this.state.perfilAtual.email}</p>)}
										{this.state.editar && (<input type="text" style={{ float: 'none' }} className="form-control" value={this.state.email} onChange={this.changueEmail} />)}
									</div>
								</div>
								<div className="col-md-4 col-sm-6 col-xs-12" >
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b> Telefone: </b></h5>
										{!this.state.editar && (<p>{this.state.perfilAtual.phone}</p>)}
										{this.state.editar && (<input type="text" className="form-control" value={this.state.phone} onChange={this.changuePhone} style={{ float: 'none' }} />)}
									</div>
								</div>

								<div className="col-md-4 col-sm-6 col-xs-12" >
									<div className="graph" style={{ padding: 10 + "px" }} >
										<h5 className="ltTitulo"><b> Estado Civil: </b></h5>
										<p>{this.state.perfilAtual.maritalStatus}</p>
									</div>
								</div>
							</div>

							<br></br>

							<div className='row'>

							</div>

							<br></br>

							<div className="row">
								<div className="col-md-4 col-sm-12">
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b> Endereço: </b></h5>
										{!this.state.editar && (<p>{this.state.perfilAtual.address.street}</p>)}
										{this.state.editar && (<input type="text" style={{ float: 'none' }} className="form-control" value={this.state.endereco} onChange={this.changueEndereco} />)}
									</div>
								</div>
								<div className="col-md-3 col-sm-10">
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b> Bairro: </b></h5>
										{!this.state.editar && (<p>{this.state.perfilAtual.address.district}</p>)}
										{this.state.editar && (<input type="text" style={{ float: 'none' }} className="form-control" value={this.state.bairro} onChange={this.changueBairro} />)}
									</div>
								</div>
								<div className="col-md-2 col-sm-2">
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b> Número: </b></h5>
										{!this.state.editar && (<p>{this.state.perfilAtual.address.number}</p>)}
										{this.state.editar && (<input className="form-control" style={{ float: 'none' }} type="text" value={this.state.numero} onChange={this.changueNumero} />)}
									</div>
								</div>
								<div className="col-md-3 col-sm-12">
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b> CEP: </b></h5>
										{!this.state.editar && (<p>{this.state.perfilAtual.address.cep}</p>)}
										{this.state.editar && (<input style={{ float: 'none' }} type="text" className="form-control" value={this.state.cep} onChange={this.changueCep} />)}
									</div>
								</div>
							</div>

							<br></br>

							<div className="row">

								<div className="col-md-3 col-sm-12">
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b> Cidade: </b></h5>
										{!this.state.editar && (<p>{this.state.perfilAtual.address.city}</p>)}
										{this.state.editar && (<input style={{ float: 'none' }} type="text" className="form-control" value={this.state.cidade} onChange={this.changueCidade} />)}
									</div>
								</div>
								<div className="col-md-3 col-sm-12">
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b> Estado: </b></h5>
										{!this.state.editar && (<p>{this.state.perfilAtual.address.state}</p>)}
										{this.state.editar && (<input style={{ float: 'none' }} type="text" className="form-control" value={this.state.estado} onChange={this.changueEstado} />)}
									</div>
								</div>
								<div className="col-md-2 col-sm-12">
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b> País: </b></h5>
										{!this.state.editar && (<p>{this.state.perfilAtual.address.country}</p>)}
										{this.state.editar && (<input style={{ float: 'none' }} type="text" className="form-control" value={this.state.pais} onChange={this.changuePais} />)}
									</div>
								</div>
								<div className="col-md-4 col-sm-12 col-xs-12">
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo" > <b>Observações</b> </h5>

										{!this.state.editar && (<p>{this.state.perfilAtual.observations}</p>)}
										{this.state.editar && (<textarea style={{ float: 'none' }} className="form-control" rows="4" cols="50" id="Observacoes" name="Observacoes" onChange={this.changueObs} value={this.state.obs}></textarea>)}
									</div></div>
							</div>

							<br></br>
							<div className="row">
								<div className="row">
									<div className="col-md-12 col-sm-8 text-center">
										<div className="graph" >
											<div className="tables table-responsive">
												<table className="table table-hover">
													<thead className="text-center">
														<tr >
															<th>#</th>
															<th>Nome</th>
															<th>Parentesco</th>
														</tr>
													</thead>
													<tbody id="CriaTabela">
														{this.state.perfilAtual.children.map((events, index) => {

															return (
																<tr style={{ textAlign: 'justify' }} key={events._id}>
																	<td>{index + 1}</td>
																	<td>{this.state.listaFuncionarios[index].name.firstName + " " + this.state.listaFuncionarios[index].name.surName}</td>
																	{events.kinship === undefined && (<td>Outros</td>)}
																	{events.kinship === "others" && (<td>Outros</td>)}
																	{events.kinship === "grandchildren" && (<td>Neto(a)</td>)}
																	{events.kinship === "Brother" && (<td>Irmão/Irmã</td>)}
																	{events.kinship === "nephews" && (<td>Sobrinho(a)</td>)}
																	{events.kinship === "children" && (<td>Filho(a)</td>)}
																	{events.kinship === "Stepson" && (<td>Enteado(a)</td>)}
																</tr>
															)
														})}

													</tbody>
												</table>

											</div>

										</div>
										{this.state.editar && (<button className="btn btn-md botao botaoAvançar" onClick={this.Adicionar}><label>
											Adicionar Criança <span className="glyphicon">&#xe065;</span>


										</label>
										</button>)}
									</div>
								</div>
								<br></br>

								{!this.state.editar && (
									<div style={{ textAlign: 'center' }}>
										<button onClick={this.voltar} className="btn btn-md botao botaoAvançar" > Voltar</button>
									</div>

								)}
								{this.state.editar && (
									<div style={{ textAlign: 'center' }}>
										<button onClick={this.salvar} className="btn btn-md botao botaoAvançar" > Salvar</button>
										<button onClick={this.cancelar} className="btn btn-md botao botaoAvançar" > Cancelar</button>
									</div>
								)}
							</div>
							<br></br>
						</div >
					</div>
				</div>

			);
		}
		if (this.state.Page === "Pcrianca") {
			function converter(evento) {
				const data = evento.match(/([T,\w\*]+)/g);
				const dia = data[2].split(/[T]/g);

				return dia[0] + "-" + data[1] + '-' + data[0];
			}
			return (
				<div className="container-fluid" >
					<div className="sub-heard-part" >

						<ol className="breadcrumb m-b-0" >
							<li > < a hre="/" > Home </a></li >
							<li > Vizualizar </li>
							<li > Perfil </li>
						</ol >
					</div>
					<div className="graph-visual" >
						<h3 className="inner-tittle" > Visualizar Perfil Criança </h3>

						<div className="graph" >
							<h3 className="inner-tittle" > Perfil


                            </h3>
							<div className="col-md-4 col-sm-12 text-center">
								<div className="graph" style={{ padding: 10 + "px" }}>
									<h5 className="ltTitulo"><b></b></h5>

									<img id='fotopreview' style={{ width: 'auto', height: 'auto', maxWidth: 250 + 'px' }} src={this.state.perfilAtual.photo} />
									{this.state.editar && (
										<div>
											<button className="btn btn-md botao botaoAvançar" style={{ background: ' #2ab7ec' }}><label>
												Trocar imagem <span className="glyphicon">&#xe065;</span>

												<input id="tipofile" type="file" name="foto" defaultValue="" />
											</label>
											</button><br /></div>)
									}
								</div>
								<br></br>
							</div>
							<div className="col-md-4 col-sm-12">
								<div className="graph" style={{ padding: 10 + "px" }}>
									<h5 className="ltTitulo"><b> Nome: </b></h5>
									{!this.state.editar && (<p>{this.state.perfilAtual.name.firstName}</p>)}
									{this.state.editar && (<input style={{ float: 'none' }} type="text" className="form-control" name="firstName" onChange={this.changue} value={this.state.firstName} />)}
								</div>
								<br></br>
								<div className="graph" style={{ padding: 10 + "px" }}>
									<h5 className="ltTitulo"><b> Sobrenome: </b></h5>
									{!this.state.editar && (<p>{this.state.perfilAtual.name.surName}</p>)}
									{this.state.editar && (<input style={{ float: 'none' }} type="text" className="form-control" name="surName" onChange={this.changue} value={this.state.surName} />)}
								</div>
							</div>

							<div className="col-md-4 col-sm-6 col-xs-12" >
								<div className="graph" style={{ padding: 10 + "px" }}>
									<h5 className="ltTitulo"><b>  Número de Registro: </b> </h5>
									{!this.state.editar && (<p>{this.state.perfilAtual.number} </p>)}
									{this.state.editar && (<input style={{ float: 'none' }} type="text" className="form-control" name="number" onChange={this.changue} value={this.state.number} />)}
								</div>
								<br></br>
							</div>
							<br></br><br></br>
							<div className="col-md-4 col-sm-12">
								<div className="graph" style={{ padding: 10 + "px" }}>
									<h5 className="ltTitulo"><b> Data de Nascimento: </b></h5>
									{!this.state.editar && (<p>{converter(this.state.perfilAtual.birthday)}</p>)}
									{this.state.editar && (<input style={{ float: 'none' }} type="date" className="form-control" name="aniversario" onChange={this.changue} value={this.state.aniversario} />
									)}
								</div>
							</div>
							<div className="row">
							</div>
							<br></br>
							<div className="row" >

								<div className="col-md-3 col-sm-4 col-xs-12" >
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b> Nacionalidade: </b></h5>
										{!this.state.editar && (<p>{this.state.perfilAtual.nacionality}</p>)}
										{this.state.editar && (<input style={{ float: 'none' }} type="text" name="nacionalidade" className="form-control" onChange={this.changue} value={this.state.nacionalidade} />)}
									</div>
								</div>
								<div className="col-md-3 col-sm-4 col-xs-12" >
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo"><b> Sexo: </b></h5>
										{!this.state.editar && (<p>{this.state.perfilAtual.sexuality}</p>)}
										{this.state.editar && (
											<select className="form-control" onChange={this.changue} name="sexualidade" style={{ height: 46 + 'px', float: "none" }}>

												{this.state.perfilAtual.sexuality === "Masculino" && (<option value="Masculino" selected>Masculino</option>)}
												{this.state.perfilAtual.sexuality != "Masculino" && (<option value="Masculino" >Masculino</option>)}
												{this.state.perfilAtual.sexuality === "Feminino" && (<option value="Feminino" selected>Feminino</option>)}
												{this.state.perfilAtual.sexuality != "Feminino" && (<option value="Feminino" >Feminino</option>)}


											</select>
										)}
									</div>
								</div>
								<div className="col-md-3 col-sm-12 col-xs-12">
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo" ><b> Observações:</b> </h5>

										{!this.state.editar && (<p>{this.state.perfilAtual.observations}</p>)}
										{this.state.editar && (<textarea style={{ float: 'none' }} className="form-control" name="obs" rows="4" cols="50" id="Observacoes" onChange={this.changue} value={this.state.obs}></textarea>)}
									</div>
								</div>
								<div className="col-md-3 col-sm-12 col-xs-12">
									<div className="graph" style={{ padding: 10 + "px" }}>
										<h5 className="ltTitulo" ><b> Restrições:</b> </h5>

										{!this.state.editar && (<p>{this.state.perfilAtual.restrictions}</p>)}
										{this.state.editar && (<textarea style={{ float: 'none' }} className="form-control" name="restricao" rows="4" cols="50" id="Observacoes" onChange={this.changue} value={this.state.restricao}></textarea>)}
									</div>
								</div>

							</div>
							<br></br>
							<div className="row">

								{!this.state.editar && (
									<div style={{ textAlign: 'center' }}>

										<button onClick={this.voltar} className="btn btn-md botao botaoAvançar" > Voltar</button>
									</div>

								)}
								{this.state.editar && (
									<div style={{ textAlign: 'center' }}>
										<button onClick={this.salvar} className="btn btn-md botao botaoAvançar" > Salvar</button>
										<button onClick={this.cancelar} className="btn btn-md botao botaoAvançar" > Cancelar</button>
									</div>
								)}
							</div>
							<br></br>
						</div >
					</div>
				</div>

			);
		}
	}
}
export default DashBoard;
