const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    reporter: 'spec',

    setupNodeEvents(on, config) {
      allureWriter(on, config)
      return config
    },

    env: {
      allure: true,
      allureResultsPath: 'allure-results',
      baseUrl: 'https://automationexercise.com',
      apiUrl: 'https://automationexercise.com/api',
    },

    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  }
})
