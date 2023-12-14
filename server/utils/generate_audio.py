from pyht import Client
from pyht.client import TTSOptions
import os
from dotenv import load_dotenv
from flask import send_file
from io import BytesIO

load_dotenv()


def generate_audio(story_content):
    client = Client(
        user_id=os.getenv("PLAY_HT_USER_ID"),
        api_key=os.getenv("PLAY_HT_API_KEY"),
    )

    options = TTSOptions(
        voice="s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json"
    )

    # Create a BytesIO object to store the audio chunks
    audio_buffer = BytesIO()

    for chunk in client.tts(story_content, options):
        # Write each audio chunk to the BytesIO buffer
        audio_buffer.write(chunk)

    # Get the bytes from the buffer
    audio_data = audio_buffer.getvalue()

    # Return the audio data directly to the frontend
    return send_file(BytesIO(audio_data), as_attachment=True, download_name='output_audio.wav')
