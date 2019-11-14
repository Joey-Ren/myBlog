module.exports = {
  extends: [
    'stylelint-config-recommended',
    // https://github.com/bjankord/stylelint-config-sass-guidelines
    'stylelint-config-sass-guidelines',
    'stylelint-config-prettier'
  ],
  plugins: ['@zto_module/stylelint-config-ts-sass'],
  rules: {
    //! avoid add stylistic rules
  }
}
