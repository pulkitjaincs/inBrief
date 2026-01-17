import React from 'react';

const SkeletonCard = () => {
    return (
        <div
            className="card h-100 border-0 shadow-sm skeleton-card"
            style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: '16px',
                overflow: 'hidden'
            }}
        >
            {/* Image Skeleton */}
            <div
                className="skeleton-shimmer"
                style={{
                    paddingTop: '56.25%',
                    backgroundColor: 'var(--skeleton-base)'
                }}
            />

            <div className="card-body p-4 d-flex flex-column">
                {/* Meta Header Skeleton */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div
                        className="skeleton-shimmer"
                        style={{
                            width: '80px',
                            height: '20px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--skeleton-base)'
                        }}
                    />
                    <div
                        className="skeleton-shimmer"
                        style={{
                            width: '50px',
                            height: '16px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--skeleton-base)'
                        }}
                    />
                </div>

                {/* Title Skeleton */}
                <div
                    className="skeleton-shimmer mb-2"
                    style={{
                        width: '100%',
                        height: '24px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--skeleton-base)'
                    }}
                />
                <div
                    className="skeleton-shimmer mb-3"
                    style={{
                        width: '75%',
                        height: '24px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--skeleton-base)'
                    }}
                />

                {/* Description Skeleton */}
                <div
                    className="skeleton-shimmer mb-2"
                    style={{
                        width: '100%',
                        height: '16px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--skeleton-base)'
                    }}
                />
                <div
                    className="skeleton-shimmer mb-2"
                    style={{
                        width: '90%',
                        height: '16px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--skeleton-base)'
                    }}
                />
                <div
                    className="skeleton-shimmer mb-4"
                    style={{
                        width: '60%',
                        height: '16px',
                        borderRadius: '4px',
                        backgroundColor: 'var(--skeleton-base)'
                    }}
                />

                {/* Footer Skeleton */}
                <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top" style={{ borderColor: 'var(--border-color)' }}>
                    <div
                        className="skeleton-shimmer"
                        style={{
                            width: '100px',
                            height: '14px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--skeleton-base)'
                        }}
                    />
                    <div
                        className="skeleton-shimmer"
                        style={{
                            width: '80px',
                            height: '14px',
                            borderRadius: '4px',
                            backgroundColor: 'var(--skeleton-base)'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

const SkeletonLoader = ({ count = 6 }) => {
    return (
        <div className="row g-4">
            {Array.from({ length: count }).map((_, index) => (
                <div className="col-12 col-sm-6 col-lg-4" key={index}>
                    <SkeletonCard />
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
