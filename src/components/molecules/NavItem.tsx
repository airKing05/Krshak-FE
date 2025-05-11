import React from "react";
import { Link } from "react-router-dom";
import Icon from "../atoms/Icon";
import Label from "../atoms/Label";
import Image from "../atoms/Image";

interface NavItemProps {
    to: string;
    icon: string;
    label: string;
    isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
    return (
        <Link
            to={to}
            className={`flex flex-col items-center justify-center w-16 py-2 
        ${isActive ? "text-blue-500" : "text-gray-400"} transition-all`}
        >
            <Image src={icon} className="mb-1 w-4 h-4" alt="icon"/>
            <Label text={label} />
        </Link>
    );
};

export default NavItem;
