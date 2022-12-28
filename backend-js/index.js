var Generator = require('yeoman-generator');
const config = require('./config.json');

module.exports = class Backend extends Generator {
  copying() {
    config.filesToCopy.forEach(({ input, output }) => {
      this.log(input)
      this.fs.copyTpl (
        this.templatePath(input),
        this.destinationPath(output),
        { sentry: !!this.options.sentry, swagger: !!this.options.swagger }
      )
    })
  }

  dependencies () {
    const pkgJson = {
      dependencies: config.dependencies,
      devDependencies: config.devDependencies
    }

    const scripts = {
      start: "node ./src/bin/www",
      dev: "nodemon ./src/bin/www"
    }

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), { "name": this.options.appName })
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)
    this.fs.extendJSON(this.destinationPath('package.json'), { scripts })
  }

  install() {
    this.npmInstall();
  }
};

