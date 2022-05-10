
import React, { useState, useEffect } from 'react';


function ProfilePageWithData({ profileName, profile }) {
    const [repositoryStats, setRepositoryStats] = useState(null);
    
    useEffect(() => {
        fetch(profile["repos_url"])
            .then(response => response.json())
            .then(repositories => repositories.reduce(
                (stats, repository) => ({
                    stars: stats.stars + repository["stargazers_count"],
                    watchers: stats.watchers + repository["watchers_count"],
                    forks: stats.forks + repository["forks_count"]
                }),
                {
                    stars: 0,
                    watchers: 0,
                    forks: 0
                }
            ))
            .then(stats => setRepositoryStats(stats));
    }, []);
    
    return (
        <div>
            <b>{profileName}'s Profile</b>
            <br /><br />
            
            <img
                src={profile["avatar_url"]}
                style={{ float: "left" }}
                width={250}
            />
            <div style={{ float: "left", marginLeft: "30px" }}>
                <p>{profile["followers"]} followers</p>
                <p>{profile["following"]} followings</p>
                <p>{profile["public_repos"]} public repositories</p>
                <p>{repositoryStats?.stars ?? "..."} stars</p> {/* stars from all owned user repositories */}
                <p>{repositoryStats?.watchers ?? "..."} watchers</p> {/* watchers from all owned user repositories */}
                <p>{repositoryStats?.forks ?? "..."} forks</p> {/* forks from all owned user repositories */}
            </div>
            <br clear="all" />
        </div>
    );
}

function ProfilePage({ profileName }) {
    const [profile, setProfile] = useState(null);
    
    useEffect(() => {
        fetch(`https://api.github.com/users/${profileName}`)
            .then(response => response.json())
            .then(data => setProfile(data));
    }, []);
    
    if (profile === null) {
        return <div>Loading</div>;
    }
    
    if (profile["login"] === profileName) {
        return <ProfilePageWithData
            profileName={profileName}
            profile={profile}
        />;
    }
    
    return <div>Profile "{profileName}" not found.</div>;
}

export default ProfilePage;
