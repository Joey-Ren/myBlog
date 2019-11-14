module.exports = {
  root: true,
  parserOptions: {
    // https://eslint.vuejs.org/user-guide/#usage
    parser: 'babel-eslint',
    ecmaVersion: 2019
  },
  env: {
    //...
  },
  extends: ['@zto_module/eslint-config-ts-vue'],
  // check if imports actually resolve
  // settings: {
  //   'import/resolver': {
  //     webpack: {
  //       config: 'build/webpack.base.conf.js'
  //     }
  //   }
  // },
  globals: {
    //...
  },
  // add your custom rules here
  // it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    //! avoid add stylistic rules
  }
}
