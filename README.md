# eslint-plugin-node-cjs-extension

Check consistency in require() usage - load CJS modules with or without extensions.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-node-cjs-extension`:

```
$ npm install eslint-plugin-node-cjs-extension --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-node-cjs-extension` globally.

## Usage

Add `node-cjs-extension` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "node-cjs-extension"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "node-cjs-extension/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





