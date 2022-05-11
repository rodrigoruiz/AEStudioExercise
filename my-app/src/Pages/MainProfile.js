
function MainProfile({ profileName, profile, refreshProfile }) {
    return <div>
        <p>
            <b className="h3">{profileName}'s profile</b>
            
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
        </p>
        
        <p><b>Location:</b> {profile["location"] ?? "Unknown"}</p>
        
        <figure className="figure" style={{ float: "left" }}>
            <img
                src={profile["avatar_url"]}
                style={{ float: "left" }}
                width={250}
                height={250}
                className="figure-img img-fluid rounded"
                alt="..."
            />
        </figure>
        
        <div style={{
            float: "left",
            width: "2px",
            height: "250px",
            backgroundColor: "black",
            marginLeft: "20px"
        }} />
        
        <div style={{ float: "left", marginLeft: "30px" }}>
            <p>{profile["followers"]} followers</p>
            <p>{profile["following"]} followings</p>
            <p>{profile["public_repos"]} public repositories</p>
            <p>{profile.repositoryStats?.stars ?? "..."} stars</p> {/* stars from all owned user repositories */}
            <p>{profile.repositoryStats?.watchers ?? "..."} watchers</p> {/* watchers from all owned user repositories */}
            <p>{profile.repositoryStats?.forks ?? "..."} forks</p> {/* forks from all owned user repositories */}
        </div>
        <br clear="all" />
    </div>;
}

export default MainProfile;
