import React from 'react';
import NewsList from '../components/news/NewsList/NewsList';
import { DEFAULT_COUNTRY, DEFAULT_PAGE_SIZE } from '../utils/constants';

const CategoryPage = ({ category, setProgress, apiKey }) => {
    return (
        <NewsList
            setProgress={setProgress}
            apiKey={apiKey}
            country={DEFAULT_COUNTRY}
            category={category}
            pageSize={DEFAULT_PAGE_SIZE}
        />
    );
};

export default CategoryPage;
