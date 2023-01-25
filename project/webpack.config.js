module.exports = {
    entry: "./src/ts/AppLucaLan.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: "./bundle.js",
        path: __dirname + '/dist'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }
}