import React from 'react';
import NewsList from '../components/news/NewsList/NewsList';
import { DEFAULT_COUNTRY, DEFAULT_PAGE_SIZE } from '../utils/constants';

const HomePage = ({ setProgress, apiKey }) => {
    return (
        <NewsList
            setProgress={setProgress}
            apiKey={apiKey}
            country={DEFAULT_COUNTRY}
            category="general"
            pageSize={DEFAULT_PAGE_SIZE}
        />
    );
};

export default HomePage;
