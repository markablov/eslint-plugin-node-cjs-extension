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

## Rule

Main goal is to enforce the style of file extensions in `require()` declarations

### Options

```json
{
    "rules": {
        "node-cjs-extension/require-cjs-extension": ["error", "always" or "never"]
    }
}
```

`always` - to force usage of file extensions (option is set to that by default)

Correct code:
```
/* eslint node-cjs-extension/require-cjs-extension: ["error", "always"] */

require("./path/to/a/file.js");
```

Incorrect code:
```
/* eslint node-cjs-extension/require-cjs-extension: ["error", "always"] */

require("./path/to/a/file");
```

`never` - to force skipping file extensions

```
/* eslint node-cjs-extension/require-cjs-extension: ["error", "never"] */

require("./path/to/a/file");
```

Incorrect code:
```
/* eslint node-cjs-extension/require-cjs-extension: ["error", "never"] */

require("./path/to/a/file.js");
```




