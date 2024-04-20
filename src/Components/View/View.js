import React, { useContext, useState, useEffect } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
//import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, query ,where} from 'firebase/firestore';
import { db } from '../../firebase/config';

function View() {

  const [userDetails, setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)

  useEffect(() => {
    const { userId } = postDetails;
    const myCollection = collection(db, "users");
    getDocs(query(myCollection, where("id", "==", userId)))
      .then((res) => {
        res.forEach((doc) => {
          setUserDetails(doc.data());
        });
      })
      .catch((error) => {
        alert("Error fetching data:", error);
      });
  });

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
       {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
