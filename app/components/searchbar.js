import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

const SearchBar = ({ setSelected, setSearchValue }) => {
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
                    <LocationOnIcon/>
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
  
  export default SearchBar;