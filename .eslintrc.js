module.exports = {
	extends: ['@react-native-community', 'plugin:prettier/recommended', 'plugin:react/jsx-runtime'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],
	root: true,
	rules: {
		'@typescript-eslint/no-shadow': ['error'],
		'prettier/prettier': 1
	}
}
