const path = require('path');

const NODE_TYPE_LITERAL = 'Literal';

/*
 * List of internal modules - https://github.com/nodejs/node/blob/master/node.gyp#L29
 * They are normalized at https://github.com/nodejs/node/blob/master/tools/js2c.py#L125
 * Module could be required by user if id is not started with 'internal/'
 *   (https://github.com/nodejs/node/blob/master/lib/internal/bootstrap/loaders.js#L169)
 * Also some modules are excluded (https://github.com/nodejs/node/blob/master/src/node_native_module.cc#L76)
 */
const NATIVE_MODULES = [
  'async_hooks', 'assert', 'buffer', 'child_process', 'console', 'constants', 'crypto', 'cluster', 'dgram', 'dns',
  'domain', 'events', 'fs', 'http', 'http2', '_http_agent', '_http_client', '_http_common', '_http_incoming',
  '_http_outgoing', '_http_server', 'https', 'inspector', 'module', 'net', 'os', 'path', 'perf_hooks', 'process',
  'punycode', 'querystring', 'readline', 'repl', 'stream', '_stream_readable', '_stream_writable', '_stream_duplex',
  '_stream_transform', '_stream_passthrough', '_stream_wrap', 'string_decoder', 'timers', 'tls', '_tls_common',
  '_tls_wrap', 'trace_events', 'tty', 'url', 'util', 'v8', 'vm', 'worker_threads', 'zlib',
];

/*
 * Checks if "id" points to file at node_modules/ directory
 *
 * Based on https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js#L804
 */
const isFromNodeModules = (id) => (
  id[0] !== '.' || (id.length > 1 && id[1] !== '.' && id[1] !== '/' && (process.platform !== 'win32' || id[1] !== '\\'))
);

/*
 * Check if argument of require() is relative path without or with extension
 */
const checkRequirePath = (context, node) => {
  const idNode = node.arguments[0];
  // we don't want to analyze dynamic require paths, that's too complex
  if (idNode.type !== NODE_TYPE_LITERAL) {
    return;
  }

  const id = idNode.value;
  if (NATIVE_MODULES.includes(id) || isFromNodeModules(id)) {
    return;
  }

  const requireExtension = (context.options[0] || 'always') === 'always';
  const extensionExists = !!path.extname(id);

  if (requireExtension && !extensionExists) {
    context.report({ node, messageId: 'missingExtension', data: { id } });
  } else if (!requireExtension && extensionExists) {
    context.report({ node, messageId: 'redundantExtension', data: { id } });
  }
};

/*
 * Return rules
 */
const create = (context) => ({
  'CallExpression[callee.name="require"]': (node) => checkRequirePath(context, node),
});

module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Consistent CJS module requires in node.js code',
      category: 'Node.js and CommonJS',
      recommended: false,
      url: 'https://github.com/markablov/eslint-plugin-node-cjs-extension',
    },
    schema: [{ enum: ['always', 'never'] }],
    messages: {
      missingExtension: 'Extension for required CJS module "{{ id }}" is missing',
      redundantExtension: 'Extension for required CJS module "{{ id }}" is redundant',
    },
  },

  create,
};
