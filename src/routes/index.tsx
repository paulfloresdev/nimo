import React from "react";
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound'; // Componente 404

const Home = React.lazy(() => import("../views/Home.tsx"));
const Months = React.lazy(() => import("../views/Months/Months.tsx"));


const AppRoutes = () => (
    <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
            path="/dashboard/"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Home></Home>
                </React.Suspense>
            }
        />
        <Route
            path="/dashboard/months"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Months/>
                </React.Suspense>
            }
        />
    </Routes>
);

export default AppRoutes;