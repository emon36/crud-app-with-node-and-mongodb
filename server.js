const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const Product = require('./models/productModel')


app.use(express.json())

app.get('/' , (req, res) => {
    res.send('Hello node api')
})

app.get('/products', async(req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);

    }catch(error){
        res.status(500).json({message: error.message})
    }
})


app.get('/product/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    }catch(error){
        res.status(500).json({message: error.message})
    }
})



app.post('/insert/product', async(req, res) => {
    try{
        const product  = await new Product(req.body)
        product.save();
        res.status(200).json(product)

    }catch(error)
    {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/update/product/:id', async(req, res) => {
    try{
        const {id} =  req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: 'cannot find any product with ID ${id}'})
        }
        res.status(200).json(product)

    }catch(error){
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://msemon:admin1234@cluster0.qjt6ixo.mongodb.net/node-api?retryWrites=true&w=majority')
.then(() => {
    console.log('database connectd')
    app.listen(3000, ()=> {
        console.log('Node api app running');
    })
}).catch((error) => {
    console.log(error)
})