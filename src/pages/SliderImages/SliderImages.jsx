import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
import { notify, confirmation } from "../../utils/notify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getSliderImage,
  deleteSliderImage,
  addSliderImage,
} from "../../redux/Actions";
import "./SliderImages.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 140,
  },
});

const SliderImages = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_PROD_URL + "api/getSliderImage")
      .then((response) => {
        if (response.data) {
          dispatch(getSliderImage(response.data));
        } else {
          dispatch(getSliderImage([]));
        }
      })
      .catch((err) => {
        dispatch(getSliderImage([]));
      });
  }, [dispatch]);

  const { sliderImage } = useSelector((state) => state.data);

  const deleteSlider = (index) => {
    confirmation({
      title: "Are you sure ? ",
      message: "Please Confirm",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            axios
              .delete(
                process.env.REACT_APP_PROD_URL +
                  "api/deleteSliderImage/" +
                  index
              )
              .then((response) => {
                if (response.data) {
                  notify("success", "Successfully Deleted");
                  dispatch(deleteSliderImage(index));
                }
              })
              .catch((err) => {
                notify("error", "Error in Deleting");
              }),
        },
        {
          label: "No, Cancel",
        },
      ],
    });
  };

  const uploadHandle = (e) => {
    let data = new FormData();
    if (e.target.files[0]) {
      data.append("imgUrl", e.target.files[0]);
    }
    axios
      .post(process.env.REACT_APP_PROD_URL + "api/addSliderImage", data)
      .then((response) => {
        if (response.data) {
          notify("success", "Successfully Added");
          dispatch(addSliderImage(response.data));
        }
      })
      .catch((err) => {
        notify("error", "Error in Adding");
      });
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Slider Images</h1>
        <Button variant="contained" component="label" onChange={uploadHandle}>
          Upload File
          <input type="file" single="true" hidden />
        </Button>
      </div>
      <Grid container spacing={3}>
        {sliderImage &&
          sliderImage.map((item, index) => (
            <Grid key={item._id} item xs={4} className={classes.root}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={process.env.REACT_APP_PROD_URL + "" + item.imgUrl}
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => deleteSlider(item._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default SliderImages;
