import React, { Component } from 'react';
import L from 'leaflet';

import { basemapLayer, featureLayer } from 'esri-leaflet';

class NeFlayer extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentWillMount(){
      
    }
    componentDidMount(){
        const ourMap = L.map('map').setView([51.505, -0.09], 11);
        basemapLayer('Imagery').addTo(ourMap);
        featureLayer({
            url: 'http://waterweb.sbtribes.com/arcgis/rest/services/WellPrac/FeatureServer/0',
            pointToLayer: function (geojson, latlng) {
                return L.circleMarker(latlng, {
                    color: 'white',
                    weight: 2,
                    fillColor: 'darkorange',
                    fillOpacity: 0.6
                  });
            }    
        }).addTo(ourMap);
    }
    render() {
        return (
            <div id = "map">
                
            </div>
        );
    }
}

export default NeFlayer;