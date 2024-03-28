import { GoogleMap, Marker } from "@react-google-maps/api";
import SearchBar from "./searchbar";
import { useMemo, useState } from "react";

const Map = () => {
    const center = useMemo(() => ({ lat: 4.2105, lng: 101.9758 }), []);
    const [selected, setSelected] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    //Later use Redux toolkit and redux thunk to store value as history table
    console.log(searchValue.description);
  
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
          setSearchValue={setSearchValue}
        />
        <GoogleMap
          zoom={7}
          center={selected ? selected : center}
          mapContainerStyle={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
          onClick={handleMapClick}
          onLoad={() => console.log("Map Component Loaded...")}
          options={{
            mapTypeControlOptions: {
              position: google.maps.ControlPosition.BLOCK_START_INLINE_END,
            },
          }}
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
      </div>
    );
  }

  export default Map;