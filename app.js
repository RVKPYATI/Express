const express = require("express");
const expressHandlebars = require("express-handlebars").engine;
const chalk = require("chalk");

const fortunes = [
  "Победи свои страхи, или они победят тебя.",
  "Рекам нужны истоки.",
  "Не бойся неведомого.",
  "Тебя ждет приятный сюрприз.",
  "Будь проще везде, где только можно.",
];

const app = express();

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

const PORT = process.env.PORT || 3000;

//page 404 not found
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render("about", { fortune: randomFortune });
});

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

//page error server 500

app.use((err, req, res, next) => {
  console.log(chalk.red(err.message));
  res.status(500);
  res.render("500");
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server started on Express port: ${PORT}`));
});
