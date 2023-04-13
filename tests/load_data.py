import json
import psycopg2
from psycopg2.extras import execute_values
from pathlib import Path

path = f"{Path().resolve()}/data/"


def load_data(file_name, insert_query):

    conn = psycopg2.connect(database='flavora_test')

    with open(f"{path}/{file_name}") as f:
        data = json.load(f)

    # Convert the list of dictionaries to a list of tuples, with each tuple representing a row to be inserted
    rows = [tuple(d.values()) for d in data]

    # Use execute_values() to insert the rows into the ingredients table
    cursor = conn.cursor()
    execute_values(
        cursor, f"{insert_query} %s", rows)
    conn.commit()

    # Close the database connection
    conn.close()


ingredients_insert = "INSERT INTO ingredients (name, name_scientific, description, wikipedia_id, food_group, food_subgroup) VALUES "
recipes_insert = "INSERT INTO recipes (name, description, instructions, user_id) VALUES "
users_insert = "INSERT INTO users (username, email, password_hash, first_name, last_name, food_preferences) VALUES "

# load_data("cleaned_ingredients.json", ingredients_insert)
# load_data("sample_user.json", users_insert)
load_data("sample_recipe.json", recipes_insert)
