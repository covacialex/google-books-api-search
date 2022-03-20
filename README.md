# Google Books API project

A small project I did as my final presentation for a programming boot camp using the Model-View-Controller architecture in vanilla JavaScript. I'm new to coding and it's my first project. Done with love, coffee and a lot of googling.

### Features

- Request an array using the search bar value from Google Books API.
- Render the results on the site by pages (you can choose how many from the code).
- Click on a book to render some description about its contents.
- Add and remove items from cart.

### Issues

- I cannot find high quality images of the covers.
- Book data (title, cover, authors, description) is missing in a few cases, so I chose to just skip over the whole book instead of adding placeholders, because the API is full of missing info for lesser known books.
- The cover art images vary in width and height. Resizing them to specified dimensions distorts them.
- The search algorithm is not coded to work for book selling, even when sorting by relevance, so you might get some weird results. For example, while searching for "Harry Potter", you will get books with "Harry Potter" in their titles, while the actual Harry Potter books made by J.K.Rowling will barely show up in the array.
