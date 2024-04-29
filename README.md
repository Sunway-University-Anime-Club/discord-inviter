# suac-discord-inviter

This was created to prevent having a permanent Discord Invite Link leaked, thus preventing trolls from accessing the Discord server.

The user must be a student with a valid Student ID or Imail and be registered as a member of the club through the registration form.

## Environment Variables

Please refer to the [.env.example](.env.example) file to see a list of required environment variables.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
ADAPTER=node pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

If hosting on Netlify, set the environment variable for `ADAPTER` to `Netlify`. Currently, there are no plans to support Vercel adapter. Feel free to create a fork for it.

## Docker

You may prefer to run this on your own server instead of relying on Netlify. To avoid dependency and build issues, the project has been dockerized.

This automatically sets the adapter to use node adapter for SvelteKit.

Be sure to have docker installed on your machine first:

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

- Make sure you have a `.env` file with all environment variables
- First build the image: `docker compose build`
- Then run the image in a container: `docker compose up`
