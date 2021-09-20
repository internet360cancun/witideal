import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Marker,Circle} from 'react-google-maps'
import {GoogleMapCont} from './googleMapCont'

export class Map extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
        this.handleDrag=this.handleDrag.bind(this)
    }

    handleDrag=(e)=>{
        const latLng={lat:e.latLng.lat(),lng:e.latLng.lng()}
        this.props.getNewPos(latLng)
    }

    

    render() {      
        return (
            <React.Fragment>
                <GoogleMapCont 
                    center={this.props.center}
                    zoom={this.props.zoom}
                    // defaultCenter={this.props.defaultCenter}
                    // defaultZoom={this.props.defaultZoom}
                    containerElement={<div style={{ height: `400px` }} />}
				    mapElement={<div style={{ height: `100%` }} />}
                >
                    {this.props.circle?
                        <Circle radius={1000} 
                            options={{fillColor:'#3CB8F9',strokeOpacity:0}} 
                            defaultCenter={this.props.markedPos}
                            draggable={true}
                            onDragEnd={this.handleDrag}
                            position={this.props.markedPos}
                        />:
                        <Marker draggable={true}
                            position={this.props.markedPos}
                            onDragEnd={this.handleDrag}/> 
                    }
                </GoogleMapCont>
            </React.Fragment>
        )
    }
}

//Component props
Map.propTypes={
    defaultCenter: PropTypes.object.isRequired,
    defaultZoom: PropTypes.number.isRequired,
    circle: PropTypes.bool.isRequired,
    markedPos: PropTypes.object.isRequired,
    getNewPos: PropTypes.func
}