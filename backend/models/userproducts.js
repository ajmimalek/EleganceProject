const mongoose=require('mongoose');
var Schema = mongoose.Schema;

var UserPrducts =new Schema ({

    Favorite : Boolean,
}
);
module.exports = mongoose.model('userproducts', UserPrducts);