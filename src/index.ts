import type { Rule, RuleMeta } from 'stylelint'
import { transformThemeString } from '@unocss/rule-utils'
import stylelint from 'stylelint'
import { loadTheme } from './config/index'

import { isString } from './utils'

const { createPlugin, utils } = stylelint
const { report, ruleMessages, validateOptions } = utils

const ruleName = 'stylelint-unocss-plugin/no-missconfigured-theme-fn'

// eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/no-potentially-useless-backreference
const themeFnRE = /theme\(\s*(['"])?(.*?)\1?\s*\)/g

const messages = ruleMessages(ruleName, {
  notFound: text => `token "${text}" is missing from the theme`,
  emptyArg: () => 'theme() expect a non-empty string argument',
})

const meta: RuleMeta = {
  url: 'https://github.com/andreyyolkin/stylelint-unocss-plugin',
  fixable: false,
}

const rule: Rule = (primaryOption, secondaryOptionObject) => {
  return async (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: primaryOption,
    }, {
      actual: secondaryOptionObject,
      possible: {
        path: [isString],
        cwd: [isString],
      },
      optional: true,
    })
    if (!validOptions)
      return
    const { path, cwd } = secondaryOptionObject ?? {}
    const theme = await loadTheme(cwd, path)

    if (!theme) {
      return
    }

    root.walkDecls((node) => {
      if (node.value.includes('theme(')) {
        const matches = Array.from(node.value.toString().matchAll(themeFnRE))
        if (!matches.length) {
          return
        }
        for (const match of matches) {
          const rawArg = match[2]
          if (!rawArg) {
            report({
              ruleName,
              result,
              node,
              message: messages.emptyArg(),
              word: 'theme',
            })
            return
          }
          if (transformThemeString(rawArg, theme, false)) {
            return
          }
          report({
            ruleName,
            result,
            node,
            message: messages.notFound(rawArg),
            word: node.value,
          })
        }
      }
    })
  }
}

rule.meta = meta
rule.ruleName = ruleName
rule.messages = messages

const noMissedToken = createPlugin(
  ruleName,
  rule,
)

export default noMissedToken
