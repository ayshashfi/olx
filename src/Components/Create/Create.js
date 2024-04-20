import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/Context";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase/config'; 

const Create = () => {
  const navigate = useNavigate()
  const {} = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    const storageRef = ref(storage, `/image/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        alert(error);
      },
      (() => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("success", downloadURL);
            const products = collection(db, "products")
            addDoc(products, {
            name,
            category,
            price,
            url:downloadURL,
            userId:user.uid,
            createdAt: new Date().toDateString()
          })
          }).then(() => {navigate("/")})
          .catch((error) => {
            console.error(error);
            alert(error);
          });
      })
      
    );
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          {image? <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img> : null}

          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
      </div>
    </Fragment>
  );
};

export default Create;