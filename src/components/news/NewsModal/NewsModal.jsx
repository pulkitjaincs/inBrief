import React, { useEffect } from 'react';
import { FaTimes, FaExternalLinkAlt, FaShareAlt, FaBookmark, FaRegBookmark, FaClock, FaUser } from 'react-icons/fa';
import { useBookmarks } from '../../../context/BookmarksContext';
import { FALLBACK_IMAGE } from '../../../utils/constants';

const NewsModal = ({ article, onClose }) => {
    const { addToBookmarks, removeFromBookmarks, isBookmarked } = useBookmarks();
    const isSaved = isBookmarked(article.url);

    const handleBookmark = () => {
        if (isSaved) {
            removeFromBookmarks(article.url);
        } else {
            addToBookmarks(article);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.description,
                    url: article.url,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(article.url);
            alert('Link copied to clipboard!');
        }
    };

    // Format relative time
    const getRelativeTime = (dateString) => {
        const now = new Date();
        const published = new Date(dateString);
        const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 48) return 'Yesterday';
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} days ago`;
        return published.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Prevent scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                {/* Close Button - Top Right */}
                <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                    <FaTimes size={16} />
                </button>

                {/* Header Image */}
                <div className="modal-image-container">
                    <img
                        src={article.urlToImage || FALLBACK_IMAGE}
                        alt={article.title}
                        className="modal-image"
                    />
                    {/* Gradient Overlay */}
                    <div className="modal-image-overlay" />

                    {/* Source Badge */}
                    <span className="modal-source-badge">{article.source?.name}</span>
                </div>

                {/* Content */}
                <div className="modal-content-body">
                    {/* Title */}
                    <h2 className="modal-title">{article.title}</h2>

                    {/* Meta Info */}
                    <div className="modal-meta">
                        <div className="modal-meta-item">
                            <FaClock size={12} />
                            <span>{getRelativeTime(article.publishedAt)}</span>
                        </div>
                        {article.author && (
                            <div className="modal-meta-item">
                                <FaUser size={12} />
                                <span>{article.author}</span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <p className="modal-description">{article.description}</p>

                    {/* Content Preview */}
                    {article.content && (
                        <p className="modal-content-preview">
                            {article.content.split('[')[0]}
                        </p>
                    )}

                    {/* Action Buttons */}
                    <div className="modal-actions">
                        <button
                            className={`modal-action-btn bookmark-btn ${isSaved ? 'saved' : ''}`}
                            onClick={handleBookmark}
                        >
                            {isSaved ? <FaBookmark size={14} /> : <FaRegBookmark size={14} />}
                            <span>{isSaved ? 'Saved' : 'Save'}</span>
                        </button>

                        <button className="modal-action-btn share-btn" onClick={handleShare}>
                            <FaShareAlt size={14} />
                            <span>Share</span>
                        </button>

                        <a
                            href={article.url}
                            target="_blank"
                            rel="noreferrer"
                            className="modal-action-btn primary-btn"
                        >
                            <span>Read Full Article</span>
                            <FaExternalLinkAlt size={12} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsModal;
