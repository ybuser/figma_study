import React from 'react';

function App() {
  const requestToPlugin = (payload: string) => {
    parent.postMessage({ pluginMessage: payload }, '*');
  };

  const 바꿔함수 = () => {
    requestToPlugin('바꿔');
  };

  const 바꾸지마함수 = () => {
    requestToPlugin('바꾸지마');
  };

  return (
    <div>
      <h1>간단한 플러그인</h1>
      <button type="button" onClick={바꿔함수}>
        바꿔
      </button>
      <button type="button" onClick={바꾸지마함수}>
        바꾸지마
      </button>
    </div>
  );
}

export default App;