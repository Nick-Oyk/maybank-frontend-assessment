import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import {
  deleteHistory,
  selectAllHistories,
  updateHistory,
} from "../../redux/features/history/historySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch, useSelector } from "react-redux";

const HistoryList = () => {
  const histories = useSelector(selectAllHistories);
  const dispatch = useDispatch();

  const handleOnDelete = (id) => {
    dispatch(deleteHistory(id));
  };

  const handleOnFavourite = (id) => {
    dispatch(updateHistory(id));
  };

  return (
    <>
      <Paper
        style={{
          position: "absolute",
          top: 100,
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
          Search History
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
                history.isDeleted === false && (
                  <ListItem
                    key={history.id}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="favourite"
                          onClick={() => handleOnFavourite(history.id)}
                        >
                          <StarIcon />
                        </IconButton>

                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleOnDelete(history.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        component="span"
                        sx={{ width: 32, height: 32, borderRadius: "50%" }}
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

export default HistoryList;
