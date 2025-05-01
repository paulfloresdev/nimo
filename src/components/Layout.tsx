import React from "react";

import { Outlet } from 'react-router-dom';
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import { Input } from "@heroui/react";

const Layout: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-neutral-50">
            {/* Sidebar: oculto en móvil, colapsable en escritorio */}
            <Sidebar page={0}/>
    
            {/* Área de contenido principal */}
            <div className="flex flex-col flex-1">
                <main className="flex-grow p-4">
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input label="Email" type="email" />
                    <Input label="Email" placeholder="Enter your email" type="email" />
                </div>
                </main>
                {/* BottomNav: solo en móvil */}
                <BottomNav />
            </div>
        </div>
    );
}

export default Layout;