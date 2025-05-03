import { Button } from "@heroui/react";
import React from "react";
import { Link } from "react-router-dom";
import DynamicFaIcon from "../DynamicFaIcon";
import { SideBarOptionProps } from "../../interfaces/layoutInterfaces";

const SideBarOption: React.FC<SideBarOptionProps> = ({page, index, label, icon, href}) => {
    return (
        <li>
            <Button
                variant="light"
                className={`w-full flex items-center justify-start `}
                as={Link}
                to={href}
            >
                <DynamicFaIcon name={icon} className={`${page === index ? 'text-slate-950' : ''}`}/>
                <span className={`ml-2 text-gray-700 ${page === index ? 'text-slate-950 font-semibold' : ''}`}>{label}</span>
            </Button>
        </li>
    );
}

export default SideBarOption;