import { extname } from 'path';
import { createFilter } from 'rollup-pluginutils';

import template from 'lodash/template';


export default function( options = {} ) {
  const filter = createFilter( options.include, options.exclude );

  const extensions = options.extensions || [ '.html', '.ejs', '.jst' ];

  const templateOptions = options.templateOptions || { variable: 'data' };

  return {
    transform( code, id ) {
      if ( !filter( id ) ) {
        return null;
      }

      if ( !~extensions.indexOf( extname( id ) ) ) {
        return null;
      }

      const tpl = template( code, templateOptions );

      const source = tpl.source;

      const intro = /__e = _.escape/.test(source) ?
        `
        import escape from 'lodash-es/escape';
        var _ = { escape: escape };
        `:
        '';

      return `
      ${intro}
      export default ${source}
      `;
    }
  };
}
