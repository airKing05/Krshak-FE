import React, { useState, useEffect } from "react";
import NavItem from "../molecules/NavItem";
import { useLocation } from "react-router-dom";
import CategoryIcon from '../../assets/icons/categoryStack.svg';
import ProductIcon from '../../assets/icons/product.svg';
import ComparisonIcon from '../../assets/icons/comparison.svg';
import BackIcon from '../../assets/icons/LeftCircleArrow.svg';
import Logo from '../../assets/icons/LOGO.svg';

const FooterNavigation: React.FC = () => {
    const location = useLocation();
    const [visible, setVisible] = useState(true);
    let lastScrollY = window.scrollY;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setVisible(false); // Hide when scrolling up
            } else {
                setVisible(true); // Show when scrolling down
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { to: "/", icon: location.pathname === '/' ? Logo : BackIcon, label: "Home" },
        { to: "/categories/all", icon: CategoryIcon, label: "Category" },
        { to: "/products/Product%20A1", icon: ProductIcon, label: "Product" },
        { to: "/comparison", icon: ComparisonIcon, label: "Compare" },
    ];

    return (
        <div
            className={`fixed bottom-0 left-0 w-full bg-white shadow-md p-2 flex justify-around transition-transform duration-300 
      ${visible ? "translate-y-0" : "translate-y-full"}`}
        >
            {navItems.map((item) => (
                <NavItem
                    key={item.to}
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                    isActive={location.pathname === item.to}
                />
            ))}
        </div>
    );
};

export default FooterNavigation;
