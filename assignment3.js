const http = require("http");

const HOSTNAME = "localhost";
const PORT = 3000;

const users = {
    "user1": "password1",
    "user2": "password2"
};

const authenticate = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    const auth = authHeader.split(" ");
    if (auth.length !== 2 || auth[0] !== "Basic") return false;

    const credentials = Buffer.from(auth[1], "base64").toString().split(":");
    const username = credentials[0];
    const password = credentials[1];

    return users[username] === password;
};

const server = http.createServer((req, res) => {
    if (!authenticate(req)) {
        res.writeHead(401, { "WWW-Authenticate": "Basic realm='Authentication required'" });
        res.end("Authentication required");
        return;
    }

    const { method, url } = req;

    if (url.startsWith("/books")) {
        handleBooksEndpoint(req, res, method);
    } else if (url.startsWith("/authors")) {
        handleAuthorsEndpoint(req, res, method);
    } else {
        res.writeHead(404);
        res.end("Not found");
    }
});

const handleBooksEndpoint = (req, res, method) => {
    if (method === "GET") {
        res.writeHead(200);
        res.end("GET books");
    } else if (method === "POST") {
        res.writeHead(200);
        res.end("POST books");
    } else if (method === "PUT") {
        res.writeHead(200);
        res.end("PUT books");
    } else if (method === "PATCH") {
        res.writeHead(200);
        res.end("PATCH books");
    } else if (method === "DELETE") {
        res.writeHead(200);
        res.end("DELETE books");
    } else {
        res.writeHead(405);
        res.end("Method not allowed");
    }
};

const handleAuthorsEndpoint = (req, res, method) => {
    if (method === "GET") {
        res.writeHead(200);
        res.end("GET authors");
    } else if (method === "POST") {
        res.writeHead(200);
        res.end("POST authors");
    } else if (method === "PUT") {
        res.writeHead(200);
        res.end("PUT authors");
    } else if (method === "PATCH") {
        res.writeHead(200);
        res.end("PATCH authors");
    } else if (method === "DELETE") {
        res.writeHead(200);
        res.end("DELETE authors");
    } else {
        res.writeHead(405);
        res.end("Method not allowed");
    }
};

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
