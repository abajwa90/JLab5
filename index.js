const express = require("express");
const path = require("path");

const library = require("./components/libraries");

const app = express();
const port = process.env.PORT || "2025";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//set up static path (for use with CSS, client-side JS, and image files)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  let data = await library.loadLibraries();
  response.render("index", { title: "Libraries", library: data });
});
// app.get("/library/:id", async (request, response) => {
//   let library = await libraries.getLibraryById(request.params.id);
//   response.render("library", { title: "Library", libaryData: library });
// }); 

//server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});