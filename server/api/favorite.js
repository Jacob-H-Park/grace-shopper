const router = require("express").Router();

router.get('/addToFavorite', async(req, res, next) => {
    try{
        // const promotions = await Promotion.findAll()
        // res.send(promotions)
    } catch(err){
        next(err)
    }
})

router.post('/removeFromFavorite', async(req,res,next)=>{
    try{
        // console.log(req.body)
        // const promotion = await Promotion.findAll({
        //     where:{
        //         Code:req.body.Code
        //     }
        // })

        // res.send(promotion)
    }catch(err){
        next(err)
    }
})

module.exports = router;