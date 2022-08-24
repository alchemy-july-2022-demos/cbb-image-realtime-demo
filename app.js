// importing other stuff, utility functions for:
// working with supabase
import {
    checkAuth,
    signOutUser,
    getPosts,
    getProfile,
} from './fetch-utils.js';
// pure rendering (data --> DOM)
import { renderPosts } from './render-utils.js';

// grab needed DOM elements on page

// some "boiler plate" code for:
// sign out link
const signOutLink = document.getElementById('sign-out-link');
signOutLink.addEventListener('click', signOutUser);
// make sure we have a user
const user = checkAuth();

async function loadProfile() {
    const profile = await getProfile(user.id);
    if (profile && profile.avatar_url) {
        const userAvatar = document.getElementById('user-avatar');
        userAvatar.src = profile.avatar_url;
        userAvatar.classList.remove('hidden');
    }
}

loadProfile();

const bulletinBoard = document.getElementById('bulletin-board');

async function displayPosts() {
    const posts = await getPosts();
    const listEls = renderPosts(posts);
    bulletinBoard.append(listEls);
}

displayPosts();
