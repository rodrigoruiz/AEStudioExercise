
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
    const [text, setText] = useState("");
    
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
                <p>{profile.repositoryStats?.stars ?? "..."} stars</p> {/* stars from all owned user repositories */}
                <p>{profile.repositoryStats?.watchers ?? "..."} watchers</p> {/* watchers from all owned user repositories */}
                <p>{profile.repositoryStats?.forks ?? "..."} forks</p> {/* forks from all owned user repositories */}
            </div>
            <br clear="all" />
            <br />
            
            <LanguagesTable languages={profile.repositoryStats?.languages}/>
            
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
