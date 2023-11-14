import * as React from 'react';

const App = () => {
    const handleModifyComponent = async () => {
        // Send a message to the plugin code to trigger component modification
        parent.postMessage({ pluginMessage: { type: 'modify-component' } }, '*');
    };

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={handleModifyComponent}>Modify Component</button>
            </header>
        </div>
    );
};

export default App;