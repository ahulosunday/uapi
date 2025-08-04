const {users, notificats } = require('../models');

    const getAll = async(req, res)=>{
try{
        const data = await notificats.findAll({ 
            include: [{ model : users, as: 'sendto'}, { model : users, as: 'sendfrom'}],
            order:[['id','DESC']]});
         return res.status(200).json(data);
    }
    catch(err){
        return res.status(500).json({err: err.message});
    }
}
    const getAllByUser = async(req, res)=>{
    try{
        const uid = req.params.uid
            const data = await notificats.findAll({ 
                include: [{ model : users, as: 'sendto'}, { model : users, as: 'sendfrom'}],
                where:{
                 to_: uid
                },
                order:[['id','DESC']]});
             return res.status(200).json(data);
        }
        catch(err){
            return res.status(500).json({err: err.message});
        }
    }
    const getAllByUserFrom = async(req, res)=>{
        try{
            const uid = req.params.uid
                const data = await notificats.findAll({ 
                    include: [{ model : users, as: 'sendto'}, { model : users, as: 'sendfrom'}],
                    where:{
                     from_: uid
                    },
                    order:[['id','DESC']]});
                 return res.status(200).json(data);
            }
            catch(err){
                return res.status(500).json({err: err.message});
            }
        }
    const getAllByUserread = async(req, res)=>{
            try{
                const uid = req.params.uid
    
                    const data = await notificats.findAll({ 
                        include: [{ model : users, as: 'sendto'}, { model : users, as: 'sendfrom'}],
                        where:{
                         to_: uid,
                         is_read: 1
                        },
                        order:[['id','DESC']]});
                     return res.status(200).json(data);
                }
                catch(err){
                    return res.status(500).json({err: err.message});
                }
            }
    const getAllByUserUnread = async(req, res)=>{
        try{
            const uid = req.params.uid

                const data = await notificats.findAll({ 
                    include: [{ model : users, as: 'sendto'}, { model : users, as: 'sendfrom'}],
                    where:{
                     to_: uid,
                     is_read: 0
                    },
                    order:[['id','DESC']]});
                 return res.status(200).json(data);
            }
            catch(err){
                return res.status(500).json({err: err.message});
            }
        }
    const addMessage = async(req, res)=>{
            try{
                    const data = await notificats.create( req.body);
                     return res.status(200).json(data);
                }
                catch(err){
                    return res.status(500).json({err: err.message});
                }
            }
            const deleteMessage = async(req, res)=>{
                try{
                   const id = req.params.id
                        const data = await notificats.destroy({
                            where:{
                                id: id
                            }
                        });
                         return res.status(200).json(data);
                    }
                    catch(err){
                        return res.status(500).json({err: err.message});
                    }
                }
                const updateMessage = async(req, res)=>{
                    try{
                       const cons = req.body
                            const data = await notificats.update({
                                is_read: 1,
                                read_at : cons.date
                            },
                            {
                                where:{
                                    id: cons.id
                                }
                     } );
                             return res.status(200).json(data);
                        }
                        catch(err){
                            return res.status(500).json({err: err.message});
                        }
                    }
    
module.exports={
    getAll,
    getAllByUser,
    getAllByUserUnread,
    addMessage,
    deleteMessage,
    getAllByUserFrom,
    updateMessage,
    getAllByUserread


}