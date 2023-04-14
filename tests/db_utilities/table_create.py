import psycopg2


def create_table(table_name, query):
    connection = psycopg2.connect(f"dbname=flavora_test")
    cursor = connection.cursor()

    cursor.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE")
    cursor.execute(query)

    connection.commit()
    cursor.close()
    connection.close()


user_table_creation_query = """
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        food_preferences VARCHAR(255)[] DEFAULT '{}'
    );
"""


# Create table ingredients
ingredient_table_creation_query = """
    CREATE TABLE ingredients (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        name_scientific VARCHAR(255),
        description TEXT,
        wikipedia_id VARCHAR(255),
        food_group VARCHAR(255),
        food_subgroup VARCHAR(255)
    );
"""

# Create table recipes
recipe_table_creation_query = """
    CREATE TABLE recipes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        cooking_time INTERVAL,
        description TEXT NOT NULL,
        instructions TEXT NOT NULL,
        img_path TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
"""

# Create table user_recipe
user_recipe_table_creation_query = """
    CREATE TABLE user_recipe (
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
        PRIMARY KEY (user_id, recipe_id)
    );
"""

# Create table pantries
pantry_table_creation_query = """
    CREATE TABLE pantries (
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        ingredient_id INTEGER REFERENCES ingredients(id) ON DELETE CASCADE,
        PRIMARY KEY (user_id, ingredient_id)
    );
"""

create_table("users", user_table_creation_query)
create_table("ingredients", ingredient_table_creation_query)
create_table("recipes", recipe_table_creation_query)
create_table("user_recipe", user_recipe_table_creation_query)
create_table("pantries", pantry_table_creation_query)
