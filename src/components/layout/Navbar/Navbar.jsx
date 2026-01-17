import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { useBookmarks } from '../../../context/BookmarksContext';
import { FaMoon, FaSun, FaDesktop, FaBookmark, FaNewspaper } from 'react-icons/fa';

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const { bookmarks } = useBookmarks();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    // Add scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => {
        return location.pathname === path;
    };

    const cycleTheme = () => {
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('system');
        else setTheme('light');
    };

    const getThemeIcon = () => {
        if (theme === 'light') return <FaSun size={16} />;
        if (theme === 'dark') return <FaMoon size={16} />;
        return <FaDesktop size={16} />;
    };

    const getThemeLabel = () => {
        if (theme === 'light') return 'Light';
        if (theme === 'dark') return 'Dark';
        return 'Auto';
    };

    return (
        <nav className={`navbar-modern ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon">
                        <FaNewspaper size={20} />
                    </div>
                    <span className="logo-text">inBrief</span>
                </Link>

                {/* Right side actions */}
                <div className="navbar-actions">
                    {/* Bookmarks Button */}
                    <Link
                        to="/saved"
                        className={`action-btn bookmarks-btn ${isActive('/saved') ? 'active' : ''}`}
                        title="Saved Articles"
                    >
                        <FaBookmark size={14} />
                        <span className="action-label">Saved</span>
                        {bookmarks.length > 0 && (
                            <span className="bookmark-count">{bookmarks.length}</span>
                        )}
                    </Link>

                    {/* Theme Toggle */}
                    <button
                        className="action-btn theme-btn"
                        onClick={cycleTheme}
                        title={`Theme: ${getThemeLabel()}`}
                    >
                        {getThemeIcon()}
                        <span className="action-label">{getThemeLabel()}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
