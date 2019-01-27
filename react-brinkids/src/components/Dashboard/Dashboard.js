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
import Modal from 'react-modal';
//import { Tabs, Tab } from 'react-bootstrap-tabs';

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
			Page: "Dash",

			nome: [{}, {}],
			lista: [],
			popup: true,

			crincaTab: "tab-current",
			adultoTab: "",
			aniversarioTab: "",
			noticiaTab: "",

			sectionCrianca: "content-current",
			sectionAdult: "",
			sectionAniversario: "",
			sectionNoticia: "",
			listaFuncionarios: [],
			perfilAtual: [],

			modalIsOpen: false,
			photo:'',


		};
		this.voltar = this.voltar.bind(this);

		this.requisicao = this.requisicao.bind(this);
		this.inteval = this.inteval.bind(this);
		this.selectCrianca = this.selectCrianca.bind(this);

		this.selectAniversario = this.selectAniversario.bind(this);


		this.cahnguePageA = this.cahnguePageA.bind(this);
		this.changuePageC = this.changuePageC.bind(this);

		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

		this.idade = this.idade.bind(this);
	}
	openModal(event) {
		this.setState({ 
			modalIsOpen: true,
			photo: event.photo, 
		});
		console.log(this.state.photo,"'''",event.photo)
	}

	afterOpenModal(event) {
		// references are now sync'd and can be accessed.
		this.subtitle.style.color = '#f00';
	}

	closeModal(event) {
		this.setState({ modalIsOpen: false });
	}

	voltar(event) {
		this.setState({
			Page: "Dash",
			listaFuncionarios: [],
			perfilAtual: [],
		})
	}
	changuePageC(event) {
		axios.get(`/child/indentifier/${event.children.id}`)
			.then((response) => {
				console.log(response.data);
				this.setState({
					perfilAtual: response.data,
					Page: "Pcrianca",
				});
			}).catch((err) => {
				console.log(err);
			});
	}
	cahnguePageA(event) {
		axios.get(`/adult/${event.adult.id}`)
			.then((response) => {
				const criancas = response.data.children.map(async (crianca, index) => {
					const response = await axios.get(`/child/indentifier/${crianca.identifier}`);
					return response.data;
				});

				Promise.all(criancas).then((listaCriancas) => {
					console.log(listaCriancas, "SOu um filho da puta")
					this.setState({
						listaFuncionarios: listaCriancas,

						perfilAtual: response.data,
						Page: "Padulto",
					})
				});

				console.log(response.data);

			}).catch((err) => {
				console.log(err);
			});





		console.log(this.state.listaFuncionarios);
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
	render() {
		if (this.state.Page === "Dash") {

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

					{!this.state.modalIsOpen && (

						<div id="tabs" className="tabs">

							<div className="graph">
								<nav>
									<ul>
										<li id="ddd" name="crincaTab" onClick={this.selectCrianca} className={this.state.crincaTab}><a className="icon-shop"><span className="lnr lnr-user"></span> <span>Passaporte</span></a></li>

										<li name="aniversarioTab" onClick={this.selectAniversario} className={this.state.aniversarioTab}><a className="icon-food"><span className="lnr lnr-rocket"></span> <span>Aniversarios</span></a></li>


									</ul>
								</nav>
								<div className="content tab">
									<section className={this.state.sectionCrianca}  >

										<div className="graph graph-visual tables-main">
											<div className="tables">
												<table className="table table-hover">
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
															if(event.service === "Passaporte"){
																return (
																<tr>
																	<th scope="row" onClick={()=>this.openModal(event)}>{index + 1}</th>
																	<td style={{ textAlign: "center" }}><a style={{ color: "inherit" }} onClick={() => this.changuePageC(event)}>{event.children.name}</a></td>
																	<td style={{ textAlign: "center" }}>{this.idade(event.children.birthday)}</td>

																	{event.children.restrictions !== "" && (<td style={{ textAlign: "center" }} onClick={()=>alert('Restrições!\n\n'+event.children.restrictions)}><a>SIM</a></td>)}
																	{event.children.restrictions === "" && (<td style={{ textAlign: "center" }} >NÃO</td>)}

																	{event.children.observations !== "" && (<td style={{ textAlign: "center" }} onClick={()=>alert('Observações!\n\n'+event.children.observations)}><a>SIM</a></td>)}
																	{event.children.observations === "" && (<td style={{ textAlign: "center" }} >NÃO</td>)}



																	<td style={{ textAlign: "center" }}>{moment(event.time).format("HH:mm")}</td>
																	<td style={{ textAlign: "center" }}>{event.belongings}</td>
																	<td style={{ textAlign: "center" }}><a style={{ color: "inherit" }} onClick={() => this.cahnguePageA(event)}>{event.adult.name}</a></td>
																	<td style={{ textAlign: "center" }}>Pai</td>
																	<td style={{ textAlign: "center" }}>{event.adult.phone}</td>

																	{event.adult.observations !== "" && (<td style={{ textAlign: "center" }} onClick={()=>alert('Observações!\n\n'+event.adult.observations)}><a>SIM</a></td>)}
																	{event.adult.observations === "" && (<td style={{ textAlign: "center" }} >NÃO</td>)}
																</tr>
															);}
														})}


													</tbody>
												</table>
											</div>
										</div>
									</section>
									<section className={this.state.sectionAniversario}>
										<div className="graph graph-visual tables-main">
											<div className="tables">
												<table className="table table-hover">
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
														if(event.service==="Aniversario"){
															return (
																<tr>
																	<th scope="row" onClick={()=>this.openModal(event)}>{index + 1}</th>
																	<td style={{ textAlign: "center" }}><a style={{ color: "inherit" }} onClick={() => this.changuePageC(event)}>{event.children.name}</a></td>
																	<td style={{ textAlign: "center" }}>{this.idade(event.children.birthday)}</td>

																	{event.children.restrictions !== "" && (<td style={{ textAlign: "center" }} onClick={()=>alert('Restrições!\n\n'+event.children.restrictions)}><a>SIM</a></td>)}
																	{event.children.restrictions === "" && (<td style={{ textAlign: "center" }} >NÃO</td>)}

																	{event.children.observations !== "" && (<td style={{ textAlign: "center" }} onClick={()=>alert('Observações!\n\n'+event.children.observations)}><a>SIM</a></td>)}
																	{event.children.observations === "" && (<td style={{ textAlign: "center" }} >NÃO</td>)}



																	<td style={{ textAlign: "center" }}>{moment(event.time).format("HH:mm")}</td>
																	<td style={{ textAlign: "center" }}>{event.belongings}</td>
																	<td style={{ textAlign: "center" }}><a style={{ color: "inherit" }} onClick={() => this.cahnguePageA(event)}>{event.adult.name}</a></td>
																	<td style={{ textAlign: "center" }}>Pai</td>
																	<td style={{ textAlign: "center" }}>{event.adult.phone}</td>

																	{event.adult.observations !== "" && (<td style={{ textAlign: "center" }} onClick={()=>alert('Observações!\n\n'+event.adult.observations)}><a>SIM</a></td>)}
																	{event.adult.observations === "" && (<td style={{ textAlign: "center" }} >NÃO</td>)}
																</tr>
															);}
														})}

													</tbody>
												</table>
											</div>
										</div>
									</section>
								</div>
							</div>
						</div>)}
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
						<h3 className="inner-tittle" > Vizualizar Perfil Criança </h3>

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
									<h5 className="ltTitulo"><b>  Numero de Registro: </b> </h5>
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
