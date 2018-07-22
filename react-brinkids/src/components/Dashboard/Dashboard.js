import React from 'react';
import axios from 'axios';

import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/style.css';
import './css/Dashboard.css';


class DashBoard extends React.Component {
    render() {
        return (
            <div className = "container-fluid" >
                <div className = "sub-heard-part" >
                    <ol className = "breadcrumb m-b-0" >
                        <li > < a href = "/" > Home </a></li >
                        <li > DashBoard </li >
                    </ol >
                </div>
            </div>
        )
    }
}

export default DashBoard;
