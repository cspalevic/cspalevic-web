---
title: Corepack Basics
date: 01-06-2023
image: package.avif?tx=q_auto,c_crop,g_south,ar_1
alt: A picture of a package
---

## Corepack

Have you heard about `corepack` recently? Are you curious about what this thing is? Then this post is for you. `Corepack` is an experimental feature of Node that is meant to give you more control over the package manager versions used inside your Node projects. `Corepack` will help out with a couple of key developer workflows:

- Project setups for new project contributors
- Package manager version control

`Corepack` has been an experimental feature since Node 14 and still is experimental for the latest version of Node. It provides a super simple API to ensure you and all of your project contributors and/or teammates are using the same version of your intended package manager.

At a high level, this is how it works:

- A `packageManager` property will be placed in your `package.json` which will indicate which package manager and what version of it that you should always be using
- Node will expose a binary proxy inside your project
- When you use your intended package manager inside your project, you will instead be referencing the binary installed
- When you are outside of your project directory, the package manager version that is installed on your system will be used

## Tutorial

Let's go through some basic steps to see it in action.

1. Make sure you have at least Node 14 running on your machine: `nvm use 14`
2. Run `corepack enable` to set up all symlinks in your environment
3. Create and change to a new directory and run `npm init`
4. Add a `packageManager` property in your `package.json` and let's set it to `pnpm@7.17.0`
5. Run `corepack prepare` to download the desired package manager and version
6. Running a quick test with `pnpm -v` should display `7.17.0`

And that's it! Every time you are inside that directory now, `pnpm` will always reference that same version.
