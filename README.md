# Google Books API project

A small project I did as my final presentation for a programming course using the Model-View-Controller architecture. 

### Features

- Request an array using the search bar value from Google Books API. 
- Render the results on the site by pages (you can choose how many from the code).
- Click on a book to render some description about its contents.

### Issues

- I cannot find high quality images of the covers.
- Book data (title, cover, authors, description) is missing in a few cases, so I chose to just skip over the whole book instead of adding placeholders.
- The cover art images vary in width and height.
- The search algorithm is not coded to work for book selling, even when sorting by relevance, so you might get some weird results. For example, while searching for "Harry Potter", you will get books with "Harry Potter" in their titles, while the actual Harry Potter books made by J.K.Rowling will barely show up in the array.
