
module.exports = [
    {
        test: /\.(js|jsx)$/,
        include: [
           '/src',
        ],
        exclude: [
           '/src/static',
           '/src/views',
           '/src/server.js',
           '/src/server.babel.js',
           '/src/server*',
        ],
        loader: 'babel-loader',
        options: {
            presets: ['es2015', 'react'],
        },
    },
];
