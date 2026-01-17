import { useState, useEffect, useCallback } from 'react';
import { fetchNews, getCacheKey, getCachedData, setCachedData } from '../services/newsApi';

/**
 * Custom hook for fetching and managing news articles
 * Handles pagination, caching, loading states, and errors
 */
const useNews = ({ country, category, pageSize, apiKey, setProgress }) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalArticles, setTotalArticles] = useState(0);
    const [error, setError] = useState(null);

    // Initial fetch
    const loadNews = useCallback(async (forceRefresh = false) => {
        setProgress?.(15);
        const cacheKey = getCacheKey(country, category, 1);

        // Check cache unless force refresh
        if (!forceRefresh) {
            const cachedData = getCachedData(cacheKey);
            if (cachedData) {
                setArticles(cachedData.articles);
                setTotalArticles(cachedData.totalResults);
                setLoading(false);
                setProgress?.(100);
                return;
            }
        }

        setLoading(true);
        setError(null);

        try {
            setProgress?.(30);
            const data = await fetchNews({ country, category, page: 1, pageSize, apiKey });
            setProgress?.(65);

            setArticles(data.articles);
            setTotalArticles(data.totalResults);
            setCachedData(cacheKey, data);
        } catch (err) {
            console.error('Fetch Error:', err);
            setError(err.message || 'Failed to fetch news. Please check your internet connection.');
        } finally {
            setLoading(false);
            setProgress?.(100);
        }
    }, [country, category, pageSize, apiKey, setProgress]);

    // Refresh function (clears cache and refetches)
    const refresh = useCallback(async () => {
        // Clear cache for this category
        for (let i = 1; i <= page; i++) {
            const cacheKey = getCacheKey(country, category, i);
            sessionStorage.removeItem(cacheKey);
        }
        setPage(1);
        setArticles([]);
        await loadNews(true);
    }, [country, category, page, loadNews]);

    // Fetch more data for infinite scroll
    const fetchMoreData = useCallback(async () => {
        const nextPage = page + 1;
        const cacheKey = getCacheKey(country, category, nextPage);
        const cachedData = getCachedData(cacheKey);

        if (cachedData) {
            setArticles(prev => [...prev, ...cachedData.articles]);
            setTotalArticles(cachedData.totalResults);
            setPage(nextPage);
            return;
        }

        try {
            const data = await fetchNews({ country, category, page: nextPage, pageSize, apiKey });
            setArticles(prev => [...prev, ...data.articles]);
            setTotalArticles(data.totalResults);
            setCachedData(cacheKey, data);
            setPage(nextPage);
        } catch (err) {
            console.error('Fetch More Error:', err);
        }
    }, [page, country, category, pageSize, apiKey]);

    // Load on mount or when category changes
    useEffect(() => {
        setPage(1);
        setArticles([]);
        setError(null);
        loadNews();
    }, [loadNews]);

    return {
        articles,
        loading,
        error,
        totalArticles,
        fetchMoreData,
        hasMore: articles.length < totalArticles,
        refresh
    };
};

export default useNews;
