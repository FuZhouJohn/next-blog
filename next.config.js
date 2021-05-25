// @ts-check

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = {
    future: {
        webpack5: true,
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(png|jpe?g|gif)$/i,
            type: 'asset',
            generator: {
                filename: 'static/images/[hash][ext][query]',
                publicPath: '_next/',
            },
            parser: {
                dataUrlCondition: {
                    maxSize: 4 * 1024 // 4kb
                }
            }
        })

        return config
    },
}
