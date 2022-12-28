const Generator = require('yeoman-generator');

module.exports = class Sentry extends Generator {
  copying () {
    this.log("Sentry features!")
    this.fs.copyTpl (
      this.templatePath('./sentry.'.concat(this.options.language)),
      this.destinationPath('./src/config/sentry.'.concat(this.options.language)),
      { dsn: this.options.dsn }
    )
  }

  depedencies () {
    const pkgJson = {
      dependencies: {
        "@sentry/node": "^6.0.0",
        "@sentry/tracing": "^6.0.0"
      }
    }

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  }

  install () {
    this.npmInstall();
  }
}
