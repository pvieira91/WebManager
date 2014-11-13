var connect = require("connect");

console.log(__dirname);
var app = connect().use(connect.static(__dirname+"/../src"));

app.listen(8180);