import os
import hashlib
import openai
import requests
from dotenv import load_dotenv
from pathlib import Path
from django.conf import settings

load_dotenv()

openai.api_key = os.environ['_OPENAI_API_KEY']
BASE_DIR = Path().resolve()

prompt = """
Generate a recipe for a dish that contains {}.
It should be {} and take no longer than {} to cook.
Recipe name: [Recipe Name]
Description: [Description]
Instructions: [Instructions]
Ingredients: [Ingredients]
Cooking time: [Cooking time]"""


def decompose_response(response):
    response_arr = response.strip().split(":")
    response_dict = {
        'name': response_arr[1].rstrip('\nDescription').lstrip(),
        'description': response_arr[2].rstrip('\nInstructions').lstrip(),
        'instructions': response_arr[3].rstrip('\nIngredients').lstrip(),
        'ingredients': response_arr[4].rstrip('\nCooking time').lstrip(),
        'cooking_time': response_arr[5].strip()
    }
    return response_dict


def generate_recipe(user_email, ingredients, cooking_time, food_preferences):
    hashed_email = hashlib.sha256(user_email.encode('utf-8')).hexdigest()
    cooking_time = '5 hours' if cooking_time == '' else cooking_time
    food_preferences = '(No preference)' if food_preferences == '' else food_preferences

    print(f'Attempting to generate recipe for {user_email}')

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt.format(
                ingredients, food_preferences, cooking_time)}],
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.5,
            user=hashed_email,
        )
    except Exception as e:
        print(e)
        return -1

    recipe = decompose_response(response.choices[0].message.content)

    return recipe


def generate_image(recipe_description, email):
    hashed_username = hashlib.sha256(email.encode('utf-8')).hexdigest()

    print(f'Attempting to generate image for {email}')

    # Request arguments
    prompt = f'image, no text, of: {recipe_description}'
    size = '512x512'
    n = 1
    response_format = 'url'

    try:
        response = openai.Image.create(
            prompt=prompt, n=n, size=size, user=hashed_username, response_format=response_format)
        img_url = response['data'][0]['url']

        return img_url

    except Exception as e:
        print(e)
        return -1


def save_image(img_url, user_id, recipe_id):

    print(f'Attempting to save image for user {user_id}')

    filename = f'{recipe_id}.png'
    filepath = os.path.join(settings.MEDIA_ROOT, 'recipes', str(user_id))

    try:
        os.makedirs(filepath, exist_ok=True)

        with open(f'{filepath}/{filename}', 'wb') as f:
            f.write(requests.get(img_url).content)

        return f'{filepath}/{filename}'

    except Exception as e:
        print(e)
        return -1
