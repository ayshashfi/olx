import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
// import { FirebaseContext } from '../../store/Context';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config'; 
import { Link } from 'react-router-dom';
import { PostContext } from '../../store/PostContext';


function Posts() {
    
    const [products, setProducts] = useState([])
    const {setPostDetails} = useContext(PostContext)

    useEffect(() => {
      getDocs(collection(db, "products")).then((querySnapshot) => {
        const allPosts = querySnapshot.docs.map((product) => {
          return {
            ...product.data(),
            id:product.id
          }
        })
        setProducts(allPosts)
      })
    })
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products.map((product)=>{
              return (
                <Link to ={'/view'}>
                  <div
                    className="card" onClick={()=>{
                      setPostDetails(product)
                    }}
                    key={product.url}
                  >
                    <div className="favorite">
                      <Heart></Heart>
                    </div>
                    <div className="image">
                      <img src={product.url} alt="" />
                    </div>
                    <div className="content">
                      <p className="rate">&#x20B9; {product.price}</p>
                      <span className="kilometer"><strong>{product.name}</strong></span>
                      <p className="name">{product.category}</p>
                    </div>
                    <div className="date">
                      <span>{product.createdAt}</span>
                    </div>
                    
                  </div>
                </Link>

              )
            })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>    
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;