var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  async prompting() {
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname //Default to current folder name
      }, {
        type: "list",
        name: "type",
        message: "What language do you like use?",
        choices: [
          "js", "ts"
        ]
      }, {
        type: "list",
        name: "environment",
        message: "Select your environment?",
        choices: [
          "backend", "frontend"
        ]
      }, {
        type: "confirm",
        name: "hasSentry",
        message: "Would you like install Sentry?",
        when: (answers) => answers.environment === "backend"
      }, {
        type: "input",
        name: "sentryDSN",
        message: "type Sentry DSN",
        when: (answers) => answers.hasSentry
      }, {
        type: "confirm",
        name: "hasDockerfile",
        message: "Would you like add Dockerfile?",
      }, {
        type: "confirm",
        name: "hasSwagger",
        message: "Would you like install Swagger?",
        when: (answers) => answers.environment === "backend"
      }
    ])

    this.log("app name", answers.name);

    if (answers.environment === "backend") {
      if (answers.type === "js") {
        this.log('enjoy nodeJs');
        this.composeWith(require.resolve('../backend-js'), {
          sentry: !!answers.hasSentry,
          appName: answers.name,
          swagger: !!answers.hasSwagger
        })
      }
      if (answers.type === "ts") {
        this.log('enjoy nodeJs with Typescript');
        this.composeWith(require.resolve('../backend-ts'), {
          sentry: !!answers.hasSentry,
          appName: answers.name,
          swagger: !!answers.hasSwagger
        })
      }
    }

    if (answers.environment === "frontend") {
      this.log("enjoy react");
      this.composeWith(require.resolve('../frontend-ts'),{
        appName: answers.name,
      });
    }

    if (answers.hasSentry) {
      this.composeWith(require.resolve('../sentry'), { dsn: answers.sentryDSN, language: answers.type })
    }

    if (answers.hasDockerfile) {
      this.composeWith(require.resolve('../dockerfile'), { environment: answers.type })
    }
    
    // lint
    this.composeWith(require.resolve('../eslint'), { language: answers.type })

    // swagger
    if (answers.hasSwagger) {
      this.composeWith(require.resolve('../swagger'), { language: answers.type, appName: answers.name })
    }
  }
};
