const { comparePassword } = require("../helpers/bcrypt");
const { User } = require("../models");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res) {
    try {
      const { email, password, username } = req.body;
      const result = await User.create({ email, password, username})
      const response = {
        id: result.id,
        username: result.username,
        email: result.email
      }
      res.status(201).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  static login(req, res) {
    const {email, password} = req.body;
    User.findOne({where: {email}})
      .then(user => {
        if(!user) {
          throw {
            name: 'User Login Error',
            devMessage: `User with email "${email}" not found`
          }
        }
        const isCorrect = comparePassword(password, user.password);
        if(!isCorrect) {
          throw {
            name: 'User Login Error',
            devMessage: `User with email "${email}" does not match`
          }
        }
        const response = {
          id: user.id,
          email: user.email,
        }
        const token = generateToken(response);
        return res.status(200).json({token});
      }).catch(err => {
        res.status(401).json(err)
      })
  }
}

module.exports = UserController;