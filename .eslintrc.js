module.export = {
	parser: "@typesript-eslint/parser",
	extends: ["plugin:@typescript-eslint/recommend"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module", // Allow for the use of import/export
	},
	rule: {},
};
