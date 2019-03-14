const {Command} = require('@oclif/command')
const sao = require('sao')
const path = require('path')


class InitAction extends Command {
  async run() {
    const {args, flags} = this.parse(this.class)
    const app = sao({
      generator: path.join(__dirname, '..', 'generator'),
      outDir: args.outDir
    })
    app.run()
  }
}

InitAction.description = `Start a new C3 plugin
`

InitAction.args = [
  {
    name: "outDir", 
    required: true,
    description: "The output directory for the new C3 plugin code"
  }
]

module.exports = InitAction