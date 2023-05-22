module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init', // initialization
        'feat', // new function (feature)
        'fix', // fix the bug
        'docs', // documentation (documentation)
        'style', // format, style (changes that do not affect code execution)
        'refactor', // refactoring (that is, not a new feature, nor a modified BUG code)
        'perf', // Optimization related, such as improving performance and experience
        'test', // add test
        'build', // Compilation-related changes, changes to project builds or dependencies
        'ci', // continuous integration changes
        'chore', // build process or helper tool changes
        'revert', // rollback to previous version
        'workflow', // workflow improvements
        'mod', // Modification of undefined category
        'wip', // under development
        'types', // type modification
        'release' // version release
      ]
    ],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never']
  }
}