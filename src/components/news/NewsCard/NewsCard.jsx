import React from 'react';
import { FaBookmark, FaRegBookmark, FaClock } from 'react-icons/fa';
import { useBookmarks } from '../../../context/BookmarksContext';
import { FALLBACK_IMAGE } from '../../../utils/constants';
import { truncateText } from '../../../utils/formatters';

const NewsCard = ({ title, description, imgUrl, newsUrl, author, date, source, onReadMore }) => {
    const { addToBookmarks, removeFromBookmarks, isBookmarked } = useBookmarks();
    const isSaved = isBookmarked(newsUrl);

    const handleBookmark = (e) => {
        e.stopPropagation();
        if (isSaved) {
            removeFromBookmarks(newsUrl);
        } else {
            addToBookmarks({ title, description, urlToImage: imgUrl, url: newsUrl, author, publishedAt: date, source });
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
        if (diffInDays < 7) return `${diffInDays}d ago`;
        return published.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    };

    return (
        <div className="news-card" onClick={onReadMore}>
            {/* Image Container */}
            <div className="news-card-image">
                <img
                    src={imgUrl || FALLBACK_IMAGE}
                    alt={title}
                    loading="lazy"
                />
                {/* Source Badge on Image */}
                <span className="news-card-source">{source?.name}</span>

                {/* Bookmark Button */}
                <button
                    onClick={handleBookmark}
                    className={`news-card-bookmark ${isSaved ? 'saved' : ''}`}
                    aria-label={isSaved ? 'Remove bookmark' : 'Add bookmark'}
                >
                    {isSaved ? <FaBookmark size={12} /> : <FaRegBookmark size={12} />}
                </button>
            </div>

            {/* Content */}
            <div className="news-card-content">
                {/* Title */}
                <h3 className="news-card-title">
                    {truncateText(title, 75)}
                </h3>

                {/* Description */}
                <p className="news-card-description">
                    {truncateText(description, 100)}
                </p>

                {/* Footer */}
                <div className="news-card-footer">
                    <div className="news-card-meta">
                        <FaClock size={11} />
                        <span>{getRelativeTime(date)}</span>
                    </div>
                    <span className="news-card-read-more">Read →</span>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
