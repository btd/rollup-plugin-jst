# rollup-plugin-jst

Precompile lodash templates to javascript. It uses lodash-es/escapa for escaping capabilities. So it should be installed
in dev dependencies.

## Installation

```bash
npm i -S lodash-es # if you use <%- %> escaping
npm i -D rollup-plugin-jst rollup-plugin-node-resolve
```

## Usage Example

```js
import { rollup } from 'rollup';
import jst from 'rollup-plugin-jst';
import resolve from 'rollup-plugin-node-resolve';

rollup({
  entry: 'src/main.js',
  plugins: [
    jst({
      // By default, all .html, .jst, .ejs files are compiled
      extensions: [ '.html', '.ejs' ],

      // You can restrict which files are compiled
      // using `include` and `exclude`
      include: 'src/components/**.html',

      // You can pass options to _.template(code, templateOptions)
      templateOptions: {
        variable: 'data' // default variable for template is 'data',
      },

      // You can enable HTML minification before the template is compiled
      // by default turned off
      minify: true,

      // You can pass options to HTMLMinifier
      // see github.com/kangax/html-minifier for documentation
      minifyOptions: {
        collapseWhitespace: true
      },

      // if you do not want to use lodash-es/escape for some reason
      // (e.g because it is quite huge for just escape function)
      // you can set which module to use - it should have single default export
      // you should care about correct resolving and handing of this file
      // if it is not using modules
      escapeModule: 'escape-html'
    }),
    resolve({
      module: true,
      main: true
    })
  ]
}).then(...)
```

## License

MIT
