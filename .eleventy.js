const htmlmin = require('html-minifier')
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  /**
   * Upgrade helper
   * Uncomment if you need help upgrading to new major version.
   */
  //eleventyConfig.addPlugin(UpgradeHelper);

  /**
   * Files to copy
   * https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy('src/img')

  /**
   * Navigation Plugin
   * https://www.11ty.dev/docs/plugins/navigation/
   */
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  /**
   * HTML Minifier for production builds
   */
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_ENV == 'production' &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })



  return {
    dir: {
      input: "src",
      data: "../_data",
      layouts: '_layouts',
    }
  };
};