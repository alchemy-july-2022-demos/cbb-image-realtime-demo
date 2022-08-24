import {
    checkAuth,
    signOutUser,
    updateProfile,
    getProfile,
    uploadAvatar,
} from '../fetch-utils.js';

const signOutLink = document.getElementById('sign-out-link');
const user = checkAuth();
signOutLink.addEventListener('click', signOutUser);

const profileForm = document.getElementById('profile-form');
const updateButton = profileForm.querySelector('button');
const errorDisplay = profileForm.querySelector('.error');
const userNameInput = profileForm.querySelector('[name=user_name]');
const avatarInput = profileForm.querySelector('[name=avatar_url]');
const bioTextArea = profileForm.querySelector('[name=bio]');
const preview = document.getElementById('preview');

avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    preview.src = URL.createObjectURL(file);
});

async function displayProfile() {
    const profile = await getProfile(user.id);
    if (profile) {
        userNameInput.value = profile.user_name;
        bioTextArea.value = profile.bio;
        // load preview of existing profile
        if (profile.avatar_url) {
            preview.src = profile.avatar_url;
        }
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

    // create a form data object for easy access to form values
    const formData = new FormData(profileForm);

    // initial profile update
    const profileUpdate = {
        user_name: formData.get('user_name'),
        bio: formData.get('bio'),
    };

    // get the avatar file from the form
    const imageFile = formData.get('avatar_url');
    // Do we have a file? If so size will be > 0
    if (imageFile.size) {
        // put the image in the bucket using the user id
        // as a folder, and whatever file name the uploaded
        // image has
        const imageName = `${user.id}/${imageFile.name}`;
        // do the upload and get the returned url
        const url = await uploadAvatar(imageName, imageFile);
        // add the url property to the update object
        profileUpdate.url = url;
    }

    const response = await updateProfile(profileUpdate);

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
