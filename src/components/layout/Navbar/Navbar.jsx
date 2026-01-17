import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { FaMoon, FaSun, FaDesktop, FaBookmark } from 'react-icons/fa';
import { CATEGORIES } from '../../../utils/constants';

const Navbar = () => {
    const { theme, setTheme } = useTheme();

    return (
        <nav className="navbar fixed-top navbar-expand-lg glass-effect">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold fs-4" to="/" style={{ color: 'var(--text-primary)' }}>
                    inBrief
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" style={{ filter: theme === 'dark' ? 'invert(1)' : 'none' }}></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {CATEGORIES.map((category) => (
                            <li className="nav-item" key={category.key}>
                                <Link
                                    className="nav-link nav-link-custom text-capitalize fw-medium mx-2"
                                    to={category.path}
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {category.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        <Link
                            to="/saved"
                            className="d-flex align-items-center gap-2 text-decoration-none px-3 py-2 rounded-pill"
                            style={{
                                color: 'var(--text-accent)',
                                backgroundColor: 'rgba(var(--text-accent-rgb), 0.1)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <FaBookmark /> <span className="fw-bold fs-6">Bookmarks</span>
                        </Link>

                        <div className="vr d-none d-lg-block" style={{ height: '30px', color: 'var(--border-color)' }}></div>

                        <button
                            className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                            onClick={() => {
                                if (theme === 'light') setTheme('dark');
                                else if (theme === 'dark') setTheme('system');
                                else setTheme('light');
                            }}
                            title={`Current: ${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode`}
                            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', width: '40px', height: '40px', padding: 0 }}
                        >
                            {theme === 'light' ? <FaSun /> : theme === 'dark' ? <FaMoon /> : <FaDesktop />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
