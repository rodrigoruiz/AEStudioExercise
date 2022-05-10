
import React, { useState, useEffect } from 'react';


function LanguagesTable({ languages }) {
    if (!languages) {
        return <div />;
    }
    
    return <table>
        <tbody>
            {Object.entries(languages).sort().map(([key, value]) => (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                </tr>
            ))}
        </tbody>
    </table>;
}

function ProfilePageWithData({ profileName, profile }) {
    const [repositoryStats, setRepositoryStats] = useState(null);
    
    useEffect(() => {
        fetch(profile["repos_url"])
            .then(response => response.json())
            .then(repositories => repositories.reduce(
                (stats, repository) => ({
                    stars: stats.stars + repository["stargazers_count"],
                    watchers: stats.watchers + repository["watchers_count"],
                    forks: stats.forks + repository["forks_count"],
                    languages: {
                        ...stats.languages,
                        [repository["language"]]: (stats.languages[repository["language"]] ?? 0) + 1
                    }
                }),
                {
                    stars: 0,
                    watchers: 0,
                    forks: 0,
                    languages: {}
                }
            ))
            .then(stats => {
                delete stats.languages["null"];
                const total = Object.values(stats.languages).reduce((a, b) => a + b, 0);
                
                for (const key in stats.languages) {
                    stats.languages[key] = `${Math.round(100 * stats.languages[key] / total)}%`;
                }
                
                return stats;
            })
            .then(stats => setRepositoryStats(stats));
    }, []);
    
    return (
        <div>
            <p><b>{profileName}'s Profile</b></p>
            <p>Location: {profile["location"]}</p>
            
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
            <br />
            
            <LanguagesTable languages={repositoryStats?.languages}/>
        </div>
    );
}

export default ProfilePageWithData;
