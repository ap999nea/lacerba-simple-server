"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
let cnt = 0;
let posts = [
    {
        title: "first post",
        date: new Date(),
        body: "This is my first post",
        id: 0,
        draft: false,
    },
    {
        title: "second post",
        date: new Date(),
        body: "This is my second post",
        id: 1,
        draft: false,
    },
];
app.get("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        return res.status(404).send({ msg: "Page not found" });
    }
    return res.send({ posts });
});
app.delete("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const postToDelete = posts.find((post) => post.id === id);
    if (!postToDelete) {
        return res.status(404).send({ msg: "Page not found" });
    }
    posts = posts.filter((post) => post.id !== id);
    return res.send(postToDelete);
});
app.put("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const postData = req.body;
    let postToUpdateIndex = posts.findIndex((post) => post.id === id);
    if (!posts[postToUpdateIndex]) {
        return res.status(404).send({ msg: "Page not found" });
    }
    posts[postToUpdateIndex] = Object.assign(Object.assign({}, posts[postToUpdateIndex]), { title: postData.body, body: postData.body });
    return res.send(posts[postToUpdateIndex]);
});
app.post("/posts/:id", (req, res) => {
    const postData = req.body;
    const lastPost = posts[posts.length - 1];
    const newPost = {
        id: lastPost ? lastPost.id + 1 : 0,
        date: new Date(),
        title: postData.title,
        draft: false,
        body: postData.body,
    };
    posts.push(newPost);
    return res.send(newPost);
});
app.get("/", (res, req) => {
    cnt += 1;
    return req.send({ hello: "world", cnt });
});
app.post("/", (res, req) => {
    cnt += -1;
    return req.send({ hello: "world", cnt });
});
app.post("/reply", (req, res) => {
    const body = req.body;
    console.log(body);
    return res.send({ body: body });
});
app.get("*", (req, res) => {
    return res.status(404).send("<h1>404</h1><p>Pagina non trovata!</p>");
});
const port = 3000;
app.listen(port, () => console.log("🚀Server started at http://localhost:3000"));
