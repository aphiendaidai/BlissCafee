import React, { useEffect } from 'react';

function LikeButton() {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    } else {
      window.fbAsyncInit = function () {
        window.FB.init({
          xfbml: true,
          version: 'v19.0',
        });
      };

      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/vi_VN/sdk.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="fb-like"
      data-href="https://www.facebook.com/cafeblissdanang"
      data-width=""
      data-layout="button"
      data-action="like"
      data-size="small"
      data-share="false"
    ></div>
  );
}

export default LikeButton;
