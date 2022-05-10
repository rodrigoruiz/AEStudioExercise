
import React, { useState } from 'react';
import "./App.css";
import SearchPage from "./Pages/SearchPage";

function App() {
    const [currentProfile, setCurrentProfile] = useState(null);
    
    
    return (
        <div className="App">
            {currentProfile === null ?
                <SearchPage setCurrentProfile={setCurrentProfile}/> :
                <div>{currentProfile}</div>
            }
        </div>
    );
}

export default App;
