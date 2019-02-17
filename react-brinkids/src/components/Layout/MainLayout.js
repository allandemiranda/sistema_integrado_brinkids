import React from 'react';
import $ from 'jquery';
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import { logout } from "../Login/service/auth";
import { getToken } from "../Login/service/auth";
import logo from './css/logo transp m.png';
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/fontawesome.css';
import '../../assets/style/all.css';
import '../../assets/sprints/solid.svg';
import './css/style.css';
import './css/icon-font.min.css';
import axios from 'axios';
import moment from 'moment';

var toggle = true;
class MainLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            FuncionarioLogado: [],
            name: "",
            cargo: "",
            page: "",

        }
        this.DiminueMenu = this.DiminueMenu.bind(this);
        this.requisicao = this.requisicao.bind(this);
        this.deslogar = this.deslogar.bind(this);
    }
    deslogar = () => {
        logout();
        this.props.history.push("/Login");
    }
   
    requisicao() {
        const a = getToken();

        const b = jwt.verify(a, config.secret_auth);
        const z = moment()
        const u = moment(b.exp * 1000)
        console.log(moment(u).isBefore(z))
        console.log(b)
        if ((moment(u).isBefore(z))) {
            this.deslogar();

        }



        if (!b.admin) {
            console.log(b.id)
            axios.get(`/employees/${b.id}`)
                .then((response) => {
                    console.log(response.data)
                    let id = response.data[0].identifierEmployee.employeeData.officialPosition;
                    console.log(response.data);
                    this.setState({
                        FuncionarioLogado: response.data[0],
                        name: response.data[0].name.firstName,
                    })

                    axios.get(`/professionalPosition/indentifier/${id}`)
                        .then((response) => {

                            console.log(response.data);
                            if(response.data!== null){
                                this.setState({
                                    cargo: response.data.name,
                                    page: "carregado"
                                })
    
                            }else{
                                alert("Funcionario sem cargo")
                                window.location.href ="/Login"
                            }
                            

                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) =>{ 
                    console.log(err)
                    alert("login experida: Por Favor faça login novamente")
                   window.location.href ="/Login"
                })
        } else {
            this.setState({
                page: "carregado",
                cargo: "admino",
                name: "admins"
            })
        }

    }
    componentWillMount() {

        this.requisicao();


    }
    DiminueMenu() {
    
        if (toggle) {
            $(".page-container").addClass("sidebar-collapsed").removeClass("sidebar-collapsed-back");
            $("#menu span").css({ "position": "absolute" });
        }
        else {
            $(".page-container").removeClass("sidebar-collapsed").addClass("sidebar-collapsed-back");
            setTimeout(function () {
                $("#menu span").css({ "position": "relative" });
            }, 400);
        }
        toggle = !toggle;
    }


    render() {

        const { children } = this.props;
        if (this.state.page === "carregado") {
            return (
                <div className="page-container sidebar-collapsed-back" >
                    <div className="left-content" >
                        <div className="inner-content" >
                            <div className="header-section" >
                                <div className="top_menu" >
                                    <div className="profile_details_left" style={{ width: 15 + '%' }}>
                                        <ul className="nofitications-dropdown" >

                                            <li className="dropdown note" >
                                                <Link to="/" className=" tooltips" >
                                                    < i className="lnr lnr-home" > </i>
                                                    <span className="badge" style={{ marginTop: 25 + 'px' }}>Home</span >
                                                </Link>
                                            </li>
                                            <li className="dropdown note" >
                                                <Link to="/" className=" tooltips" >


                                                </Link>
                                            </li>
                                            <div className="clearfix" ></div>
                                        </ul>
                                    </div>
                                    <div className="clearfix" ></div>
                                </div>
                                <div className="clearfix" ></div>
                            </div>
                            {/* PARTE QUE ENTRA O CODIGO (PRECISA SER MAIS ESTUDADO)*/}
                            <div className="outter-wp" > {children} </div>
                        </div>
                    </div>
                    <div className="sidebar-menu">
                        <header className="logo" style={{ backgroundColor: "white" }} >
                            <button className="sidebar-icon styleButaoMenu" onClick={this.DiminueMenu}>
                                < span className="fa fa-bars" > </span>
                            </button>

                            < span id="logo" ><img style={{ maxWidth: 139 + "px" }} className="logo_1" alt="logo" src={logo}></img></span>


                        </header>
                        <div className="bordaDaDiv"> </div>
                        <div className="down" style={{ paddingBottom: 15 + 'px' }}>
                            {this.state.name !== "admins" && (<a ><img img style={{ maxWidth: 139 + "px" }} src={this.state.FuncionarioLogado.photo} /></a>)}
                            {this.state.name === "admins" && (<a ><img img style={{ maxWidth: 139 + "px" }} src={logo} /></a>)}

                            {this.state.name !== "admins" && (<a ><span className=" name-caret">{this.state.FuncionarioLogado.name.firstName }</span></a>)}
                            {this.state.name === "admins" && (<a ><span className=" name-caret">{this.state.name}</span></a>)}
                            <p>{this.state.cargo}</p>
                            <ul>
                                <li><Link class="tooltips" to="/MyProfile"><span>Profile</span><i class="lnr lnr-user"></i></Link></li>

                                <li><Link class="tooltips" to="/Login" onClick={this.deslogar}><span>Log out</span><i class="lnr lnr-power-switch"></i></Link></li>
                            </ul>

                        </div>
                        <div className="menu">
                            <ul id="menu" >
                                <li >
                                    <Link to="/" >
                                        <i class="fa fa-desktop" aria-hidden="true"></i>
                                        <span>Painel</span >
                                    </Link>
                                </li>
                                <li id="menu-comunicacao" ><Link to="/"><i class="fas fa-user-cog"></i> <span>Configurações</span> <span className="fa fa-angle-double-right" style={{ float: "right" }}></span></Link>
                                    <ul>

                                        <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/ServicoPassaporte">Passaporte </Link></li>
                                        <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/ServicoBabypassaporte">Baby P </Link></li>
                                        <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/Desconto">Desconto </Link></li>
                                        <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/Gerador_funcoes">Funcionários </Link></li>
                                        <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/Gavetas">Gavetas </Link></li>
                                        <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/GerenciamentoFinanceiro">Financeiro</Link></li>
                                        <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/TelaMKT">Marketing</Link></li>
                                    </ul>
                                </li>
                                <li id="menu-comunicacao" ><Link to="/"><i class="far fa-address-book" aria-hidden="true"></i><span>Usuários</span><span className="fa fa-angle-double-right" style={{ float: "right" }}></span></Link>
                                    <ul id="menu-comunicacao-sub" >
                                        <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/">Criança <i className="fa fa-angle-right" style={{ float: "right", marginRight: -8 + "px", marginTop: 2 + "px" }}></i></Link>
                                            <ul id="menu-mensagens-sub" >
                                                <li id="menu-mensagens-enviadas" style={{ width: 130 + "px" }} ><Link to="/Crianca">Novo</Link></li>
                                                <li id="menu-mensagens-recebidas" style={{ width: 130 + "px" }}><Link to="/PerfilCrianca">Visualizar</Link></li>
                                            </ul>
                                        </li>
                                        <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/">Adulto <i className="fa fa-angle-right" style={{ float: "right", marginRight: -8 + "px", marginTop: 2 + "px" }}></i></Link>
                                            <ul id="menu-mensagens-sub" >
                                                <li id="menu-mensagens-enviadas" style={{ width: 130 + "px" }} ><Link to="/Adult">Novo</Link></li>
                                                <li id="menu-mensagens-recebidas" style={{ width: 130 + "px" }}><Link to="/PerfilAdulto">Visualizar</Link></li>
                                            </ul>
                                        </li>
                                        <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/">Funcionário <i className="fa fa-angle-right" style={{ float: "right", marginRight: -8 + "px", marginTop: 2 + "px" }}></i></Link>
                                            <ul id="menu-mensagens-sub" >
                                                <li id="menu-mensagens-enviadas" style={{ width: 130 + "px" }} ><Link to="/Funcionario">Novo</Link></li>
                                                <li id="menu-mensagens-recebidas" style={{ width: 130 + "px" }}><Link to="/Perfil">Visualizar</Link></li>
                                            </ul>
                                        </li>

                                    </ul>
                                </li>
                                <li >
                                    <Link to="/" >
                                        <i class="fa fa-sign-in" aria-hidden="true"></i>
                                        <span>Entrada</span ><span className="fa fa-angle-double-right" style={{ float: "right" }}></span>
                                    </Link>
                                    <ul id="menu-comunicacao-sub" >
                                        <li id="menu-mensagens" style={{ width: 180 + "px" }} ><Link to="/Passport">Passaporte </Link></li>
                                        <li id="menu-mensagens" style={{ width: 180 + "px" }} ><Link to="/Babypassport">Baby Passaporte </Link></li>
                                        <li id="menu-mensagens" style={{ width: 180 + "px" }} ><Link to="/EntradaAniversario"> Aniversário </Link></li>
                                    </ul>
                                </li>
                                <li >
                                    <Link to="/SaidaCrianca" >
                                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                                        <span>Saída</span >
                                    </Link>
                                </li>

                                <li >
                                    <Link to="/" >
                                        <i class="fa fa-tags" aria-hidden="true"></i>
                                        <span>Serviços</span ><span className="fa fa-angle-double-right" style={{ float: "right" }}></span>
                                    </Link>
                                    <ul id="menu-comunicacao-sub" >
                                        <li id="menu-mensagens" style={{ width: 180 + "px" }} ><Link to="/SaidaServicosExtra">Caixa</Link></li>
                                        <li id="menu-mensagens" style={{ width: 180 + "px" }} ><Link to="/Serviços"> Gerenciamento </Link></li>
                                    </ul>
                                </li>
                                <li id="menu-comunicacao" ><Link to="/"><i class="fas fa-rocket"></i> <span>Aniversário</span><span className="fa fa-angle-double-right" style={{ float: "right" }}></span></Link>
                                    <ul id="menu-comunicacao-sub" >
                                        <li id="menu-mensagens" style={{ width: 180 + "px" }} ><Link to="/Aniversario">Cadastrar </Link></li>
                                        <li id="menu-mensagens" style={{ width: 180 + "px" }} ><Link to="/VAniversario"> Visualizar </Link></li>
                                    </ul>
                                </li>
                                {/*<li id = "menu-academico" >
                                <Link to = "#" >
                                    < i className = "lnr lnr-book" ></i>
                                    <span>Pages</span >
                                    <span className = "fa fa-angle-right" style = {{ float: "right" }} ></span>
                                </Link >
                                <ul id = "menu-academico-sub" >
                                    <li id = "menu-academico-avaliacoes" >
                                        <Link to = "/" > Login </Link>
                                    </li>
                                    <li id = "menu-academico-boletim" >
                                        <Link to = "/" > Register </Link>
                                    </li>
                                </ul>
                             </li>*/}
                                <li >
                                    <Link to="/Calendario" >
                                        < i className="fa fa-calendar" > </i>
                                        <span>Calendário</span >
                                    </Link>
                                </li>







                            </ul>
                        </div>
                    </div>
                    <div className="clearfix" ></div>
                </div>
            );
        } else { return (<div>Carregando página...</div>); }
    }
}

export default MainLayout;
