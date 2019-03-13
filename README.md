Construct 3 Addon CLI
======================

A set of commands to manage Construct 3 addon development

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/c3-addon-cli.svg)](https://npmjs.org/package/c3-addon-cli)
[![Downloads/week](https://img.shields.io/npm/dw/c3-addon-cli.svg)](https://npmjs.org/package/c3-addon-cli)
[![License](https://img.shields.io/npm/l/c3-addon-cli.svg)](https://github.com/nagyv/c3-addon-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [Plans](#plans)
<!-- tocstop -->
# Usage

You can use this addon as an npx script too. e.g. `npx c3-addon-cli addAction myShinyAction`

<!-- usage -->
```sh-session
$ npm install -g c3-addon-cli
$ c3-addon-cli COMMAND
running command...
$ c3-addon-cli (-v|--version|version)
c3-addon-cli/0.0.1 win32-x64 node-v10.15.0
$ c3-addon-cli --help [COMMAND]
USAGE
  $ c3-addon-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`c3-addon-cli addCondition`](#c3-addon-cli-condition)
* [`c3-addon-cli addAction`](#c3-addon-cli-action)
* [`c3-addon-cli addExpression`](#c3-addon-cli-expression)
* [`c3-addon-cli help [COMMAND]`](#c3-addon-cli-help-command)

## `c3-addon-cli addCondition`

Add new condition

```
USAGE
  $ c3-addon-cli addCondition ID

ARGUMENTS
  ID  An identifier for the condition. This will be the scriptName too.

OPTIONS
  -h, --isHighlighted  Is highlighted
  -i, --isInvertible   Is invertible
  -t, --isTrigger      Is trigger
  --dryRun             Dry run. Don't write any changes to disk
```

_See code: [src\commands\addCondition.js](https://github.com/nagyv/c3-addon-cli/blob/v0.0.1/src\commands\addCondition.js)_

## `c3-addon-cli addAction`

Add new action

```
USAGE
  $ c3-addon-cli addAction ID

ARGUMENTS
  ID  An identifier for the action. This will be the scriptName too.

OPTIONS
  -h, --isHighlighted  Is highlighted
  --dryRun             Dry run. Don't write any changes to disk
```

_See code: [src\commands\addAction.js](https://github.com/nagyv/c3-addon-cli/blob/v0.0.1/src\commands\addAction.js)_

## `c3-addon-cli addExpression`

Add new expression

USAGE
  $ c3-addon-cli addExpression ID

ARGUMENTS
  ID  An identifier for the expression. This will be the scriptName too.

OPTIONS
  --dryRun  Dry run. Don't write any changes to disk
```

_See code: [src\commands\addExpression.js](https://github.com/nagyv/c3-addon-cli/blob/v0.0.1/src\commands\addExpression.js)_

## `c3-addon-cli help [COMMAND]`

display help for c3-addon-cli

```
USAGE
  $ c3-addon-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src\commands\help.ts)_
<!-- commandsstop -->

# Plans

1. Create boilerplate JS code too, not just JSON
1. Provide a generator template to start new plugin
1. Provide the cli functionality for behaviors and effects too

# License

MIT license. See LICENCE.md
