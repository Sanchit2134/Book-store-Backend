const Book = require('../model/BookModel');

const getBooks = async (req, res) => {
    try{
        const books = await Book.find();
        res.status(200).json(books);
    }
    catch(error){
        cosole.log("Error",error);
        res.status(500).json({message: error.message});
    }
}
module.exports =  getBooks ;