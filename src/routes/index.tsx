import React from "react";
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound'; // Componente 404
import PrivateRoute from "../components/PrivateRoute.tsx";

const Home = React.lazy(() => import("../views/Home.tsx"));
const MonthList = React.lazy(() => import("../views/Months/MonthList.tsx"));
const MonthDetail = React.lazy(() => import("../views/Months/MonthDetail.tsx"));

const Test = React.lazy(() => import("../views/test.tsx"));
const Login = React.lazy(() => import("../views/auth/Login.tsx"));


const AppRoutes = () => (
    <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
            path="/dashboard/"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                </React.Suspense>
            }
        />
        <Route
            path="/dashboard/months"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <PrivateRoute>
                        <MonthList />
                    </PrivateRoute>
                </React.Suspense>
            }
        />
        <Route
            path="/dashboard/month"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <PrivateRoute>
                        <MonthDetail />
                    </PrivateRoute>
                </React.Suspense>
            }
        />

        
        <Route
            path="/test"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Test/>
                </React.Suspense>
            }
        />
        <Route
            path="/login"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Login/>
                </React.Suspense>
            }
        />
    </Routes>
);

export default AppRoutes;