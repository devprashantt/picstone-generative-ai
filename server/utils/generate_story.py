import openai


def generate_poem_story(tags, tag_analysis):
    # Extract detected moods, sentiments, and tones from tag_analysis
    detected_moods = tag_analysis.get("moods", [])
    detected_sentiments = tag_analysis.get("sentiments", [])
    detected_tones = tag_analysis.get("tones", [])

    # Define default values if not detected
    default_mood = "neutral"
    default_sentiment = "neutral"
    default_tone = "calm"

    # Use the detected values if available; otherwise, use defaults
    mood = ', '.join(detected_moods) if detected_moods else default_mood
    sentiment = ', '.join(
        detected_sentiments) if detected_sentiments else default_sentiment
    tone = ', '.join(detected_tones) if detected_tones else default_tone

    # Create a prompt with specific instructions for ChatGPT
    prompt = f"Compose a beautiful poem in at least 500 words about {', '.join(tags)} with the tone of {tone}. The sentiment should be {sentiment} and the mood should be {mood}."

    try:
        # Generate a story/poem using ChatGPT
        response = openai.Completion.create(
            engine="text-davinci-003",
            temperature=0.7,  # Adjust temperature for creativity
            max_tokens=1000,  # Adjust max_tokens for desired length
            prompt=prompt,
            n=1             # Ensure only one response is generated
        )

        return response.choices[0].text
    except Exception as e:
        print(f"Error generating poem/story from ChatGPT: {str(e)}")
        return None
