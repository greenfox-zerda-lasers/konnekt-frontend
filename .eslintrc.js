module.exports = {
      "extends": "airbnb-base",
      "plugins": [
          "import"
      ],
        "globals": {
          "document": true,
          "foo": true,
          "window": true
        },
      "modules": false,
      "rules": {
        "no-var": "off",
        "no-console": "off",
        "strict": "off",
        "vars-on-top": "off",
        "func-names": "off",
        "prefer-arrow-callback": "off",
        "no-trailing-spaces": "off",
        "no-unused-expressions": "off",
        "padded-blocks": "off",
        "wrap-iife": "off",
        "object-shorthand": "off",
        "no-unused-vars": 1
      },
      "env": {
        "es6": true,
        "node": true,
        "mocha": true
      }

};
