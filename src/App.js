import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import '../src/Assets/Css/Custom.css';
import Header from './Component/Header';
import Auth from './Component/Auth'
import Dashboard from './Component/Dashboard'



function App(){
	return (
	<Router>
		<div className="App">
      <Header/>
		
		<Routes>
				<Route exact path='/' element={<Auth />}></Route>
				<Route exact path='/signin' element={<Auth />}></Route>
				<Route exact path='/dashboard' element={<Dashboard />}></Route>
		</Routes>
		</div>
	</Router>
);
}

export default App;
