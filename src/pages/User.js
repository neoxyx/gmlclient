import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class User extends Component {

    state = {
        users: [],
        loading: true
    }

    async componentDidMount() {
        const res = await axios.get('http://127.0.0.1:8000/api/users');
        console.log(res);
        if (res.data) {
            this.setState({
                users: res.data.users,
                loading: false,
            });
        }
    }

    render() {

        var users_HTMLTABLE = "";
        if (this.state.loading) {
            users_HTMLTABLE = <tr><td colspan="7"><h2>Loading...</h2></td></tr>
        }
        else {
            users_HTMLTABLE =
                this.state.users.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.id_category}</td>
                            <td>{item.names}</td>
                            <td>{item.surnames}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td>{item.celphone}</td>
                            <td>{item.country}</td>
                            <td><Link to={`edit-user/${item.id}`} className="btn btn-success btn-sm">Editar</Link></td>
                            <td><button type="button" className="btn btn-danger btn-sm">Borrar</button></td>
                        </tr>
                    )
                })
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Datos Usuarios</h4>
                                <Link to={'add-user'} className="btn btn-primary btn-sm float-end">Agregar Usuario</Link>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Categoria</th>
                                            <th>Nombres</th>
                                            <th>Apellidos</th>
                                            <th>Email</th>
                                            <th>Dirección</th>
                                            <th>Celular</th>
                                            <th>País</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users_HTMLTABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default User;