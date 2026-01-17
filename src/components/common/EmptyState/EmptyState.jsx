import React from 'react';
import { FaBookmark, FaNewspaper, FaExclamationTriangle, FaWifi } from 'react-icons/fa';

const EmptyState = ({ type = 'empty', message, onRetry }) => {
    const configs = {
        empty: {
            icon: FaBookmark,
            title: 'No Bookmarks Yet',
            description: message || 'Start saving articles by clicking the bookmark icon on any news card.',
            color: 'var(--text-accent)',
            showRetry: false
        },
        noResults: {
            icon: FaNewspaper,
            title: 'No Articles Found',
            description: message || 'We couldn\'t find any articles in this category right now.',
            color: 'var(--text-secondary)',
            showRetry: true
        },
        error: {
            icon: FaExclamationTriangle,
            title: 'Something Went Wrong',
            description: message || 'We couldn\'t load the news. Please check your connection and try again.',
            color: '#dc3545',
            showRetry: true
        },
        offline: {
            icon: FaWifi,
            title: 'You\'re Offline',
            description: message || 'Please check your internet connection and try again.',
            color: '#ffc107',
            showRetry: true
        }
    };

    const config = configs[type] || configs.empty;
    const IconComponent = config.icon;

    return (
        <div className="empty-state-container">
            <div className="empty-state-content">
                <div
                    className="empty-state-icon"
                    style={{ color: config.color }}
                >
                    <IconComponent size={64} />
                </div>
                <h3 className="empty-state-title">{config.title}</h3>
                <p className="empty-state-description">{config.description}</p>
                {config.showRetry && onRetry && (
                    <button
                        className="empty-state-retry-btn"
                        onClick={onRetry}
                    >
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmptyState;
