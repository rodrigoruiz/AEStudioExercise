
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

function saveNotes(profileName, text) {
    localStorage.setItem(`notes:${profileName}`, text);
}

function getNotes(profileName) {
    return localStorage.getItem(`notes:${profileName}`) ?? "";
}

function ProfilePageWithData({ profileName, profile }) {
    const [repositoryStats, setRepositoryStats] = useState(null);
    
    const [text, setText] = useState("");
    
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
    
    useEffect(() => {
        setText(getNotes(profileName));
    }, []);
    
    return (
        <div>
            <p><b>{profileName}'s profile</b></p>
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
            
            <p><b>Notes:</b></p>
            
            <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                rows="10" cols="50"
            />
            <br clear="all" />
            <button onClick={() => saveNotes(profileName, text)}>save</button>
            <button onClick={() => setText(getNotes(profileName))}>cancel</button>
        </div>
    );
}

export default ProfilePageWithData;
