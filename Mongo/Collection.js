const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Collection = require('./Schema');
const cors = require('cors');

const mongoUrl = 'mongodb+srv://Rutvik24:RutvikB24@cluster0.ab3fm.mongodb.net/AllCollection';
mongoose.connect(mongoUrl).then(() =>{
    console.log('MongoDB Connected');
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(cors());

    //------------For Collections--------//
    //Get All
    app.get('/collections', async (req, res) => {
            const collections = await Collection.find();
            res.send(collections);
    });
    
    //Get By Id
    app.get('/collections/:id', async (req, res) => {
        const collection = await Collection.findOne({CId : req.params.id});
        res.send(collection);
    });
    
    //To Add new collection
    app.post('/collections', async (req, res) => {
            const newCollection = new Collection({...req.body});
            const ans = await newCollection.save();
            res.send(ans);
    });

    //To Update a specific collection
    app.patch('/collections/:id', async (req, res) => {
        const collection = await Collection.findOne({CId : req.params.id});
        
        collection.CId = req.body.CId;
        collection.CName = req.body.CName;
        await collection.save();
        res.send("Updated");
    });

    //To Delete Specific Collection
    app.delete('/collections/:id', async (req, res) => {
        await Collection.deleteOne({CId : req.params.id});
        res.send("Collection deleted");
    });

    //---------------For Items--------------//
    //Get By Id
    app.get('/collections/:CId/items/:IId', async (req, res) => {
        const collection = await Collection.findOne({ CId: req.params.CId });
        const item = collection.Items.find(item=> String(item.IId) === String(req.params.IId));
        res.send(item);
    });    

    //To Add A New Item At Specific Collection
    app.post('/collections/:id/items', async (req, res) => {
        const { IId, IName, IDescription, IImage } = req.body;

        const collection = await Collection.findOne({ CId: req.params.id });
        collection.Items.push({ IId, IName, IDescription, IImage });

        await collection.save();
        res.send(collection);
    });

    //To Update A Specific Item Of A Specific Collection
    app.patch('/collections/:CId/items/:IId', async (req, res) => {
        const collection = await Collection.findOne({ CId : req.params.CId });
        const item = collection.Items.find(item => String(item.IId) === String(req.params.IId));
        
        item.IId = req.body.IId || item.IId;
        item.IName = req.body.IName || item.IName;
        item.IDescription = req.body.IDescription || item.IDescription;
        item.IImage = req.body.IImage || item.IImage;
      
        await collection.save();
        res.send(collection)
    });

    //To Delete Specific Item of Specific Collection
    app.delete('/collections/:CId/items/:IId', async (req, res) => {
        const collection = await Collection.findOne({CId : req.params.CId});
        const itemIndex = collection.Items.findIndex(item => String(item.IId) === String(req.params.IId));
        collection.Items.splice(itemIndex,1);
        await collection.save();
        res.send("Deleted");
    });

    app.listen(5000, () =>{
        console.log("Hello From Server");
    });
});
