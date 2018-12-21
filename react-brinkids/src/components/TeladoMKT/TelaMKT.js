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

{/* Dados responsáveis por gerar o gráfico da tela 1 */}
const dados1 = [
      {name: 'Page A', Meninos: 4, Meninas: 4, Total: 2},
      {name: 'Page B', Meninos: 7, Meninas: 5, Total: 0.1},
      {name: 'Page C', Meninos: 6, Meninas: 9, Total: 8},
      {name: 'Page D', Meninos: 1, Meninas: 3, Total: 2},
      {name: 'Page E', Meninos: 8, Meninas: 4, Total:6 },
      {name: 'Page F', Meninos: 5, Meninas: 8, Total: 9},
      {name: 'Page G', Meninos: 10, Meninas: 8, Total: 8},
];

{/* Dados responsáveis por gerar o gráfico da tela 2 */}
const dados2 = [
	{name: '0-2', Meninos: -0.5, Meninas: 0.5},
	{name: '3-4', Meninos: -0.6, Meninas: 0.4},
	{name: '5-6', Meninos: -0.8, Meninas: 0.2},
	{name: '7-8', Meninos: -0.5, Meninas: 0.5},
	{name: '9-10', Meninos: -0.3, Meninas: 0.7},
	{name: '11-12', Meninos: -0.9, Meninas: 0.1},
	{name: '13-14', Meninos: -0.2, Meninas: 0.8},
	{name: '15-16', Meninos: -0.6, Meninas: 0.4},
	{name: '17-18', Meninos: -0.1, Meninas: 0.9},
];

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

		};
		this.mudar2 = this.mudar2.bind(this);
		this.mudar3 = this.mudar3.bind(this);
		this.selectCrianca = this.selectCrianca.bind(this);
		this.selectAdult = this.selectAdult.bind(this);
		this.selectAniversario = this.selectAniversario.bind(this);
		this.grafico = this.grafico.bind(this);

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
					this.setState.lista.pop(response.data);
				})
				.catch((err) => console.log(err));
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
					<input type="button" onClick={this.grafico}></input>
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
							</section>
							{/* FIM - SEGUNDATELA  */}

							{/* INICIO - TERCEIRA TELA  */}
							<section className={this.state.sectionAniversario} >
								<div className="graph">
									Informação Aqui 3
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
