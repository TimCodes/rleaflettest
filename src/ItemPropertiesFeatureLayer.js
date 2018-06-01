import React, { Component } from 'react';
import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import { basemapLayer, featureLayer } from 'esri-leaflet';
import axios from "axios"


class ItemPropertiesFeatureLayer extends MapLayer {
     
    constructor(){
        super();
        this.state= {
            data: {

            },
            featureLayer: null,
            goingTo: false,
            bounds: {}
        }
        this.addPClick = this.addPClick.bind(this);
        this.setMapBounds = this.setMapBounds.bind(this);
    }
    setMapBounds(bounds){
        console.log(this.featureLayer)
        if(!this.goingTo){
            this.context.map.flyToBounds(this.state.bounds)
        }
        this.setState({goingTo: true});
      
    }
    addPClick(){
        let nav = document.getElementById("navp")
        console.log(nav)
      
        nav.addEventListener("click", this.hello)
    }
	createLeafletElement(props) {
        const { fURL, tdURL, whereCond } = props;
       
        let fLayer = featureLayer({
            url: `${fURL}`,
            fields: ["*"],
            where: `${whereCond}`,
            pointToLayer: function (geojson, latlng) {
              //  console.log(geojson)
                return L.circleMarker(latlng, {
                    color: 'white',
                    weight: 1,
                    fillColor: 'darkorange',
                    fillOpacity: 0.6
                  });
            }    
        });

        this.setState({featureLayer: fLayer});  
        fLayer.on("load", (e) => {
             console.log("---- loaded -----", e.bounds)
             this.setState({bounds: e.bounds})
           //  this.context.map.flyToBounds(e.bounds)
            // this.context.map.fitBounds({_southWest:{lat:42.94033923363183,lng:-112.5},_northEast:{lat:43.004647127794435,lng:-112.412109375}});
        })
       
        return  fLayer.addTo(this.context.map)
	}

    componentDidUpdate(prevProps, prevState){

        if(prevState.bounds != this.state.bounds){
             setTimeout(() => {
             this.setMapBounds()
                 
             }, 50);
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.goingTo){
            return false 
        }
        return true;
    }
}


export { MapLayer, ItemPropertiesFeatureLayer};

