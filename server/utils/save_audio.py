import wave


def save_audio_file(audio_chunks, filename):

    # Assuming audio chunks are in PCM format
    audio_data = b''.join(audio_chunks)

    # Set the audio file parameters
    channels = 1  # Mono audio
    sample_width = 2  # 16-bit audio
    frame_rate = 48000  # Adjust as needed

    with wave.open(filename, 'wb') as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(frame_rate)
        wf.writeframes(audio_data)
