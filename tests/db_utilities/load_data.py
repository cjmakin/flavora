import json
import psycopg2
from psycopg2.extras import execute_values
from pathlib import Path

path = f"{Path().resolve()}/data/"


def load_data(file_name, insert_query):

    conn = psycopg2.connect(database='flavora_test')

    with open(f"{path}/{file_name}") as f:
        data = json.load(f)

    rows = [tuple(d.values()) for d in data]

    # Use execute_values() to insert the rows into the ingredients table
    cursor = conn.cursor()
    execute_values(
        cursor, f"{insert_query} %s", rows)
    conn.commit()

    conn.close()


ingredients_insert = "INSERT INTO ingredients (name, name_scientific, description, wikipedia_id, food_group, food_subgroup) VALUES "
recipes_insert = "INSERT INTO recipes (name, cooking_time, description, instructions, img_path, created_at, updated_at) VALUES "
users_insert = "INSERT INTO users (username, email, password_hash, first_name, last_name, food_preferences) VALUES "

# load_data("ingredients.json", ingredients_insert)
load_data("sample_user.json", users_insert)
# load_data("sample_recipe.json", recipes_insert)
