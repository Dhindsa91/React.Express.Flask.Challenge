require("@babel/register")({
    presets: [
        '@babel/preset-env',
     ],
    ignore: ["node_modules"]
});
require("@babel/polyfill");
require("./app.js");
