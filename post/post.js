import {
    checkAuth,
    signOutUser,
    getPost,
    deletePost,
    addComment,
} from '../fetch-utils.js';

const signOutLink = document.getElementById('sign-out-link');
const currentUser = checkAuth();
signOutLink.addEventListener('click', signOutUser);

const titleDisplay = document.getElementById('title-display');
const categoryDisplay = document.getElementById('category-display');
const descriptionDisplay = document.getElementById(
    'description-display'
);
const contactDisplay = document.getElementById('contact-display');
const imageDisplay = document.getElementById('image-display');
const deleteButton = document.getElementById('delete-button');

let post = null;

async function displayPost() {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (!id) return location.replace('../');
    post = await getPost(id);
    if (!post) return location.replace('../');

    titleDisplay.textContent = post.title;
    categoryDisplay.textContent = `${post.category.emoji} ${post.category.name}`;
    descriptionDisplay.textContent = post.description;
    contactDisplay.textContent = post.contact;

    if (post.image_url) {
        imageDisplay.src = post.image_url;
        imageDisplay.classList.remove('hidden');
    }

    if (post.user_id === currentUser.id) {
        deleteButton.classList.remove('hidden');

        deleteButton.addEventListener('click', async () => {
            const msg = `Are you sure you want to delete post "${post.title}"?`;
            if (!confirm(msg)) return;

            const response = await deletePost(post.id);

            if (!response.error) {
                location.replace('../');
            }
        });
    }
}

displayPost();

const addCommentForm = document.getElementById('add-comment-form');

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addCommentForm);

    const response = await addComment({
        text: formData.get('text'),
        post_id: post.id,
    });

    if (response.error) {
        // eslint-disable-next-line no-console
        console.log(response.error);
    } else {
        addCommentForm.reset();

        const comment = response.data;
        post.comments.push(comment);

        // TODO: re-display comments
    }
});
