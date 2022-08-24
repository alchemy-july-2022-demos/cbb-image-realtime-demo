export function renderCategoryOptions(categories) {
    const fragment = document.createDocumentFragment();

    for (const category of categories) {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = `${category.emoji} ${category.name}`;
        fragment.append(option);
    }

    return fragment;
}

export function renderPosts(posts) {
    const fragment = document.createDocumentFragment();

    for (const post of posts) {
        const li = document.createElement('li');
        li.classList.add('post-it');

        const link = document.createElement('a');
        link.href = `post/?id=${post.id}`;

        const titleEl = document.createElement('h2');
        titleEl.textContent = post.title;

        const categoryEl = document.createElement('span');
        categoryEl.classList.add('category');
        categoryEl.title = post.category.name;
        categoryEl.textContent = post.category.emoji;

        const descriptionEl = document.createElement('p');
        descriptionEl.classList.add('description');
        descriptionEl.textContent = post.description;

        const contactEl = document.createElement('p');
        contactEl.textContent = post.contact;

        link.append(titleEl, categoryEl, descriptionEl, contactEl);
        li.append(link);
        fragment.append(li);
    }

    return fragment;
}

export function renderProfiles(profiles, userId) {
    const fragment = document.createDocumentFragment();

    for (const profile of profiles) {
        const li = document.createElement('li');
        li.classList.add('profile');
        if (userId === profile.id) {
            li.classList.add('self');
        }

        const userNameEl = document.createElement('h2');
        userNameEl.textContent = profile.user_name;

        const bioEl = document.createElement('p');
        bioEl.classList.add('bio');
        bioEl.textContent = profile.bio;

        li.append(userNameEl, bioEl);
        fragment.append(li);
    }

    return fragment;
}
