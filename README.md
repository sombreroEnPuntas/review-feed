# review-feed

Try it out on [`Vercel`](https://review-feed.vercel.app/)!

[![Maintainability](https://api.codeclimate.com/v1/badges/7f4137dd9f6c4eba544e/maintainability)](https://codeclimate.com/github/sombreroEnPuntas/review-feed/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7f4137dd9f6c4eba544e/test_coverage)](https://codeclimate.com/github/sombreroEnPuntas/review-feed/test_coverage)

Simple web app that allows a user to browse their reviews.

**NOTE: Requirements [here](assignment.pdf)**

## Scripts

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The following scripts are available:

```js
yarn lint   // run tsc, eslint & prettier code checks
yarn test   // run jest tests (unity & integration)
yarn dev    // starts dev server locally, with hot reload
yarn build  // generate PRD bundle
yarn start  // starts PRD server
```

## Service

There's an API [service](frontend-task.production.cloud.chattermill.xyz) to provide data.  
Here are the [docs](https://frontend-task.production.cloud.chattermill.xyz/swagger/index.html), and how to [generate the client](src/client/generate.md).

## CI

- `husky` enforces linting and commit messages locally
- Merges to `master` branch and PRs will trigger deploys on `Vercel` envs
- `codeclimate` prevents accumulating technical debt
- a changelog is auto-generated after pushing to master
- PRs get robot reviews: comments and checks 🤖

## Web app

There's a web app deployed as a [Vercel app](https://review-feed.vercel.app/), matching latest master, and envs are created for new PRs.
