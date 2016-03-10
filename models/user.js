// Export some model methods
mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    username : String,
    email: String,
    color: String
});


module.exports = mongoose.model('User', userSchema);