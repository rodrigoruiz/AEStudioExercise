
import React, { useState } from 'react';


function SearchPage({ setCurrentProfile }) {
    const [text, setText] = useState("");
    
    const search = () => setCurrentProfile(text);
    
    return (
        <div>
            <div className="centered">
                <div className="input-group mb-3">
                    <span className="input-group-text">github.com/</span>
                    
                    <input
                        type="text"
                        className="form-control"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && search()}
                    />
                    
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={search}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-search"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
