import React from 'react';



import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Dashboard/css/style.css';
import '../Dashboard/css/Dashboard.css';
import axios from 'axios';


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
								<li id="ddd" name="crincaTab" onClick={this.selectCrianca} className={this.state.crincaTab}><i class="fas fa-stroopwafel"></i><a class="icon-shop"><span class="lnr lnr-user"></span> <span>Fluxo</span></a></li>
								<li name="adultoTab" onClick={this.selectAdult} className={this.state.adultoTab}><a class="icon-cup"><span class="lnr lnr-users"></span> <span>Dispersão</span></a></li>
								<li name="aniversarioTab" onClick={this.selectAniversario} className={this.state.aniversarioTab}><a class="icon-food"><span class="lnr lnr-rocket"></span> <span>Busca</span></a></li>

							</ul>
						</nav>
						<div className="content tab">
							<section className={this.state.sectionCrianca} >
								<div className="graph">
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
												</tr>
											</thead>
										</table>
									</div>
								</div>
							</section>
							<section className={this.state.sectionAdult} >
							<div className="graph">
								<div className="tables table-responsive">
									<table className="table table-hover">
										<thead className="text-center">
											<tr >
												<th>#</th>
												<th>NomeEEEE</th>
												<th>Aniversariante</th>
											</tr>
										</thead>
									</table>
								</div>
							</div>
							</section>

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
