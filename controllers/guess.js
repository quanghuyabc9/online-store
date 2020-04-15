const express = require('express');
const router = express.Router();
const productModel = require('../models/product');
const caterogyModel = require('../models/categories');
const nProducts = 8;

router.get('/categories/:catId/:pageNumber', async (req, res) => {
    let catId = req.params.catId;
    let pageNumber = req.params.pageNumber;
    if (catId != 'favicon.ico') {
        let categories = await caterogyModel.all();
        let products = await productModel.allByCatId(catId);
        for(let i = 0; i < categories.length; i++) {
            if(categories[i].CatID == catId) {
                categories[i].isActive = true;
                break;
            }
        }
        let productsOnPage = [];
        let pagination = [];
        let offset = (pageNumber - 1) * nProducts;
        for(let i = 0; i < nProducts && i < (products.length - (pageNumber -1) * nProducts); i++) {
            productsOnPage.push(products[offset + i]);
        }
        let nPages;
        if(products.length < nProducts)
            nPages = 1;
        else
            nPages = Math.floor(products.length/nProducts) + products.length % nProducts;
        for(let i = 0; i < nPages; i++) {
            pagination.push({
                CatID: catId,
                pageNumber: i + 1
            });
            if((i + 1) == pageNumber)
                pagination[i].isActive = true;
        }
        let previous = {
            CatID : catId,
            pageNumber : pageNumber - 1
        } 
        if(previous.pageNumber <= 0) 
            previous.isDisabled = true;
        let next = {
            CatID : catId,
            pageNumber : (+pageNumber + +1)
        }
        if(next.pageNumber > nPages) 
            next.isDisabled = true;
        res.render('guess/home', { 
            layout: 'main', 
            categories, 
            productsOnPage, 
            pagination,
            previous,
            next});
    }
})
router.get('/', async (req, res) => {
    res.redirect('/categories/6/1');
})
router.get('/products/:proId', async (req, res) => {
    let proId = req.params.proId;
    let products = await productModel.getByProId(proId);
    let product = products[0];
    res.render("guess/product", {
        layout: 'main',
        product
    });
})

module.exports = router;