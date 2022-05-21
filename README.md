# Inventory Tracking API

This is a basic inventory tracking service API, built using Node.js, Express.js and MongoDB for database

To run this API on Replit with the instructions below (see API Use Guide below), find the online repository at: <https://replit.com/@rapaktech/inventory-tracking-api>

To see the live app (frontend), visit: <https://inventory-tracking-app.rapaktech.repl.co>

The frontend code is on Replit at: <https://replit.com/@rapaktech/inventory-tracking-app>

The API (backend) serving the live app is deployed on Heroku at <https://inventory-tracking-api.herokuapp.com>

Find the use documentation for the server (with examples) at: <https://documenter.getpostman.com/view/20398736/UyxnD4hi>

## _API Use Guide:_

To start the server:

* Clone this repository
* Open a terminal window in the root of the folder created
* Run 'npm start'

### Functionalities

* To create an inventory item, send a **POST** request to <http://localhost:8000/api/v1/inventory/add>, with a JSON object:

``` JSON

  {
    "name": "String: has to start with a letter, can contain spaces, numbers and hyphens, must be at least 3 characters, and no more than 30 characters",
    "description": "String: Description must be at least 3 characters, and no more than 1000 characters",
    "price": "Number: has to be a number greater than 0.01",
    "quantity": "Number: has to be a number greater than 1"
  }

```

* To get all inventory listings, send a **GET** request to <http://localhost:8000/api/v1/inventory/>

* To get a single inventory listing, send a **GET** request to <http://localhost:8000/api/v1/inventory/get/:SKU>, where ':SKU' is the listing's store keeping unit (SKU) number gotten from the get all request above

* To update a single inventory listing, send a **PUT** request to <http://localhost:8000/api/v1/inventory/update/:SKU>, with a JSON object including at least one of the following properties:

``` JSON

  {
    "name": "String: has to start with a letter, can contain spaces, numbers and hyphens, must be at least 3 characters, and no more than 30 characters",
    "description": "String: Description must be at least 3 characters, and no more than 1000 characters",
    "price": "Number: has to be a number greater than 0.01",
    "quantity": "Number: has to be a number greater than 1"
  }

```

* To delete a single inventory listing, send a **DELETE** request to <http://localhost:8000/api/v1/inventory/delete/:SKU>, with an optional JSON object:

``` JSON

  {

    "comment": "String: must be no more than 100 characters"

  }

```

* To get all deleted inventory listings, send a **GET** request to <http://localhost:8000/api/v1/inventory/deleted>

* To undelete a single inventory listing, send a **PATCH** request to <http://localhost:8000/api/v1/inventory/undelete/:SKU>

Enjoy!
