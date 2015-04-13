var React = require("react");
var Hello = require("./components/hello");

document.getElementsByTagName("html")[0].className = "js";

React.render(
    <Hello/>,
    document.getElementById("root")
);
