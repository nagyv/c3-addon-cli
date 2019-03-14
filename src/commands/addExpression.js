const { cli } = require('cli-ux')
const {flags} = require('@oclif/command')

const BaseCommand = require('../commandBase')

class AddExpression extends BaseCommand {
  async run() {
    this.hasReturnType = true
    this.class = AddExpression
    this.jsFile = 'expressions.js'
    await super.run()
  }

  async _writeAces(args, flags) {
    const acesPath = process.cwd() + '/aces.json'
    const aces = require(acesPath);
    const mainKey = Object.keys(aces)[0]
    aces[mainKey].actions.push({
      id: args.id,
      expressionName: args.id,
      params: this.generateParamsAcesPart(args.parameters),
      returnType: args.returnType
    })
    await this._writeFile(acesPath, JSON.stringify(aces, null, 2), "Aces has been written", flags)
  }

  async _writeLanguageFile(args, flags) {
    const listName = await cli.prompt("What should be the list name on the UI?")
    const description = await cli.prompt("What should be the description on the UI?")
    const displayText = await cli.prompt("How should it be displayed in the event sheet?")
    
    const filePath = process.cwd() + '/lang/en-US.json'
    const data = require(filePath);
    const typeKey = Object.keys(data.text)[0]
    const addonKey = Object.keys(data.text[typeKey])[0]
    data.text[typeKey][addonKey].actions[args.id] = {
      "list-name": listName,
      "display-text": displayText,
      "description": description,
      "params": this.generateParamsLanguagePart(args.parameters)
    }
    await this._writeFile(filePath, JSON.stringify(aces, null, 2), "Language has been written", flags)
  }
}

AddExpression.description = `Add new expression
`

AddExpression.args = [
  {
    name: "id", 
    required: true,
    description: "An identifier for the expression. This will be the scriptName too."
  }
]

AddExpression.flags = {
  dryRun: flags.boolean({description: "Dry run. Don't write any changes to disk"}),
}

module.exports = AddExpression
