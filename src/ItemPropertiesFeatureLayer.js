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
        let nav = document.getElementById("navp");
        nav.addEventListener("click", this.hello)
    }
	createLeafletElement(props) {
        const { fURL, tdURL, whereCond } = props;
        const pointStyle = this.props.pointStyle ||  {
            color: 'white',
            weight: 1,
            fillColor: 'darkorange',
            fillOpacity: 0.6
        };
        const defaultStyleFunc =  () => {
            return {
                color: 'white',
                weight: 1,
                fillColor: 'darkorange',
                fillOpacity: 0.6
            }
        };  
        const styleFunc = this.props.styleFunc || defaultStyleFunc;
        let fLayer = featureLayer({
            url: `${fURL}`,
            fields: ["*"],
            where: `${whereCond}`,
            pointToLayer: function (geojson, latlng) {
                return L.circleMarker(latlng, pointStyle);
            },
            style: styleFunc || null    
        });

        this.setState({featureLayer: fLayer});  
        fLayer.on("load", (e) => {
             this.setState({bounds: e.bounds});
        })
       
        return  fLayer.addTo(this.context.map)
	}

    componentDidUpdate(prevProps, prevState){

        if(prevState.bounds != this.state.bounds){
             setTimeout(() => {
             this.setMapBounds();   
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

