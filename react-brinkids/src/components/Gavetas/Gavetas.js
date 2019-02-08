import React from 'react';
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import axios from 'axios';


class Gaveta extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Ngavetas: '',
        }
        this.Change = this.Change.bind(this);
        this.salvar = this.salvar.bind(this);

    }
    salvar(event){
        
         axios.put('/belongings', {number: this.state.Ngavetas})
            .then((response) => {

                this.setState({ Ngavetas: response.data[0].number });
            })
            .catch((err) => console.log(err));
    }
    Change(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    componentWillMount() {

        axios.get('/belongings')
            .then((response) => {
                console.log(response.data)
                this.setState({ Ngavetas: response.data.number });
            })
            .catch((err) => console.log(err));
    }
    render() {
        return (
            <div className="container-fluid" >
                <div className="sub-heard-part" >
                    <ol className="breadcrumb m-b-0" >
                        <li > < a href="/" > Home </a></li >
                        <li > gavetas </li>
                    </ol >
                </div>
                <div className="graph-visual" >
                    <div className="col-md-6 col-sm-12 text-center">
                        <div className="graph" >
                            <div>
                                <h3 className="inner-tittle " >Nº.gavetas</h3>
                            </div>
                            <div className=" text-center">
                                <input type="number" id="selectAdult" name="Ngavetas" className="form-control text-center" value={this.state.Ngavetas} onChange={this.Change} />
                                <button type="button" className="btn btn-md botao botaoAvançar" onClick={this.salvar}> Salvar </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
export default Gaveta;