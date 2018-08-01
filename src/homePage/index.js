import React, { Component } from 'react';
import GoogleMaps from 'google-distance-matrix';
import data from '../data/data.json';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps"
const ciudades = data.ciudades;
const google = window.google;

var OrigenGlobal = 'Bogota'
var DestinoGlobal = 'Medellin'


class View extends Component {

    constructor(props) {
        super(props)
        this.state = {
            address: '',
            dest: '',
            origen: 'Bogota',
            oCiudad: 'Prueba',
            dCiudad: 'Prueba',
            destino: '',
            distancia: '',
            duracion: '',
            ResultDistancetime: '',
            ResultDistanceKm: '',
            estadoOcultar: false,
            isMarkerShown: false,
            mapViewB: false
        };
        this.CalcularDistancia = this.CalcularDistancia.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

    CalcularDistancia = (event) => {
        const component = this
        component.setState({ estadoOcultar: false })

        let OrigenF = this.state.origen + " " + this.state.oCiudad
        let DestinoF = this.state.destino + " " + this.state.dCiudad

        OrigenGlobal = OrigenF
        DestinoGlobal = DestinoF

        let address = OrigenF.split()
        let dest = DestinoF.split()

        GoogleMaps.key('AIzaSyAJoyJRTJD-B-p7x5yaRbsKpZKooFG54mM');
        GoogleMaps.units('imperial');

        GoogleMaps.matrix(address, dest, function (err, distances) {
            if (!err) {
                let resultMi = distances.rows[0].elements[0].distance.text.split(" ", 1)[0]
                let resultKm = parseInt(resultMi) * (1.609344 / 1)
                let resutlTime = distances.rows[0].elements[0].duration.text

                component.setState({ ResultDistancetime: resutlTime })
                component.setState({ ResultDistanceKm: resultKm.toFixed(3) })
                component.setState({ estadoOcultar: true })


                //distances.rows[0].elements[0].distance.text
            }
        });

        this.setState({ mapViewB: true })
    }
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })
    render() {
        const mostrarOcultar = {
            'display': this.state.estadoOcultar ? 'block' : 'none'
        };
        const MyMapComponent = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAJoyJRTJD-B-p7x5yaRbsKpZKooFG54mM&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `400px` }} />,
                mapElement: <div style={{ height: `120%` }} />,
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
                componentDidMount() {
                    
                    const DirectionsService = new google.maps.DirectionsService();

                    DirectionsService.route({
                        origin: OrigenGlobal,
                        destination: DestinoGlobal,
                        travelMode: google.maps.TravelMode.DRIVING,
                    }, (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            this.setState({
                                directions: result,
                            });
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    });
                }
            })
            
        )((props) =>
            <GoogleMap
                defaultZoom={7}
                defaultCenter={new google.maps.LatLng(4.5878425,-83.3829483,5)}
            >
                {props.directions && <DirectionsRenderer directions={props.directions} />}
            </GoogleMap>
        )
        
        const mapViewStatus = () => {
            let status = this.state.mapViewB;
            let componente = <h1>Bienvenido</h1>;    
            if (status) {
                componente = <MyMapComponent isMarkerShown={this.state.isMarkerShown} onMarkerClick={this.handleMarkerClick} />
            }
            return componente;
        }
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" name="origen"
                                placeholder="Direccion Origen"
                                value={this.state.origen}
                                onChange={this.handleChange} />
                        </div>
                        <div className="col">
                            <select className="custom-select" value={this.state.oCiudad} onChange={this.handleChange} name="oCiudad">
                                <option value="" selected> Seleccione Ciudad Origen </option>
                                {
                                    ciudades.map(ciudades => <option value={ciudades.name} key={ciudades.id}> {ciudades.name} </option>)
                                }
                            </select>

                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" name="destino"
                                placeholder="Direccion Destino"
                                value={this.state.destino}
                                onChange={this.handleChange} />
                        </div>
                        <div className="col">
                            <select className="custom-select" value={this.state.dCiudad} onChange={this.handleChange} name="dCiudad">
                                <option value="" selected> Seleccione Ciudad Destino </option>
                                {
                                    ciudades.map(ciudades => <option value={ciudades.name} key={ciudades.id}> {ciudades.name} </option>)
                                }
                            </select>

                        </div>
                    </div>
                    <br />
                    <div style={mostrarOcultar} className='alert alert-primary' role='alert'>La distancia hasta su destino es de {this.state.ResultDistanceKm} <b>KM</b> con una duracion estimada de {this.state.ResultDistancetime}</div>
                </div>
                <hr />
                <button className="btn btn-primary"
                    onClick={this.CalcularDistancia}>
                    Crear Servicio
        </button>
                <hr />
                                {mapViewStatus()}
                </div>
        )
    }
}

export default View;
//'AIzaSyAJoyJRTJD-B-p7x5yaRbsKpZKooFG54mM'


