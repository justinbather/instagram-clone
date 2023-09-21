import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

export default upload;

//Add ability to upload multiple images with upload.array