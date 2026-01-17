import React, { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import NewsModal from '../NewsModal/NewsModal';
import { useBookmarks } from '../../../context/BookmarksContext';

const SavedNews = () => {
    const { bookmarks } = useBookmarks();
    const [selectedArticle, setSelectedArticle] = useState(null);

    return (
        <div className="container my-3">
            <h1
                className="text-center fw-bold"
                style={{ margin: '35px 0px', marginTop: '90px', color: 'var(--text-primary)' }}
            >
                Your <span style={{ color: 'var(--text-accent)' }}>Bookmarks</span>
            </h1>

            {bookmarks.length === 0 ? (
                <div className="text-center mt-5">
                    <p className="lead" style={{ color: 'var(--text-secondary)' }}>
                        You haven't saved any articles yet.
                    </p>
                </div>
            ) : (
                <div className="container">
                    <div className="row g-5">
                        {bookmarks.map((article, index) => (
                            <div className="col-md-4" key={article.url + '-' + index}>
                                <NewsCard
                                    title={article.title}
                                    description={article.description}
                                    imgUrl={article.urlToImage}
                                    newsUrl={article.url}
                                    author={article.author}
                                    date={article.publishedAt}
                                    source={article.source}
                                    onReadMore={() => setSelectedArticle(article)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedArticle && <NewsModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
        </div>
    );
};

export default SavedNews;
