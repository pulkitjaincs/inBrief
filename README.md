# 📰 inBrief (prior NewsMonkey)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.0-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![NewsAPI](https://img.shields.io/badge/API-NewsAPI-FF6B6B?style=for-the-badge)](https://newsapi.org/)

> A modern, responsive news aggregation application built with React and Vite. Features infinite scroll, real-time loading indicators, and category-based news browsing.

## 🌐 Live Demo

**[🚀 View Live Application](https://in-brief-three.vercel.app/)**


## ✨ Key Features

- **📱 Responsive Design**: Fully responsive 3-column grid layout that works seamlessly across all devices
- **🔄 Infinite Scroll**: Smooth infinite scrolling for seamless news browsing
- **⚡ Smart Caching**: Session-based caching to minimize API calls and ensure instant navigation
- **🔖 Bookmarks**: Elegant ribbon-style bookmark buttons with "Read Later" functionality
- **🔗 Social Sharing**: Native sharing integration to easily share articles via WhatsApp, Twitter, etc.
- **🌗 Dark Mode**: Premium dark mode support with system preference detection and auto mode
- **📂 Category Pills**: Modern pill-based category navigation with smooth transitions
- **🌍 Multi-country Support**: Currently configured for US news with easy country switching
- **🎨 Modern Premium UI**: Glassmorphism navbar, skeleton loaders, stagger animations, and polished typography
- **📊 Progress Tracking**: Visual progress indicators and loading skeletons
- **🖼️ Custom Branding**: Custom favicon and app icons matching the inBrief brand

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Build Tool** | Vite 5.4 |
| **Frontend Framework** | React 18.2.0 |
| **Routing** | React Router DOM 6.22.3 |
| **Styling** | Bootstrap 5.0 + Custom CSS |
| **API** | NewsAPI.org |
| **Infinite Scroll** | react-infinite-scroll-component |
| **Loading UI** | react-top-loading-bar |
| **Deployment** | Vercel |

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- NewsAPI key ([Get free API key](https://newsapi.org/))

### Installation

```bash
# Clone the repository
git clone https://github.com/pulkitjaincs/inBrief.git
cd inBrief

# Install dependencies
npm install

# Create environment file
echo "VITE_NEWS_API=your_api_key_here" > .env

# Start development server
npm run start
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Runs the app in development mode |
| `npm run build` | Builds the app for production |
| `npm run preview` | Previews the production build |

## 📁 Project Structure

```
inBrief/
├── api/
│   └── news.js                 # Serverless API function (Vercel)
├── public/
│   └── manifest.json
├── src/
│   ├── assets/                 # Static assets (images, icons)
│   ├── components/
│   │   ├── common/             # Reusable UI components
│   │   │   ├── CategoryPills/  # Category navigation pills
│   │   │   ├── EmptyState/     # Empty & error state displays
│   │   │   ├── SkeletonCard/   # Loading skeleton placeholders
│   │   │   └── Spinner/
│   │   ├── layout/             # Layout components
│   │   │   └── Navbar/         # Modern glassmorphism navbar
│   │   └── news/               # News feature components
│   │       ├── NewsCard/       # Redesigned card with ribbon bookmark
│   │       ├── NewsList/
│   │       ├── NewsModal/      # Modern slide-up article modal
│   │       └── SavedNews/
│   ├── context/
│   │   ├── BookmarksContext.jsx  # Bookmark state management
│   │   └── ThemeContext.jsx      # Theme toggle logic
│   ├── hooks/
│   │   └── useNews.js          # Custom hook for news fetching
│   ├── pages/
│   │   ├── HomePage.jsx        # Home route component
│   │   ├── CategoryPage.jsx    # Category route component
│   │   └── SavedPage.jsx       # Bookmarks page
│   ├── services/
│   │   └── newsApi.js          # API service layer
│   ├── styles/
│   │   ├── global.css          # Global styles & design system
│   │   └── app.css             # App-specific styles
│   ├── utils/
│   │   ├── constants.js        # App configuration & constants
│   │   └── formatters.js       # Utility functions
│   ├── App.jsx                 # Main app with routing
│   └── index.jsx               # Entry point
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── vercel.json                 # Vercel deployment config
└── package.json
```

## 🏗️ Architecture

The project follows a clean, scalable architecture:

- **`components/`** - Organized by type: `common` (reusable), `layout` (structural), `news` (feature-specific)
- **`hooks/`** - Custom React hooks for data fetching and state logic
- **`services/`** - API layer with caching utilities
- **`pages/`** - Route-level page components
- **`utils/`** - Helper functions and configuration constants
- **`context/`** - React Context providers for global state

## 🚀 Deployment

### Vercel Deployment (Recommended)
The easiest way to deploy is using Vercel:

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click "Add New Project".
3. Import your repository. Vercel will automatically detect Vite.
4. Add environment variable: `VITE_NEWS_API=your_api_key`
5. Click **Deploy**.

*Note: A `vercel.json` file is included to handle client-side routing. The `/api/news.js` serverless function proxies NewsAPI requests in production.*

## 📈 Performance Optimizations

| Optimization | Implementation |
|-------------|----------------|
| **Lazy Loading** | Images load with `loading="lazy"` attribute |
| **Smart Caching** | Session storage caching in `useNews` hook |
| **Custom Hooks** | Separated data logic for minimal re-renders |
| **API Service Layer** | Centralized API calls with caching utilities |
| **Code Splitting** | Route-based splitting with React Router |
| **Dynamic Routes** | Categories generated from config, not hardcoded |

## 🔮 Roadmap

- [ ] 🔍 Search functionality
- [x] 🌙 Dark mode toggle with auto/system detection
- [x] 📌 Ribbon-style bookmark buttons
- [x] ⚡ Smart Caching
- [x] 🔗 Social Sharing
- [x] 🏗️ Scalable project structure
- [x] 💀 Skeleton loading states
- [ ] 📱 Offline support with PWA (Service Workers)
- [ ] 🌍 Multi-language support
- [ ] 📊 Analytics dashboard

## 🤝 Contributing

We welcome contributions! 

### Quick Start for Contributors
```bash
# Fork and clone the repository
git clone https://github.com/pulkitjaincs/inBrief.git
cd inBrief

# Create a new branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git commit -m "Add: your feature description"

# Push and create a Pull Request
git push origin feature/your-feature-name
```


## 👨‍💻 Author

**Pulkit Jain**
- 🌐 GitHub: [@pulkitjaincs](https://github.com/pulkitjaincs)
- 💼 LinkedIn: [@pulkitjaincs](https://linkedin.com/in/pulkitjaincs)
- 📧 Email: pulkitjain.cse@gmail.com

---

<div align="center">

⭐ **Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/pulkitjaincs/inBrief?style=social)](https://github.com/pulkitjaincs/inBrief/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/pulkitjaincs/inBrief?style=social)](https://github.com/pulkitjaincs/inBrief/network/members)

*Built with ❤️ using React + Vite*

</div>
