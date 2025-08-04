
const {gifship, users, gifshiptype, insurance }  = require('../models');
const { getPagination, getPagingData } = require('../helpers/paging')

const createGifship = async (req, res) => {
        try {
        
    } catch (err) {
       return res.json({ err: err.errors[0].message})
    }
}
const GifshipbyId = async(req, res )=>{
    try{
        const id = req.params.id
       const gif = await gifshiptype.findAll({include: [users ], where:{ gifshipId: id}});
       
        return res.status(200).json(gif)
    }
    catch(err){
     return res.status(500).json({ err: err.message})
    }
}
const getGifship = async(req, res )=>{
    try{
        const id = req.params.id
        const gif = await gifship.findAll({
       include:[users, insurance],
       where:{
        insurance_id: id
       }
       
       });
        return res.status(200).json(gif)
       
           
    }
    catch(err){
     return res.status(500).json({ err: err.message})
    }
}

const createGifshipType = async(req, res) =>{
    try{
    const {name,	gifshipId,	userId, insurance_id } = req.body
 const gType = await gifshiptype.create({name,	gifshipId,	userId, insurance_id})
 return res.status(200).json(gType)
    }
    catch(err){
         return res.status(500).json({ err: err.errors[0].message})
    }
}
const getGifshipList = async(req, res )=>{
    try{
         const  page =  req.params.page
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await gifshiptype.findAndCountAll({ 
          include: [users, gifship, insurance], 
            order:[['name','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
     return res.status(500).json({ err: err.message})
    }
}
const getGifshipDelete = async(req, res )=>{
    try{
        const id  = req.params.id
       
        await gifshiptype.destroy({ where:{id: id }}).then(resp=>{
             return res.status(200).json("One record deleted successfully");
        }).catch(err=>{
             return res.status(500).json({ err: "Error occured. Can not delete data already used"})
        })
       
    }
    catch(err){
     return res.status(500).json({ err: err.message})
    }
}
const GifshipEdit = async(req, res )=>{
    try{
        const id  = req.params.id
      const gif = await gifshiptype.update({ where:{id: id }});
        return res.status(200).json(gif);
    }
    catch(err){
     return res.status(200).json({ err: err.errors[0].message})
    }
}
//Gifshipone
const Gifshipone = async(req, res )=>{
    try{
        const id  = req.params.id
      const gif = await gifshiptype.findOne({ where:{id: id }});
        return res.status(200).json(gif);
    }
    catch(err){
     return res.status(200).json({ err: err.message})
    }
}
//============GifshipUpdate
const GifshipUpdate = async(req, res )=>{
    try{
        const id = req.params.id
       const { name,	gifshipId,	userId, insurance_id} = req.body
      const gif = await gifshiptype.findOne({ where:{id: id }});
      gif.name = name,
      gif.gifshipId = gifshipId, 
      gif.userId = userId
      gif.insurance_id = insurance_id
      await gif.save().then(resp=>{
        return res.status(200).json(resp);
      }).catch(err=>{
        return res.status(500).json({ err: err.errors[0].message})
      })

        
    }
    catch(err){
     return res.status(200).json({ err: err.message})
    }
}

module.exports = {
    createGifship,
    getGifship,
    createGifshipType,
    getGifshipList,
    getGifshipDelete,
    GifshipEdit,
    Gifshipone,
     GifshipUpdate,
     GifshipbyId,
 
     
    
}