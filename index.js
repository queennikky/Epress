const express = require("express");
const app = express();
const port = 5000;
const mealRouter = require("./routes/mealRouter");

//app.get, app.delete, app.patch, app.put, app.set, app.listen,
//status code 200
// setting the view engine
app.set("view engine", "ejs");
//middleware
app.use(express.json()); //parse json data

app.use(mealRouter);
//get a single meal

//error route
// app.all("*", (req, res) => {
// res.status(404).render("error");
//});

app.use((req, res) => {
  res.status(404).render("Error");
});

app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
