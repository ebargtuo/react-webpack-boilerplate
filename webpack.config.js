var pkg = require("./package.json");
var dirs = pkg.projectConfig.dirs;

module.exports = {
    entry: __dirname + "/" + dirs.src + "/assets/js/main.jsx",
    output: {
        publicPath: "/assets/js/",
        path: __dirname + "/" + dirs.dist + "/assets/js/",
        filename: "[name].js"
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    module: {
        loaders: [
            {test: /\.jsx$/, loader: "jsx-loader?insertPragma=React.DOM"}
        ]
    },
    devServer: {
        contentBase: dirs.dist,
        publicPath: "/assets/js/",
        stats: {colors: true}
    }
};
