import cloudinary.uploader


def upload_image_to_cloudinary(file_name):
    try:
        # Upload the image to Cloudinary
        result = cloudinary.uploader.upload(
            file_name,
            folder='picstone',
            ocr="adv_ocr",
            categorization="google_tagging",
            detection="captioning",
            auto_tagging=0.6
        )
        return result
    except Exception as e:
        print("Error occurred while trying to upload an image to Cloudinary")
        raise e
