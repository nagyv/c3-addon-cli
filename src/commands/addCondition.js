const { cli } = require('cli-ux')
const {flags} = require('@oclif/command')
const BaseCommand = require('../commandBase')

class AddCondition extends BaseCommand {
  async run() {
    this.class = AddCondition
    await super.run()
  }

  async _writeAces(args, flags) {
    const acesPath = process.cwd() + '/aces.json'
    const aces = require(acesPath);
    const mainKey = Object.keys(aces)[0]
    aces[mainKey].conditions.push({
      id: args.id,
      scriptName: args.id,
      isInvertible: flags.isInvertible,
      isTrigger: flags.isTrigger ? "true" : false,
      isHighlighted: flags.isHighlighted,
      params: this.generateParamsAcesPart(args.parameters)
    })
    this._writeFile(acesPath, JSON.stringify(aces, null, 2), "Aces has been written", flags)
  }

  async _writeLanguageFile(args, flags) {
    const listName = await cli.prompt("What should be the list name on the UI?")
    const description = await cli.prompt("What should be the description on the UI?")
    const displayText = await cli.prompt("How should it be displayed in the event sheet?")
    
    const filePath = process.cwd() + '/lang/en-US.json'
    const data = require(filePath);
    const typeKey = Object.keys(data.text)[0]
    const addonKey = Object.keys(data.text[typeKey])[0]
    data.text[typeKey][addonKey].conditions[args.id] = {
      "list-name": listName,
      "display-text": displayText,
      "description": description,
      "params": this.generateParamsLanguagePart(args.parameters)
    }
    this._writeFile(filePath, JSON.stringify(aces, null, 2), "Language has been written", flags)
  }
}

AddCondition.description = `Add new condition`

AddCondition.args = [
  {
    name: "id", 
    required: true,
    description: "An identifier for the condition. This will be the scriptName too."
  }
]

AddCondition.flags = {
  isInvertible: flags.boolean({char: 'i', description: 'Is invertible'}),
  isTrigger: flags.boolean({char: 't', description: 'Is trigger'}),
  isHighlighted: flags.boolean({char: 'h', description: 'Is highlighted'}),
  dryRun: flags.boolean({description: "Dry run. Don't write any changes to disk"}),
}

module.exports = AddCondition
