import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
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
    flexGrow: 1
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
      .get("http://3.142.172.158:8000/api/getSliderImage")
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
    axios
      .delete("http://3.142.172.158:8000/api/deleteSliderImage/" + index)
      .then((response) => {
        if (response.data) {
          dispatch(deleteSliderImage(index));
        }
      })
      .catch((err) => {
        console.log("Error in image Deletion");
      });
  };

  const uploadHandle = (e) => {
    let data = new FormData();
    data.append("imgUrl", e.target.files[0]);
    console.log(e.target.files[0]);
    axios
      .post("http://3.142.172.158:8000/api/addSliderImage", data)
      .then((response) => {
        //   console.log(data)
        if (response.data) {
          dispatch(addSliderImage(response.data));
        }
      })
      .catch((err) => {
        console.log("Error in image upload");
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
            <Card  className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={"http://3.142.172.158:8000/" + item.imgUrl}
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
