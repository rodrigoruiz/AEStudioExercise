
import React, { useState, useEffect } from 'react';
import LanguagesTable from './LanguagesTable';
import MainProfile from './MainProfile';
import Notes from './Notes';


function saveNotes(profileName, text) {
    localStorage.setItem(`notes:${profileName}`, text);
}

function getNotes(profileName) {
    return localStorage.getItem(`notes:${profileName}`) ?? "";
}

function ProfilePageWithData({ profileName, profile, refreshProfile }) {
    const [text, setText] = useState("");
    const [savedText, setSavedText] = useState("");
    
    useEffect(() => {
        const currentText = getNotes(profileName);
        setText(currentText);
        setSavedText(currentText);
    }, []);
    
    return (
        <div>
            <MainProfile profileName={profileName} profile={profile} refreshProfile={refreshProfile} />
            
            <LanguagesTable languages={profile.repositoryStats?.languages}/>
            
            <Notes
                text={text}
                setText={setText}
                saveNewText={() => {
                    saveNotes(profileName, text);
                    setText(text);
                    setSavedText(text);
                }}
                resetText={() => setText(getNotes(profileName))}
                savedText={savedText}
            />
        </div>
    );
}

export default ProfilePageWithData;
