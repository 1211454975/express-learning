var express = require("express")
var handlebars = require('express-handlebars').create({defaultLayout:"main"});

var path = require("path");



var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views',  path.resolve(__dirname, "./views"));

app.set("port", process.env.PORT || 3000)

console.log("static===>",__dirname + '/public');

app.use(express.static(__dirname + '/public'));


app.get("/", (req,res) => {
	res.render("home")
})
var fortunes = [
"Conquer your fears or they will conquer you.",
"Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.",
"Whenever possible, keep it simple.",
];

app.get("/about", (req,res) => {
	var randomFortune =
		fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', { fortune: randomFortune });

})

app.use((req,res) => {
	res.type("text/plain");
	res.status(404)
	res.send("404 - Not Found")
})

app.listen(app.get("port"), () => {
	console.log("Express start on http://localhost:" +
		app.get("port") )
})