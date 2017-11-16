import { extname } from 'path';
import { createFilter } from 'rollup-pluginutils';

import template from 'lodash/template';
import { minify as minifyHtml } from 'html-minifier';


export default function( options = {} ) {
  const filter = createFilter( options.include, options.exclude );

  const extensions = options.extensions || [ '.html', '.ejs', '.jst' ];

  const templateOptions = options.templateOptions || { variable: 'data' };

  const minify = options.minify || false;

  const minifyOptions = options.minifyOptions || { };

  return {
    transform( code, id ) {
      if ( !filter( id ) ) {
        return null;
      }

      if ( !~extensions.indexOf( extname( id ) ) ) {
        return null;
      }

      if ( minify ) {
        code = minifyHtml(code, minifyOptions);
      }

      const tpl = template( code, templateOptions );

      let hasEscape = false;
      const source = tpl.source.replace(/__e = _.escape/, function() {
        hasEscape = true;
        return '__e = escape';
      });

      const intro = hasEscape ? "import escape from 'lodash-es/escape'" : "";

      return `
      ${intro}
      export default ${source}
      `;
    }
  };
}
