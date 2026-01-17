import React, { useEffect, useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import Spinner from '../../common/Spinner/Spinner';
import NewsModal from '../NewsModal/NewsModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import useNews from '../../../hooks/useNews';
import { capitalizeFirst } from '../../../utils/formatters';

const NewsList = ({ country, category, pageSize, apiKey, setProgress }) => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    const { articles, loading, error, totalArticles, fetchMoreData, hasMore } = useNews({
        country,
        category,
        pageSize,
        apiKey,
        setProgress
    });

    useEffect(() => {
        document.title = `${capitalizeFirst(category)} - inBrief`;
    }, [category]);

    return (
        <div className="container my-3">
            <h1
                className="text-center fw-bold"
                style={{ margin: '35px 0px', marginTop: '90px', color: 'var(--text-primary)' }}
            >
                inBrief - Top {capitalizeFirst(category)} Headlines
            </h1>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Spinner />}
                style={{ overflow: 'visible' }}
            >
                <div className="container">
                    <div className="row g-5">
                        {articles.map((article, index) => (
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
            </InfiniteScroll>

            {selectedArticle && <NewsModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
        </div>
    );
};

export default NewsList;
