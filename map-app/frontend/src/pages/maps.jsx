// import logo from './logo.svg';
import '../App.css';
import "leaflet/dist/leaflet.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from "react-leaflet";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Icon } from 'leaflet';
// import { divIcon, point, popup } from 'leaflet';
// import MarkerClusterGroup from "react-leaflet-cluster";

function Maps() {

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  // To track user's live location
  const [userLocation, setUserLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(null); // Accuracy for circle


  // Markers
  // const markers = [
  //   {
  //     geocode: [48.86, 2.3522],
  //     popup: "Hello, I am popup 1"
  //   },
  //   {
  //     geocode: [48.85, 2.3522],
  //     popup: "Hello, I am popup 2"
  //   },
  //   {
  //     geocode: [48.855, 2.34],
  //     popup: "Hello, I am popup 3"
  //   }
  // ]

  // Custom Pin Icon
  const customIcon = new Icon ({
    iconUrl: "/images/location-pin.png",
    iconSize: [38, 38], // size of the icon
  })

  // User's current location marker icon (different color if you want)
  const userIcon = new Icon({
    iconUrl: "/images/current-location.png",
    iconSize: [38, 38]
  })

  // Realtime location tracking
  
  // const createCustomClusterIcon = (cluster) => {
  //   return new divIcon({
  //     html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
  //     className: "custom-marker-cluster",
  //     iconSize: point(33, 33, true)
  //   });
  // };



  // const createdMarkers = [
  //   {
  //     geocode: startCoords,
  //     popup: "I am the starting location"
  //   },
  //   {
  //     geocode: endCoords,
  //     popup: "I am the destination"
  //   }
  // ]

  const fetchCoordinates = async (place, setCoords) => {
    try{
      const res = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
        params: {
          q: place,
          key: process.env.REACT_APP_OPENCAGE_API_KEY
        },
      });
      const { lat, lng } = res.data.results[0].geometry;
      const coords = [lat, lng];
      setCoords(coords);
      return coords;
    } catch(err) {
      console.error("Error fetching coordinates: ", err);
      return null;
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
            Authorization: process.env.REACT_APP_ORS_API_KEY,
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

  const handleSearch = async () => {
    const startRes = await fetchCoordinates(start, setStartCoords);
    const endRes = await fetchCoordinates(end, setEndCoords);

    // Fetch route slightly late (after coords are set)
    if(startRes && endRes) {
      fetchRoute(startRes, endRes);
    }
  };

  useEffect(() => {
    if(!navigator.geolocation) {
      console.log("Geolocation not supported by your browser")
      return;
    }

    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation([latitude, longitude]);
    },
  (error) => {
    console.error("Error watching position: ", error);
  },
  {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000,
  }
  );

  return () => navigator.geolocation.clearWatch(watchId);
  }, []);

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

      <MapContainer center={startCoords || [48.8566,2.3522]} zoom={13}>
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
          <Marker position={startCoords} icon={userIcon}>
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
        
        
        {/* <MarkerClusterGroup
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
        </MarkerClusterGroup>            */}

        {/* User's realtime location marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )
      }


      </MapContainer>
    </div>
    

  );
}

export default Maps;
