import React, { Component } from 'react';

import moment from 'moment';
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/all.css';
import '../../assets/sprints/solid.svg';
import '../Dashboard/css/style.css';
import '../Dashboard/css/Dashboard.css';
import axios from 'axios';

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
var  dados2 = []; 

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
			
			nome: false,
			campoNome:'',
			sexo:false,
			campoSexo:'',
			cidade:false,
			campoCidade:'',
			idade:false,
			campoIdade:'',
			Mes:false,
			campoMes:'',

			listaBusca:[],
			listaGraf2:[],
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
			var novo = moment(hj).subtract(i, 'days').calendar();
			console.log(novo);

			axios.get('http://localhost:3001/TelaMKT' + novo)
				.then((response) => {
					console.log(response.data);
					this.setState.lista.push(response.data);
					{/* Dados responsáveis por gerar o gráfico da tela 1 */ }
					dados1.push({
						name:response.data.name,
						Meninos: response.date.meninos,
						Meninas: response.date.meninas,
						Total: response.date.meninas + response.date.meninos,
					})
				})
				.catch((err) => console.log(err));
				
		}
	}
		grafico(event) {
		for (var i = 1; i <= 30; i++) {
			let hj = moment().format("MM/DD/YYYY");
			var novo = moment(hj).subtract(i, 'days').calendar();
			console.log(novo);

			axios.get('http://localhost:3001/TelaMKT' + novo)
				.then((response) => {
					console.log(response.data);
					this.setState.lista.push(response.data);
					{/* Dados responsáveis por gerar o gráfico da tela 1 */ }
					dados1.push({
						name:response.data.name,
						Meninos: response.data.meninos,
						Meninas: response.data.meninas,
						Total: response.data.meninas + response.data.meninos,
					})
				})
				.catch((err) => console.log(err));
				
		}
	}
	grafico1(event) {
		axios.get('http://localhost:3001/TelaMKT')
			.then((response) => {
				console.log(response.data);
				this.setState.lista.push(response.data);
				this.state.listaGraf2 = response.data;

				this.state.listaGraf2.map((dados2)=>{					
						{/* Dados responsáveis por gerar o gráfico da tela 2 */ }
						dados2.push({ name: response.data.nome, Meninos: response.data.meninos, Meninas:response.data.meninas })
				}) 
			})
			.catch((err) => console.log(err));
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
		
		if (value === true){
			this.state.listaBusca.push([this.state.selected],[value]);
			console.log(this.state.listaBusca)
		}
		if (value === false){
			this.state.listaBusca.pop();
			this.state.listaBusca.pop();
			console.log(this.state.listaBusca)
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
										<Line type="monotone" dataKey="Meninos" stroke="#052963" activeDot={{ r: 8 }}/>
										<Line type="monotone" dataKey="Meninas" stroke="#C71585" activeDot={{ r: 8 }}/>
										<Line type="monotone" dataKey="Total" stroke="#008DE7" activeDot={{ r: 8 }}/>
										
										<CartesianGrid strokeDasharray='3 3' />
										<Tooltip />
										<YAxis />
										<XAxis dataKey='name' />
										<Legend />
									</LineChart>
								</div>
								<button className="btn btn-md botao right" onClick={this.grafico}  style={{ width: 120 + "px"}}>Atualizar</button>
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
								<button className="btn btn-md botao right" onClick={this.grafico1}  style={{ width: 120 + "px"}}>Atualizar</button>
							</section>
							{/* FIM - SEGUNDATELA  */}

							{/* INICIO - TERCEIRA TELA  */}
							<section className={this.state.sectionAniversario} >
								<div className="graph">
									<h1 className="text-center"> Busca por Crianças do Sistema </h1>
									<p></p>
									<form>
										<label>
											<input
												name="nome"
												type="checkbox"
												checked={this.state.nome}
												onChange={this.handleInputChange}
											/>
											<input className="form-control text-center" type="text" placeholder="Nome" value={this.state.campoNome} onChange={this.mudarCampoNome} style={{ width: 500 + "px", marginBottom: 20 + "px"}}/>
										</label>
										<br />
										<label>
        									<input
												name="sexo"
												type="checkbox"
												checked={this.state.sexo}
												onChange={this.handleInputChange} 
											/>
											<input className="form-control text-center" type="text" placeholder="Sexo" value={this.state.campoSexo} onChange={this.mudarCampoSexo} style={{ width: 500 + "px", marginBottom: 20 + "px"}}/>
										</label>
										<br />
										<label>
        									<input
												name="cidade"
												type="checkbox"
												checked={this.state.cidade}
												onChange={this.handleInputChange} 
											/>
											<input className="form-control text-center" type="text" placeholder="Cidade" value={this.state.campoCidade} onChange={this.mudarCampoCidade} style={{ width: 500 + "px", marginBottom: 20 + "px"}}/>
										</label>	
										<br />
										<label>
        									<input
												name="idade"
												type="checkbox"
												checked={this.state.idade}
												onChange={this.handleInputChange} 
											/>
											<input className="form-control text-center" type="text" placeholder="Idade" value={this.state.campoIdade} onChange={this.mudarCampoIdade} style={{ width: 500 + "px", marginBottom: 20 + "px"}}/>
										</label>	
										<br />
										<label>
        									<input
												name="Mes"
												type="checkbox"
												checked={this.state.Mes}
												onChange={this.handleInputChange} 
											/>
											<input className="form-control text-center" type="text" placeholder="Mês de Aniversário" value={this.state.campoMes} onChange={this.mudarCampoMes} style={{ width: 500 + "px", marginBottom: 20 + "px"}}/>
										</label>																												
									</form>
									<button className="btn btn-md botao right" onClick={this.VoltarTelaI}  style={{ width: 120 + "px"}}>Pesquisar</button>
								</div>
								<br />
								<br />
								<div className="graph">
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
