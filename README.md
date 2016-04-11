# rollup-plugin-jst

Precompile lodash templates


## Installation

```bash
npm i -S lodash-es # if you use <%- %> escaping
npm i -D rollup-plugin-jst
```


## Usage

```js
import { rollup } from 'rollup';
import jst from 'rollup-plugin-jst';

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
      }
    })
  ]
}).then(...)
```

## License

MIT
