
import React, { useState, useEffect } from 'react';
import ProfilePageWithData from './ProfilePageWithData';


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
