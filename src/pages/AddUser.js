import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddUser extends Component {

    state = {
        names: '',
        surnames: '',
        email: '',
        celphone: '',
        address: '',
        country: '',
        category: '',
        categories: [],
        countries: [],
        loading: true
    }

    handleInput = (e) => {
        this.setState({
            [e.target.names]: e.target.value
        });
    }

    async componentDidMount() {
        const countries = await axios.get('https://api.first.org/data/v1/countries?region=South America&limit=10&pretty=true');
        this.setState({
            countries: countries.data
        });
        const categories = await axios.get('http://127.0.0.1:8000/api/categories');
        console.log(categories);
        if (categories.data.status === 200) {
            this.setState({
                categories: categories.data.categories,
                loading: false,
            });
        }
    }

    saveUser = (e) => {
        e.preventDefault();

        const res = axios.post('http://127.0.0.1:8000/api/add-user', this.state);
        if (res.data.status === 200) {
            console.log(res.data.message);
            this.setState({
                names: '',
                surnames: '',
                email: '',
                celphone: '',
                address: '',
                category: ''
            })
        }
    }

    render() {
        
        var category = "";
        if (this.state.loading) {

        }
        else {
            category =
                this.state.categories.map((item) => {
                    return (
                        <option value={item.id}>{item.description}</option>
                    )
                });
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Agregar Usuario</h4>
                                <Link to={'/'} className="btn btn-primary btn-sm float-end">Regresar</Link>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveUser}>
                                    <div className="form-group mb-3">
                                        <label>Categoria</label>
                                        <select name="category" onChange={this.handleInput} value={this.state.category} className="form-control">
                                            <option>Seleccione</option>
                                            {category}
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Nombres</label>
                                        <input type="text" name="names" onChange={this.handleInput} value={this.state.names} className="form-control"></input>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Apellidos</label>
                                        <input type="text" name="surnames" onChange={this.handleInput} value={this.state.surnames} className="form-control"></input>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="email" name="email" onChange={this.handleInput} value={this.state.email} className="form-control"></input>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Dirección</label>
                                        <input type="text" name="address" onChange={this.handleInput} value={this.state.address} className="form-control"></input>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Celular</label>
                                        <input type="phone" name="celphone" onChange={this.handleInput} value={this.state.celphone} className="form-control"></input>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>País</label>
                                        <select name="country" onChange={this.handleInput} value={this.state.country} className="form-control"></select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Guardar Usuario</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default AddUser;