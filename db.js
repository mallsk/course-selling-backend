const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const User =new Schema ({
    name : String,
    email : { type : String, unique : true},
    password : String
})

const Creator = new Schema ({
    name : String,
    email : { type : String, unique : true},
    password : String
})

const Courses = new Schema ({
    title : String,
    description : String,
    creatorId : ObjectId,
    imageUrl : String,
    price : Number
})

const Purchase = new Schema ({
    userId : ObjectId,
    courseId : ObjectId,
})


const UserModel = mongoose.model('user', User);
const CreatorModel = mongoose.model('creator', Creator);
const CoursesModel = mongoose.model('courses', Courses);
const PurchaseModel = mongoose.model('purchase', Purchase);

module.exports = {
    UserModel,
    CreatorModel,
    CoursesModel,
    PurchaseModel
}