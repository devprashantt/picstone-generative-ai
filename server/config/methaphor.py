import os
from dotenv import load_dotenv
from metaphor_python import Metaphor


load_dotenv()

metaphor = Metaphor(os.environ.get('METAPHOR_API_KEY'))
