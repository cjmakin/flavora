# Generate random prompt for use in training data.
import psycopg2
from random import randint

FOOD_GROUPS = [
    "Beverages",
    "Animal foods",
    "Pulses",
    "Eggs",
    "Cereals and cereal products",
    "Milk and milk products",
    "Coffee and coffee products",
    "Unclassified",
    "Baking goods",
    "Aquatic foods",
    "Snack foods",
    "Confectioneries",
    "Cocoa and cocoa products",
    "Soy",
    "Herbs and spices",
    "Vegetables",
    "Herbs and Spices",
    "Dishes",
    "Gourds",
    "Teas",
    "Fats and oils",
    "Baby foods",
    "Nuts",
    "Fruits"
]

COOKING_TIMES = [
    "30 minutes",
    "1 hour",
    "1 hour 30 minutes",
    "2 hours",
    "2 hours 30 minutes",
    "3 hours",
    "3 hours 30 minutes",
    "4 hours",
    "4 hours 30 minutes",
    "5 hours"
]


def getRandomIngredients(num_food_groups, num_ingredients):
    # num_food_groups = Number of random food groups to pick ingredients from
    # num_ingredients = Number of random ingredients to pick from each random food group
    random_food_groups = []
    random_ingredients = []

    # Pick random food groups
    visited_groups = {-1}
    for i in range(num_food_groups):
        index = -1

        while index in visited_groups:
            index = randint(0, len(FOOD_GROUPS)-1)

        random_food_groups.append(FOOD_GROUPS[index])
        visited_groups.add(index)

    connection = psycopg2.connect(database='flavora_test')
    cursor = connection.cursor()

    for food_group in random_food_groups:
        query = f"""SELECT name FROM ingredients
                WHERE food_group = '{food_group}'
                ORDER BY RANDOM() LIMIT {num_ingredients};"""

        cursor.execute(query)
        random_ingredients.append(cursor.fetchall())

    # Flatten list
    flattened = []

    for food_group in random_ingredients:
        for ingredient in food_group:
            flattened.append(ingredient[0])

    cursor.close()
    connection.close()

    return flattened


def generatePrompt(num_food_groups, num_ingredients, food_preferences="none"):
    ingredients = getRandomIngredients(num_food_groups, num_ingredients)
    cooking_time = COOKING_TIMES[randint(0, len(COOKING_TIMES)-1)]

    prompt = f"ingredients: {', '.join(ingredients)}; max cooking time: {cooking_time}; dietary preferences: {food_preferences}"
    return prompt


print(generatePrompt(2, 3))