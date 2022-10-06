const router = require('express').Router();

const PhotoController = require('../controllers/PhotoController');
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.post('/users/register', UserController.register);
router.post('/users/login', UserController.login);
router.use(authentication);
router.get('/photos', PhotoController.getAllPhotos);
router.post('/photos', PhotoController.createPhoto);

router.get('/photos/:id', PhotoController.getOnePhotoById);
router.use('/photos/:id', authorization);
router.put('/photos/:id', PhotoController.updateOnePhotoById);
router.delete('/photos/:id', PhotoController.deleteOnePhotoById);

module.exports = router;
