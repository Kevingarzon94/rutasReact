import React from 'react';
import {withRouter} from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      show: false,
      titulo: '',
      texto: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(path){

    let localUSer = localStorage.getItem('Contrasena');
    let locarPass = localStorage.getItem('Usuario');

    if (this.state.email === localUSer && this.state.pass === locarPass) {
      this.props.history.push(path);
    } else {
      this.alertinfo('Advertencia','Verifique que los datos con los que esta ingresando sean correctos')
      this.setState({ show: true });}

  }
  handleChange(event) {
    this.setState({ [event.target.name] : event.target.value });
  }
  alertinfo = (titulo,texto) => {
    this.setState({ titulo: titulo });
    this.setState({ texto: texto });
    this.setState({ show: true });
}  
  render() {
    return (
      <div className="App">
        <div className="container col-md-6 col-md-offset-3"> 
        <h1>Ingreso al Sistema</h1>         
            <div className="form-group">
              <label>Correo</label>
              <input type="email" className="form-control" name="email"
                placeholder="correo"
                value={this.state.email} 
                onChange={this.handleChange}/>
                
                <label>Contraseña</label>
                <input type="password" className="form-control" name="pass"
                placeholder="contraseña"
                value={this.state.pass} 
                onChange={this.handleChange}/>
            </div>
            <button 
            type="button" className="btn btn-primary btn-sm" 
            onClick={()=> 
                this.handleSubmit ('/homePage')}>
              Ingresar
        </button>
        <SweetAlert
        show={this.state.show}
        title={this.state.titulo}
        text={this.state.texto}
        onConfirm={() => this.setState({ show: false })}
      />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
