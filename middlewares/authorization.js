const { Photo } = require('../models');

async function authorization(req, res, next) {
  try {
    const photoId = req.params.id
    const authenticated = res.locals.user;
  
    const data = await Photo.findOne({where: {id: photoId}})
    if(!data) {
      return res.status(404).json({
        name: 'Data Not Found',
        devMessage: `Photo with id "${photoId}" not found`
      });
    }
  
    if(data.UserId === authenticated.id) {
      return next();
    }
  
    return res.status(403).json({
      name: 'Authorization Error',
      devMessage: `User with id "${authenticated.id}" does not have permission to access this photo with id "${photoId}"`
    })
  }catch(err) {
    return res.status(500).json(err);
  }
}

module.exports = authorization;