require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        'simple-import-sort/sort': 'error',
        'sort-imports': 'off',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'off',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                quoteProps: 'consistent',
            },
        ],
    },
};
