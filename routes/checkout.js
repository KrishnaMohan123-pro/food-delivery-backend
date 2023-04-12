const Order = require('../models/Order');

const Router = require('express').Router();

Router.get('/get/:email', async (req, res) => {
    const orders = await Order.find({'email': req.params.email})
    console.log(req.params.email, orders[0].orderData)
    res.json({success: true})
})
Router.post('/', async (req, res) => {
    const {
        orderData
    } = req.body;
    await orderData.splice(0, 0, {
        orderDate: req.body.orderDate
    })
    let eId = await Order.findOne({
        'email': req.body.email
    });
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                orderData: [orderData]
            }).then(() => {
                res.json({
                    success: true
                })
            })
        } catch (e) {
            console.log(e.message)
            res.send('Server Error', e.message)
        }
    } else {
        try {
            Order.findOneAndUpdate({
                'email': req.body.email
            }, {
                $push: {
                    orderData: [orderData]
                }
            }).then(() => {
                res.json({
                    success: true
                })
            })
        } catch (e) {
            console.log(e.message)
            res.send('Server Error', e.message)
        }
    }

})
module.exports = Router