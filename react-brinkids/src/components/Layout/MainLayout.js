import React from 'react';
import $ from 'jquery';



// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/style.css';
import './css/icon-font.min.css';



var toggle = true; 
class MainLayout extends React.Component {
    DiminueMenu = () => {                       
        if (toggle)
        {
            $(".page-container").addClass("sidebar-collapsed").removeClass("sidebar-collapsed-back");
            $("#menu span").css({"position":"absolute"});
        }
        else
        {
            $(".page-container").removeClass("sidebar-collapsed").addClass("sidebar-collapsed-back");
            setTimeout(function() {
            $("#menu span").css({"position":"relative"});
            }, 400);
        }                    
        toggle = !toggle;
    }
    
    render() {
        const { children } = this.props;
        return (
            <div className = "page-container" >
                <div className = "left-content" >
                    <div className = "inner-content" >
                        <div className = "header-section" >
                            <div className = "top_menu" >
                                <div className = "profile_details_left" >
                                    <ul className = "nofitications-dropdown" >
                                        <li className = "dropdown note" >
                                            <a href = "/" className = " tooltips" >
                                                < i className = "lnr lnr-user" > </i>
                                                <span className="badge" style={{marginTop: 9+ 'px'}}>Profile</span >
                                            </a>
                                        </li>
                                        <li className = "dropdown note" >
                                            <a href = "/" className = " tooltips" >
                                                < i className = "lnr lnr-cog" > </i>
                                                <span className="badge" style={{marginTop: 9 + 'px'}}>Settings</span >
                                            </a>
                                        </li>
                                        <li className= "dropdown note" >
                                            <a href = "/Login" className = " tooltips" >
                                                < i className = "lnr lnr-power-switch" ></i>
                                                <span className="badge" style={{marginTop: 9 + 'px'}}>Log out</span >
                                            </a>
                                        </li>
                                        <div className = "clearfix" ></div>
                                    </ul>
                                </div>
                                <div className = "clearfix" ></div>
                            </div>
                            <div className = "clearfix" ></div>
                        </div>
                        {/* PARTE QUE ENTRA O CODIGO (PRECISA SER MAIS ESTUDADO)*/}
                        <div className = "outter-wp" > { children } </div>
                    </div>
                </div>
                <div className = "sidebar-menu" >
                    <header className = "logo" >
                        <button  className = "sidebar-icon styleButaoMenu" onClick={this.DiminueMenu}>
                            < span className = "fa fa-bars" > </span>
                        </button>
                        <a href = "index.html" >
                            < span id = "logo" > < h1 > BrinKids </h1></span>
                        </a>
                    </header>
                    <div style = {{ borderTop: 1 + "px" + "solid" + "rgba(69, 74, 84, 0.7)" }}> </div>
                    <div className = "menu" >
                        <ul id = "menu" >
                            <li >
                                < a href = "/" >
                                    < i className = "fa fa-tachometer" > </i>
                                    <span>Dashboard</span >
                                </a>
                            </li>
                            {/*<li id = "menu-academico" >
                                < a href = "#" >
                                    < i className = "lnr lnr-book" ></i>
                                    <span>Pages</span >
                                    <span className = "fa fa-angle-right" style = {{ float: "right" }} ></span>
                                </a >
                                <ul id = "menu-academico-sub" >
                                    <li id = "menu-academico-avaliacoes" >
                                        < a href = "/" > Login </a>
                                    </li>
                                    <li id = "menu-academico-boletim" >
                                        < a href = "/" > Register </a>
                                    </li>
                                </ul>
                             </li>*/}
                            <li id="menu-comunicacao" ><a href="/"><i className="fa fa-smile-o"></i> <span>Usuarios</span><span className="fa fa-angle-double-right" style={{float: "right"}}></span></a>
								<ul id="menu-comunicacao-sub" >
								    <li id="menu-mensagens" style={{width: 120 + "px"}} ><a href="/">Criança <i className="fa fa-angle-right" style={{float: "right", marginRight: -8 + "px", marginTop: 2 + "px"}}></i></a>
										<ul id="menu-mensagens-sub" >
										    <li id="menu-mensagens-enviadas" style={{width:130 + "px"}} ><a href="/Crianca">Novo</a></li>
											<li id="menu-mensagens-recebidas"  style={{width:130 + "px"}}><a href="/">Visualizar</a></li>
										</ul>
									</li>
                                    <li id="menu-mensagens" style={{width: 120 + "px"}} ><a href="/">Adulto <i className="fa fa-angle-right" style={{float: "right", marginRight: -8 + "px", marginTop: 2 + "px"}}></i></a>
										<ul id="menu-mensagens-sub" >
										    <li id="menu-mensagens-enviadas" style={{width:130 + "px"}} ><a href="/Crianca">Novo</a></li>
											<li id="menu-mensagens-recebidas"  style={{width:130 + "px"}}><a href="/">Visualizar</a></li>
										</ul>
									</li>
								</ul>
						    </li>
                        </ul>
                    </div>
                </div>
                <div className = "clearfix" ></div>
            </div>
        )
    }
}

export default MainLayout;
