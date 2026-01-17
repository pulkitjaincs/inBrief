/**
 * Format a date string for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date (e.g., "Jan 17")
 */
export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
    });
};

/**
 * Truncate text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text with ellipsis
 */
export const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

/**
 * Capitalize the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};
