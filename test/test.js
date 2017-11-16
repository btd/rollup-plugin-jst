import * as assert from 'assert';
import { rollup } from 'rollup';
import jst from '..';

process.chdir( __dirname );

function executeBundle( bundle ) {
  const generated = bundle.generate({
    format: 'cjs'
  });

  console.log(generated.code);

}

describe( 'rollup-plugin-jst', () => {
  it( 'compiles a component - escape', () => {
    return rollup({
      entry: 'sample/a.ejs',
      plugins: [ jst() ]
    }).then( executeBundle );
  });

  it( 'compiles a component - noescape', () => {
    return rollup({
      entry: 'sample/b.ejs',
      plugins: [ jst() ]
    }).then( executeBundle );
  });

  it( 'compiles a component - htmlclean', () => {
    return rollup({
      entry: 'sample/c.ejs',
      plugins: [ jst({ minify: true, minifyOptions: { collapseWhitespace: true } }) ]
    }).then( executeBundle );
  });
});
