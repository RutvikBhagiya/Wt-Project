import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditCollection = () => {
  const navigate = useNavigate();
  const { CId } = useParams();
  const [collection, setCollection] = useState({ CId: '', CName: '' });
  const apiUrl = `http://localhost:5000/collections/${CId}`

  useEffect(() => {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setCollection({CId: data.CId, CName: data.CName,});
        });
  }, [apiUrl]);

  const handleChange = (e) => {
    setCollection({...collection, [e.target.name]: e.target.value,});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collection),
    })
    .then(res=>res.text())
    .then(res=>{
      navigate(`/collections`);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Collection ID</label>
        <input type="text" className="form-control" name="CId" value={collection.CId} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Collection Name</label>
        <input type="text"className="form-control" name="CName" value={collection.CName} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary">Update Collection</button>
    </form>
  );
};

export default EditCollection;