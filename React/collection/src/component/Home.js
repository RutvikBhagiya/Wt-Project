import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
  const [collection, setCollection] = useState([]);
  const apiUrl = 'http://localhost:5000/collections';

  useEffect(() => {
    
      fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => {
        setCollection(res);
      })
  }, []);

//here we map the collection to formatedCollection variable
  const formatedCollection = collection.map((collection, index) => {
    const firstItem = collection.Items[0];
    return firstItem ? (
      <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={collection.CId}>
        <div className="card mx-auto" style={{ width: '18rem' }}>
          <img
            src={firstItem.IImage || "https://via.placeholder.com/150"}
            className="card-img-top"
            alt={firstItem.IName || "Collection Item"}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h5 className="card-title">{firstItem.IName || "Untitled"}</h5>
            <p className="card-text">{firstItem.IDescription || "No description available."}</p>
            <Link to={`/collections/${collection.CId}/items/${firstItem.IId}`} className='btn btn-danger width-100'>Show More</Link>
          </div>
        </div>
      </div>
    ) : null;
  })

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <Link to="/addcollection" className="btn btn-outline-danger">ADD Collection</Link>
        <h1>Your Collections</h1>
      </div>
    
      <div id="collectionCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          
        {formatedCollection}

        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#collectionCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" style={{backgroundColor:"red",borderRadius:"10px"}}></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#collectionCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" style={{backgroundColor:"red",borderRadius:"10px"}}></span>
        </button>
      </div>
    </div>
  );
};

export default Home;
