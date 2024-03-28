import { GoogleMap, Marker } from "@react-google-maps/api";
import SearchBar from "./searchbar";
import { useMemo, useState } from "react";
import HistoryList from "./historyList";

const Map = () => {
    const center = useMemo(() => ({ lat: 4.2105, lng: 101.9758 }), []);
    const [selected, setSelected] = useState(null);
  
    const handleMapClick = (event) => {
      if (event.latLng) {
        setSelected({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      }
    };
  
    return (
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <SearchBar
          setSelected={setSelected}
        />
        <HistoryList/>  
        <GoogleMap
          zoom={7}
          center={selected ? selected : center}
          mapContainerStyle={{
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: 0
          }}
          onClick={handleMapClick}
          onLoad={() => console.log("Map Component Loaded...")}
          options={{
            disableDefaultUI: true
          }}
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
      </div>
    );
  }

  export default Map;