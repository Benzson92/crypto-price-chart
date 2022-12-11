module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'es2021',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-unused-vars': [
			2,
			{
				argsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
		'react/prop-types': 0,
		camelcase: 0,
		'max-len': 0,
		'no-console': [1, { allow: ['warn', 'error'] }],
		'require-jsdoc': 0,
	},
};
