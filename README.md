# Picstone

## Description

Picstone is an innovative platform that combines visual content with storytelling and music generation. It allows users to upload images, and using AI-powered analysis, it generates engaging stories and music compositions based on the visual content. Whether you're a creative writer, a musician, or simply looking for a unique way to express yourself, Picstone offers a creative playground to bring your imagination to life.

## Features

- Upload images and receive AI-generated stories and music compositions.
- Customize the mood, tone, and sentiment of your generated content.
- Explore a library of generated content for inspiration.
- Share your creations with the Picstone community.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- Python and Flask for the backend.
- Cloudinary API credentials.
- OpenAI API credentials.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devprashantt/picstone-generative-ai.git
   cd picstone
   ```

2. Install the frontend dependencies:

   ```bash
   cd client
   npm install
   ```

3. Install the backend dependencies:

   ```bash
   cd server
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory and add your Cloudinary and OpenAI API credentials:

   ```env
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   OPENAI_API_KEY=your-openai-api-key
   ```

5. Start the frontend and backend servers:

   ```bash
   # In the frontend directory
   npm run dev

   # In the backend directory
   python app.py
   ```

6. Open your browser and navigate to `http://127.0.0.1:5000/` to access Picstone.

## Usage

1. Upload an image of your choice.
2. Customize the mood, tone, and sentiment settings as desired.
3. Generate a story and music composition based on the uploaded image.
4. Explore a library of previously generated content for inspiration.
5. Share your creations with the Picstone community.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Cloudinary and OpenAI teams for their powerful APIs.
- Inspired by the creativity of users who bring Picstone to life.
