// const superb = require('superb')

function firstLetterToUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the new addon',
        default: this.outFolder,
        filter: val => val.toLowerCase()
      },
      {
        name: 'description',
        message: 'Describe the addon in 1 sentence',
        default: `This is my shiny new addon`
      },
      {
        name: 'username',
        message: 'What is your GitHub username',
        default: this.gitUser.username || this.gitUser.name,
        filter: val => val.toLowerCase(),
        store: true
      },
      {
        name: 'email',
        message: 'What is your email?',
        default: this.gitUser.email,
        store: true
      },
      {
        name: 'website',
        message: 'The URL of your website',
        default({ username }) {
          return `https://github.com/${username}`
        },
        store: true
      },
      {
        name: 'id',
        message: 'Please provide a unique identifier',
        default({name, username}) {
          return `${firstLetterToUpperCase(username)}_${firstLetterToUpperCase(name)}`
        }
      }
    ]
  },
  actions: [
    {
      type: 'add',
      files: '**'
    },
    {
      type: 'move',
      patterns: {
        gitignore: '.gitignore'
      }
    }
  ],
  async completed() {
    this.gitInit()
    await this.npmInstall()
    this.showProjectTips()
    this.logger.tip("Please, copy your icon to the destination folder as icon.svg.")
  }
}
