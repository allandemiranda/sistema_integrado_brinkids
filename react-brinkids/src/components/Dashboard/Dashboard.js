import React from 'react';


import Comprovante from '../Comprovante/comprovante.js';
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/style.css';
import './css/Dashboard.css';
import crianca from './tabelas/crianças';
import adultos from './tabelas/adultos';
import eventos from './tabelas/eventos';
import noticias from './tabelas/noticias';
import '../Comprovante/comprovante.css';
import tabelinha from '../Comprovante/tabelinha';
import axios from 'axios';

class DashBoard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			comprovant: false,
			colaps: true,

			teste: true,
			aba:false,
			
			nome:[{},{}],
			lista:[],
			popup: true,

			adultospopup: false,

			Eventos: true,
			Eventospopup: false,

			Noticias: true,
			noticiaspopup: false

		};
		this.mudar = this.mudar.bind(this);
		this.mudar2 = this.mudar2.bind(this);
		this.mudar3 = this.mudar3.bind(this);
		this.mudar4 = this.mudar4.bind(this);
	}
	componentWillMount() {
    
		axios.get('/dashboard')
		  .then((response) => {
			
			
			console.log(response.data);
			this.setState({lista: response.data });
		  })
		  .catch((err) => console.log(err));
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



		const byCrianca = function (events) {
			return (
				<tr key={events.toString()}>
					<td>{events.id}</td>
					<td>{events.Nome}</td>
					<td>{events.Idade}</td>
					<td>{events.Tempo}</td>
					<td>{events.Responsavel}</td>
					<td>{events.Telefone}</td>
					<td>{events.Servico}</td>

				</tr>
			)
		}
		const byAdulto = function (events) {
			return (
				<tr key={events.toString()}>
					<td>{events.id}</td>
					<td>{events.Nome}</td>
					<td>{events.Aniversariante}</td>
				</tr>
			)
		}
		const byEvento = function (events) {
			return (
				<tr key={events.toString()}>
					<td>{events.Titulo}</td>
					<td>{(events.Start.getHours() + ':' + events.Start.getMinutes())}</td>
					<td>{((events.End.getHours() + 2) + ':' + (events.End.getMinutes() + 11))}</td>
				</tr>
			)
		}
		const byNoticias = function (events) {
			return (
				<tr key={events.toString()}>
					<td>{events.Titulo}</td>
					<td>{events.Descricao}</td>
				</tr>
			)
		}

		return (

			<div className="container-fluid" >

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

				<div className="graph">
					<button className="sidebar-icon styleButaoMenu" style={{ float: 'none' }} onClick={this.mudar}>
						< span className="fa fa-bars" > </span>
					</button>       Crianças
				{this.state.colaps &&

						(<div className="graph">
							<div className="tables table-responsive">
								<table className="table table-hover">
									<thead className="text-center">
										<tr >
											<th>#</th>
											<th>Nome</th>
											<th>Idade</th>
											<th>Tempo</th>
											<th>Responsavel</th>
											<th>Telefone</th>
											<th>Serviço</th>
											<th></th>
										</tr>
									</thead>
									<tbody id="CriaTabela">
										{crianca.map(byCrianca)}

									</tbody>
								</table>
							</div>
						</div>)


					}
				</div>


				{this.state.teste &&

					(<div className="graph">
						<button className="sidebar-icon styleButaoMenu" style={{ float: 'none' }} onClick={this.mudar2}>
							< span className="fa fa-bars" > </span>
						</button>       Adultos
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
										<tbody id="CriaTabela">
											{adultos.map(byAdulto)}

										</tbody>
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
										<tbody id="CriaTabela">
											{eventos.map(byEvento)}

										</tbody>
									</table>
								</div>
							</div>)
						}


					</div>

				}
				{this.state.Noticias &&

					<div className="graph">
						<button className="sidebar-icon styleButaoMenu" style={{ float: 'none' }} onClick={this.mudar4}>
							< span className="fa fa-bars" > </span>
						</button>     Noticías
					{this.state.noticiaspopup &&

							(<div className="graph">
								<div className="tables table-responsive">
									<table className="table table-hover">
										<thead className="text-center">
											<tr>

												<th>Titulo</th>
												<th>Descrição</th>
											</tr>
										</thead>
										<tbody id="CriaTabela">
											{noticias.map(byNoticias)}

										</tbody>
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
