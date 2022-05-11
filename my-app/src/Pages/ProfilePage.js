
import React, { useState, useEffect } from 'react';
import { clearProfileCache, getProfile } from '../profileHandler';
import LoadingPage from './LoadingPage';
import ProfileNotFoundPage from './ProfileNotFoundPage';
import ProfilePageWithData from './ProfilePageWithData';


function ProfilePage({ profileName }) {
    const [profile, setProfile] = useState("Loading");
    
    const updateProfile = () => {
        getProfile(profileName).then(setProfile);
    };
    
    useEffect(() => {
        updateProfile();
    }, []);
    
    const refreshProfile = () => {
        clearProfileCache(profileName);
        setProfile("Loading");
        updateProfile();
    };
    
    if (profile === "Loading") {
        return <LoadingPage profileName={profileName} />
    }
    
    if (profile) {
        return <ProfilePageWithData
            profileName={profileName}
            profile={profile}
            refreshProfile={refreshProfile}
        />;
    }
    
    return <ProfileNotFoundPage
        profileName={profileName}
        refreshProfile={refreshProfile}
    />;
}

export default ProfilePage;
