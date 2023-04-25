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
const MhaOrderRouter=require('./api/Mha/mhaOrderRouting')
const WishlistRouter=require('./api/Wishlist/WishlistRouting')
const WarehouseRouter = require('./api/Warehouse/warehouseRouting')
const BlogsRouter = require('./api/Blogs/blogRouting')
const SubscribedRouter = require('./api/Subscribed/SubscribedRouting')
//const ShippingRouter = require('./api/Shipping/ShippingRouting')

const cors = require('cors');
require('dotenv').config()
app.use(bodyParser.json({ limit: "100mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 }))
app.use(cors({ origin: true }));
app.use('/public', express.static('public'));
app.use('/api/auth',LoginRouter);
app.use('/api/product',ProductRouter);
app.use('/api/cart',CartRouter);
app.use('/api/category',CategoryRouter);
app.use('/api/subcategory',SubCategoryRouter);
app.use('/api/manufacture',ManufactureRouter);
app.use('/api/order',OrderRouter);
app.use('/api/mhaOrder',MhaOrderRouter);
// app.use('//api/shipping_details',ShippingRouter)
app.use('/api/wishlist',WishlistRouter);
app.use('/api/warehouse',WarehouseRouter);
app.use('/api/blogs',BlogsRouter)
app.use('/api/subscribed',SubscribedRouter);
db();
app.use(express.json())


app.listen(process.env.PORT,()=>{
console.log('server is runnig on port number '+process.env.PORT)
})
