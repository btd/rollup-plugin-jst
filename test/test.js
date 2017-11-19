const { rollup } = require("rollup");
const jst = require("..");

process.chdir(__dirname);

function executeBundle(bundle) {
  return bundle
    .generate({
      format: "cjs"
    })
    .then(({ code }) => {
      console.log(code);
    });
}

describe("rollup-plugin-jst", () => {
  it("escape", () => {
    return rollup({
      input: "sample/a.ejs",
      plugins: [jst()]
    }).then(executeBundle);
  });

  it("noescape", () => {
    return rollup({
      input: "sample/b.ejs",
      plugins: [jst()]
    }).then(executeBundle);
  });

  it("htmlclean", () => {
    return rollup({
      input: "sample/c.ejs",
      plugins: [jst({ minify: true, minifyOptions: { collapseWhitespace: true } })]
    }).then(executeBundle);
  });

  it("other escape module", () => {
    return rollup({
      input: "sample/a.ejs",
      plugins: [jst({ escapeModule: "escape-html" })]
    }).then(executeBundle);
  });
});
