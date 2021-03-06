import React, { Component } from 'react';
import axios from "axios";
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

import {TribalFeatureLayer, esrilayertest} from './esrilayertest'
import {ItemPropertiesFeatureLayer} from "./ItemPropertiesFeatureLayer";
import {ItemListFeatureLayer} from "./ItemListFeatureLayer";
import ItemMap from "./ItemMap";
import  BaseMapManager from "./BaseMapManager";
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
      zoom: 10
    }

   
  }

  onPopUp(){
    return axios.get("http://localhost:51086/api/item/part/welltag/properties/243606")
     .then( (res) => res.data.records[0])
     .then(rec => {
        return (
          `<div class="ui card">
              <div class="content">
              
              <div class="header">
                Well Tag NO :  ${rec.partno.fieldvalue}
              </div>
              <div class="meta">
                Orginal Owner:  ${rec.cbrn.fieldvalue}
              </div>
              <div class="description">
                Well Uses :  ${rec.flexfield7.fieldvalue}
              </div>
              </div>
              <div class="extra content">
                <div class="ui basic teal fluid button" id = "navp">View Properties</div>
              </div>
           </div>`
          );
     })
    
  }
  //http://waterweb.sbtribes.com/arcgis/rest/services/Allotments/FeatureServer/0
  //"http://waterweb.sbtribes.com/arcgis/rest/services/WellPrac/FeatureServer/0
  render() {
    const position = [this.state.lat, this.state.lng];
    let {zoom} = this.state;
    const center = [51.505, -0.09]
    const rectangle = [[51.49, -0.08], [51.5, -0.06]]
    return (
      <ItemMap position={position} zoom={zoom}>  
{/*           
            <ItemPropertiesFeatureLayer 
              fURL = "http://waterweb.sbtribes.com/arcgis/rest/services/WellPrac/FeatureServer/0"
              whereCond = "TAG_NO_ in ('373', '0341') " 
              pointStyle = {
                {
                  color: 'black',
                  weight: 1,
                  fillColor: 'darkorange',
                  fillOpacity: 0.6
              }
              }
            /> */}
            <ItemListFeatureLayer
                  fURL = "http://waterweb.sbtribes.com/arcgis/rest/services/Allotments/FeatureServer/0" 
                  tdURL = "http://localhost:51086/api/item/part/welltag/properties/2"
                  mainHeader = "partno"
                  secondHeader = "status"
                  thirdHeader = "flexfield35"
                  styleFnc =   { () => {
                    return {
                        color: 'white',
                        weight: 1,
                        fillColor: 'darkorange',
                        fillOpacity: 0.2
                    }
                  } 
                } 
                onPopUp = {this.onPopUp} 
                  
            />
           
        
      </ItemMap>
    );
  }
}

export default App;

// <BaseMapManager></BaseMapManager>
// <ZoomBoxControl></ZoomBoxControl>
{/* <FeatureGroup>
<EditControl
  position='topright'
  onEdited={this._onEditPath}
  onCreated={e => { 
    
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

</FeatureGroup> */}