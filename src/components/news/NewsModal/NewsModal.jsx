import React, { useEffect } from 'react';
import { FaTimes, FaExternalLinkAlt, FaShareAlt, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useBookmarks } from '../../../context/BookmarksContext';
import { FALLBACK_IMAGE } from '../../../utils/constants';
import { formatDate } from '../../../utils/formatters';

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

    // Prevent scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(5px)',
                zIndex: 1050,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={onClose}
        >
            <div
                className="modal-content"
                style={{
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    maxWidth: '800px',
                    width: '100%',
                    maxHeight: '90vh',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: 'var(--shadow-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'scaleUp 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Image */}
                <div
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: 'auto',
                        minHeight: '300px',
                        maxHeight: '50vh',
                        flexShrink: 0,
                        backgroundColor: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}
                >
                    <img
                        src={article.urlToImage || FALLBACK_IMAGE}
                        alt={article.title}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: '50vh' }}
                    />
                    <button
                        onClick={onClose}
                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center shadow"
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            width: '40px',
                            height: '40px',
                            border: 'none',
                            zIndex: 10
                        }}
                    >
                        <FaTimes size={18} />
                    </button>
                    <button
                        onClick={handleBookmark}
                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center shadow"
                        style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            width: '40px',
                            height: '40px',
                            border: 'none',
                            zIndex: 10,
                            color: isSaved ? '#dc3545' : '#6c757d'
                        }}
                    >
                        {isSaved ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
                    </button>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '20px',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                            color: 'white'
                        }}
                    >
                        <span className="badge bg-danger mb-2">{article.source?.name}</span>
                        <h4 style={{ fontWeight: '700', textShadow: '0 2px 4px rgba(0,0,0,0.5)', color: '#ffffff' }}>
                            {article.title}
                        </h4>
                    </div>
                </div>

                {/* Content Body */}
                <div style={{ padding: '40px', overflowY: 'auto' }}>
                    <div
                        className="d-flex align-items-center mb-4 small text-uppercase fw-bold"
                        style={{ letterSpacing: '1px', color: 'var(--text-secondary)' }}
                    >
                        <span style={{ color: 'var(--text-accent)' }}>{article.source?.name}</span>
                        <span className="mx-2">•</span>
                        <span>
                            {new Date(article.publishedAt).toLocaleDateString(undefined, {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>

                    <p
                        style={{
                            fontSize: '1.25rem',
                            lineHeight: '1.6',
                            color: 'var(--text-primary)',
                            fontWeight: '300',
                            marginBottom: '2rem'
                        }}
                    >
                        {article.description}
                    </p>

                    <hr style={{ borderColor: 'var(--border-color)', margin: '2rem 0' }} />

                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                        {article.content
                            ? article.content.split('[')[0]
                            : 'Full content is available at the source website. Please click the button below to read the complete article.'}
                    </p>
                    {article.author && (
                        <div className="mt-4 pt-3 fst-italic small" style={{ color: 'var(--text-secondary)' }}>
                            Reported by {article.author}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div
                    style={{
                        padding: '20px 30px',
                        borderTop: '1px solid var(--border-color)',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        backgroundColor: 'var(--bg-body)'
                    }}
                >
                    <button
                        className="btn btn-outline-secondary me-2"
                        onClick={onClose}
                        style={{ borderRadius: '8px' }}
                    >
                        Close
                    </button>
                    <button
                        className="btn btn-outline-primary d-flex align-items-center gap-2 me-2"
                        onClick={handleShare}
                        style={{ borderRadius: '8px', borderColor: 'var(--text-accent)', color: 'var(--text-accent)' }}
                    >
                        <FaShareAlt size={14} /> Share
                    </button>
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary d-flex align-items-center gap-2"
                        style={{
                            borderRadius: '8px',
                            backgroundColor: 'var(--text-accent)',
                            border: 'none'
                        }}
                    >
                        Read Full Article <FaExternalLinkAlt size={14} />
                    </a>
                </div>
            </div>

            {/* Inline Animation Styles */}
            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleUp {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}
            </style>
        </div>
    );
};

export default NewsModal;
