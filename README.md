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