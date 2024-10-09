import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShowCollection = () => {
  const [collections, setCollections] = useState([]);
  const apiUrl = 'http://localhost:5000/collections';
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiUrl,{method : 'GET',})
    .then(res=>res.json())
    .then(res=>setCollections(res));
  }, []);

  const handleDelete = async (collectionId) => {
    const deleteUrl = `http://localhost:5000/collections/${collectionId}`;

     await fetch(deleteUrl, { method: 'DELETE' })
     .then(res=>res.text())
     .then(res=>{
        navigate('/home');
     });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Collections</h2>
      {collections.length === 0 ? (
        <p>No collections found.</p>
      ) : (
        <div className="list-group">
          {collections.map((collection) => (
            <div key={collection.CId} className="mb-4 bg-light p-3 rounded shadow">
              <div className="d-flex justify-content-between border-5 border-danger-subtle align-items-center list-group-item list-group-item-action">
                <div>
                  <h5>{collection.CName}</h5>
                  <p>
                    <strong>Collection ID:</strong> {collection.CId}
                  </p>
                </div>
                <div>
                  <Link to={`/collections/${collection.CId}/items/add`} className="btn btn-success me-2">
                    Add Item
                  </Link>
                  <Link to={`/collections/${collection.CId}/edit`} className="btn btn-warning me-2">
                    Edit
                  </Link>
                  <button className="btn btn-danger me-2" onClick={() => handleDelete(collection.CId)}>
                    Delete
                  </button>
                </div>
              </div>

              {collection.Items.length > 0 ? (
                <ul className="list-group mt-2 ps-5">
                  {collection.Items.map((item) => (
                    <li key={item.IId} className="list-group-item  bg-light border-3 border-warning-subtle">
                      <div className="d-flex justify-content-between">
                        <div>
                          <strong>Item Name:</strong> {item.IName} <br />
                          <strong>Item ID:</strong> {item.IId}
                        </div>
                        <Link to={`/collections/${collection.CId}/items/${item.IId}`} className="btn btn-primary">
                          View More
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No items in this collection.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCollection;