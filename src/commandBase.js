const { cli } = require('cli-ux')
const {Command} = require('@oclif/command')
const fs = require('fs')

class BaseCommand extends Command {
  async run() {
    const {args, flags} = this.parse(this.class)
    args.parameters = []
    let hasParameters = await cli.confirm("Expression has parameters?", )
    while(hasParameters) {
      let param = await this._getParam()
      args.parameters.push(param)
      hasParameters = param.moreParams
    }
    if(this.hasReturnType) {
      args.returnType = await cli.prompt("What is the return type?", )
    }
    await this._writeAces(args, flags)
    await this._writeLanguageFile(args, flags)
  }

  async _getParam () {
    const paramName = await cli.prompt('Human readable name of the parameter')
    const paramDescription = await cli.prompt('Description of the parameter')
    const paramId = await cli.prompt('Parameter id')
    const paramType = await cli.prompt('Parameter type')
    const moreParams = await cli.confirm("Add another parameter?", )

    return {paramName, paramDescription, paramId, paramType, moreParams}
  }

  async _writeFile(path, data, msg, flags) {
    if (flags.dryRun) {
      this.log(`Not writing file ${path} with data ${data}`)
    } else {
      await fs.writeFile(path, data)
      this.log(msg)
    }
  }

  generateParamsAcesPart(params) {
    return params.map(p => ({
      "id": p.paramId,
      "type": p.paramType
    }))
  }

  generateParamsLanguagePart(params) {
    let parsed = {}
    for(let p in params) {
      parsed[p.paramId] = {
        name: p.paramName,
        desc: p.paramDescription
      }
    }
  }
}

module.exports = BaseCommand