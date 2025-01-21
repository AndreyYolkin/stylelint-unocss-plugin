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

### VS Code limitations

[vscode-stylelint](https://github.com/stylelint/vscode-stylelint) doesn't watch for changes in the uno file, so you'll need to restart Stylelint after changing the config.

To do this, you can press `Ctrl+Shift+P` and select `Stylelint: Restart Stylelint Server`.
