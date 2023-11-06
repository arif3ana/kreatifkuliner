import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux'
import axios from "axios";
import Cookies from "js-cookie";
import Home from "./pages/landingpage/Home";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import store from './utils/store.jsx'
import HomeDashboard from "./pages/dashboard/Home";
import Myrecipe from "./pages/dashboard/Myrecipe";
import DetailRecipe from "./pages/dashboard/DetailRecipe";
import Add from "./pages/dashboard/Add";
import Edit from "./pages/dashboard/Edit";
function App() {
  const refresh = async () => {
    await axios.post('http://localhost:3000/v1/auth/refresh', null, {
        withCredentials: true,
    }).then((response) => {
        const access = response.headers.authorization;
        Cookies.set('accessToken', access, {path: "/", expires: new Date(Date.now() + 5 * 60 * 1000)});
        console.log(response);
    }).catch((err) => {
        console.log(err);
    })
  }

  setInterval(() => {
    if (location.pathname.startsWith('/dashboard')) {
      refresh()
    }
  }, 2 * 60 * 1000)
  
  

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
            <Route path="/dashboard/myrecipe" element={<Myrecipe />} />
            <Route path="/dashboard/add" element={<Add />} />
            <Route path="/dashboard/recipe/:id" element={<DetailRecipe />} />
            <Route path="/dashboard/edit/:id" element={<Edit />} />
          </Route>
        </Route>
      </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
