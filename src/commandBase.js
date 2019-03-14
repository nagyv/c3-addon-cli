const { cli } = require('cli-ux')
const {Command} = require('@oclif/command')
const fs = require('fs')
const {promisify} = require('util')

const writeFile = promisify(fs.writeFile)

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
    await this._writeBoilerplate(args, flags)
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
      await writeFile(path, data)
      this.log(msg)
    }
  }

  async _writeBoilerplate(args, flags) {
    const data = await readFile(path.join(process.cwd(), 'c3runtime', this.jsFile))
    const needle = new RegExp('// next item -- placeholder for c3-addon-cli')
    if(!needle.test(data.toString('utf-8'))) {
      this.log(`Could not add boilerplate js code to ${filePath}`)
      return
    }
    const splitData = data.toString('utf-8').split(needle)
    const newData = `${splitData[0]}"${args.id}": function ${args.id} {
        return true;
      },
      // next item -- placeholder for c3-addon-cli${splitData[1]}
    `
    await this._writeFile(filePath, newData, `Edited ${this.jsFile}`, flags)
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