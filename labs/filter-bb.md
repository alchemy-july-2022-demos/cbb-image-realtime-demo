# Filter Bulletin Board by Category

For this "feature ticket" assignment, you need to add a section above the bulletin board (or maybe it's part of the header?) that allows the user to select a category. When selected, the page changes to being filtered by that category. Make sure to add an option to show all or remove the category filter.

**Create a new branch from `dev` called `filter-bb`**

## Planning

Sketch out what the page will look like with this feature. On your diagram, identify:

-   What are the pieces of data required? (down to the field/column level)
-   What actions take place on the page? (usually means DOM events + page load)

Take a screen shot and include in your repo

## Approach

One way to do this is to have the categories be links that href to `?categoryId=4`. Then on page load, see if a search param exists and use the correct fetch function to get the data one way or another.

Another way is to:

-   attach event listeners to the select or each button
-   rerun the display function:
    -   do new data fetch
    -   rerender list items
    -   clear existing list (`.innerHTML = ''`)
    -   append new list items

## Page & UI

Design out the HTML and CSS using static data in the `index.html` of what the category filter will look like. You could have links or a select drop down.

## Data

There is already a `getCategories` function in `fetch-utils.js`. You should add another new function very similar to `getPosts` called `getPostsByCategory(categoryId)` that does the same thing but adds a filter on category id. You _can_ actually use a single function that optionally takes a category_id, but that will take a bit more JavaScript jitsu to pull off

## Rubric

The following is required for your assignment to be graded:

-   PR open from `filter-bb` to `dev`
-   PR Passes CI (lint)
-   PR preview on netlify

| Commit with...                                  |  15 |
| :---------------------------------------------- | --: |
| Planning artifacts                              |   2 |
| Category filter UI (includes "all" or "remove") |   6 |
| Post filter by category                         |   7 |
