const { cli } = require('cli-ux')
const {flags} = require('@oclif/command')
const BaseCommand = require('../commandBase')

class AddAction extends BaseCommand {
  async run() {
    this.class = AddAction
    await super.run()
  }

  async _writeAces(args, flags) {
    const acesPath = process.cwd() + '/aces.json'
    const aces = require(acesPath);
    const mainKey = Object.keys(aces)[0]
    aces[mainKey].actions.push({
      id: args.id,
      scriptName: args.id,
      params: this.generateParamsAcesPart(args.parameters)
    })
    this._writeFile(acesPath, JSON.stringify(aces, null, 2), "Aces has been written", flags)
  }

  async _writeLanguageFile(args, flags) {
    const translatedName = await cli.prompt("How should it be displayed in the event sheet?")
    const description = await cli.prompt("What should be the description on the UI?")
    
    const filePath = process.cwd() + '/lang/en-US.json'
    const data = require(filePath);
    const typeKey = Object.keys(data.text)[0]
    const addonKey = Object.keys(data.text[typeKey])[0]
    data.text[typeKey][addonKey].actions[args.id] = {
      "translated-name": translatedName,
      "description": description,
      "params": this.generateParamsLanguagePart(args.parameters)
    }
    this._writeFile(filePath, JSON.stringify(aces, null, 2), "Language has been written", flags)
  }
}

AddAction.description = `Add new action
`

AddAction.args = [
  {
    name: "id", 
    required: true,
    description: "An identifier for the action. This will be the scriptName too."
  }
]

AddAction.flags = {
  isHighlighted: flags.boolean({char: 'h', description: 'Is highlighted'}),
  dryRun: flags.boolean({description: "Dry run. Don't write any changes to disk"}),
}

module.exports = AddAction
