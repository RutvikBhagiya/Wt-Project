import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditItem = () => {
  const navigate = useNavigate();
  const { CId, IId } = useParams(); // Collection ID and Item ID from the URL
  const [item, setItem] = useState({IId: '',IName: '',IDescription: '',IImage: ''});
  const apiUrl = `http://localhost:5000/collections/${CId}/items/${IId}`;

  useEffect(() => {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((res) => {
          setItem({IId: res.IId,IName: res.IName,IDescription: res.IDescription,IImage: res.IImage});
        });
  }, [apiUrl]);

  const handleChange = (e) => {
    setItem({...item,[e.target.name]: e.target.value,});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
    .then(res => res.json())
    .then(res => {
      navigate(`/collections/${CId}/items/${item.IId}`);
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="itemId" className="form-label">Item Id</label>
        <input type="text" className="form-control" name="IId" value={item.IId} onChange={handleChange} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="itemName" className="form-label">Item Name</label>
        <input type="text" className="form-control" name="IName" value={item.IName} onChange={handleChange} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="itemDescription" className="form-label">Item Description</label>
        <textarea className="form-control" name="IDescription" value={item.IDescription} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="itemImage" className="form-label">Item Image URL</label>
        <input type="text" className="form-control" name="IImage" value={item.IImage} onChange={handleChange}/>
      </div>
      <button type="submit" className="btn btn-primary">Update Item</button>
    </form>
  );
};

export default EditItem;
