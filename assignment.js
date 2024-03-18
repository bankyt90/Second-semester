// // const http = require("http")

// // const HOSTNAME = "localhost"
// // const PORT = 8900

// // const server = http.createServer((req,res) => {
// //     res.end("Akinloye Bankole")
// // })

// // server.listen(PORT, HOSTNAME, ()=> {
// //     console.log(`server started succesfully at http://${HOSTNAME}:${PORT}`)
// // })


// const http = require("http")
// const fs = require("fs")
// const path = require("path")

// const HOSTNAME = "localhost"
// const PORT = 3500

// const dbBooksPath = path.join(__dirname, "db", "books.json")

// const server = http.createServer((req, res) => {
//     if (req.url.startsWith("/books")) {
//         handleBooksEndpoint(req, res);
//     } else if (req.url.startsWith("/books/author")) {
//         handleAuthorEndpoint(req, res);
//     } else {
//         res.writeHead(404, { "Content-Type": "text/plain" });
//         res.end("Not found");
//     }
// });

// function handleBooksEndpoint(req,res) {
//     switch(req.method) {
//         case "GET":
//             getAllBooks(req,res)
//             break
//         case "PUT":
//             updateBook(req,res)
//             break
//         case "DELETE":
//             deleteBook(req,res)
//             break
//         default:
//             res.writeHead(405)
//             res.end("Method not allowed")
//     }
// }

// function handleAuthorEndpoint(req,res) {
//     switch(req.method) {
//         case "GET":
//             getAllBooksByAuthor(req,res)
//             break;
//         case "POST":
//             addBookByAuthor(req,res)
//             break;
//         case "PUT":
//             updateBookByAuthor(req,res)
//             break
//         default:
//             res.writeHead(405)
//             res.end("Method not allowed")
//     }
// }

    

// function getAllBooks(req, res) {
//     if (req.url !== "/books") {
//         res.writeHead(400);
//         res.end("Bad Request: Invalid URL for GET request");
//         return;
//     }

//     fs.readFile(dbBooksPath, "utf-8", (err, data) => {
//         if (err) {
//             console.error(err);
//             res.writeHead(500);
//             res.end("Internal Server Error");
//         } else {
//             res.writeHead(200);
//             res.end(data);
//         }
//     });
// }

// function updateBook(req,res) {
//     const body = [];
//     req.on("data", (chunk) => {
//         body.push(chunk)
//     })

//     req.on("end", () => {
//         const parsedBook = Buffer.concat(body).toString()
//         const bookDetailsToUpdate = JSON.parse(parsedBook)
//         const bookId = bookDetailsToUpdate.id

//         fs.readFile(dbBooksPath, "utf-8", (err,data) => {
//             if (err) {
//                 console.log(err)
//                 res.writeHead(500)
//                 res.end("Internal Server Error");
//             }

//             const bookObj = JSON.parse(data)

//             //findind the book in db with id
//             const bookIndex = bookObj.findIndex(data => data.id === bookId)

//             if(bookIndex === -1) {
//                 res.writeHead(404)
//                 res.end("Book with the specified id not found")
//                 return
//             }

//             const updatedBook = {...bookObj[bookIndex], ...bookDetailsToUpdate}
//             bookObj[bookIndex] = updatedBook

//             fs.writeFile(dbBooksPath, JSON.stringify(bookObj), (err) => {
//                 if (err) {
//                     console.log(err)
//                     res.writeHead(500)
//                     res.end(JSON.stringify({
//                         message: "internal server could not save to db"
//                     }))
//                 }

//                 res.writeHead(200)
//                 res.end("Update succesful")
//             })
            
            
//         })
//     })
// }

// function deleteBook(req,res) {
//     const body = []
//     req.on("data", (chunk) => { //data event is fired when the server receives data from the client
//         body.push(chunk)        //push each data received to the body array
//     })

//     req.on("end", () => {
//         const parsedBook = Buffer.concat(body).toString()
//         const bookDetailsToUpdate = JSON.parse(parsedBook)
//         const bookId = bookDetailsToUpdate.id
        
        
//         fs.readFile(dbBooksPath, "utf-8", (err,data) => {
//             if (err) {
//                 console.log(err)
//                 res.writeHead(400)
//                 res.end("An error occured")
//             }

//             const bookObj = JSON.parse(data)
//             //findind the book in db with id
//             const bookIndex = bookObj.findIndex(data => data.id === bookId)
            
//             if(bookIndex === -1) {
//                 res.writeHead(404)
//                 res.end("Book with the specified id not found")
//                 return
//             }

//             bookObj.splice(bookIndex, 1)


//             fs.writeFile(dbBooksPath, JSON.stringify(bookObj), (err) => {
//                 if (err) {
//                     console.log(err);
//                     res.writeHead(500);
//                     res.end(JSON.stringify( {
//                         message: "Internal server. Could not save to database"
//                     }))
//                 }
//                 res.writeHead(200)
//                 res.end("Deletion successful")
//             })

            
//         })

