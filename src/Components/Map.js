//Import in all required hooks and dependencies
import { useState, useEffect }                    from "react";
import { renderToStaticMarkup }                   from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon }                                from "leaflet";
import L                                          from 'leaflet';
//Import all required styling and media
import 'leaflet/dist/leaflet.css';
import { AirplaneEnginesFill }                    from 'react-bootstrap-icons';
//Import in all required datasets
import { iataCodes }                              from '../Assets/Data/IATAcodes.js';



export default function Map() {
      //Create all markers for each airport
      const [startingPosition, setStartingPostion] = useState([35.040199,-106.609001]); //starting them at O'Hare unless they accept geolocation
      const airplaneIcon = divIcon({
        html: renderToStaticMarkup(
            <div className="marker">
                <AirplaneEnginesFill id="icon"/>
            </div>
        ),
        className: 'markerHolder'
      });
      L.Marker.prototype.options.icon = airplaneIcon;
      const displayAllMarkers = iataCodes.slice(0, 100).map(airportObj => {
        let position = airportObj.coordinates.split(", ").reverse(); //the freak that made this data set did long,lat
        console.log(position)
        return(
            <Marker position={position} key={airportObj.iata_code}>
                <Popup>
                    {airportObj.name} <br/>
                    {airportObj.iata_code} <br/>
                    {airportObj.coordinates}
                </Popup>
            </Marker>
        )
      });
    return(
        <MapContainer className ="fullHeightMap" center={startingPosition} zoom={14} scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
        />
        {displayAllMarkers}
        </MapContainer>
    )
}