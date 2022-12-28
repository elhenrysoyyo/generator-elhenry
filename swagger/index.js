const Generator = require('yeoman-generator');

module.exports = class Swagger extends Generator {
  copying () {
    this.log('Swagger features!')
    this.fs.copyTpl (
      this.templatePath('./swagger.'.concat(this.options.language)),
      this.destinationPath('./src/config/swagger.'.concat(this.options.language)),
      { appname: this.options.appName }
    )
    this.fs.write('./docs/swagger.json', '')
  }

  dependencies () {
    const pkgJson = {
      dependencies: {
        "swagger-ui-express": "^4.3.0"
      },
      devDependencies: {
        "swagger-autogen": "^2.21.0"
      },
      scripts: {
        "swagger-autogen": this.options.language === 'js' ? "node ./src/config/swagger.js" : "node ./dist/src/config/swagger.js"
      }
    }

    // Extend package.json
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  }
}
