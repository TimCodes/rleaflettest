import React, { Component } from 'react';
import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import { basemapLayer, featureLayer } from 'esri-leaflet';
import axios from "axios"


class TribalFeatureLayer extends MapLayer {
     
    constructor(){
        super();
        this.state= {
            data: {

            },
            featureLayer: null
        }
        this.addPClick = this.addPClick.bind(this)
    }

    addPClick(){
        let nav = document.getElementById("navp")
        console.log(nav)
      
        nav.addEventListener("click", this.hello)
    }
	createLeafletElement(props) {
        const { tooltip, fURL, tdURL, mainHeader, secondHeader, thirdHeader } = props;
        console.log(L)
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
            }    
        });

        fLayer.on("click", (e) => { 
            console.log(fLayer.getPopup)
            fLayer.getPopup().setContent(".... loading");
            console.log(this.state)
            //http://localhost:51086/api/item/part/welltag/properties/2
            // /`https://reqres.in/api/users/${Math.floor(Math.random() * Math.floor(10))}`
            axios.get(`${tdURL}`)
            .then(data =>  { this.setState({data: data.data.records[0] });  console.log(data); return data })
            .then(d => {
                    fLayer.getPopup().setContent( e => {
                        console.log(e.feature.properties)
                        let {data} = this.state;
                        // /<img class="right floated mini ui image" src=${avatar}>
                        return (
                        `<div class="ui card">
                            <div class="content">
                            
                            <div class="header">
                            ${data[mainHeader].fieldvalue}
                            </div>
                            <div class="meta">
                            ${data[secondHeader].fieldvalue}
                            </div>
                            <div class="description">
                            ${data[thirdHeader].fieldvalue}
                            </div>
                            </div>
                            <div class="extra content">
                              <div class="ui basic teal fluid button" id = "navp">View Properties</div>
                            </div>
                         </div>`
                        ) 
                    })
                    setTimeout(() => {
                        this.addPClick();
                    }, 0);
            })
            .then(console.log(this.state))
            .catch(console.log)
        })
        fLayer.bindPopup(function (layer) {
            return "....loading";
        }.bind(this))
        this.setState({featureLayer: fLayer});  
        return  fLayer.addTo(this.context.map)
	}

	componentWillUnmount() {
		// const { layerContainer, map } = this.context;
		// this.leafletElement.data(null);
		// map.removeLayer(this.leafletElement);
		// layerContainer.removeLayer(this.leafletElement);
	}
}


export { MapLayer, TribalFeatureLayer};

