import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useDispatch } from "react-redux";
import { saveHistory } from "@/redux/features/history/historySlice";

const SearchBar = ({ setSelected }) => {
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

  const dispatch = useDispatch();

  const handleOptionClick = (value) => {
    if (value) {
      getGeocode({ placeId: value.place_id }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setSelected({ lat, lng });
      });
      dispatch(saveHistory(value.description));
      clearSuggestions();
    }
  };

  return (
    <div style={{ position: "absolute", top: 10, left: 10, zIndex: 2 }}>
      <Autocomplete
       className="custom-autocomplete"
        disablePortal={true}
        id="map-combo-box"
        value={data.find((x) => x.description === value.key)}
        disabled={!ready}
        options={data}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        filterOptions={(x) => x}
        size="small"
        sx={{
          width: 500,
          backgroundColor: "white",
        }}
        includeInputInList
        filterSelectedOptions
        onChange={(event, value) => handleOptionClick(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            fullWidth
            onInput={(event)=> handleChange(event)}
            sx={{ borderRadius: 20 }}
          />
        )}
        renderOption={(props, option) => {
          const { key, ...restProps } = props;
          if (status === "OK") {
            return (
              <li
                key={key}
                {...restProps}
              >
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

export default SearchBar;
