import React, { useEffect, useState, useCallback } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import SkeletonLoader from '../../common/SkeletonLoader/SkeletonLoader';
import NewsModal from '../NewsModal/NewsModal';
import CategoryPills from '../../common/CategoryPills/CategoryPills';
import EmptyState from '../../common/EmptyState/EmptyState';
import PullToRefresh from '../../common/PullToRefresh/PullToRefresh';
import InfiniteScroll from 'react-infinite-scroll-component';
import useNews from '../../../hooks/useNews';
import { capitalizeFirst } from '../../../utils/formatters';

const NewsList = ({ country, category, pageSize, apiKey, setProgress }) => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    const {
        articles,
        loading,
        error,
        fetchMoreData,
        hasMore,
        refresh
    } = useNews({
        country,
        category,
        pageSize,
        apiKey,
        setProgress
    });

    useEffect(() => {
        document.title = `${capitalizeFirst(category)} - inBrief`;
    }, [category]);

    const handleRefresh = useCallback(async () => {
        await refresh();
    }, [refresh]);

    // Determine the type of empty state
    const getEmptyStateType = () => {
        if (error) {
            if (error.includes('internet') || error.includes('network')) {
                return 'offline';
            }
            return 'error';
        }
        return 'noResults';
    };

    return (
        <div className="container my-3">
            <h1 className="page-title">
                inBrief - Top <span className="page-title-accent">{capitalizeFirst(category)}</span> Headlines
            </h1>

            {/* Category Pills */}
            <CategoryPills />

            {/* Error State */}
            {error && !loading && articles.length === 0 && (
                <EmptyState
                    type={getEmptyStateType()}
                    message={error}
                    onRetry={handleRefresh}
                />
            )}

            {/* Loading State - Skeleton */}
            {loading && articles.length === 0 && (
                <SkeletonLoader count={6} />
            )}

            {/* No Results State */}
            {!loading && !error && articles.length === 0 && (
                <EmptyState
                    type="noResults"
                    message={`No ${category} news available right now. Check back later!`}
                    onRetry={handleRefresh}
                />
            )}

            {/* News Grid with Pull to Refresh (mobile) */}
            {articles.length > 0 && (
                <PullToRefresh onRefresh={handleRefresh}>
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<SkeletonLoader count={3} />}
                        style={{ overflow: 'visible' }}
                    >
                        <div className="news-grid">
                            {articles.map((article, index) => (
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
                    </InfiniteScroll>
                </PullToRefresh>
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

export default NewsList;
