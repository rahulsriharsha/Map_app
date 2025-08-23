// import logo from './logo.svg';
import './App.css';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { useState } from "react";
import axios from 'axios';
import { Icon, divIcon, point, popup } from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
// import { useState } from 'react';

function App() {
  // Markers
  const markers = [
    {
      geocode: [48.86, 2.3522],
      popup: "Hello, I am popup 1"
    },
    {
      geocode: [48.85, 2.3522],
      popup: "Hello, I am popup 2"
    },
    {
      geocode: [48.855, 2.34],
      popup: "Hello, I am popup 3"
    }
  ]

  const customIcon = new Icon ({
    iconUrl: "/images/location-pin.png",
    iconSize: [38, 38], // size of the icon
  })

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
    });
  };

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startCoords, setStartCoords] = useState("");
  const [endCoords, setEndCoords] = useState("");
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);

  const createdMarkers = [
    {
      geocode: startCoords,
      popup: "I am the starting location"
    },
    {
      geocode: endCoords,
      popup: "I am the destination"
    }
  ]

  const fetchCoordinates = async (place, setCoords) => {
    try{
      const res = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
        params: {
          q: place,
          key: "ecf2d9c5db294d8eaf318a95ded1eacd",
        },
      });
      const { lat, lng } = res.data.results[0].geometry;
      setCoords([lat, lng]);
    } catch(err) {
      console.error("Error fetching coordinates: ", err);
    }
  };

  const fetchRoute = async (startCoords, endCoords) => {
    if(!startCoords || !endCoords) return;
    try{
      const res = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        {
          coordinates:[
            [startCoords[1], startCoords[0]], //lng, ltn
            [endCoords[1], endCoords[0]]
          ]
        },
        {
          headers: {
            Authorization: "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjkxM2ZjNTM1MjZhMjQ3ZjRiNjdlODI0ZDk4NjY0YmYwIiwiaCI6Im11cm11cjY0In0=",
            "Content-Type": "application/json"
          },
        }
      );

      const coords = res.data.features[0].geometry.coordinates.map(
        (c) => [c[1], c[0]] //Flip lng/lat -> lat/lng
      );

      setRouteCoords(coords);

      const summary = res.data.features[0].properties.summary;
      alert(
        `Distance: ${(summary.distance / 1000).toFixed(2)} km, Duration: ${(summary.duration / 60).toFixed(2)} min`
      );

    } catch (err) {
      console.error("Error fetching route: ", err);
    }
  };

  const fetchDistance = async (startCoords, endCoords) => {
    if(!startCoords || !endCoords) return;
    try{
      const res = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        {
          coordinates:[
            [startCoords[1], startCoords[0]], //lng, ltn
            [endCoords[1], endCoords[0]]
          ]
        },
        {
          headers:{
            Authorization: "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjkxM2ZjNTM1MjZhMjQ3ZjRiNjdlODI0ZDk4NjY0YmYwIiwiaCI6Im11cm11cjY0In0=",
            "Content-Type": "application/json"
          },
        }
      );

      const coords = res.data.features[0].geometry.coordinates.map(
        (c) => [c[1], c[0]] //Flipping lat & lng
      );

      setRouteCoords(coords);
      const summary = res.data.features[0].properties.summary;
      const Distance = summary.distance/1000;
      return Distance;
    } catch (err){
      console.error("Error returning the distance: ", err);
    }
  };

  const handleSearch = async () => {
    await fetchCoordinates(start, setStartCoords);
    await fetchCoordinates(end, setEndCoords);

    // Fetch route slightly late (after coords are set)
    setTimeout(() => {
      if(startCoords && endCoords) {
        fetchRoute(startCoords, endCoords);

        // Fetch distance and store it
        const dist = fetchDistance(startCoords, endCoords);
        setDistance(dist);
      }
    }, 1000);
  };

  return(
    <div>
      <h2>Route Finder</h2>
      <input
        type='text'
        placeholder='Start location'
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type='text'
        placeholder='End location'
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <button onClick={handleSearch}>Find</button>

      <MapContainer center={[48.8566,2.3522]} zoom={13}>
        <TileLayer
          attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* <TileLayer
          attribution = 'Esri'
          url = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          // onClick={(e) => {
          //   console.log(e);
          // }}
        /> */}

        {startCoords && (
          <Marker position={startCoords} icon={customIcon}>
            <Popup>Start: {start}</Popup>
          </Marker>
        )}
        {endCoords && (
          <Marker position={endCoords} icon={customIcon}>
            <Popup>End: {end}</Popup>
          </Marker>
        )}

        {routeCoords.length > 0 && (
          <Polyline
            positions={routeCoords} color='blue'
          />
        )}
        
        
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>
                <h4>
                  {marker.popup}
                </h4>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>           


      </MapContainer>
    </div>
    

  );
}

export default App;
