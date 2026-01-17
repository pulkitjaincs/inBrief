import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

// Layout
import Navbar from './components/layout/Navbar/Navbar';

// Pages
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SavedPage from './pages/SavedPage';

// Context
import { ThemeProvider } from './context/ThemeContext';
import { BookmarksProvider } from './context/BookmarksContext';

// Config
import { CATEGORIES } from './utils/constants';

// Styles
import './styles/global.css';
import './styles/app.css';

const App = () => {
  const apiKey = import.meta.env.VITE_NEWS_API;
  const [progress, setProgress] = useState(0);

  return (
    <ThemeProvider>
      <BookmarksProvider>
        <div>
          <Router>
            <LoadingBar color="#f11946" progress={progress} />
            <Navbar />
            <Routes>
              {/* Home route */}
              <Route
                path="/"
                element={<HomePage setProgress={setProgress} apiKey={apiKey} />}
              />
              <Route
                path="/inBrief"
                element={<HomePage setProgress={setProgress} apiKey={apiKey} />}
              />

              {/* Dynamic category routes */}
              {
                CATEGORIES.filter(cat => cat.key !== 'general').map((category) => (
                  <Route
                    key={category.key}
                    path={category.path}
                    element={
                      <CategoryPage
                        category={category.key}
                        setProgress={setProgress}
                        apiKey={apiKey}
                      />
                    }
                  />
                ))
              }

              {/* Saved/Bookmarks route */}
              <Route path="/saved" element={<SavedPage />} />
            </Routes >
          </Router >
        </div >
      </BookmarksProvider >
    </ThemeProvider >
  );
};

export default App;
