import {writeFileSync} from 'fs'
import {sync as findUpSync} from 'find-up'

export default function eject(configType = 'js') {
  const packageJsonPath = findUpSync('package.json')
  const packageJson = require(packageJsonPath) // eslint-disable-line global-require

  let packageScriptsPath
  if (configType === 'yaml') {
    // TODO (martellaj): Get YAML.
  } else {
    packageScriptsPath = findUpSync('package-scripts.js')
  }

  const packageScripts = require(packageScriptsPath) // eslint-disable-line global-require
  packageJson.scripts = extractScripts(packageScripts.scripts)

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

function extractScripts(scripts) {
  const packageJsonScript = {}

  for (const scriptName in scripts) {
    if (scripts.hasOwnProperty(scriptName)) {
      const script = scripts[scriptName]
      extractScript(script, scriptName, packageJsonScript)
    }
  }

  return scripts
}

function extractScript(script, scriptName, packageJsonScript) { // eslint-disable-line complexity
  if (!script) {
    return
  }

  // Null out description.
  script.description = null

  // Get the default script.
  if (script.script) {
    packageJsonScript[scriptName] = script.script
    script.script = null
  } else if (script.default) {
    packageJsonScript[scriptName] = script.default.script || script.default
    script.default = null
  }

  // Get watch script if it exists.
  if (script.watch) {
    packageJsonScript[`${scriptName}-watch`] = script.watch.script || script.watch
    script.watch = null
  }

  // Check for nested scripts.
  for (const subscriptName in script) {
    if (script.hasOwnProperty(subscriptName)) {
      const subscript = script[subscriptName]
      extractScript(subscript, `${scriptName}-${subscriptName}`, packageJsonScript)
    }
  }
}
