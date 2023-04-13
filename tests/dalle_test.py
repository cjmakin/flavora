import psycopg2
import requests
import openai
import hashlib
import os

openai.api_key = os.getenv('OPENAI_API_KEY')
print(openai.api_key)


def getRecipeDescription(id):
    connection = psycopg2.connect(database='flavora_test')
    cursor = connection.cursor()
    query = f'SELECT description FROM recipes WHERE id={id}'

    cursor.execute(query)
    description = cursor.fetchall()

    cursor.close()
    connection.close()

    if description != None:
        return description[0][0]
    else:
        return False


def generateImage(id, username):
    hashed_username = hashlib.sha256(username.encode('utf-8')).hexdigest()
    recipe_description = getRecipeDescription(id)

    print(f'User: {hashed_username}, Recipe description: {recipe_description}')

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {openai.api_key}'
    }

    data = {
        'model': 'image-alpha-001',
        'prompt': f'realistic image, no text, of: {recipe_description}',
        'num_images': 1,
        'size': '512x512',
        'user': hashed_username
    }

    try:
        response = requests.post(
            'https://api.openai.com/v1/images/generations', headers=headers, json=data)
        image_url = response.json()['data'][0]['url']
        return image_url
    except Exception as e:
        print(e)


print(generateImage(6, 'cjmakin'))
