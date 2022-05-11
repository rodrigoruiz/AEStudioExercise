
import React, { useState } from 'react';
import "./App.css";
import ProfilePage from './Components/ProfilePage';
import SearchPage from "./Components/SearchPage";

function App() {
    const [currentProfile, setCurrentProfile] = useState(null);
    
    return (
        <div className="App">
            <h1
                onClick={() => setCurrentProfile(null)}
                style={{ color: "#24A0ED", marginBottom: "40px"}}
            >Github profiler</h1>
            
            {currentProfile === null ?
                <SearchPage setCurrentProfile={setCurrentProfile}/> :
                <ProfilePage profileName={currentProfile}/>
            }
        </div>
    );
}

export default App;
