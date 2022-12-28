const Generator = require('yeoman-generator');
const config = require('./config.json')

module.exports = class Eslint extends Generator {
  dependencies () {
    this.log("Applying Eslint!")
    const pkgJson = {
      devDependencies: config.devDependencies,
      scripts: {
        lint: `eslint ./src --ext .${this.options.language}`
      }
    }

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)
  }

  install () {
    this.npmInstall()
  }

  copyConfig () {
    this.fs.copyTpl(
      this.templatePath('./js/eslintrc.json'),
      this.destinationPath('./.eslintrc.json')
    )
  }
}
