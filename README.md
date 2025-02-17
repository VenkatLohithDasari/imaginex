This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## To-do list
Here, features which "going to"/"can" be implemented are listed below.
- Admin capabilities:
  - [ ] Upload new images (to cloudflare R2 storage)
  - [ ] Create and manage albums
  - [ ] Moderation such as comments and other stuff (later it will be expanded to more details)
- User features
  - [ ] Account creation/login (using NextAuth.js)
  - [ ] Browse albums and images
  - [ ] Like (heart) images
  - [ ] Mark albums/images as favorites
  - [ ] Comment on images
  - [ ] Share images (via social share buttons or simply copyable links)

