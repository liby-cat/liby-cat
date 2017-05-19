module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/api/reCaptcha/siteKey', function(req, res) {
    console.log('> /api/reCaptcha/siteKey');
    let siteKey = process.env.LIBY_RE_CAPTCHA_SITE_KEY;
    res.send(siteKey);
  });
};
