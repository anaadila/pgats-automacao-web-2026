const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Relatório Automation Exercise',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  video: true,
  chromeWebSecurity: false,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  e2e: {
    baseUrl: 'https://automationexercise.com',
    blockHosts: [
      "*.googlesyndication.com",
      "*.google-analytics.com",
      "*.doubleclick.net"
    ],
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
