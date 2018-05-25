import React, { Component } from 'react';
import {Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  Map as LeafletMap,
  Marker,
  Popup,
  Rectangle,
  TileLayer } from "react-leaflet";
import logo from './logo.svg';

import {HexbinLayer, esrilayertest} from './esrilayertest'
import nrFLayer from "./nrFLayer"
import ZoomBoxControl from "./zoom"
import { EditControl } from "react-leaflet-draw"
import 'leaflet/dist/leaflet.css';
import './App.css';
import "leaflet-draw/dist/leaflet.draw.css"


const { BaseLayer, Overlay } = LayersControl
class App extends Component {
  constructor() {
    super()
    this.state = {
      lat: 43.036,
      lng: -112.4383,
      zoom: 13
    }

   
  }

  

  render() {
    const position = [this.state.lat, this.state.lng];
    const center = [51.505, -0.09]
    const rectangle = [[51.49, -0.08], [51.5, -0.06]]
    return (
      <LeafletMap center={position} zoom={this.state.zoom}>
      <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="OpenStreetMap.BlackAndWhite">
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <Overlay checked name="Layer group with circles">
          <LayerGroup>
                <HexbinLayer>
            
            </HexbinLayer>
           </LayerGroup>
           
      </Overlay>
    
      </LayersControl>    
        
      <ZoomBoxControl></ZoomBoxControl>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        />
      <FeatureGroup>
        <EditControl
          position='topright'
          onEdited={this._onEditPath}
          onCreated={e => { 
            console.log(" ------ created ---- ");
            console.log(this.context)
            console.log(e.layer.getBounds());
            console.log(e.target.removeLayer)
            e.target.fitBounds(e.layer.getBounds());
            //e.layer 
            setTimeout(() => {
              console.log(this.context)
              e.target.removeLayer(e.layer)
            }, 2500);
          }}
          onDeleted={this._onDeleted}
          draw = {{
            circle : false,
            marker: false,
            circlemarker: false,
            polygon: false,
            polyline: false

          }}
          
        />
        <Circle center={[51.51, -0.06]} radius={200} />
      </FeatureGroup>
          
      </LeafletMap>
    );
  }
}

export default App;
