import React, { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import NewsModal from '../NewsModal/NewsModal';
import EmptyState from '../../common/EmptyState/EmptyState';
import { useBookmarks } from '../../../context/BookmarksContext';

const SavedNews = () => {
    const { bookmarks } = useBookmarks();
    const [selectedArticle, setSelectedArticle] = useState(null);

    return (
        <div className="container my-3">
            <h1 className="page-title">
                Your <span className="page-title-accent">Bookmarks</span>
            </h1>

            {bookmarks.length === 0 ? (
                <EmptyState
                    type="empty"
                    message="Start saving articles by clicking the bookmark icon on any news card. Your saved articles will appear here."
                />
            ) : (
                <div className="news-grid">
                    {bookmarks.map((article, index) => (
                        <div className="news-card-animate" key={article.url + '-' + index}>
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
            )}

            {selectedArticle && (
                <NewsModal
                    article={selectedArticle}
                    onClose={() => setSelectedArticle(null)}
                />
            )}
        </div>
    );
};

export default SavedNews;
