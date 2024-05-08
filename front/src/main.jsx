import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './font.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Customer/Home.jsx';
import Bid from './components/Customer/Bid.jsx';
import MyProduct from './components/Customer/Products.jsx';
import Search from './components/Customer/Search.jsx';
import AdminHome from './components/Admin/AdminHome.jsx';
//import Add from './components/Admin/AddProduct.jsx';
import Login from './components/Customer/Login.jsx'
import Register from './components/Customer/Register.jsx';
import Sold from './components/Admin/Sold.jsx';
import Edit from './components/Customer/EditProfile.jsx';
import UserProf from './components/Customer/UserProf.jsx';
import Details from './components/Customer/Detail.jsx';

const router = createBrowserRouter([
  {
    path: "/user/home",
    element:  <Home />
  },
  {
    path: "/bidding",
    element:  <Bid />
  },
  {
    path: "/myproducts",
    element:  <MyProduct />
  },
  {
    path: "/user/results/:keyword",
    element:  <Search />
  },
  {
    path: "/admin",
    element:  <AdminHome />
  },
  {/*
    path: "/add-product",
    element:  <Add />
*/},
  {
    path: "/login",
    element:  <Login />
  },
  {
    path: "/register",
    element:  <Register />
  },
  {
    path: "/sold",
    element:  <Sold />
  },
  {
    path: "/user/profile/edit",
    element:  <Edit />
  },
  {
    path: "/user/profile",
    element:  <UserProf />
  },{
    path: "/detail/:goodsID",
    element: <Details />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
