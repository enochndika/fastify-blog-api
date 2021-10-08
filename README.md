# Blog Post API

## 🚀 Stacks

- Fastify Server with Typescript
- Prisma as ORM.

## How it works?

create `.env` file and add the following config

```bash
PORT = 8000 (localhost port)
JWT_SECRET = your jwt secret (any combinaison of characteres)

# To upload image, you need a cloudinary account
CLOUD_NAME = Your cloudinary name
CLOUDINARY_API_KEY = Your cloudinary api key
CLOUDINARY_API_SECRET= Your cloudinary api secret

DATABASE_URL = your data base url (example: "postgresql://username:password@localhost:5432/dbname")

```

## How to start

```bash
npm install
# to install dependencies
```

```bash
npx prisma migrate deploy
# to apply all migrations in the database
```

```bash
  npx prisma db seed
  # to seed the database with data 
  # this create 4 categories, 150 posts, 50 users and 100 comments
```

Then you can run `npm run dev` or `yarn dev` to start the dev server.


##Production Build
You can build the project with `npm run build` or `yarn build`.

This will create a `dist` folder.
