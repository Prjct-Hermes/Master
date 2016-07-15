/*

1.Convert all recipes ingredients converted to ingredient unit of measure
2.multiply by qty of recipe
3.Total all recipes
4.subtract from stock qty
5.upadte stock qty on server
6.post order to server
7.run through alerts and check if alert qty is below stock qty and if an alert already exists don't post

convert($scope.recipe.ingredientQty).from($scope.recipe.ingredientUnitOfMeasure).to($scope.stockItems.unitOfMeasure)
*/
