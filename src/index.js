const { extname } = require("path");
const { createFilter } = require("rollup-pluginutils");

const template = require("lodash/template");

export default function(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  const extensions = options.extensions || [".html", ".ejs", ".jst"];

  const templateOptions = options.templateOptions || { variable: "data" };

  return {
    transform(code, id) {
      if (!filter(id)) {
        return null;
      }

      if (!~extensions.indexOf(extname(id))) {
        return null;
      }

      const tpl = template(code, templateOptions);

      let hasEscape = false;
      const source = tpl.source.replace(/__e = _.escape/, () => {
        hasEscape = true;
        return "__e = escape";
      });

      const intro = hasEscape ? "import escape from 'lodash-es/escape'" : "";

      return `
      ${intro}
      export default ${source}
      `;
    }
  };
}
