import React from "react";
import BottomNav from "./BottomNav";
import SideBar from "./SideBar";
import { LayoutProps } from "../../interfaces/layoutInterfaces";
import DynamicFaIcon from "../DynamicFaIcon";

const Layout: React.FC<LayoutProps> = ({ children, page }) => {
    return (
        <div className="flex min-h-screen bg-neutral-50">
            {/* Sidebar: oculto en móvil, colapsable en escritorio */}
            <SideBar page={page} />

            {/* Contenido */}
            <div className="w-full p-8 max-h-screen"> {/* Agregamos un margen izquierdo cuando el sidebar está presente */}
                <div className="h-full">
                    <div className="w-full flex flex-row justify-between mb-8 md:hidden">
                        <img src="/assets/favicon.png" alt="Logo" className="w-16" />
                        <DynamicFaIcon name="FaBars" className="text-neutral-950"/>
                        
                    </div>
                    <div className="w-full h-full">
                        {children}
                    </div>
                    
                </div>
                
                
                
            </div>

            {/* BottomNav: solo en móvil */}
            <BottomNav page={page}/>
        </div>
    );
}

export default Layout;
