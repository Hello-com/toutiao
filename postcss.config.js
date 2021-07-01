/**
 * PostCSS 的配置文件
 * PostCSS 是基于 Node.js 运行的一个CSS的工具
 * 所以它的配置文件也是运行在Node.js中
 */


// PostCSS 配置文件需要导出一个对象
module.exports = {
    //配置要使用的相关插件
    plugins: {
        //自动添加浏览器厂商声明后缀，用来兼容不同的浏览器
        //VueCLI 已经在内部默认了，autoprefixer
        // 'autoprefixer': {
        //     // browsers 用来配置要兼容的系统(浏览器)环境
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },
        // 把 xp 转换为 rem
        'postcss-pxtorem': {
            rootValue: 37.5,
            // 需要转换的 css 属性 ， * 就是所有的意思 例如： ‘font-size’
            propList: ['*']
        }
    }
}