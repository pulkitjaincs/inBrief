/**
 * News API Service
 * Handles all API calls related to fetching news articles
 */

const isLocalhost = () => {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

/**
 * Build the API URL based on environment
 */
const buildUrl = (params) => {
    const { country, category, page, pageSize, apiKey } = params;

    if (isLocalhost()) {
        return `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    }
    return `/api/news?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}`;
};

/**
 * Generate cache key for storing news data
 */
export const getCacheKey = (country, category, page) => {
    return `news-${country}-${category}-${page}`;
};

/**
 * Get cached data from session storage
 */
export const getCachedData = (cacheKey) => {
    const cached = sessionStorage.getItem(cacheKey);
    return cached ? JSON.parse(cached) : null;
};

/**
 * Store data in session storage cache
 */
export const setCachedData = (cacheKey, data) => {
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
};

/**
 * Fetch news articles from the API
 * @param {Object} params - Request parameters
 * @param {string} params.country - Country code (e.g., 'us')
 * @param {string} params.category - News category (e.g., 'technology')
 * @param {number} params.page - Page number
 * @param {number} params.pageSize - Articles per page
 * @param {string} params.apiKey - NewsAPI key (only for localhost)
 * @returns {Promise<{articles: Array, totalResults: number}>}
 */
export const fetchNews = async ({ country, category, page, pageSize, apiKey }) => {
    const url = buildUrl({ country, category, page, pageSize, apiKey });

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'ok') {
        throw new Error(data.message || 'Failed to fetch news');
    }

    return {
        articles: data.articles,
        totalResults: data.totalResults
    };
};
