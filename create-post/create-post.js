// imports
// auth related (checkAuth, signOutUser)
import {
    checkAuth,
    signOutUser,
    getCategories,
    createPost,
    uploadImage,
} from '../fetch-utils.js';
import { renderCategoryOptions } from '../render-utils.js';

const signOutLink = document.getElementById('sign-out-link');
checkAuth();
signOutLink.addEventListener('click', signOutUser);

const categorySelect = document.getElementById('category-select');
const postItForm = document.getElementById('post-it-form');
const addButton = postItForm.querySelector('button');
const errorDisplay = postItForm.querySelector('.error');

async function displayCategories() {
    // go get the categories from the db
    const categories = await getCategories();
    // create a bunch of <option> elements
    const options = renderCategoryOptions(categories);
    // add them to the <select>
    categorySelect.append(options);
}

// call on page load
displayCategories();

postItForm.addEventListener('submit', async (e) => {
    // keep the form from changing the browser page
    e.preventDefault();

    // niceties for "saving" and errors:
    // reset the error
    errorDisplay.textContent = '';
    // remember the button text
    const buttonText = addButton.textContent;
    // disabled button and change to "saving..."
    addButton.disabled = true;
    addButton.textContent = 'Saving...';

    // get the data
    const formData = new FormData(postItForm);

    const post = {
        title: formData.get('title'),
        description: formData.get('description'),
        category_id: formData.get('category_id'),
        contact: formData.get('contact'),
    };

    const imageFile = formData.get('image_url');
    // Do we have a file? If so size will be > 0
    if (imageFile.size) {
        // pretty much randomId
        const randomId = Math.floor(Date.now() * Math.random());
        // put the image in the bucket using the user id
        // as a folder, and whatever file name the uploaded
        // image has
        const imageName = `${randomId}/${imageFile.name}`;
        // do the upload and get the returned url
        const url = await uploadImage('posts', imageName, imageFile);
        // add the url property to the update object
        post.image_url = url;
    }

    // and send to server
    const response = await createPost(post);

    const error = response.error;

    // did it work?
    if (error) {
        // display the error
        errorDisplay.textContent = error.message;
        // reset the button to be active
        addButton.disabled = false;
        // restore the button text to what it was
        addButton.textContent = buttonText;
    } else {
        // go back to bulletin board page
        location.assign('../');
    }
});
