# Errors and Warnings

If you were directed here, you probably saw a warning or error in your console when using `p-s` for your npm scripts.

## Unable to find config

This happens when you either:

1. Don't have a `package-scripts.yml` or `package-scripts.js` file in your project
2. Specified a config with the `-c` or `--config` flag and it doesn't exist

### To fix:

Make sure that you either have a `package-scripts.yml`, `package-scripts.js` file in your project or that you use the `-c`/`--config` flag to
point to a file that actually exists.

## Missing script

This happens if you specify a script name that can't be resolved to a script. See the docs/examples for how you can
define scripts and how they can be referenced.

## Unable to preload module

This happens when you use the `--require` flag and the module you specify cannot be resolved.

### To fix:

1. Check that you spelled the module correctly
2. Check that the module you wish to require is require-able

## Failed with exit code

This means that one of the scripts p-s tried to run resulted in a non-zero exit code (a failing exit code)

### To Fix:

Try to run the script without `p-s` and verify that the script is working. If not, fix that. If it's working without `p-s` it could be a problem with `p-s`. Please file an issue.

## Emitted an error

This means that the child process for the specified script emitted an error.

### To Fix:

Look at the error and try to figure out why the script would be failing.

Try to run the script without `p-s` and verify that the script is working. If not, fix that. If it's working without `p-s` it could be a problem with `p-s`. Please file an issue.
