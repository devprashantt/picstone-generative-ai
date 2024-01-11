from constants.constant_data import DEFAULT_ANALYZE_TAGS


def analyze_tags(tags=DEFAULT_ANALYZE_TAGS):
    # Define mood, sentiment, and tone mappings (you can expand this as needed)
    mood_mapping = {
        "happy": "joyful",
        "sad": "melancholic",
        "calm": "peaceful",
        "exciting": "energetic",
        # Add more mappings as needed
    }

    sentiment_mapping = {
        "positive": "positive",
        "negative": "negative",
        "neutral": "neutral",
        # Add more mappings as needed
    }

    tone_mapping = {
        "uplifting": "upbeat",
        "romantic": "passionate",
        "mysterious": "intriguing",
        # Add more mappings as needed
    }

    # Initialize mood, sentiment, and tone lists
    detected_moods = []
    detected_sentiments = []
    detected_tones = []

    # Analyze each tag and map to mood, sentiment, and tone
    for tag in tags:
        # Mood analysis
        mood = mood_mapping.get(tag.lower())
        if mood:
            detected_moods.append(mood)

        # Sentiment analysis
        sentiment = sentiment_mapping.get(tag.lower())
        if sentiment:
            detected_sentiments.append(sentiment)

        # Tone analysis
        tone = tone_mapping.get(tag.lower())
        if tone:
            detected_tones.append(tone)

    # Return the detected moods, sentiments, and tones
    return {
        "moods": detected_moods,
        "sentiments": detected_sentiments,
        "tones": detected_tones
    }
