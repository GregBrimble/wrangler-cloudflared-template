This repository is an template, demonstrating Wrangler's new local development server, working with a `cloudflared` tunnel.

**Note: This is using tools which are in beta and the build/development process is liable to change in the future.**

# Why?

This template is an example of a full-stack application deployed solely on Cloudflare's edge. It also allows for rapid development, with a hot-reloading client and automatically updating server.

**Demo video**

[![Demo video](https://i3.ytimg.com/vi/rPow01rsQuo/hqdefault.jpg)](https://www.youtube.com/watch?v=rPow01rsQuo)

# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [`cloudflared`](https://developers.cloudflare.com/argo-tunnel/downloads/)

  (On MacOS with Homebrew: `brew install cloudflare/cloudflare/cloudflared`)

## Installation

1. `git clone git@github.com:gregbrimble/wrangler-cloudflared-template.git`

1. `cd wrangler-cloudflared-template`

1. `npm i`

1. Replace the `account_id` value in `./wrangler.toml`

1. `npx wrangler config` and follow the on-screen instructions.

# How it works

## Local Development

1. `npm run start:client`: serves a hot-reloading version of the client at http://localhost:19006/.

1. `npm run start:tunnel`: creates a tunnel for the client, exposing it to the internet.

1. `npm run start:worker -- --host [host]` where `[host]` is the URL of the `cloudflared` tunnel e.g. https://mineral-shop-costumes-till.trycloudflare.com. This serves the worker script locally on http://localhost:8787/:

   1. `./packages/worker/index.ts` attempts to fetch a server response from `./packages/server/index.ts`. In this example, it intercepts image requests and returns instead a random image from [Unsplash](https://unsplash.com/).

   1. Otherwise, if the server response 404's (i.e. it isn't an image request), it passes the request to the origin. In this case, this is the exposed `cloudflared` tunnel (the client).

## Production

1. `npm run deploy`:

   1. Builds a production version of the client: `./packages/client/web-build`

   1. Stores the client artifacts in a Cloudflare Workers KV namespace.

   1. Builds and deploys the Cloudflare Worker, which responds to requests as follows:

      1. `./packages/worker/index.ts` attempts to fetch a server response from `./packages/server/index.ts`. In this example, it intercepts image requests and returns instead a random image from [Unsplash](https://unsplash.com/).

      1. Otherwise, if the server response 404's (i.e. it isn't an image request), it uses `@cloudflare/kv-asset-handler`'s `getAssetFromKV` function to fetch an asset from the KV namespace. This asset is then returned as the response.

# Roadmap

- Automatically pull in the `cloudflared` tunnel address when starting `wrangler dev`.
- Tests
- Full CI/CD
- Greenkeeper & Mergify
