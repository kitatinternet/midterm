/**
 * @file 
 * routes/books.js
 *
 * Chun Kit Lam, 301158152, 3Mar2021
 * COMP229–Web Application Development Mid Term Test
 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE, edited 202003031925 *
     *****************/
    //create a empty book object to details.ejs
    let emptyBooks = book({
      "Title":"",
      "Description":"",
      "Price":0.0,
      "Author":"",
      "Genre":""
  });
    res.render('books/details', {title:'Add a Book ',
    books: emptyBooks});

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE, edited 202003031931 *
     *****************/
    //create a new book object
    let newBook = book({
      "Title":req.body.title,
      "Description":"",
      "Price":req.body.price,
      "Author":req.body.author,
      "Genre":req.body.genre
  });

  //create a new book record into mongo db
  book.create(newBook,(err, book) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //refresh the books list
          res.redirect('/books');
      }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE, edited 202003031946 *
     *****************/
    let id = req.params.id;

    // find book from mongo db by id
    book.findById(id,(err,bookToUpdate) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            //show the update view
            res.render('books/details', {title: 'Update Book', books: bookToUpdate});
        }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE, edited 202003032222 *
     *****************/
    let id = req.params.id;

    //create a book object
    let editBook = book({
      "_id": id,
      "Title":req.body.title,
      "Description":"",
      "Price":req.body.price,
      "Author":req.body.author,
      "Genre":req.body.genre
  });

  // update book record from mongo db by id
  book.updateOne({_id:id}, editBook, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else{
          //show the updated view
          res.redirect('/books');
      }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE, edited 202003032239 *
     *****************/
    let id = req.params.id;

    // remove book record from mongo db by id
    book.remove({_id:id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //refresh the book list
          res.redirect('/books');
      }
  });
    
});


module.exports = router;
