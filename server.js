const express = require('express')
const bodyParser=require('body-parser');
const db =require('./config/database')
const app=express()
const LoginRouter=require('./api/Authantication/AuthRouting')
const ProductRouter=require('./api/Products/ProductRouting')
const CartRouter=require('./api/Cart/CartRouting')
const SubCategoryRouter=require('./api/subCategory/SubCategoryRouting')
const CategoryRouter=require('./api/Category/CategoryRouting')
const ManufactureRouter=require('./api/Manufacturer/manufacturerRouting')
const OrderRouter=require('./api/Order/OrderRouting')
const WishlistRouter=require('./api/Wishlist/WishlistRouting')

const cors = require('cors');
require('dotenv').config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cors({ origin: true }));
app.use('/public', express.static('public'));
app.use('/api/auth',LoginRouter);
app.use('/api/product',ProductRouter);
app.use('/api/cart',CartRouter);
app.use('/api/category',CategoryRouter);
app.use('/api/subcategory',SubCategoryRouter);
app.use('/api/manufacture',ManufactureRouter);
app.use('/api/order',OrderRouter);
app.use('/api/wishlist',WishlistRouter);
db();
app.use(express.json())


app.listen(process.env.PORT,()=>{
console.log('server is runnig on port number '+process.env.PORT)
})
