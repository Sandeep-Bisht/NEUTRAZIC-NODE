const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title: {
        required: true,
        type : String
    },
    slug: {
        required : true,
        type : String,
        unique : true
    },
    description: {
        required : true,
        type: String
    },
    featuredImage : {
        required: true,
        type: Array
    },
    content: {
        required: true,
        type : String
    }
}, {timestamps : true })

const model = mongoose.model("blogs", blogSchema)
module.exports = model;