// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      '@stylistic/arrow-parens': ['error', 'always'],
      'vue/multi-word-component-names': ['off'],
      'no-case-declarations': ['off'],
    },
  },
)
