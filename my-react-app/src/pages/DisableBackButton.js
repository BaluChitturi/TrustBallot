import React, { useEffect } from 'react';

const DisableBackButton = () => {
  useEffect(() => {
    const disableBackButton = (event) => {
      event.preventDefault();
      return false;
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', disableBackButton);

    return () => {
      window.removeEventListener('popstate', disableBackButton);
    };
  }, []);

  return (
    <div>
      {/* Your component content goes here */}
    </div>
  );
};
export default DisableBackButton;