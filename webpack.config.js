var pkg = require("./package.json");
var dirs = pkg.projectConfig.dirs;

module.exports = {
    entry: __dirname + "/" + dirs.src + "/assets/js/main.jsx",
    output: {
        publicPath: "/assets/js/",
        path: __dirname + "/" + dirs.dist + "/assets/js/",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {test: /\.jsx$/, loader: "jsx-loader?insertPragma=React.DOM"}
        ]
    }
};
