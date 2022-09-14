
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import * as React from "react";
import { Admin, Resource, CustomRoutes, ListGuesser, ShowGuesser, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Home  from './pages/home';
import Navbar from './components/Navbar';

const dataProvider = jsonServerProvider('http://localhost:4000');

function App() {
  return (
    <Admin dataProvider={dataProvider}>
        <Resource name="members" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
        <Resource name="projects" list={ListGuesser} />
    </Admin>
  );
}

export default App;
