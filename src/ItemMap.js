import React, { Component } from 'react';
import { Map as LeafletMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

import ZoomBoxControl from "./zoom"
import {ItemPropertiesFeatureLayer} from "./ItemPropertiesFeatureLayer";
import {ItemListFeatureLayer} from "./ItemListFeatureLayer";
import BaseMapManager from "./BaseMapManager";

class ItemMap extends Component {
    render() {
        let {zoom, position} = this.props;
        return (
             <LeafletMap center={position} zoom={zoom}>  
                <BaseMapManager></BaseMapManager>
                <ZoomBoxControl></ZoomBoxControl>
                {this.props.children}
             </LeafletMap>
        );
    }
}

export default ItemMap;