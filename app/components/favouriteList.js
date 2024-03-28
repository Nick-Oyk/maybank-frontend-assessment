import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { selectAllHistories } from "../../redux/features/history/historySlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";

const FavouriteList = () => {
  const histories = useSelector(selectAllHistories);

  if (!Array.isArray(histories.data)) {
    return null;
  }

  return (
    <>
      <Paper
        style={{
          position: "absolute",
          top: 310,
          left: 10,
          zIndex: 1,
          height: 200,
          width: 400,
          borderRadius: 10,
          backgroundColor: "white",
        }}
      >
        <Typography
          id="decorated-list"
          variant="body2"
          textTransform="uppercase"
          style={{ padding: "8px" }}
        >
          Favourite
        </Typography>
        <div
          className="historyList"
          style={{
            padding: "8px",
            overflow: "auto",
            maxHeight: "calc(100% - 40px)",
          }}
        >
          <List>
            {histories.data.map(
              (history) =>
                history.isFavourite === true && (
                  <ListItem key={history.id}>
                    <ListItemAvatar>
                      <Avatar
                        component="span"
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                        }}
                      >
                        <LocationOnIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={history.description}
                      primaryTypographyProps={{ fontSize: "12px" }}
                    />
                  </ListItem>
                )
            )}
          </List>
        </div>
      </Paper>
    </>
  );
};

export default FavouriteList;
