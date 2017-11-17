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
  it("compiles a component - escape", () => {
    return rollup({
      input: "sample/a.ejs",
      plugins: [jst()]
    }).then(executeBundle);
  });

  it("compiles a component - noescape", () => {
    return rollup({
      input: "sample/b.ejs",
      plugins: [jst()]
    }).then(executeBundle);
  });
});
