import { extname } from 'path';
import { createFilter } from 'rollup-pluginutils';

import template from 'lodash/template';
import htmlclean from 'htmlclean';


export default function( options = {} ) {
  const filter = createFilter( options.include, options.exclude );

  const extensions = options.extensions || [ '.html', '.ejs', '.jst' ];

  const templateOptions = options.templateOptions || { variable: 'data' };

  const useHtmlclean = options.htmlclean || false;

  const htmlcleanOptions = options.htmlcleanOptions || { };

  return {
    transform( code, id ) {
      if ( !filter( id ) ) {
        return null;
      }

      if ( !~extensions.indexOf( extname( id ) ) ) {
        return null;
      }

      if ( useHtmlclean ) {
        code = htmlclean(code, htmlcleanOptions);
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
