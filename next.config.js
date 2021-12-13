const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  env: {
    FACEBOOK_PIXEL_ID: process.env.FACEBOOK_PIXEL_ID,
  },
});
