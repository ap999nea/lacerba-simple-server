import express from "express";

const app = express();

let cnt = 0;

app.get("/", (req, res) => {
  cnt += 1;
  console.log(req.query);
  return res.send(
    "<h1>Ciao Lacerba</h1><p>Hai cercato questo sito" + cnt + "</p>"
  );
});

app.get("/greetings/:name", (req, res) => {
  const name: string = req.params.name;
  return res.send(
    "<h1>Ciao " + name + "</h1><p>Questa è la pagina greeting!</p>"
  );
});

app.get("/ciao", (req, res) => {
  return res.send("<h1>Ciao Lacerba</h1><p>Questa è la pagina ciao!</p>");
});

app.get("/sum/:n1/:n2", (req, res) => {
  const n1 = Number(req.params.n1);
  const n2 = Number(req.params.n2);
  return res.send("<h1>" + n1 + "+" + n2 + "</h1><p>" + (n1 + n2) + "</p>");
});

app.get("/diff/:n1/:n2", (req, res) => {
  const n1 = Number(req.params.n1);
  const n2 = Number(req.params.n2);
  return res.send("<h1>" + n1 + "+" + n2 + "</h1><p>" + (n1 - n2) + "</p>");
});

app.get("*", (req, res) => {
  return res.status(404).send("<h1>404</h1><p>Pagina non trovata!</p>");
});

app.listen(3000, () => {
  console.log("🚀 Server started at http://localhost:3000");
});
