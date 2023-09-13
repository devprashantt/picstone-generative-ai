import openai


def generate_story_from_tags(tags):
    # Create a prompt using the Cloudinary-generated tags
    prompt = f"Once upon a time, in a land filled with {', '.join(tags)},..."

    try:
        # Generate a story using GPT-3 from OpenAI
        response = openai.Completion.create(
            engine="text-davinci-003",
            temperature=0.5,
            prompt=prompt,
            max_tokens=100
        )

        return response.choices[0].text
    except Exception as e:
        print(f"Error generating story from OpenAI: {str(e)}")
        return None
