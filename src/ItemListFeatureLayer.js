import React, { Component } from 'react';
import { featureLayer } from 'esri-leaflet';
import { MapLayer } from 'react-leaflet';
import L from 'leaflet';


class ItemListFeatureLayer extends MapLayer {
    
    constructor(props){
        super(props);
        this.handleLayerClick = this.handleLayerClick.bind(this);
    }
    
    getPopUp(){
        let popUpPromise =  this.props.onPopUp();
        popUpPromise.then( (popup) =>  this.state.featureLayer.getPopup().setContent(popup) ) ;
    }

    handleLayerClick(){
        this.getPopUp();
    }
    createLeafletElement(props) {
        const { fURL, tdURL, whereCond, styleFnc } = props;
        let fLayer = featureLayer({
            url: `${fURL}`,
            fields: ["*"],
            pointToLayer: function (geojson, latlng) {
                return L.circleMarker(latlng, {
                    color: 'white',
                    weight: 1,
                    fillColor: 'darkorange',
                    fillOpacity: 0.6
                  });
            },
            style: styleFnc || null
        }); 
        fLayer.bindPopup(() => "...loading")
        fLayer.on("click", (e) => this.handleLayerClick());
        this.setState({featureLayer : fLayer});
        return  fLayer.addTo(this.context.map)
    }

 

  
}



export { MapLayer, ItemListFeatureLayer};
