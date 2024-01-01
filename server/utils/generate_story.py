import openai


def generate_story(tags, tag_analysis, image_text, story_title, desc, theme):
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
    prompt = f"Your task is to create a captivating narrative, a story that unfolds over at around 500 words. You draw inspiration from a selection of tags, each one a unique element mending with each other in your storytelling tag palette: {', '.join(tags)}. These tags will guide the tone of your narrative, lending it a {tone} quality. The sentiment you'll infuse into your words should resonate with {sentiment}, and the overall mood should be nothing less than {mood} and keep the theme as mixture of {','.join(themes)}. The narrative should always have a happy ending and a life lesson attached to it. Include these {image_text}. Imagine your readers provided you a desc: {desc} and title: {story_title}, eager to embark on this literary journey you're about to create. They await a story that's not just words on a page but an experience that evokes emotions, thoughts, and memories. Your canvas is ready; the colors are your tags, the brush is your pen. Start your narrative, and let the world of words come alive."

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
