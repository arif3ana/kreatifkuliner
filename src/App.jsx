import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/landingpage/Home";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import { Provider } from 'react-redux'
import store from './utils/store.jsx'
import HomeDashboard from "./pages/dashboard/Home";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
      <Routes>
        <Route path="/">
          <Route index element={<Home />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/dashboard">
            <Route index element={<HomeDashboard />} />
          </Route>
        </Route>
      </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
