import React from "react";
import BottomNav from "../BottomNav";
import SideBar from "./SideBar";
import { LayoutProps } from "../../interfaces/layoutInterfaces";

const Layout: React.FC<LayoutProps> = ({ children, page }) => {
    return (
        <div className="flex min-h-screen bg-neutral-50">
            {/* Sidebar: oculto en móvil, colapsable en escritorio */}
            <SideBar page={page} />

            {/* Contenido */}
            <div className="w-full p-4"> {/* Agregamos un margen izquierdo cuando el sidebar está presente */}
                {children}
            </div>

            {/* BottomNav: solo en móvil */}
            <BottomNav />
        </div>
    );
}

export default Layout;
