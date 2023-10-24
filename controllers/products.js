const Product = require('../models/product.js');

const getAllProductsStatic = async( req, res)=>{
    const products = await Product.find({})
    res.status(200).json(products);
}

const getAllProducts = async(req, res)=>{
   // destructure to get all properties in the query object
   const {name, price, featured, rating, company, sort, fields ,numericFilters} = req.query;
   const queryObject = {};

//implementing processing e.g. sorting,filters etc. to the result so no await
    
    //convert user-friendly query to mongoose operators
    if(numericFilters){
        const operatorMap ={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }

        const regex = /\b(<|<=|=|>|>=)\b/g
        let filters = numericFilters.replace(regex, (match)=>`-${operatorMap[match]}-`)
        //console.log(filters)
        //query building from filters
        const options = ['price','rating']
        filters = filters.split(',').forEach(el => {
            const [field, operator, value] = el.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        });
    }

    if(name){
        queryObject.name = name;
   }
   if(price){
    queryObject.price = price;
}
if(featured){
    queryObject.featured = featured== 'true'? true: false;
}
if(rating){
    queryObject.rating = rating;
}
if(company){
    queryObject.company = company;
}

    //console.log(queryObject)
    let result = Product.find(queryObject)

//conditionally sorted result after preprocessing products
if(sort){
    var sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
    console.log(sortList)
}else{
    result = result.sort('createdAt')
}

if(fields){
    const fieldList = fields.split(',').join(' ')
    result = result.select(fieldList)
}


    const products = await result
    res.status(200).json({ products })
}

const addSingleProduct = async(req, res)=>{
    const { product } = req.body;
    res.status(201).json({ product })
}

const getProduct = async(req, res)=>{ 
    const {id} = req.params;
    const product = await Product.find({ _id:id})
    res.status(201).josn({ product })
}

module.exports = {getAllProductsStatic, getAllProducts, addSingleProduct, getProduct}
