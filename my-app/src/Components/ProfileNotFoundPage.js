
function ProfileNotFoundPage({ profileName, refreshProfile }) {
    return <p>
        <b className="h3">Profile "{profileName}" not found.</b>
        
        <button type="button" className="btn btn-outline-secondary" style={{ marginLeft: "20px", marginTop: "-10px" }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
                onClick={() => refreshProfile()}
            >
                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"></path>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"></path>
            </svg>
            
            <span className="visually-hidden">Button</span>
        </button>
    </p>;
    
    // return <div>Profile "{profileName}" not found. <button onClick={() => refreshProfile()}>refresh</button></div>;
}

export default ProfileNotFoundPage;