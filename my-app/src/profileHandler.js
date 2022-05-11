
function saveProfileToChache(profileName, profile) {
    localStorage.setItem(`cache:${profileName}`, JSON.stringify(profile));
}

function getProfileFromCache(profileName) {
    return JSON.parse(localStorage.getItem(`cache:${profileName}`)) ?? null;
}

async function getProfileRepositoryStats(repositoriesURL) {
    const response = await fetch(repositoriesURL);
    const repositories = await response.json();
    
    const repositoryStats = repositories.reduce(
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
    );
    
    delete repositoryStats.languages["null"];
    
    const total = Object.values(repositoryStats.languages).reduce((a, b) => a + b, 0);
    
    for (const key in repositoryStats.languages) {
        repositoryStats.languages[key] = `${Math.round(100 * repositoryStats.languages[key] / total)}%`;
    }
    
    return repositoryStats;
}

export async function getProfile(profileName) {
    let profile = getProfileFromCache(profileName);
    
    if (!profile) {
        console.log(`Fetching profile: ${profileName}`);
        profile = await fetch(`https://api.github.com/users/${profileName}`)
            .then(response => response.json());
        
        if (profile["repos_url"]) {
            profile.repositoryStats = await getProfileRepositoryStats(profile["repos_url"]);
        }
            
        saveProfileToChache(profileName, profile);
    }
    
    if (profile["login"] !== profileName) {
        return null;
    }
    
    return profile;
}

export function clearProfileCache(profileName) {
    localStorage.removeItem(`cache:${profileName}`);
}
