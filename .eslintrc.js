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
        "valid-jsdoc": [2, {
            "prefer": {
                "return": "returns"
            },
            "requireReturn": false
        }],
        "jsx-uses-vars": true,
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