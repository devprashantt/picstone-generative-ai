-- Create the 'users' table
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
-- Create the 'images' table
CREATE TABLE image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
-- Create the 'stories' table
CREATE TABLE story (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    image_id INT NOT NULL,
    story_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (image_id) REFERENCES image(id)
);
-- Create the 'music' table
CREATE TABLE music (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    story_id INT NOT NULL,
    image_id INT NOT NULL,
    music_content BLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (story_id) REFERENCES story(id),
    FOREIGN KEY (image_id) REFERENCES image(id)
);
-- Create the 'tags' table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    story_id INT REFERENCES story(id),
    image_id INT REFERENCES image(id),
    tags_string TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);