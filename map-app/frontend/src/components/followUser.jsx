import { useMap } from "react-leaflet";
import { useEffect } from "react";

function FollowUser ({userLocation}) {
    const map = useMap();

    useEffect(() => {
        if(userLocation) {
            // keeps current zoom while following
            map.setView(userLocation, map.getZoom());
        }
    }, [userLocation, map]);

    return null;
}

export default FollowUser;