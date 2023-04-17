from generate_prompts import generatePrompt
import openai
import os

openai.api_key = os.getenv('OPENAI_API_KEY')


def generateRecipe(num_food_groups, num_ingredients, food_preferences="none"):
    prompt = generatePrompt(num_food_groups, num_ingredients)
    print(prompt)


generateRecipe(6, 2)
