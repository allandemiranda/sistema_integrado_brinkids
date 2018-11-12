import React from 'react';
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";


// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/style.css';
import './css/icon-font.min.css';



var toggle = true;
class MainLayout extends React.Component {
    DiminueMenu = () => {
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
        return (
            <div className="page-container" >
                <div className="left-content" >
                    <div className="inner-content" >
                        <div className="header-section" >
                            <div className="top_menu" >
                                <div className="profile_details_left" >
                                    <ul className="nofitications-dropdown" >
                                        <li className="dropdown note" >
                                            <Link to="/MyProfile" className=" tooltips" >
                                                < i className="lnr lnr-user" > </i>
                                                
                                                <span className="badge" style={{ marginTop: 9 + 'px' }}>Profile</span >
                                            </Link>
                                        </li>
                                        <li className="dropdown note" >
                                            <Link to="/" className=" tooltips" >
                                                < i className="lnr lnr-cog" > </i>
                                                <span className="badge" style={{ marginTop: 9 + 'px' }}>Settings</span >
                                            </Link>
                                        </li>
                                        <li className="dropdown note" >
                                            <Link to="/Login" className=" tooltips" >
                                                < i className="lnr lnr-power-switch" ></i>
                                                <span className="badge" style={{ marginTop: 9 + 'px' }}>Log out</span >
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
                <div className="sidebar-menu" >
                    <header className="logo" >
                        <button className="sidebar-icon styleButaoMenu" onClick={this.DiminueMenu}>
                            < span className="fa fa-bars" > </span>
                        </button>
                        <Link to="index.html" >
                            < span id="logo" > < h1 > BrinKids </h1></span>
                        </Link>
                    </header>
                    <div className="bordaDaDiv"> </div>
                    <div className="menu" >
                        <ul id="menu" >
                            <li >
                                <Link to="/" >
                                    < i className="fa fa-tachometer" > </i>
                                    <span>Dashboard</span >
                                </Link>
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
                            <li id="menu-comunicacao" ><Link to="/"><i className="fa fa-edit"></i> <span>Cadastramento</span><span className="fa fa-angle-double-right" style={{ float: "right" }}></span></Link>
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
                                    <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/">Eventos <i className="fa fa-angle-right" style={{ float: "right", marginRight: -8 + "px", marginTop: 2 + "px" }}></i></Link>
                                        <ul id="menu-mensagens-sub" >
                                            <li id="menu-mensagens-enviadas" style={{ width: 130 + "px" }} ><Link to="/Event">Novo</Link></li>
                                            <li id="menu-mensagens-recebidas" style={{ width: 130 + "px" }}><Link to="/">Visualizar</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li >
                                <Link to="/Calendario" >
                                    < i className="fa fa-calendar" > </i>
                                    <span>Calendário</span >
                                </Link>
                            </li>
                            <li id="menu-comunicacao" ><Link to="/"><i className="fa fa-edit"></i> <span>Aniversário</span><span className="fa fa-angle-double-right" style={{ float: "right" }}></span></Link>
                                <ul id="menu-comunicacao-sub" >
                                    <li id="menu-mensagens" style={{ width: 180 + "px" }} ><Link to="/Aniversario">Aniversário </Link></li>
                                    <li id="menu-mensagens" style={{ width: 180 + "px" }} ><Link to="/EntradaAniversario"> Entrada Aniversário </Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/Passport">
                                    <i className="fa fa-globe"></i>
                                    <span>Passaporte</span>
                                </Link>
                            </li>
                            <li id="menu-comunicacao" ><Link to="/"><i className="fa fa-tags" aria-hidden="true"></i> <span>Serviços</span> <span className="fa fa-angle-double-right" style={{ float: "right" }}></span></Link>
                                <ul>
                                    <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/Serviços">Entrada </Link></li>
                                    <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/SaidaServicosExtra">Saída </Link></li>
                                    <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/ServicoPassaporte">Passaporte </Link></li>
                                </ul>
                            </li>

                            <li>
                                <Link to="/Desconto">
                                    <i className="fa fa-dollar"></i>
                                    <span>Gerar Desconto</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Gerador_funcoes">
                                <i className="glyphicon glyphicon-user"></i>
                                    <span>Gerenciador de Serviços</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/SaidaCrianca">
                                <i className="glyphicon glyphicon-off"></i>
                                    <span>Saida de Crianças</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Gavetas">
                                <i className="glyphicon glyphicon-off"></i>
                                    <span>Gavetas</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="clearfix" ></div>
            </div>
        )
    }
}

export default MainLayout;
