import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div class='loading-wrap loading-wrap--js'>
      <div class='loading-spinner loading-spinner--js'></div>
      <p id='loadingMessage'></p>
    </div>
  );
};

export default Loading;
