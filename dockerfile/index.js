const Generator = require('yeoman-generator');

module.exports = class Dockerfile extends Generator {
  copying () {
    this.log("Applying Dockerfile!")
    const origin = this.options.environment === 'js'
      ? 'dockerfile-js'
      : 'dockerfile-ts'

    this.fs.copyTpl (
      this.templatePath(origin),
      this.destinationPath('Dockerfile')
    )
  }
}
