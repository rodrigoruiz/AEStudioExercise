
import React, { useState } from 'react';




function SearchPage({ setCurrentProfile }) {
    const [text, setText] = useState("");
    
    return (
        <div>
            <h1>Github profiler</h1>
            
            <p className="centered">
                github.com/
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                
                <button onClick={() => setCurrentProfile(text)}>search</button>
            </p>
        </div>
    );
}

export default SearchPage;
