import React, { useState, useCallback } from 'react';
import { FaArrowDown } from 'react-icons/fa';

const PullToRefresh = ({ onRefresh, children }) => {
    const [pulling, setPulling] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const threshold = 80;
    let startY = 0;

    const handleTouchStart = useCallback((e) => {
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
            setPulling(true);
        }
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!pulling || refreshing) return;

        const currentY = e.touches[0].clientY;
        const distance = Math.max(0, Math.min((currentY - startY) * 0.5, 120));

        if (window.scrollY === 0 && distance > 0) {
            setPullDistance(distance);
        }
    }, [pulling, refreshing]);

    const handleTouchEnd = useCallback(async () => {
        if (!pulling) return;

        if (pullDistance >= threshold && !refreshing) {
            setRefreshing(true);
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
