import React, { Component } from 'react';
import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import { basemapLayer, featureLayer } from 'esri-leaflet';
import axios from "axios"


 class esrilayertest extends MapLayer {
        createLeafletElement(props) {
            //return FeatureLayer({url: 'https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Heritage_Trees_Portland/FeatureServer/0'});
        }
    
        componentDidMount() {
            const { layerContainer } = this.context;
            this.leafletElement.addTo(layerContainer);
        }

        render(){
            return <div></div>
        }
};


class HexbinLayer extends MapLayer {
     
    constructor(){
        super();
        this.state= {
            data: {

            },
            featureLayer: null
        }
        this.addPClick = this.addPClick.bind(this)
        this.hello = this.hello.bind(this);
    }

    hello(){
        alert(" hello fuckers ")
    }

    addPClick(){
        let nav = document.getElementById("navp")
        console.log(nav)
      
        nav.addEventListener("click", this.hello)
    }
	createLeafletElement(props) {
        const { tooltip } = props;
        console.log(L)
        let fLayer = featureLayer({
            url: 'http://waterweb.sbtribes.com/arcgis/rest/services/WellPrac/FeatureServer/0',
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
            axios.get(`https://reqres.in/api/users/${Math.floor(Math.random() * Math.floor(10))}`)
            .then(data =>  { this.setState({data: data.data.data }); return data })
            .then(d => {
                    fLayer.getPopup().setContent( e => {
                        let {avatar, first_name, last_name} = this.state.data;
                        return (
                        `<div class="ui card">
                            <div class="content">
                            <img class="right floated mini ui image" src=${avatar}>
                            <div class="header">
                            ${first_name}
                            </div>
                            <div class="meta">
                            ${last_name}
                            </div>
                            <div class="description">
                                Elliot requested permission to view your contact details
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
            
            console.log(this.state)
            console.log(layer);
            console.log(arguments)
           
            if(this.state.data){
                let {avatar, first_name, last_name} = this.state.data;
                return (
                `<div class="card">
                    <div class="content">
                    <img class="right floated mini ui image" src=${avatar}>
                    <div class="header">
                      ${first_name}
                    </div>
                    <div class="meta">
                       ${last_name}
                    </div>
                    <div class="description">
                        Elliot requested permission to view your contact details
                    </div>
                    </div>
                    <div class="extra content">
                    <div class="ui two buttons">
                        <div class="ui basic green button">Approve</div>
                        <div class="ui basic red button">Decline</div>
                    </div>
                    </div>
                </div>`
                ) 
            }
            return "herro bitch";
          }.bind(this))
        this.setState({featureLayer: fLayer});  
        return  fLayer.addTo(this.context.map)
	}

	componentDidMount() {
        this.setState({sex: "yes please"}, () => console.log(this.state))

		// const { layerContainer } = this.context;
		// const { data } = this.props;
		// const points = data.features.filter((feat) => feat.hasOwnProperty('geometry') && feat.geometry && typeof feat.geometry === 'object' && feat.geometry.hasOwnProperty('type') && feat.geometry.type === 'Point');
		// const coordinates = points.map(feat => feat.geometry.coordinates);
		// this.leafletElement.addTo(layerContainer);
        // if (coordinates.length) this.leafletElement.data(coordinates);
        console.log(this)
        console.log(L.control)
        console.log("------ map --------")
        console.log(this.context.map)
       
	}

	componentWillUnmount() {
		// const { layerContainer, map } = this.context;
		// this.leafletElement.data(null);
		// map.removeLayer(this.leafletElement);
		// layerContainer.removeLayer(this.leafletElement);
	}
}


export { MapLayer, HexbinLayer};



// let permitAprovalPrototypePopup= 
// `<div class="card">
// <div class="content">
// <img class="right floated mini ui image" src=${avatar}>
// <div class="header">
//   ${first_name}
// </div>
// <div class="meta">
//    ${last_name}
// </div>
// <div class="description">
//     Elliot requested permission to view your contact details
// </div>
// </div>
// <div class="extra content">
// <div class="ui two buttons">
//     <div class="ui basic green button">Approve</div>
//     <div class="ui basic red button">Decline</div>
// </div>
// </div>
// </div>`