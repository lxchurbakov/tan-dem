require('dotenv').config();

import paths from './paths';
import webpack from 'webpack';
import path from 'path';

export default {
    mode: 'development',
    entry: paths.frm + '/client.tsx',
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.css'],
        alias: {
            // '@': paths.src,
            // 'lib': paths.lib,
            // 'frm': paths.frm,
            'landing': paths.root,
            'docs': path.resolve(paths.root, '../docs'),
            'package': path.resolve(paths.root, '../package'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(ico|png|jpg|jpeg|svg)/,
                type: 'asset/resource',
                // generator: {
                //     filename: 'img/[name].[hash:8][ext]',
                // },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                // exclude: /node_modules/,
            },
        ],
    },
    output: {
        path: paths.static,
        filename: 'client.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.SELF_URL': JSON.stringify(process.env.SELF_URL),
            'process.env.STATIC_PREFIX': JSON.stringify(process.env.STATIC_PREFIX),
        }),
    ]
};
