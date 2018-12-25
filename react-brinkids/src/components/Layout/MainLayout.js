import React from 'react';
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";

  import logo from './css/logo transp m.png';
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/fontawesome.css';
import '../../assets/style/all.css';
import '../../assets/sprints/solid.svg';
import './css/style.css';
import './css/icon-font.min.css';

import perfilImage from './css/admin2.jpg'

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
            <div className="page-container sidebar-collapsed-back" >
                <div className="left-content" >
                    <div className="inner-content" >
                        <div className="header-section" >
                            <div className="top_menu" >
                                <div className="profile_details_left" style={{width: 15+'%'}}>
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
                <div className="sidebar-menu" >
                    <header className="logo" style={{backgroundColor:"white"}} >
                        <button className="sidebar-icon styleButaoMenu" onClick={this.DiminueMenu}>
                            < span className="fa fa-bars" > </span>
                        </button>
                        <Link to="index.html" >
                            < span id="logo" ><img style={{maxWidth:139+"px"}} className="logo_1" alt="logo" src={logo}></img></span>
                        </Link>
                    </header>
                    <div className="bordaDaDiv"> </div>
                    <div className="down" style={{ paddingBottom:15+'px'}}>	
									  <a ><img src={perfilImage}/></a>
									  <a ><span class=" name-caret">Jasmin Leo</span></a>
									 <p>System Administrator in Company</p>
									<ul>
									<li><Link class="tooltips" to="/MyProfile"><span>Profile</span><i class="lnr lnr-user"></i></Link></li>
										
										<li><Link class="tooltips" to="/Login"><span>Log out</span><i class="lnr lnr-power-switch"></i></Link></li>
										</ul>
                                        
									</div>
                    <div className="menu" >
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
                                    <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/Desconto">Desconto </Link></li>
                                    <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/Gerador_funcoes">Funcionários </Link></li>
                                    <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/Gavetas">Gavetas </Link></li>
                                    <li id="menu-mensagens" style={{ width: 120 + "px" }} ><Link to="/GerenciamentoFinanceiro">Financeiro</Link></li>
                                </ul>
                            </li>
                            <li id="menu-comunicacao" ><Link to="/"><i class="far fa-address-book" aria-hidden="true"></i><span>Usuarios</span><span className="fa fa-angle-double-right" style={{ float: "right" }}></span></Link>
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
                                    <li id="menu-mensagens" style={{ width: 180 + "px" }} ><Link to="/EntradaAniversario"> Aniversario </Link></li>
                                </ul>
                            </li>
                            <li >
                                <Link to="/SaidaCrianca" >
                                <i class="fa fa-sign-out" aria-hidden="true"></i>
                                    <span>Saida</span >
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
        )
    }
}

export default MainLayout;
