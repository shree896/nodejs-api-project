const express = require('express')
const app = express();
const port = 3000;

//In-memory storage for books

let books = [
    {id: 1, title: 'The Great Gatsby', author:'F. Scott Fitzgerald'},
    {id: 2, title: '1984', author:'George Orwell'},
];

app.use(express.json());

//GET /books
app.get('/books', (req,res)=>{
    res.json(books);
});

// POST /books
app.post('/books', (req, res)=> {
    const {title, author} = req.body;
    const newBook = {id: books.length+1, title, author};
    books.push(newBook);
    res.status(201).json(newBook);
});

//PUT /books/:id
app.put('/books/:id', (req, res) => {
    const {id} = req.params;
    const {titel, author} = req.body;
    let book = books.find(b=> b.id === parseInt(id));
    if (book){
        book.title = title;
        book.author = author;
        res.json(book);
    } else{
        res.status(404).send('Book not found');
    }
});

//DELETE /books/:id

app.delete('/books/:id', (req, res)=>{
    const {id} = req.params;
    books = books.filter(b => b.id !== parseInt(id));
    res.status(204).send();
});

app.listen(port, ()=> {
    console.log(`API server is running on http://localhost:${port}`);
    
});
