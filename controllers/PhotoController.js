const { Photo, User } = require('../models');

class PhotoController {
  static async getAllPhotos(req, res) {
    try {
      const result = await Photo.findAll({
        include: User
      });

      res.json(result);
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static getOnePhotoById(req, res) {
    let id = +req.params.id;
    Photo.findByPk(id)
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err));
  }

  static createPhoto(req, res) {
    const {title, caption, image_url} = req.body;
    const user = res.locals.user;
    Photo.create({title, caption, image_url, UserId: user.id})
      .then(result => res.status(201).json(result))
      .catch(err => res.status(500).json(err));
  }

  static updateOnePhotoById(req, res) {
    const id = +req.params.id;
    const { title, caption, image_url } = req.body;
    const data = { title, caption, image_url };

    Photo.update(data, { where: { id }, returning: true })
      .then(result => res.status(200).json(result))
      .catch(err => res.status(500).json(err));
  }

  static deleteOnePhotoById(req, res) {
    const id = +req.params.id;
    Photo.destroy({
      where: { id },
    }).then(result => res.status(200).json(result))
      .catch(err => res.status(500).json(err));
  }
}

module.exports = PhotoController;