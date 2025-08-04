const { country, users } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')


const getCountrys = async(req, res) =>{
    try{
        const data = await country.findAll({ 
            include: [users ],
            order:[['name','ASC']]});
         return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json({err: err.errors[0].message});
    }

}
const getAllCountry = async(req, res)=>{
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await country.findAndCountAll({ 
            include: {model: users }, 
            order:[['name','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({err: err.errors[0].message})
    }


}


const getCountry =async(req, res) =>{
   try{
        const CountryId = req.params.id
        const Countrys = await country.findOne({ where:{id : CountryId}})
        return res.status(200).json(Countrys)
    }
    catch(err){
        return res.status(200).json({err: err.errors[0].message})
    }

}

const addCountry = async(req, res) =>{
try{
    
     const col = await country.create({ name: req.body.name , code: req.body.code,shortname: req.body.shortname,currency: req.body.currency, userId: req.body.userId});
    return res.status(200).json(col)
}
catch(err){
    return res.status(500).json( {err: err.errors[0].message} )
}
  
   
}

const deleteCountry = async(req, res) =>{
    try{
        //const token = req.cookies.access_token
       // if(!token) return res.status(401).json("Not authenticated")
        const CountryId = req.params.id
        await country.destroy({ where:{id : CountryId}})
        .then(resp=>{
           return res.status(200).json(resp); 
        })
        .catch(errs=>{
            return res.status(500).json({err: 'Unable to delete the selected Country, another record(s) is using it.'}); 
        })
           
        
    }
    catch(err){
       return res.status(200).json({err: err.errors[0].message});
    }
}

 const updateCountry = async(req, res) =>{
  try{
        const CountryId = req.params.id
        const {name, code, shortname,currency, userId } = req.body
        const ress = await country.findOne({ where:{id : CountryId}})
        ress.name = name
        ress.code= code
        ress.shortname = shortname
        ress.currency = currency
        ress.userId = userId
        ress.save().then(resp=>{
           return (res.status(200).json(resp))
        }).catch(err=>{
            return res.status(500).json({err:err.errors[0].message})
        
        })
  }
  catch(err){
    return res.status(200).json({err:err.message})
  }  
   
}

module.exports = {
    getCountrys,
    getCountry,
    addCountry,
    deleteCountry, 
    updateCountry,
    getAllCountry,
    
    
}