/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1562510546409_8514';

    // add your middleware config here
    config.middleware = [];
    config.cluster = {
        listen: {
            port: 7002,
        }
    }
    config.security = {
        csrf: {
            enable: false,
        },
        //   csrf: {
        //     ignore: '/registered',
        //     xframe: {
        //         enable: false,
        //     },
        //   },
        // csrf: {
        //     // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
        //     ignore: ctx => isInnerIp(ctx.ip),
        // }
    };
    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    return {
        ...config,
        ...userConfig,
    };
};
