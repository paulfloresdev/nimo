import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { Link } from 'react-router-dom';
import DynamicFaIcon from './DynamicFaIcon';

interface SidebarProps {
    page: number;
}

const Sidebar: React.FC<SidebarProps> = ({ page }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
        className={`
            flex flex-col bg-neutral-100 border-r
            transition-all duration-300 ease-in-out
            ${collapsed ? 'w-16' : 'w-64'}
            hidden md:flex py-6
        `}
        >
        <div>
            {/* Puedes añadir el botón de colapsar aquí más adelante */}
        </div>
        <nav className="flex-1 px-3">
            <ul className="space-y-2">
            <li>
                <Button
                variant="light"
                className="w-full flex items-center justify-start"
                as={Link}
                to="/"
                >
                <DynamicFaIcon name="FaHome" />
                <span className={`ml-2 text-gray-700`}>Inicio</span>
                </Button>
            </li>
            </ul>
        </nav>
        </aside>
    );
};

export default Sidebar;
