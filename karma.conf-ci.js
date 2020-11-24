module.exports = function (config) {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
    process.exit(1)
  }

  // Browsers to run on Sauce Labs
  // Check out https://saucelabs.com/platforms for all browser/OS combos
  const customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: 'latest'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: 'latest'
    },
    "ios-latest": {
      base: 'SauceLabs',
      deviceName: "iPhone X Simulator",
      browserName: "Safari",
      platformVersion: "13.2",
      platformName: "iOS",
      appiumVersion: "1.17.1"
    }
  };

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/*.js',
      'test/*.js'
    ],
    reporters: ['progress', 'saucelabs'],
    port: 9876,
    colors: true,
    sauceLabs: {
      testName: 'Karma and Sauce Labs demo',
      recordScreenshots: false,
      connectOptions: {
        logfile: 'sauce_connect.log'
      },
    },
    logLevel: 'DEBUG',
    // Increase timeout in case connection in CI is slow
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    singleRun: true
  })
};
