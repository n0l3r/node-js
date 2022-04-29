const http = require('http');
const server = http.createServer();

const PORT = 3000;

const students = [
    {
        "id": 1,
        "name": "Naufal Taufiq Ridwan",
        "age": 20,
    },
    {
        "id": 2,
        "name": "Naufal Angelos",
        "age": 21,
    },
    {
        "id": 3,
        "name": "Yasmine Nadia Putri",
        "age": 21,
    }
];

var id = 3;

server.on('request', (req, res) => {
    const url = req.url.split("/");
    const endPoint = url[1];

    if(endPoint == ""){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Learn HTTP APIs and Routing</h1>');

    } else if(endPoint === "students"){


        if(req.method === "GET"){
            res.statusCode == 200;
            res.setHeader('Content-Type', 'application/json');

            var result = students;

            if (url.length === 3){
                var studentId = Number(url[2]) - 1;

                if (studentId < students.length){
                    result = students[studentId];
                } else{
                    result = {
                        "error": "Student not found"
                    };
                }
            }

            res.end(JSON.stringify(result));
        } else if(req.method === "POST"){
            req.on('data', (data) => {
                var student = JSON.parse(data);
                console.log(`request data: ${student}`);
                student.id = ++id;
                students.push(student);
                console.log('pushed!');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(student));
                
            });
        }
    } else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Page not found</h1>');
    }
});

server.listen(PORT, () => {
    console.log('Server started on port 3000');
});