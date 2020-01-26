const { format } = require("date-fns");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/styles");
  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return format(dateObj, "dd LLL yyyy");
  });
};
