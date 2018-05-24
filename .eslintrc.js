module.exports = {
  "extends": "airbnb",
  "rules": {
    "comma-dangle": 0,
    "function-paren-newline": ["error", "consistent"],
    "class-methods-use-this": "off",
    "no-nested-ternary": "off",
    "no-confusing-arrow": "off",
  },
  "settings": {
    "import/resolver": {
      "babel-module": {},
    },
  },
};
