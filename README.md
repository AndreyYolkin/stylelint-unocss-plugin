# stylelint-unocss-plugin
Set (in the future) of rules to extend unocss support in stylelint

## Install

```sh
pnpm install stylelint-unocss-plugin
```

```sh
npm install stylelint-unocss-plugin
```

```sh
yarn add stylelint-unocss-plugin
```

## Usage

### Default

```js
/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-unocss-plugin'],
  rules: {
    'stylelint-unocss-plugin/no-missconfigured-theme-fn': true,
  },
}
```

### With options

```js
/** @type {import('stylelint').Config} */
export default {
  plugins: ['stylelint-unocss-plugin'],
  rules: {
    'stylelint-unocss-plugin/no-missconfigured-theme-fn': [
      true,
      {
        cwd: 'path/to/projectRoot',
        path: 'uno.config.ts',
      },
    ],
  },
}
```

Currently, only `cwd` and `path` options are supported.

See: [UnoCSS Config](https://github.com/unocss/unocss/blob/919bdc43b5b650b73edec614220c9c3ff3758460/packages-engine/config/src/index.ts#L10-L15)

## Rules

### no-missconfigured-theme-fn

Highlights errors, caused by utilizing absent token inside `theme()` functions

#### Normal
<img width="564" alt="image" src="https://github.com/user-attachments/assets/bcf2ea2f-4b01-4750-907c-0a2eb0bdeab5" />

#### Error

<img width="616" alt="image" src="https://github.com/user-attachments/assets/48526337-76b5-4a9d-aa86-a8f642416f9b" />

## VS Code limitations

[vscode-stylelint](https://github.com/stylelint/vscode-stylelint) doesn't watch for changes in the uno file, so you'll need to restart Stylelint after changing the config.

To do this, you can press `Ctrl+Shift+P` and select `Stylelint: Restart Stylelint Server`.
