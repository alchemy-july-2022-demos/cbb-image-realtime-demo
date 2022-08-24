import {
    checkAuth,
    signOutUser,
    updateProfile,
    getProfile,
} from '../fetch-utils.js';

const signOutLink = document.getElementById('sign-out-link');
const user = checkAuth();
signOutLink.addEventListener('click', signOutUser);

const profileForm = document.getElementById('profile-form');
const updateButton = profileForm.querySelector('button');
const errorDisplay = profileForm.querySelector('.error');
const userNameInput = profileForm.querySelector('[name=user_name]');
const bioTextArea = profileForm.querySelector('[name=bio]');

async function displayProfile() {
    const profile = await getProfile(user.id);
    if (profile) {
        userNameInput.value = profile.user_name;
        bioTextArea.value = profile.bio;
    }
}

displayProfile();

profileForm.addEventListener('submit', async (e) => {
    // keep the form from changing the browser page
    e.preventDefault();

    // niceties for "saving" and errors:
    // reset the error
    errorDisplay.textContent = '';
    // remember the button text
    const buttonText = updateButton.textContent;
    // disabled button and change to "saving..."
    updateButton.disabled = true;

    const formData = new FormData(profileForm);
    const response = await updateProfile({
        user_name: formData.get('user_name'),
        // avatar_url: formData.get('avatar_url'),
        bio: formData.get('bio'),
    });

    const error = response.error;

    // did it work?
    if (error) {
        // display the error
        errorDisplay.textContent = error.message;
        // reset the button to be active
        updateButton.disabled = false;
        // restore the button text to what it was
        updateButton.textContent = buttonText;
    } else {
        // go back to bulletin board page
        location.assign('../');
    }
});
