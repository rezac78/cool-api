const xssFilters = require("xss-filters");
function sanitizeInput(input) {
  return typeof input === "string" ? xssFilters.inHTMLData(input) : input;
}
module.exports = sanitizeInput;
