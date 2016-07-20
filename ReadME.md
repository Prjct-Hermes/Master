###
1. Build compiler (Gulp)
2. Flow chart
3. Trello
4. Mentor Approval

###
* Create Project Name

###
* Project Description

###
* Main Components
  * Users
    1. Create
    2. Update
    3. Ref all user created objects
    4. Login/Read/Find
    5. Destroy


  * Stock Ingredients
    1. Create
      A. Name
      B. Description
      C. Quantity
    2. Update
    3. Read/Find
    4. Destroy


  * Recipes
    1. Create
      A. Name
      B. Description
      C. Ingredients
        a. Reference Stock items
      D. Price?
      E. Cook time?
      F. Calorie Counter? (Allrecipes.com may have an API?)
    2. Update
    3. Read/Find
    4. Add to Order(Cart)
    5. Destroy


  * Orders
    1. Create
      A. Number is based on Date + arbitrary number count
    2. Add to History
    3. Ref Recipes/Trigger functions
    4. Destroy


  * History
    1. Create
      A. Simply a Date
    2. Read/Find: Create graphs that represent spans of time or individual days.
    3. Destroy?


  * Alerts
    1. Create
      A. User created based on either a date that they enter OR when stock levels   reach a certain point. Date related ones will be important because ingredients have a life span.
      B. User determines what type of alert: Email, text, pop-up on login or notifications pane.
    2. Read/Find
    3. Update
    4. Destroy


###
* Basic appearance

###
* Functionality
  * Orders
    1. Need to get info from Recipes, combine into each Stock Ingredient and then subtract from stock levels.
    2. Need to then create an Object in the History DB that reflects what was in the order.
    3. Should have an order screen that lists all the recipes with buttons incrementing/decrementing but never going below 0

  * Stock Levels
    1. Restock options
    2. Adjust Levels manually
    3. Reduce based on Order

  * History
    1. Order history per day.
      A. Total number of orders per day.
      B. Total number of items sold per day .
      C. Breakdown of what items were sold each day and in what quantity.
    2. Stock History per day.
      A. What each Stock Ingredient was at on that day.
      B. Whether the Stock Ingredient was Restocked, or adjusted.
    3. Visual representation of History over a user defined period of time.
      A. Should be either:
        a. Stock levels: Maybe a calendar that shows when levels were adjusted and clicking on the day takes to a list showing items that were adjusted and by how much up or down.
        b. Order History: Keep it basic to just number of orders per day.

  * Alerts

###
* Bonus Ideas
  1. History visualizations could provide in depth info based on each Recipe ordered over that period of time allowing users to see recipe history over a given period of time.
  2. See if there is an API out there for calorie counting so that recipes can have an estimated calorie count.
  3. Allow Recipes to have a serving size and tie it in with calorie count.
  4. No way to really test this but look at Square Payments API and see if it could be incorporated.
  5. When an order has a recipe added have it calculate how much it would subtract from stock levels and alert if any will drop below 0

  * D3 visualizations
  * Alerts page
  * Food related loading icon
  * Calorie counter
  * Custom Order screens
  * Categories for recipes
  * Tutorial
  * About Page: 4 step

###
* Group Assignments


public
|_index.html
|_styles
|  |_styles.sass?
|
|_app
  |_app.js
  |_directives
  |  |_directive
  |     |_directiveDir
  |     |_directiveCtrl
  |     |_directiveTmpl
  |     |_directiveSass?
  |
  |_services
  |  |_collectionService
  |
  |_routes
  |  |_route
  |     |_routeCtrl
  |     |_routeTmpl
  |     |_routeSass?

  Creating a branch
```git checkout -b <branchName>
```

Deleting a branch
```git checkout -d <branchName>
```

Checking out a branch
```git checkout <branchName>
```

Merging Master into your branch
```git add -A
git commit -m ""
git checkout master
git pull origin master
git checkout <branchName>
git merge master
<Go fix merge conflicts if any>
git add -A
git commit -m ""
```

Creating a pull request
```git add -A
git commit -m ""
git push origin <branchName>
<On Github Repository>
Click create pull request
Base -> Master         compare -> <branchName>
Make sure request is able to merge.
Submit pull request
STOP HERE
