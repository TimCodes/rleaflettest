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
        return (
            `<div class="ui card">
                <div class="content">
                
                <div class="header">
                    this is the header
                </div>
                <div class="meta">
                 this is the second header 
                </div>
                <div class="description">
                 this is the third header 
                </div>
                </div>
                <div class="extra content">
                  <div class="ui basic teal fluid button" id = "navp">View Properties</div>
                </div>
             </div>`
            )
    }

    handleLayerClick(){
        console.log("handle layer click")
        this.state.featureLayer.getPopup().setContent(this.getPopUp())
    }
    createLeafletElement(props) {
        console.log(" ----- L ------")
        console.log(L);
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
