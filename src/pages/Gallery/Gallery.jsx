import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Gallery.css";
import { addGalleryImage, getGalleryImage ,deleteGalleryImage } from "../../redux/Actions";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
const Gallery = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { gallery } = useSelector((state) => state.data);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    axios
      .get("https://dentalapp-nodebackend.herokuapp.com/api/getGalleryImage")
      .then((response) => {
        if (response.data) {
          dispatch(getGalleryImage(response.data));
        } else {
          dispatch(getGalleryImage([]));
        }
      })
      .catch((err) => {
        dispatch(getGalleryImage([]));
      });
  }, [dispatch]);

  const submitDoc = (e) => {
    e.preventDefault();
    let imgData = new FormData();
    imgData.append("imgUrl", imgUrl, imgUrl.name);
    imgData.append("title", title);
    imgData.append("category", category);
    axios
      .post(
        "https://dentalapp-nodebackend.herokuapp.com/api/addGalleryImage",
        imgData
      )
      .then((response) => {
        if (response.data) {
          dispatch(addGalleryImage(response.data));
        }
      })
      .catch((err) => {
        console.log("Error in image upload");
      });
      setTitle("");
      setCategory("");
      setImgUrl("");
  };

  const deleteImg =(index)=>{
    axios
      .delete(
        "https://dentalapp-nodebackend.herokuapp.com/api/deleteGalleryImage/" +
          index
      )
      .then((response) => {
        if (response.data) {
          dispatch(deleteGalleryImage(index));
        } 
      })
      .catch((err) => {
        console.log("Error in image Deletion")
      });
  }

  return (
    <div className="user">
      <div className="newUser">
        <h1 className="newUserTitle">Add Gallery Item</h1>
        <form className="newUserForm">
          <div className="newUserItem">
            <label>Title</label>
            <input
              type="text"
              placeholder=""
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="newUserItem">
            <label>Category</label>
            <input
              type="text"
              placeholder=""
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </div>
          <div className="newUserItem">
            <Button
              variant="contained"
              component="label"
              onChange={(e) => setImgUrl(e.target.files[0])}
            >
              Upload File
              <input type="file" single="true" hidden />
            </Button>
          </div>

          <div className="newUserItem">
            <button className="newUserButton" onClick={submitDoc}>
              Add Gallery Image
            </button>
          </div>
        </form>
      </div>
      {gallery &&
        gallery.map((item) => (
          <Card className={classes.root} key={item._id}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={
                  "https://dentalapp-nodebackend.herokuapp.com/" + item.imgUrl
                }
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.category}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => deleteImg(item._id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
    </div>
  );
};

export default Gallery;