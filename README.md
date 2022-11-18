# Digital wallet

This is the digital wallet application.

## Getting Started

Default environment variables can be found in `.env`.
Create a `.env.local` file and set `NEXTAUTH_SECRET` to some secret value.
For more information about environment variable load order se the [Next.js documentation](https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order).

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

Build the docker image with

```
podman build -t wallet .
```

To run use the command

```
podman run -p 3000:3000 --env-file .env wallet
```

## Internationalization (i18n)

All messages should have unique ids. ESlint enforces and generates them when you run:

```
npm run lint -- --fix
```

To extract all messages from the code base run the following command.
The `lang/en.json` file will be replaced and the `lang/sv.json` will be updated.

```
npm run lang:extract
```

To compile new language files run:

```
npm run lang:compile
```
