const { BaseController } = require('./BaseController');
const { User } = require('../models');

class UserController extends BaseController {
    constructor() {
        super(User);
    }
}
module.exports = new UserController;
