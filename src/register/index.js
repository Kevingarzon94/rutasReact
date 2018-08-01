import React from 'react';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Nombre: '',
            pass: '',
            show: false,
            titulo: '',
            texto: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit() {
        if (this.state.Nombre.length > 0 && this.state.pass.length > 0) {
     
            localStorage.setItem('Usuario', this.state.Nombre);
            localStorage.setItem('Contrasena', this.state.pass);
            this.alertinfo('Gracias por Registrarse','Vuelva por el <b>Link Ingresar al Sistema</b> y digite su usuario y contraseña')


        } else {
            this.alertinfo('Advertencia','Debe Rellenar Todos Los Campos Para Continuar')
        }

    }
    alertinfo = (titulo,texto) => {
        this.setState({ titulo: titulo });
        this.setState({ texto: texto });
        this.setState({ show: true });
    }
    handleChange = (event) => this.setState({ [event.target.name]: event.target.value });
    render() {
        return (
            <div className="App">
                <div className="container col-md-6 col-md-offset-3">
                <h1>Registro de Usuario</h1>
                    <div className="form-group">
                        <label>Correo</label>
                        <input type="email" className="form-control" name="Nombre"
                            placeholder="Usuario"
                            value={this.state.Nombre}
                            onChange={this.handleChange} />

                        <label>Contraseña</label>
                        <input type="password" className="form-control" name="pass"
                            placeholder="contraseña"
                            value={this.state.pass}
                            onChange={this.handleChange} />
                    </div>
                    <button
                        type="button" className="btn btn-primary btn-sm"
                        onClick={() =>
                            this.handleSubmit()}>
                        Registrar
        </button>
                </div>
                <SweetAlert
        show={this.state.show}
        title={this.state.titulo}
        text={this.state.texto}
        onConfirm={() => this.setState({ show: false })}
      />
            </div>
        );
    }
}

export default Register