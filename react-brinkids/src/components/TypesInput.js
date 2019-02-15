import React from 'react';

import '../assets/style/bootstrap.min.css';
import '../assets/style/font-awesome.css';

//ESSE COMPONEMTE TEM TODOS OS TIPOS DE INPUT, CASO O QUE VOCÊ QUEIRA NAO TENHA,
//É SO CRIAR MAIS UM IF COM O ESPECIFICO QUE VOCÊ DESEJA.
//CODIGO PARA UTILIZAÇÃO:
//1 - TIPO INPUT
//2 - TIPO TEXTAREA
//3 - TIPO SELECT
    

class Input extends React.Component {
    //FUNCAO QUE CRIA E ADICIONA OS OPTIONS DENTRO DO SELETOR
    GeraOptions = (Options) => {
        let select = []
        var i = 0
        Options.forEach(function(options){
            select.push(<option value = {options} key = {i}>{options}</option>)
            //A "KEY" é porque no input e preciso deixar as opções com chaves diferentes, se não ele fica dando erro.
            i++;
        });
        return select
    }

    render(){
        if(this.props.cod === 1 ){
            return(
                <div className={this.props.ClassDiv}>
                    <label className = {this.props.ClassLabel} > {this.props.NameLabel}</label>               
                    <input type = {this.props.type}  min = {this.props.min} id = {this.props.id} name = {this.props.name} className = {this.props.Class} placeholder = {this.props.placeholder} value={this.props.value} onChange = {this.props.onChange} />
                </div>
            )   
        }
        else if(this.props.cod === 2 ){
            if(this.props.Label){
                return(
                    <div className={this.props.ClassDiv}>
                        <label className = {this.props.ClassLabel} > {this.props.NameLabel}</label>               
                        <textarea id = {this.props.id} cols = {this.props.cols} min = {this.props.min} rows = {this.props.rows} name = {this.props.name} className = {this.props.Class} value={this.props.value} placeholder = {this.props.placeholder} onChange = {this.props.onChange}/>
                    </div>
                )   
            }
            else {
                return(
                    <textarea id = {this.props.id} cols = {this.props.cols} rows = {this.props.rows} name = {this.props.name} className = {this.props.Class} value={this.props.value} placeholder = {this.props.placeholder} onChange = {this.props.onChange}/>
                )
            }

        }
        else if(this.props.cod === 3){
            return(
                <div className={this.props.ClassDiv}>
                    <label className = {this.props.ClassLabel} > {this.props.NameLabel}</label>               
                    <select id = {this.props.id} name = {this.props.name} className = {this.props.Class} value={this.props.value} onChange = {this.props.onChange}>
                        {this.GeraOptions(this.props.valueOP)}
                    </select>
                </div>
            )
        }
    }
}
export default Input;