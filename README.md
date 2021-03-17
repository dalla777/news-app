This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Acceptance Criteria

- NewsApp has a homepage with a single search bar. 
- The <SearchBar> should:
    - Have some helpful placeholder text
    - Search the NewsAPI for relevant articles
    - Display results in the page as the User types their query in the input
    - Highlight the query string wherever there is a match in the results
- Clicking on a search result should take the user to another page that displays the result in an Article format.
- The Article page should:
    - Show the source, author, any content available, including images
    - Include a <RelatedNews> component at the bottom of the page with any related content from the NewsAPI
        - You can choose how to query related content
## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
