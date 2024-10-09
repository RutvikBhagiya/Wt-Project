import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddItem = () => {
  const navigate = useNavigate();
  const { CId } = useParams(); 
  const [item, setItem] = useState({ IId: '', IName: '', IDescription: '', IImage: '' });
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const apiUrl = `http://localhost:5000/collections/${CId}/items`;

  useEffect(() => {
    fetch(`http://localhost:5000/collections/${CId}`)
      .then(res => res.json())
      .then(data => setItems(data.Items));
  }, [CId]);

  const handleChange = (e) => {
    setItem({...item,[e.target.name]: e.target.value,});
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isIIdUnique = items.every(existingItem => existingItem.IId !== item.IId);

    if (!isIIdUnique) {
      setError('Id is not Unique');
      return;
    }

    fetch(apiUrl,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
    .then(res=>res.json())
    .then(()=>{
      navigate('/collections');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>} 

      <div className="mb-3">
        <label className="form-label">Item Id</label>
        <input type="number" className="form-control" name="IId" value={item.IId} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Item Name</label>
        <input type="text" className="form-control" name="IName" value={item.IName} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Item Description</label>
        <textarea className="form-control" name="IDescription" value={item.IDescription} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Item Image URL</label>
        <input type="text" className="form-control" name="IImage" value={item.IImage} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Add Item</button>
    </form>
  );
};

export default AddItem;
