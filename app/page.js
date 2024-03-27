"use client";

import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useMemo, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

export default function Home() {
  const libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries: libraries,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 4.2105, lng: 101.9758 }), []);
  const [selected, setSelected] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  //Later use Redux toolkit and redux thunk to store value as history table
  console.log(searchValue.description)

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
      <PlacesAutocomplete setSelected={setSelected} setSearchValue={setSearchValue}/>
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

const PlacesAutocomplete = ({ setSelected, setSearchValue }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleOptionClick = (value) => {
    if (value) {
      getGeocode({ placeId: value.place_id }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setSelected({ lat, lng });
      });
      setSearchValue(value);
      clearSuggestions();
    }
  };

  return (
    <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
      <Autocomplete
        disablePortal
        id="map-combo-box"
        value={data.find((x) => x.description === value.key)}
        disabled={!ready}
        options={data}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        filterOptions={(x) => x}
        sx={{ width: 500, backgroundColor: "white" }}
        autoComplete
        includeInputInList
        filterSelectedOptions
        onChange={(event, value) => handleOptionClick(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            fullWidth
            onInput={handleChange}
          />
        )}
        renderOption={(props, option) => {
          const { key, ...restProps } = props;
          if (status === "OK") {
            return (
              <li key={key} {...restProps}>
                <Box component="span" sx={{ mr: 2 }}>
                  <LocationOnIcon />
                </Box>
                <Typography variant="body2" color="text.primary">
                  {option.description}
                </Typography>
              </li>
            );
          }
        }}
      />
    </div>
  );
};