//     })
// }


// function getAllBooksByAuthor(req,res) {
//     if (req.url !== "/books/author") {
//         res.writeHead(400);
//         res.end("Bad Request: Invalid URL for GET request");
//         return;
//     }

//     fs.readFile(dbBooksPath, "utf-8", (err, data) => {
//         if (err) {
//             console.error(err);
//             res.writeHead(500);
//             res.end("Internal Server Error");
//         } else {
//             res.writeHead(200);
//             res.end(data);
//         }
//     });
// }





// server.listen(PORT, HOSTNAME, ()=> {
//     booksDb = JSON.parse(fs.readFileSync(dbBooksPath, "utf-8"))
//     console.log(`server started succesfully at http://${HOSTNAME}:${PORT}`)
// })


const http = require("http");
const fs = require("fs");
const path = require("path");

const HOSTNAME = "localhost";
const PORT = 3500;
const dbBooksPath = path.join(__dirname, "db", "books.json");

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (url.startsWith("/books")) {
        if (method === "GET") {
            getAllBooks(req, res);
        } else if (method === "PUT") {
            updateBook(req, res);
        } else if (method === "DELETE") {
            deleteBook(req, res);
        } else {
            methodNotAllowed(res);
        }
    } else if (url.startsWith("/books/author")) {
        if (method === "GET") {
            getAllBooksByAuthor(req, res);
        } else if (method === "POST") {
            addBookByAuthor(req, res);
        } else if (method === "PUT") {
            updateBookByAuthor(req, res);
        } else {
            methodNotAllowed(res);
        }
    } else {
        notFound(res);
    }
});

function getAllBooks(req, res) {
    fs.readFile(dbBooksPath, "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            res.writeHead(500);
            res.end("Internal Server Error");
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
        }
    });
}

function updateBook(req, res) {
    let body = [];
    req.on("data", chunk => {
        body.push(chunk);
    });

    req.on("end", () => {
        const requestData = Buffer.concat(body).toString();
        const bookDetailsToUpdate = JSON.parse(requestData);
        const bookId = bookDetailsToUpdate.id;

        fs.readFile(dbBooksPath, "utf-8", (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500);
                res.end("Internal Server Error");
                return;
            }

            const books = JSON.parse(data);
            const bookIndex = books.findIndex(book => book.id === bookId);
            if (bookIndex === -1) {
                res.writeHead(404);
                res.end("Book with the specified id not found");
                return;
            }

            const updatedBook = { ...books[bookIndex], ...bookDetailsToUpdate };
            books[bookIndex] = updatedBook;

            fs.writeFile(dbBooksPath, JSON.stringify(books), err => {
                if (err) {
                    console.error(err);
                    res.writeHead(500);
                    res.end("Internal Server Error");
                    return;
                }

                res.writeHead(200);
                res.end("Update successful");
            });
        });
    });
}

function deleteBook(req, res) {
    let body = [];
    req.on("data", chunk => {
        body.push(chunk);
    });

    req.on("end", () => {
        const requestData = Buffer.concat(body).toString();
        const bookDetailsToDelete = JSON.parse(requestData);
        const bookId = bookDetailsToDelete.id;

        fs.readFile(dbBooksPath, "utf-8", (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500);
                res.end("Internal Server Error");
                return;
            }

            const books = JSON.parse(data);
            const bookIndex = books.findIndex(book => book.id === bookId);
            if (bookIndex === -1) {
                res.writeHead(404);
                res.end("Book with the specified id not found");
                return;
            }

            books.splice(bookIndex, 1);

            fs.writeFile(dbBooksPath, JSON.stringify(books), err => {
                if (err) {
                    console.error(err);
                    res.writeHead(500);
                    res.end("Internal Server Error");
                    return;
                }

                res.writeHead(200);
                res.end("Deletion successful");
            });
        });
    });
}

function getAllBooksByAuthor(req, res) {
    fs.readFile(dbBooksPath, "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            res.writeHead(500);
            res.end("Internal Server Error");
            return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
    });
}

function addBookByAuthor(req, res) {
    let body = [];
    req.on("data", chunk => {
        body.push(chunk);
    });

    req.on("end", () => {
        const requestData = Buffer.concat(body).toString();
        const newBook = JSON.parse(requestData);

        fs.readFile(dbBooksPath, "utf-8", (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(500);
                res.end("Internal Server Error");
                return;
            }

            const books = JSON.parse(data);
            newBook.id = books.length + 1;
            books.push(newBook);

            fs.writeFile(dbBooksPath, JSON.stringify(books), err => {
                if (err) {
                    console.error(err);
                    res.writeHead(500);
                    res.end("Internal Server Error");
                    return;
                }

                res.writeHead(200);
                res.end("Book added successfully");
            });
        });
    });
}

function updateBookByAuthor(req, res) {
    // Logic for updating book by author
    res.writeHead(501);
    res.end("Not Implemented");
}

function methodNotAllowed(res) {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method not allowed");
}

function notFound(res) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
}

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
