import React, { useState, useCallback } from 'react';
import { FaArrowDown } from 'react-icons/fa';

const PullToRefresh = ({ onRefresh, children }) => {
    const [pulling, setPulling] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const startY = React.useRef(0);
    const isDragging = React.useRef(false);

    const threshold = 80;

    const handleTouchStart = useCallback((e) => {
        // Only enable if we are at the very top of the page
        if (window.scrollY === 0) {
            startY.current = e.touches[0].clientY;
            isDragging.current = true;
            // Don't set pulling state yet to avoid immediate re-renders
        }
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!isDragging.current || refreshing) return;

        const currentY = e.touches[0].clientY;
        const diff = currentY - startY.current;

        // If user scrolls up (diff < 0) or page is scrolled down, stop pulling
        if (diff < 0 || window.scrollY > 0) {
            isDragging.current = false;
            setPulling(false);
            setPullDistance(0);
            return;
        }

        // Apply resistance factor (0.4) and max limit
        // Only start showing visuals after a small threshold (e.g. 10px) to prevent accidental jitters
        if (diff > 10) {
            setPulling(true);
            const distance = Math.max(0, Math.min((diff - 10) * 0.4, 150));
            setPullDistance(distance);

            // Prevent default browser refresh behavior if we are effectively pulling
            if (e.cancelable && distance > 5) {
                e.preventDefault();
            }
        }
    }, [refreshing]);

    const handleTouchEnd = useCallback(async () => {
        isDragging.current = false;
        if (!pulling) return;

        if (pullDistance >= threshold && !refreshing) {
            setRefreshing(true);
            // Snap to refreshing position
            setPullDistance(threshold);
            try {
                await onRefresh();
            } finally {
                setRefreshing(false);
            }
        }

        setPulling(false);
        setPullDistance(0);
    }, [pulling, pullDistance, refreshing, onRefresh]);

    const progress = Math.min(pullDistance / threshold, 1);
    const rotation = progress * 180;

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ position: 'relative' }}
        >
            {/* Pull indicator */}
            <div
                className="pull-to-refresh-indicator"
                style={{
                    height: `${pullDistance}px`,
                    opacity: progress,
                    transition: pulling ? 'none' : 'all 0.3s ease'
                }}
            >
                <div
                    className="pull-indicator-content"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        opacity: refreshing ? 0 : 1
                    }}
                >
                    <FaArrowDown size={20} />
                </div>
                {refreshing && (
                    <div className="pull-refresh-spinner">
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
                <span className="pull-indicator-text">
                    {refreshing ? 'Refreshing...' : pullDistance >= threshold ? 'Release to refresh' : 'Pull to refresh'}
                </span>
            </div>

            {children}
        </div>
    );
};

export default PullToRefresh;
