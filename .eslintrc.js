module.exports = {
    "root": true,
    "extends": ["google", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "semi": 2,
        "require-jsdoc": 0,
        "valid-jsdoc": [1, {
            "prefer": {
                "return": "returns"
            },
            "requireReturn": false
        }],
        "keyword-spacing": 2,
        "max-len": 0,
        "object-curly-spacing": [2, "always"]
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "plugins": [
        "react"
    ]
};