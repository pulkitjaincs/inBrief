import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { FaSyncAlt, FaTimes } from 'react-icons/fa';

const ReloadPrompt = () => {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(swUrl, r) {
            console.log(`Service Worker at: ${swUrl}`);
        },
        onRegisterError(error) {
            console.log('SW registration error', error);
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    return (
        <div className="reload-prompt-container">
            {(offlineReady || needRefresh) && (
                <div className="reload-prompt-toast">
                    <div className="reload-prompt-message">
                        {offlineReady ? (
                            <span>App ready to work offline</span>
                        ) : (
                            <span>New content available, click on reload button to update.</span>
                        )}
                    </div>
                    {needRefresh && (
                        <button className="reload-btn" onClick={() => updateServiceWorker(true)}>
                            <FaSyncAlt /> Reload
                        </button>
                    )}
                    <button className="close-btn" onClick={close}>
                        <FaTimes />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReloadPrompt;
