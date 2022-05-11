
import React, { useState, useEffect } from 'react';
import { getProfile } from '../profileHandler';
import ProfilePageWithData from './ProfilePageWithData';


function ProfilePage({ profileName }) {
    const [profile, setProfile] = useState("Loading");
    
    useEffect(() => {
        getProfile(profileName).then(retrievedProfile => setProfile(retrievedProfile));
    }, []);
    
    if (profile === "Loading") {
        return <div>Loading</div>;
    }
    
    if (profile) {
        return <ProfilePageWithData
            profileName={profileName}
            profile={profile}
        />;
    }
    
    return <div>Profile "{profileName}" not found.</div>;
}

export default ProfilePage;
