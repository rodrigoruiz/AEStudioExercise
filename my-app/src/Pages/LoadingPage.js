
function LoadingPage({ profileName }) {
    return <div className="centered">
        <div className="h3" style={{ color: "grey" }}>Loading profile: {profileName}</div>
        
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <div className="spinner-border text-secondary" role="status" style={{ }} />
        </div>
    </div>;
}

export default LoadingPage;
