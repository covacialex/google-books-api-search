# Google Books API project

A small project I did as my final presentation for a front-end programming boot camp using the Model-View-Controller architecture in vanilla JavaScript. I'm new to coding and it's my first project. Done with love, coffee and a lot of googling.

**[Live website](https://covacialex.github.io/google-books-api-search/)**

### Features

- Request an array using the search bar value from Google Books API.
- Render X number of results per page.
- Click on a book to render description.
- Add and remove items from cart.

### Issues

- I cannot find high quality images of the covers.
- The cover art images vary in width and height. Resizing them to specified dimensions distorts them.
- Book data (title, cover, authors, description) is missing in a few cases, so I chose to just skip over the whole book instead of adding placeholders, because the API is full of missing info for lesser known books.
- The search algorithm is not coded to work for book selling, even when sorting by relevance, so you might get some weird results. E.g. while searching for "Harry Potter", you will get books with "Harry Potter" in their titles, while the actual Harry Potter books made by J.K.Rowling will barely show up in the array.
