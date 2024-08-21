# Codex Marketplace Components

This project provide UI components for Codex Marketplace.  
It's in pre-alpha version, the API will change.

## Philosophy

This CSS is written with semantic style. For more details check this [link](https://maintainablecss.com/chapters/semantics).

The components are designed for Codex Marketplace but they can be customized with CSS variables at the global level or at the component level (class or style).

## Prerequisites

- Node 18+

## Install

Run the npm install command:

```
npm install
```

## Run

```
npm run storybook
```

## Build

### Storybook

```
npm run build-storybook
```

The files are generated under the folder storybook-static.

You can preview by using the command:

```
npm run preview
```

### Components

In order to build the components library you need for to clone the [Codex SDK](https://github.com/codex-storage/codex-js) (it's currently in early stage so it is not published yet to the npm registry).

Follow the instructions to install and build the SDK, then run this command in the SDK repository:

```
npm link
```

Now in the current repository, you'll we able to link your local SDK build by running:

```
npm link @codex/sdk-js
```

You can finally build the Components by running:

```
npm run build
```
