import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCollection = () => {
    const navigate = useNavigate();
    const apiUrl = 'http://localhost:5000/collections';
    const [collection, setCollection] = useState({ CId: "", CName: "", Items: [] });
    const [collections, setCollections] = useState([]);
    const [error, setError] = useState('');
    const [item, setItem] = useState({ IId: "", IName: "", IDescription: "", IImage: "" });

    useEffect(() => {
        fetch(apiUrl)
          .then(res => res.json())
          .then(data => setCollections(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const newItem = {
            IId: item.IId,
            IName: item.IName,
            IDescription: item.IDescription,
            IImage: item.IImage,
        };
      
        const newCollection = {
            ...collection,
            Items: [newItem],
        };

        const isCIdUnique = collections.every(col => col.CId !== collection.CId);
        const isIIdUnique = collections.every(col =>
          col.Items.every(existingItem => existingItem.IId !== item.IId)
        );

        
        if (!isCIdUnique || !isIIdUnique) {
            setError('Id is not Unique');
            return;
        }
      
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(newCollection),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(() => {
            navigate('/home');
        });
    };

    const handleCollection = (e) => {
        setCollection({ ...collection, [e.target.name]: e.target.value });
        setError(""); 
    }

    const handleItem = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
        setError("");
    }

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Add Collection</h2>
                <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
                    {error && <div className="alert alert-danger">{error}</div>} {/* Error message */}

                    <div className="mb-3">
                        <label className="form-label">Collection ID</label>
                        <input type="number" className="form-control" name='CId' value={collection.CId} onChange={handleCollection} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Collection Name</label>
                        <input type="text" className="form-control" name='CName' value={collection.CName} onChange={handleCollection} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Item ID</label>
                        <input type="number" className="form-control" name='IId' value={item.IId} onChange={handleItem} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Item Name</label>
                        <input type="text" className="form-control" name='IName' value={item.IName} onChange={handleItem} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Item Description</label>
                        <textarea className="form-control" name='IDescription' value={item.IDescription} onChange={handleItem} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Item Image URL</label>
                        <input type="url" className="form-control" name='IImage' value={item.IImage} onChange={handleItem} />
                    </div>
                    <button type="submit" className="btn btn-danger w-100">Add Collection & Item</button>
                </form>
            </div>
        </div>
    );
};

export default AddCollection;
