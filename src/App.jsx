import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/landingpage/Home";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import { Provider } from 'react-redux'
import store from './utils/store.jsx'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
      <Routes>
        <Route path="/">
          <Route index Component={Home}/>
          <Route path="/register" Component={Register}/>
          <Route path="/login" Component={Login}/>
        </Route>
      </Routes>
      </Provider>
    </BrowserRouter>
    //layout footer
  )
}

export default App
