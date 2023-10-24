const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },
    featured:{
        type:Boolean,
        default:false
    },
    company:{
        type:String,
        required:true,
        enum:{
            values:['ikea', 'liddy', 'macros', 'caressa'],
            message:'{VALUE} is not supported'
        }
    },
    rating:{
        type:Number,
        min:[1, 'Can not be less than 1'],
        max:[5, 'Rating must be between 1 & 5'],
        default: 4.5
    }
})

module.exports = mongoose.model('Product', ProductSchema)