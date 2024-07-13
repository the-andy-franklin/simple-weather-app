# Welcome to my little weather app

Frontend
  - React
  - Node
  - Vite
  - Vitest

Backend
  - Deno
  - Hono

The backend is a bit superfluous and adds about 100ms of unnecessary latency, but I thought it would be better to show-case my skills. (If I needed a database I would've used Mongo Atlas. I love NoSQL and Mongo makes distributed deployment and sharding super easy)

the app is deployed so if you wanna check it out without having to run it locally: [https://andy-franklins-weather-app.vercel.app/](https://andy-franklins-weather-app.vercel.app/)

if you do want to clone it and run it locally, here are the steps:

1. `git clone https://github.com/the-andy-franklin/simple-weather-app.git`

## Running the Backend

1. running backend requires having the deno-cli installed. If you're on a mac and you use homebrew, you can just do `brew install deno` (recommended), but if not, you can install deno with this shell-script `curl -fsSL https://deno.land/install.sh | sh`. [deno-cli install page](https://docs.deno.com/runtime/manual/getting_started/installation/)
    1. if you're using VSCode, I'd highly recommend installing the [deno plugin](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
2. `cd backend`
3. You'll need an environment variable.
    1. Create a `.env` file in the project root
    2. add `OPEN_WEATHER_MAP_API_KEY`. (I had Nolan pass along a zip-file with my keys. If you don't have it, you can email me at the.andy.franklin@gmail.com and I will send it to you)
4. `deno task start`

## Running the Frontend

1. `cd frontend`
2. Again, you'll need a couple of env vars.
    1. Create a `.env` file in the project root
    2. add `VITE_GOOGLE_PLACES_API_KEY`. (Same deal here. This key is going to be in the zip-file that Nolan or I will send you)
    3. add `VITE_API_URL`. You can either set this to `http://localhost:3000` (if you're running the backend locally), or you can use my deployed backend url: `https://andy-franklins-weather-app.deno.dev`
3. `npm i`
4. `npm run dev`
