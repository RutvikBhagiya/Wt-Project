import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemView = () => {
  const { CId, IId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({});

  const apiUrl = `http://localhost:5000/collections/${CId}/items/${IId}`;

  useEffect(() => {
    fetch(apiUrl)
    .then(res=>res.json())
    .then(res=>{
      setItem(res);
    })
  }, [apiUrl]);

  const handleDelete = async () => {
    fetch(apiUrl, { method: 'DELETE' })
    .then(res=>res.text())
    .then(res=>{
      navigate('/collections');
    })
  };

  if (!item) {
    return <p>Loading item details...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">

        <div className="col-md-6">
          <h3>{item.IName}</h3>
          <p><strong>ID:</strong> {item.IId}</p>
          <p><strong>Description:</strong> {item.IDescription}</p>
          <p><strong>Date:</strong> {item.IDate}</p>
          <div className="mt-4">
            <Link to={`/collections/${CId}/items/${IId}/edit`} className="btn btn-warning me-2">Edit</Link>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>

        <div className="col-md-6">
          <img src={item.IImage} alt={item.IName} className="img-fluid rounded shadow" />
        </div>
      </div>
    </div>
  );
};

export default ItemView;