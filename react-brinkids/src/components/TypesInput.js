import React from 'react';

import '../assets/style/bootstrap.min.css';
import '../assets/style/font-awesome.css';



class Input extends React.Component {
    
    render(){
        if(this.props.cod === 1 ){
            return(
                <div className={this.props.ClassDiv}>
                    <label className = {this.props.ClassLabel} > {this.props.NameLabel}</label>               
                    <input type = {this.props.type} id = {this.props.id} name = {this.props.name} className = {this.props.Class} placeholder = {this.props.placeholder} value={this.props.value} onChange = {this.props.onChange} />
                </div>
            )   
        }
        else if(this.props.cod === 2 ){
            if(this.props.Label){
                return(
                    <div className={this.props.ClassDiv}>
                        <label className = {this.props.ClassLabel} > {this.props.NameLabel}</label>               
                        <textarea id = {this.props.id} cols = {this.props.cols} rows = {this.props.rows} name = {this.props.name} className = {this.props.Class} value={this.props.value} placeholder = {this.props.placeholder} onChange = {this.props.onChange}/>
                    </div>
                )   
            }
            else {
                return(
                    <textarea id = {this.props.id} cols = {this.props.cols} rows = {this.props.rows} name = {this.props.name} className = {this.props.Class} value={this.props.value} placeholder = {this.props.placeholder} onChange = {this.props.onChange}/>
                )
            }

        }
    }
}
export default Input;