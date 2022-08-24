# Post Detail & Delete

For this "feature ticket" assignment, you need to add a post detail page that shows detailed info about the posts, plus includes a delete button for the user than created the post to be able to delete.

Note that the comments feature will be added later this week to this page

**Create a new branch from `dev` called `post-detail-delete`**

## Planning

Sketch out what the page will look like. On your diagram, identify:

-   What are the pieces of data required? (down to the field/column level)
-   What actions take place on the page? (usually means DOM events + page load)

Take a screen shot and include in your repo

## Page & UI

Start by adding a new page at `/post`. Consider copying `/create-post` as the starter, but make sure to change the css link and js script tag.

Design out the HTML and CSS using static data in the `index.html`.

Once your design is complete, move onto `post.js` and make your page "dynamic".

## Data

Create and export new function from `fetch-utils.js` that fetches all of the post data for a single post id. Basically it will be the same as client use in `getPosts`, but will be limited to one id (use `.match` or `.eq`). As we are expecting a single row, add `.single()` to your query.

For knowing who the current user is, you can capture the user from the auth check:

```js
const user = checkAuth();
```

Start by creating a `displayPost` async function and simply calling the imported data function and logging the post plus the user object. If these are working correctly, you know you have the right data to work with.

## Display

Grab your needed DOM elements and begin to modify the display based on the values in the post detail and the user object. **Only show the delete button and subscribe to click event if the post belongs to the current user!**

## Links

Add links to the home page to each post to make the header linked to the corresponding detail page

## Delete Post

### Database

Add a policy for delete.

| setting      | value                                    |
| ------------ | ---------------------------------------- |
| policy name  | Enable delete for users based on user_id |
| operation    | DELETE                                   |
| target roles | authenticated                            |
| USING        | auth.uid() = user_id                     |

### Fetch Function

Create and export new function from `fetch-utils.js` that deletes a post (by post id). Import and use this function on the delete button click, and navigate back to the home page (`../` when complete).

## Rubric

The following is required for your assignment to be graded:

-   PR open from `post-detail-delete` to `dev`
-   PR Passes CI (lint)
-   PR preview on netlify

| Commit with...                        |  20 |
| :------------------------------------ | --: |
| Planning artifacts                    |   2 |
| Post Detail UI (w/static data)        |   4 |
| Post Detail from dynamic data         |   5 |
| Link Posts to Detail Page             |   3 |
| Delete post for creator functionality |   6 |
