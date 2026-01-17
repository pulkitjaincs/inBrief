import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../../../utils/constants';

const CategoryPills = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => {
        if (path === '/' && (currentPath === '/' || currentPath === '/inBrief')) {
            return true;
        }
        return currentPath === path;
    };

    return (
        <div className="category-pills-wrapper">
            <div className="category-pills-container">
                {CATEGORIES.map((category) => (
                    <Link
                        key={category.key}
                        to={category.path}
                        className={`category-pill ${isActive(category.path) ? 'active' : ''}`}
                    >
                        {category.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryPills;
