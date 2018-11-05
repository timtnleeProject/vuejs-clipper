module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended",'plugin:vue/essential'],
    // "parserOptions": {
    //     "ecmaVersion": 2016,
    //     "sourceType": "module"
    // },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ]
    }
};