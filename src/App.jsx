import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from './components/Home';
import Unit1 from './components/Unit1';
import Unit2 from './components/Unit2';
import Unit3 from './components/Unit3';
import Unit4 from './components/asdf';
import Unit5 from './components/Unit5';
import Unit6 from './components/Unit6';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      {/* <Link to="/">Home</Link>
      <Link to="/unit1">About</Link> */}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/unit-1' element={<Unit1/>}/>
        <Route path='/unit-2' element={<Unit2/>}/>
        <Route path='/unit-3' element={<Unit3/>}/>
        <Route path='/unit-4' element={<Unit4/>}/>
        <Route path='/unit-5' element={<Unit5/>}/>
        <Route path='/unit-6' element={<Unit6/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;