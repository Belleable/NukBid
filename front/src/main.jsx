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
import Add from './components/Admin/AddProduct.jsx';
import Login from './components/Customer/Login.jsx'
import Register from './components/Customer/Register.jsx';
import Sold from './components/Admin/Sold.jsx';
import Edit from './components/Customer/EditProfile.jsx';
import UserProf from './components/Customer/UserProf.jsx';
import Details from './components/Customer/Detail.jsx';
import AuthRoute from './Auth/AuthRoute.jsx';
import ProtectedRoute from './Auth/ProtectedRoute.jsx';
import WinnerProfile from './components/Admin/WinnerProfile.jsx';

const router = createBrowserRouter([
    {
        path: '',
        element: <AuthRoute><div>Loading...</div></AuthRoute>
    },
    {
        path: '/',
        element: <AuthRoute><div>Loading...</div></AuthRoute>
    },
    {
        path: "/login",
        element:  <Login />
    },
    {
        path: "/register",
        element:  <Register />
    },
    {
        element: <ProtectedRoute isAdmin={false}/>,
        children: [
            {
                path: "user",
                children: [
                    {
                        path: "home",
                        element:  <Home />
                    },
                    {
                        path: "search/results/:keyword",
                        element:  <Search />
                    },
                    {
                        path: "status",
                        children: [
                            {
                                path: "win",
                                element:  <MyProduct />
                            },
                            {
                                path: "bidding",
                                element: <Bid />
                            }
                        ]
                    },
                    {
                        path: "profile",
                        children: [
                            {
                                path: "",
                                element: <UserProf />
                            },
                            {
                                path: "edit",
                                element: <Edit />
                            }
                        ]
                    },
                    {
                        path: "detail/:goodsID",
                        element: <Details />
                    }
                ]
            }
        ]
    },
    {
        element: <ProtectedRoute isAdmin={true}/>,
        children: [
            {
                path: "admin",
                children: [
                    {
                        path: "home",
                        children: [
                            {
                                path: "",
                                element:  <AdminHome />
                            },
                            {
                                path: "addproduct",
                                element:  <Add />
                            }
                        ]
                    },
                    {
                        path: "search/results/:keyword",
                        element:  <Search />
                    },
                    {
                        path: "status",
                        children: [
                            {
                                path: "success",
                                element:  <Sold />
                            }
                        ]
                    },
                    {
                        path: "detail/:goodsID",
                        children: [
                            {
                                path: "",
                                element: <Details />
                            },
                            {
                                path: "userprofile/:username",
                                element: <WinnerProfile />
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<RouterProvider router={router} />
</React.StrictMode>,
)
