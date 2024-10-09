import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Info from './component/Info';
import Home from './component/Home';
import AddItem from './component/AddItem';
import AddCollection from './component/AddCollection';
import About from './component/About';
import ShowCollection from './component/ShowCollection';
import Layout from './component/Layout';
import ItemView from './component/ItemView';
import EditItem from './component/EditItem';
import EditCollection from './component/EditCollection';


const App = ()=>{

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Info />} />
            <Route path='/home' element={<Home />} />
            <Route path='/collections' element={<ShowCollection />} />
            <Route path='/collections/add' element={<AddCollection />} />
            <Route path='/collections/:CId/items/:IId' element={<ItemView />} />
            <Route path='/collections/:CId/items/add' element={<AddItem />} />
            <Route path='/collections/:CId/items/:IId/edit' element={<EditItem/>}/>
            <Route path='/collections/:CId/edit' element={<EditCollection/>}/>
            <Route path='/about' element={<About />} />
          </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
