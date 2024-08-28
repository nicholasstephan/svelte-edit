# Svelte Edit

An opinionated Svelte component library for composing websites from prebuild, editable, components. 



## Initial Setup

1. Create a [SvelteKit](https://kit.svelte.dev) project by running:

```bash
npm create svelte@latest my-app
```

Follow the instructions to create a new project.

2. Install this library:

```bash
npm install https://github.com/nicholasstephan/svelte-edit.git
```

3. Look at `src/routes` for an example of how to create a catch-ll route for the editor.



## Update

To update the library, simply install the latest version using:

```bash
npm install https://github.com/nicholasstephan/svelte-edit.git
```



## Theme


### CSS Variables

| Variable          | Default 
| ---               | ---
| --se-background   | #eeeeee
| --se-forground    | #424242
| --se-accent       | #aaaaaa


### Classes

#### `.se-block`

The `.se-block` container wraps each block. 



### Blocks

#### Paragraph

##### Classes

| Class           | Description
| ---             | ---
| .se-paragraph   | Paragraph text


#### Title

##### Classes

| Class           | Description
| ---             | ---
| .se-title       | Title text