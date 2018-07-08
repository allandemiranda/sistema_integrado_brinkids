import React from 'react';
import $ from 'jquery';



// CSS Layout
import '../css/bootstrap.min.css';
import '../css/style.css';
import '../css/font-awesome.css';





class MainLayout extends React.Component {
    
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
                                            <a href = "#" className = " tooltips" > 
                                                < i className = "lnr lnr-user" > </i> 
                                                <span className="badge" style={{marginTop: 9+ 'px'}}>Profile</span > 
                                            </a>
                                        </li>
                                        <li className = "dropdown note" >
                                            <a href = "#" className = " tooltips" > 
                                                < i className = "lnr lnr-cog" > </i>
                                                <span className="badge" style={{marginTop: 9 + 'px'}}>Settings</span >
                                            </a>
                                        </li>
                                        <li className= "dropdown note" >
                                            <a href = "#" className = " tooltips" > 
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
                        {/* <div className = "outter-wp" > { children } < /div> */}
                    </div>
                </div>
                <div className = "sidebar-menu" >
                    <header className = "logo" >
                        <a href = "#" className = "sidebar-icon" >
                            < span className = "fa fa-bars" > </span> 
                        </a>
                        <a href = "index.html" > 
                            < span id = "logo" > < h1 > BrinKids </h1></span>
                        </a>
                    </header>
                    <div style = {{ borderTop: 1 + "px" + "solid" + "rgba(69, 74, 84, 0.7)" }}> </div>
                    <div className = "menu" >
                        <ul id = "menu" >
                            <li > 
                                < a href = "index.html" > 
                                    < i className = "fa fa-tachometer" > </i> 
                                    <span>Dashboard</span > 
                                </a>
                            </li>
                            <li>
                                < a href = "typography.html" > 
                                    < i className = "lnr lnr-pencil" ></i>
                                    <span>Typography</span > 
                                </a>
                            </li>
                            <li id = "menu-academico" > 
                                < a href = "#" > 
                                    < i className = "lnr lnr-book" ></i> 
                                    <span>Pages</span >
                                    <span className = "fa fa-angle-right" style = {{ float: "right" }} ></span>
                                </a >
                                <ul id = "menu-academico-sub" >
                                    <li id = "menu-academico-avaliacoes" > 
                                        < a href = "login.html" > Login </a>
                                    </li>
                                    <li id = "menu-academico-boletim" >
                                        < a href = "register.html" > Register </a>
                                    </li>
                                    <li id = "menu-academico-boletim" >
                                        < a href = "404.html" > 404 </a>
                                    </li >
                                    <li id = "menu-academico-boletim" > 
                                        < a href = "sign.html" > Sign up </a>
                                    </li >
                                    <li id = "menu-academico-boletim" >
                                        < a href = "profile.html" > Profile </a>
                                    </li >
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