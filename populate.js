require('dotenv').config()

const connectDB = require('./db/connect.js');
const Product = require('./models/product.js');
const productsJSON = require('./products.json');

const start = async ()=>{
    try{
        await connectDB(process.env.MONGODB_URL)
        // jsonfile.readFile('./products.json', (err, obj)=>{
        //     if(err) console.log(err)
        //     console.log('success', obj)
        // })
        await Product.deleteMany()
        await Product.create(productsJSON)
        console.log('success')
        process.exit(0)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

start()