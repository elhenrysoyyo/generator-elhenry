const Generator = require('yeoman-generator');
const config = require('./config.json');

module.exports = class FrontEnd extends Generator {
  copying () {
    config.filesToCopy.forEach(({ input, output }) => {
      this.log(input);
      this.fs.copyTpl (
        this.templatePath(input),
        this.destinationPath(output)
      )
    })
  }

  dependencies () {
    const pkgJson = {
      dependencies: config.dependencies,
      devDependencies: config.devDependencies,
      scripts: config.scripts
    }
    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), { "name": this.options.appName })
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)
  }

  install () {
    this.npmInstall();
  }
}
