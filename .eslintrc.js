module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "comma-dangle": 0,
    "function-paren-newline": ["error", "consistent"],
    "class-methods-use-this": "off",
    "no-nested-ternary": "off",
    "no-confusing-arrow": "off",
    "react/forbid-prop-types": "on",
    "no-underscore-dangle": "off" ,
    "jsx-a11y/anchor-is-valid": [ "error", { "components": [ "Link" ], "specialLink": [ "to" ] } ],
    "no-param-reassign": ["error", { "props": false }],
    "react/require-default-props": "off",
  },
  "settings": {
    "import/resolver": {
      "babel-module": {},
    },
  },
};
