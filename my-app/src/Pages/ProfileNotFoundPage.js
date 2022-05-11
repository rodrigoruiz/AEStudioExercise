
function ProfileNotFoundPage({ profileName, refreshProfile }) {
    return <div>Profile "{profileName}" not found. <button onClick={() => refreshProfile()}>refresh</button></div>;
}

export default ProfileNotFoundPage;