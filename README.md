# Digital wallet
This is the digital wallet application.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

Build the docker image with

```
docker build -t wallet:latest .
```

To run use the command

```
docker run -p 3000:3000 --env-file .env wallet:latest
```

## Internationalization (i18n)

All messages should have unique ids. ESlint enforces and generates them when you run:

```
npm run lint -- --fix
```

To compile new language files run:

```
npm run lang:compile
```

To extract all messages from the code base run (⚠ overwrites old files):

```
npm run lang:extract
```
