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
import "./Blogs.css";
import { addBlog, getBlog ,deleteBlog, updateBlog } from "../../redux/Actions";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Blogs = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const { blogs } = useSelector((state) => state.data);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [imageUrl, setImgUrl] = useState("");
    const [editIndex, setEdit] = useState("");


    useEffect(() => {
        axios
          .get("https://dentalapp-nodebackend.herokuapp.com/api/getBlog")
          .then((response) => {
            if (response.data) {
              dispatch(getBlog(response.data));
            } else {
              dispatch(getBlog([]));
            }
          })
          .catch((err) => {
            dispatch(getBlog([]));
          });
      }, [dispatch]);

      const submitDoc = (e) => {
        e.preventDefault();
        let imgData = new FormData();
        imgData.append("imageUrl", imageUrl, imageUrl.name);
        imgData.append("title", title);
        imgData.append("description", description);

        if (editIndex) {
            axios
              .post(
                "https://dentalapp-nodebackend.herokuapp.com/api/updateBlog/" +
                  editIndex,
                  imgData
              )
              .then((response) => {
                dispatch(updateBlog(response.data));
                setEdit("");
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
        axios
          .post(
            "https://dentalapp-nodebackend.herokuapp.com/api/addBlog",
            imgData
          )
          .then((response) => {
            if (response.data) {
              dispatch(addBlog(response.data));
            }
          })
          .catch((err) => {
            console.log("Error in image upload");
          });
        }
          setTitle("");
          setDescription("");
          setImgUrl("");
      };

      const handleEdit = (index) => {
        setEdit(index);
        const getData = blogs.findIndex((item) => item._id === index);
        setTitle(blogs[getData].title);
        setDescription(blogs[getData].description);
        setImgUrl(blogs[getData].imageUrl);
        window.scrollTo(0, 0);
      };
      const delBlog =(index)=>{
        axios
          .delete(
            "https://dentalapp-nodebackend.herokuapp.com/api/deleteBlog/" +
              index
          )
          .then((response) => {
            if (response.data) {
              dispatch(deleteBlog(index));
            } 
          })
          .catch((err) => {
            console.log("Error in image Deletion")
          });
      }


    return (
        <div className="user">
      <div className="newUser">
        <h1 className="newUserTitle">{editIndex ? "Update Blog" : "Add Blog"}</h1>
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
            <label>Description</label>
            <input
              type="textarea"
              placeholder=""
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="newUserItem">
            <Button
              variant="contained"
              component="label"
              onChange={(e) => setImgUrl(e.target.files[0])}
            >
              Upload Image
              <input type="file" single="true" hidden />
            </Button>
          </div>

          <div className="newUserItem">
            <button className="newUserButton" onClick={submitDoc}>
            {editIndex ? "Update" : "Add New"}
            </button>
          </div>
        </form>
      </div>
      {blogs &&
        blogs.map((item) => (
          <Card className={classes.root} key={item._id}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={
                  "https://dentalapp-nodebackend.herokuapp.com/" + item.imageUrl
                }
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => delBlog(item._id)}
              >
                Delete
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => handleEdit(item._id)}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        ))}
    </div>
    )
}

export default Blogs
