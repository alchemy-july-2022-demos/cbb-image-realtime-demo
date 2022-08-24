import {
    checkAuth,
    signOutUser,
    getProfiles,
} from '../fetch-utils.js';
import { renderProfiles } from '../render-utils.js';

const signOutLink = document.getElementById('sign-out-link');
const user = checkAuth();
signOutLink.addEventListener('click', signOutUser);

const profileList = document.getElementById('profile-list');

async function displayProfiles() {
    const response = await getProfiles();
    const profiles = response.data;
    if (profiles) {
        const profileItems = renderProfiles(profiles, user.id);
        profileList.append(profileItems);
    }
}

displayProfiles();
