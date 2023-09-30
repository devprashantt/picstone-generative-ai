import openai


def generate_story(tags, tag_analysis):
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
    prompt = f"Let's dive into the world of web development and storytelling. Your task is to craft a captivating narrative that unfolds over at least 1000 words, using HTML tags as your storytelling tools. You'll draw inspiration from a selection of HTML tags, each one a unique element in your web development palette: {', '.join(tags)}. These tags will guide the structure of your narrative, lending it a web development quality. The sentiment you'll infuse into your words should resonate with {sentiment} and tone should {tone}, and the overall mood should be nothing less than {mood}. Imagine your readers, eager to embark on this digital journey you're about to create. They await a story that's not just words on a web page but an interactive experience that evokes emotions, thoughts, and memories. Your canvas is ready; the HTML tags are your tools, your keyboard is your brush, and your palette includes {', '.join(tags)}. Start coding your narrative, and let the world of web storytelling come alive."

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
