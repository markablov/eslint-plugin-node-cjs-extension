const { RuleTester } = require('eslint');

const rule = require('../../lib/rules/require-cjs-extension.js');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2020 } });

ruleTester.run('require-cjs-extension', rule, {
  valid: [
    {
      code: 'require("http");',
      options: ['always'],
    },
    {
      code: 'require("eslint");',
      options: ['always'],
    },
    {
      code: 'require("./module.js");',
      options: ['always'],
    },
    {
      code: 'require("./module");',
      options: ['never'],
    },
  ],
  invalid: [
    {
      code: 'require("./module");',
      options: ['always'],
      errors: [{ messageId: 'missingExtension' }],
    },
    {
      code: 'require("./module");',
      errors: [{ messageId: 'missingExtension' }],
    },
    {
      code: 'require("./module.js");',
      options: ['never'],
      errors: [{ messageId: 'redundantExtension' }],
    },
  ],
});
