const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const fileUpload = require('express-fileupload');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json())

app.use(fileUpload());

let courses = [
    {
        id: "11",
        name: "learn ReactJS",
        price: 2999,
    },
    {
        id: "22",
        name: "learn C++",
        price: 2929,
    },
    {
        id: "33",
        name: "learn java",
        price: 2909,
    },
    {
        id: "44",
        name: "learn Python",
        price: 2709,
    },
    {
        id: "55",
        name: "learn Node JS",
        price: 2909,
    },
    {
        id: "66",
        name: "learn MongoDB",
        price: 2909,
    },
]

app.get("/", (req, res) => {
    res.send("hello world")
})

app.get("/api/v1/lco", (req, res) => {
    res.send("hello world from our side")
})

app.get("/api/v1/lcoobject", (req, res) => {
    res.send({ id: "55", name: "Learn BAckend", price: 99 });
})

app.get("/api/v1/courses", (req, res) => {
    res.send(courses);
})

app.get("/api/v1/lcocourse/:courseId", (req, res) => {
    const lcocourse = courses.find((course) => course.id === req.params.courseId);
    res.send(lcocourse);
})

app.post("/api/v1/addCourse", (req, res) => {
    console.log(req.body);
    courses.push(req.body);
    res.send(true);
})

app.get("/api/v1/courseQuery", (req, res) => {
    let location = req.query.location;
    let device = req.query.device;
    res.send({ location, device });
})

app.post("/api/v1/courseUpload", (req, res) => {
    console.log(req.headers);
    const file = req.files.file;
    let path = __dirname + "/images/" + Date.now() + ".jpg";

    file.mv(path, (err) => {
        res.send(true);
    });
})

app.listen(4000, () => console.log('server is listen port 4000'));