module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"node": true,
		"jquery": true,
	},
	"globals": {
        "_": true,
        "UserProfile": true,
        "app" : true,
        "log" : true,
        'NODE_ENV': true,
    },
	"extends": ["eslint:recommended"],
	"installedESLint": true,
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"parser": "babel-eslint",
	"rules": {
		"strict": 0,
		"no-console": 0,
		"no-console": 0,
		"new-cap": 0,
		"strict": 0,
		"no-underscore-dangle": 0,
		"no-use-before-define": 0,
		"eol-last": 0,
		"quotes": [2, "single"],
	},
	// "rules": {
	//     "no-console": [
	//         "error", 
	//         { 
	//             allow: ["warn", "error", "log"]
	//         }
	//     ],
	//     "indent": [
	//         "warn",
	//         "tab",
	//         { "SwitchCase": 1 }
	//     ],
	//     "linebreak-style": [
	//         "off",
	//         "unix"
	//     ],
	//     "quotes": [
	//         "off",
	//     ],
	//     "semi": [
	//         "warn",
	//         "always"
	//     ]
	// }
};