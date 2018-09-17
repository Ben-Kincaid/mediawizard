# mediawizard


## About
mediawizard is a MERN-stack application that allows users to upload, compress and store .PNG and .JPEG images. Images are hosted and served by an AWS S3 bucket specified in your servers `.env` file. Users are able to login to the platform, where they can compress JPEG and PNG images which are automatically saved on their account. Users can then view and download their compressed images on the 'My Files' page.

[imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg) and [imagemin-pngquant](https://github.com/imagemin/imagemin-pngquant) are used to compress JPEG and PNG images, respectively, while the [aws-sdk]() is used to communicate from the Express server to your AWS S3 bucket. 


