import cloudinary.uploader


def upload_image_to_cloudinary(file_name):
    try:
        # Upload the image to Cloudinary
        result = cloudinary.uploader.upload(
            file_name, folder='picstone',  categorization="google_tagging", auto_tagging=0.6)
        return result
    except Exception as e:
        print(f"Error uploading image to Cloudinary: {str(e)}")
        return None
