const fs = require('fs')
const path = require('path')
const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const {
  addCucumberPreprocessorPlugin
} = require('@badeball/cypress-cucumber-preprocessor')
const {
  createEsbuildPlugin
} = require('@badeball/cypress-cucumber-preprocessor/esbuild')

const arquivoCredenciais = path.join(__dirname, '.credenciais.json')

const lerCredenciais = () =>
  fs.existsSync(arquivoCredenciais)
    ? JSON.parse(fs.readFileSync(arquivoCredenciais, 'utf8'))
    : {}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    expose: {
      apiUrl: 'https://serverest.dev'
    },
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)
      on(
        'file:preprocessor',
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      )
      on('task', {
        lerCredenciais: () => lerCredenciais(),
        salvarCredenciais: ({ email, senha }) => {
          const credenciais = { ...lerCredenciais(), [email]: senha }
          fs.writeFileSync(arquivoCredenciais, JSON.stringify(credenciais, null, 2))
          return null
        }
      })
      return config
    }
  }
})
