# Community Bulletin Board

## The Golden Rule:

🦸 🦸‍♂️ `Stop starting and start finishing.` 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

## Project Starter Setup

### Overview

[Here](https://whimsical.com/page-wireframes-QKB9N3bD8HbmJDt12t5AHE) is an overview of the app and features that will be added this week.

### Setup Steps

1. GitHub repo
    1. Copy the [template repository](https://github.com/alchemycodelab/cbb-project-template)
    1. Setup Netlify
    1. Clone local
    1. Make dev branch, make sure to push this branch to github
    1. You will create a feature branch off dev for the days work
    1. Work in VS Code as usual
1. Supabase
    1. Make new project (copy password for using tools like beekeeper)
    1. From "auth>settings>email", turn off email confirmations and save
    1. From "sql editor", new script and run starter schema `db/schema.sql`
    1. From "sql editor", new script and run starter category data `db/categories.sql`
    1. From "settings > api", copy URL and Key into `fetch-utils.js`
