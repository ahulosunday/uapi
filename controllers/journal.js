const { journal,payment, ewallet, reportchart, pvheader, chart_of_account, account_type, pv_detail, bank, mapping, refund, sequelize} = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op} = require('sequelize');
const moment = require('moment');

const getAll = async(req, res)=>{
	const data = await journal.findAll({
		include: [chart_of_account],
            order:[['id','ASC']]});
         return res.status(200).json(data);

}
const getAllPagings = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await journal.findAndCountAll({ 
			order:[['id','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({err: err.message})
    }
}
const getOne = async (req, res)=>{
    try{
        const Id = req.params.id;
        const data = await journal.findOne({where:{id:Id}})
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const add =async (req, res)=>{
    try{
		
     const data = await journal.create({acc_id: req.body.acc_id, d_entry: req.body.d_entry, descr: req.body.descr, t_type: req.body.t_type, amt: req.body.amt, entity_id: req.body.entity_id})
     return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const update = async(req, res)=>{
    try{
		//acc_id, entity_id,d_entry,descr,t_type, amt
     const Id = req.params.id;
     const data = await journal.findOne({where:{id: Id}});
     data.acc_id = acc_id
	 data.d_entry = req.body.d_entry
	 data.descr = req.body.descr
     data.t_type = req.body.t_type
     data.amt = req.body.amt
     data.entity_id = req.body.entity_id
     data.save().then(rex=>{
        return res.status(200).json(rex)
     })

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const postJournal = async(req, res)=>{
    try{
        //ids:listv, id1: currentUser.id , chk: false, account: ''
         const ids = req.body.ids;
       const uid = req.body.id1;
       const chk = req.body.chk;
       const dataewallet = req.body.wk;
       const accountid = req.body.account;
       const vdate = req.body.vdate;
     
       if(chk === true){

        const arr = ids.split(',')
        let status = false
        let obj =[]
        if(arr.length !== 0){
            for(let i = 0; i < arr.length; i++){
                var data =[]
                var dataname = ''
                var chartofaccountbank = 0
                if(dataewallet === 'ewallet'){
                   
                    data = await ewallet.findOne({where:{id: arr[i]}});
                  
                    const bankData = await bank.findOne({where:{id:data.dataValues.bank}});
                    chartofaccountbank = bankData.dataValues.chart_of_account_id
                    dataname = 'ewallet'
                   
                    
                }
                else{
                    data = await payment.findOne({where:{id: arr[i]}});
                    const bankData = await bank.findOne({where:{id:data.dataValues.bank}});
                    chartofaccountbank = bankData.dataValues.chart_of_account_id
                    dataname = data.dataValues.service_name
                }
                
                   const result = await sequelize.transaction(async (t) => {
                 switch(dataname){

                    case 'ewallet': //533
                    const ewalletCredit = await journal.create({
                        acc_id: accountid,
                        entity_id: uid,
                        d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                        descr: data.dataValues.narration,
                        t_type: 'CREDIT',
                        amt: data.dataValues.amt

                    },{transaction: t})
                     const ewalletdebit = await journal.create({
                        acc_id:chartofaccountbank,
                         entity_id: uid,
                        d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                        descr: data.dataValues.narration,
                        t_type: 'DEBIT',
                        amt: data.dataValues.amt

                    }, {transaction: t});
                    const ewalletdata1 = await ewallet.update(
                            
                        {
                                    posted: 1
                        },
                        {
                            where:{id: arr[i]}
                        },
                        {
                            transaction: t
                        }
                    
                    ); 

                    break
                        case 'Outpts_Drugs':
                            //----------------------------------------------------
                            
                            //const resData = await mapping.findOne({ where: {mappingcode: data.dataValues.service_id, tablename:'Drug'}});
                             const postCredit = await journal.create({
                                acc_id:accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                           const data1 = await payment.update(
                            
                            {
                                        jid1: postCredit.dataValues.id,
                                        jid2: postdebit.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        ); 
                        
                        //-----------------REFUND----------------
                        const refundDrug = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                    
                        if(refundDrug){
                             const postdebitDrug = await journal.create({
                                acc_id: accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundDrug.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundDrug.dataValues.amount

                            },{transaction: t})
                             const bankDatarDrug = await bank.findOne({where:{id:refundDrug.dataValues.bank}});
                             const postCreditDrug  = await journal.create({
                                acc_id:bankDatarDrug.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundDrug.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundDrug.dataValues.amount

                            }, {transaction: t});
                        }
                    
                        //----------------END REFUND-----------------------
                      
                                                                       
                        //-------------------------------------------
                                    
                             break
                        case 'Outpts_Investigations':
                            //const resData2 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Investigation'}});
                             //----------------------------------------------------
                              const postCredit2 = await journal.create({
                                acc_id: accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit2 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                        const data12 = await payment.update(
                           
                            {
                                        jid1: postCredit2.dataValues.id,
                                        jid2: postdebit2.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit2.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                         //-----------------REFUND----------------
                         
                        const refundInvestigations = await refund.findOne({
                            where:{pid: arr[i]}
                        })
                       
                        if(refundInvestigations){
                             const postdebitrefundInvestigations = await journal.create({
                                acc_id:accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundInvestigations.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundInvestigations.dataValues.amount

                            },{transaction: t})
                             const bankDatarInvestigation = await bank.findOne({where:{id:refundInvestigations.dataValues.bank}});
                             const postCreditInvestigation  = await journal.create({
                                acc_id:bankDatarInvestigation.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundInvestigations.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundInvestigations.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                        
                                
                        break
                        
                        case 'Outpts_Miscellanous':
                                  //----------------------------------------------------
                              const postCreditm = await journal.create({
                                acc_id:data.dataValues.service_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebitm = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                              const data1m = await payment.update(
                           
                            {
                                        jid1: postCreditm.dataValues.id,
                                        jid2: postdebitm.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCreditm.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                                
                                        //-------------------------------------------

                        break
                        case 'Outpts_Services':
                             //const resData3 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Service'}});
                                   //----------------------------------------------------
                              const postCredit3 = await journal.create({
                                acc_id:accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit3 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                            const data13 = await payment.update(
                           
                            {
                                        jid1: postCredit3.dataValues.id,
                                        jid2: postdebit3.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit3.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                                 //-----------------REFUND----------------
                        const refundService = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                        if(refundService){
                             const postdebitrefundService = await journal.create({
                                acc_id:accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundService.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundService.dataValues.amount

                            },{transaction: t})
                             const bankDataService = await bank.findOne({where:{id:refundService.dataValues.bank}});
                             const postCreditService  = await journal.create({
                                acc_id:bankDataService.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundService.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundService.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                         
                        break
                        case 'Outpts_Tests':
                             //const resData4 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Test'}});
                                   //----------------------------------------------------
                              const postCredit4 = await journal.create({
                                acc_id:accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit4 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                             const data14 = await payment.update(
                           
                            {
                                        jid1: postCredit4.dataValues.id,
                                        jid2: postdebit4.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit4.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                          //-----------------REFUND----------------
                        const refundTest = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                        if(refundTest){
                             const postdebitrefundTest = await journal.create({
                                acc_id:accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundTest.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundTest.dataValues.amount

                            },{transaction: t})
                             const bankDataTest = await bank.findOne({where:{id:refundTest.dataValues.bank}});
                             const postCreditTest  = await journal.create({
                                acc_id:bankDataTest.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundTest.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundTest.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                        
                                
                                        //-------------------------------------------
                        break
                        case 'Additional Item':
                            // const resData5 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Drug'}});
                                   //----------------------------------------------------
                              const postCredit5 = await journal.create({
                                acc_id:accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit5 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                            const data15 = await payment.update(
                           
                            {
                                        jid1: postCredit5.dataValues.id,
                                        jid2: postdebit5.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit5.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                            //-----------------REFUND----------------
                        const refundAddition = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                        if(refundAddition){
                             const postdebitrefundAddition = await journal.create({
                                acc_id:accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundAddition.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundAddition.dataValues.amount

                            },{transaction: t})
                             const bankDataAddition = await bank.findOne({where:{id:refundAddition.dataValues.bank}});
                             const postCreditAddition  = await journal.create({
                                acc_id:bankDataAddition.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundAddition.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundAddition.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                              
                                        //-------------------------------------------
                        break
                        case 'Prescribed Drugs':
                             //const resData6 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Drug'}});
                                   //----------------------------------------------------
                              const postCredit6 = await journal.create({
                                acc_id: accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit6 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                             const data16 = await payment.update(
                           
                            {
                                        jid1: postCredit6.dataValues.id,
                                        jid2: postdebit6.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit6.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                                 //-----------------REFUND----------------
                        const refundDrug2 = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                        if(refundDrug2){
                             const postdebitrefundDrug = await journal.create({
                                acc_id: accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundDrug2.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundDrug2.dataValues.amount

                            },{transaction: t})
                             const bankDatarDrug2 = await bank.findOne({where:{id:refundDrug2.dataValues.bank}});
                             const postCreditDrug2  = await journal.create({
                                acc_id:bankDatarDrug2.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundDrug2.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundDrug2.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                         
                                        //-------------------------------------------
                        break
                        case 'Prescribed Investigation':
                             //const resData7 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Investigation'}});
                                   //----------------------------------------------------
                              const postCredit7 = await journal.create({
                                acc_id: accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit7 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                             const data17 = await payment.update(
                           
                            {
                                        jid1: postCredit7.dataValues.id,
                                        jid2: postdebit7.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit7.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                                  //-----------------REFUND----------------
                        const refundInvestigation2 = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                        if(refundInvestigation2){
                             const postdebitrefundInvestigation2 = await journal.create({
                                acc_id: accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundInvestigation2.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundInvestigation2.dataValues.amount

                            },{transaction: t})
                             const bankDatarInvestigation2 = await bank.findOne({where:{id:refundInvestigation2.dataValues.bank}});
                             const postCreditInvestigation2  = await journal.create({
                                acc_id:bankDatarInvestigation2.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundInvestigation2.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundInvestigation2.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                        
                                        //-------------------------------------------
                        break
                        case 'Prescribed Services':
                             //const resData8 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Service'}});
                                    //----------------------------------------------------
                              const postCredit8 = await journal.create({
                                acc_id: accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit8 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                              const data18 = await payment.update(
                           
                            {
                                        jid1: postCredit8.dataValues.id,
                                        jid2: postdebit8.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit8.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                                  //-----------------REFUND----------------
                        const refundService2 = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                        if(refundService2){
                             const postdebitrefundService2 = await journal.create({
                                acc_id: accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundService2.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundService2.dataValues.amount

                            },{transaction: t})
                             const bankDataService2 = await bank.findOne({where:{id:refundService2.dataValues.bank}});
                             const postCreditService2  = await journal.create({
                                acc_id:bankDataService2.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundService2.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundService2.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                        
                                        //-------------------------------------------

                        break
                        case 'Prescribed Test':
                              //const resData9 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Test'}});
                                    //----------------------------------------------------
                              const postCredit9 = await journal.create({
                                acc_id: accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit9 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                             const data19 = await payment.update(
                           
                            {
                                        jid1: postCredit9.dataValues.id,
                                        jid2: postdebit9.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit9.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                                  //-----------------REFUND----------------
                        const refundTest2 = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                        if(refundTest2){
                             const postdebitrefundTest2 = await journal.create({
                                acc_id: accountid,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundTest2.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundTest2.dataValues.amount

                            },{transaction: t})
                             const bankDataTest2 = await bank.findOne({where:{id:refundTest2.dataValues.bank}});
                             const postCreditTest2 = await journal.create({
                                acc_id:bankDataTest2.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundTest2.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundTest2.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                        
                                        //-------------------------------------------
                        break
                        
                    }

                 });//============Transaction
                             

            }
        }

       
return res.status(200).json(obj)
  //console.log('======================================' + accountid )
 } //=====================END OF IF STATEMENT
       else{
       
        const arr = ids.split(',')
        let status = false
        let obj =[]
        if(arr.length !== 0){
            for(let i = 0; i < arr.length; i++){
                var data =[]
                var dataname = ''
                var chartofaccountbank = 0
                if(dataewallet === 'ewallet'){
                   
                    data = await ewallet.findOne({where:{id: arr[i]}});
                    const bankData = await bank.findOne({where:{id:data.dataValues.bank}});
                    chartofaccountbank = bankData.dataValues.chart_of_account_id
                    dataname = 'ewallet'
                   
                    
                }
                else{
                    data = await payment.findOne({where:{id: arr[i]}});
                    const bankData = await bank.findOne({where:{id:data.dataValues.bank}});
                    chartofaccountbank = bankData.dataValues.chart_of_account_id
                    dataname = data.dataValues.service_name
                }
                /*
                const data = await payment.findOne({where:{id: arr[i]}});
                 const bankData = await bank.findOne({where:{id:data.dataValues.bank}});
                 const chartofaccountbank = bankData.dataValues.chart_of_account_id*/
                 
                   const result = await sequelize.transaction(async (t) => {
                 switch(dataname){
                        case 'ewallet': //533
                        const ewalletCredit = await journal.create({
                            acc_id: 533,
                            entity_id: uid,
                            d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                            descr: data.dataValues.narration,
                            t_type: 'CREDIT',
                            amt: data.dataValues.amt

                        },{transaction: t})
                         const ewalletdebit = await journal.create({
                            acc_id:chartofaccountbank,
                             entity_id: uid,
                            d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                            descr: data.dataValues.narration,
                            t_type: 'DEBIT',
                            amt: data.dataValues.amt

                        }, {transaction: t});
                        const ewalletdata1 = await ewallet.update(
                            
                            {
                                        posted: 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        ); 
                        break
                        case 'Outpts_Drugs':
                            //----------------------------------------------------
                            
                            const resData = await mapping.findOne({ where: {mappingcode: data.dataValues.service_id, tablename:'Drug'}});
                             const postCredit = await journal.create({
                                acc_id:resData.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                           const data1 = await payment.update(
                            
                            {
                                        jid1: postCredit.dataValues.id,
                                        jid2: postdebit.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        ); 
                        
                        //-----------------REFUND----------------
                        const refundDrug = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                    
                        if(refundDrug){
                             const postdebitDrug = await journal.create({
                                acc_id:resData.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundDrug.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundDrug.dataValues.amount

                            },{transaction: t})
                             const bankDatarDrug = await bank.findOne({where:{id:refundDrug.dataValues.bank}});
                             const postCreditDrug  = await journal.create({
                                acc_id:bankDatarDrug.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundDrug.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundDrug.dataValues.amount

                            }, {transaction: t});
                        }
                    
                        //----------------END REFUND-----------------------
                      
                                                                       
                        //-------------------------------------------
                                    
                             break
                        case 'Outpts_Investigations':
                            const resData2 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Investigation'}});
                             //----------------------------------------------------
                              const postCredit2 = await journal.create({
                                acc_id: resData2.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit2 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                        const data12 = await payment.update(
                           
                            {
                                        jid1: postCredit2.dataValues.id,
                                        jid2: postdebit2.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit2.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                         //-----------------REFUND----------------
                         
                        const refundInvestigations = await refund.findOne({
                            where:{pid: arr[i]}
                        })
                       
                        if(refundInvestigations){
                             const postdebitrefundInvestigations = await journal.create({
                                acc_id:resData2.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundInvestigations.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundInvestigations.dataValues.amount

                            },{transaction: t})
                             const bankDatarInvestigation = await bank.findOne({where:{id:refundInvestigations.dataValues.bank}});
                             const postCreditInvestigation  = await journal.create({
                                acc_id:bankDatarInvestigation.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundInvestigations.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundInvestigations.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                        
                                
                        break
                        
                        case 'Outpts_Miscellanous':
                                  //----------------------------------------------------
                              const postCreditm = await journal.create({
                                acc_id:data.dataValues.service_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebitm = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                              const data1m = await payment.update(
                           
                            {
                                        jid1: postCreditm.dataValues.id,
                                        jid2: postdebitm.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCreditm.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                                
                                        //-------------------------------------------

                        break
                        case 'Outpts_Services':
                             const resData3 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Service'}});
                                   //----------------------------------------------------
                              const postCredit3 = await journal.create({
                                acc_id:resData3.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit3 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                            const data13 = await payment.update(
                           
                            {
                                        jid1: postCredit3.dataValues.id,
                                        jid2: postdebit3.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit3.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                                 //-----------------REFUND----------------
                        const refundService = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                        if(refundService){
                             const postdebitrefundService = await journal.create({
                                acc_id:resData3.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundService.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundService.dataValues.amount

                            },{transaction: t})
                             const bankDataService = await bank.findOne({where:{id:refundService.dataValues.bank}});
                             const postCreditService  = await journal.create({
                                acc_id:bankDataService.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundService.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundService.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                         
                        break
                        case 'Outpts_Tests':
                             const resData4 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Test'}});
                                   //----------------------------------------------------
                              const postCredit4 = await journal.create({
                                acc_id:resData4.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit4 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                             const data14 = await payment.update(
                           
                            {
                                        jid1: postCredit4.dataValues.id,
                                        jid2: postdebit4.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit4.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                          //-----------------REFUND----------------
                        const refundTest = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                        if(refundTest){
                             const postdebitrefundTest = await journal.create({
                                acc_id:resData4.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundTest.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundTest.dataValues.amount

                            },{transaction: t})
                             const bankDataTest = await bank.findOne({where:{id:refundTest.dataValues.bank}});
                             const postCreditTest  = await journal.create({
                                acc_id:bankDataTest.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundTest.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundTest.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                        
                                
                                        //-------------------------------------------
                        break
                        case 'Additional Item':
                             const resData5 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Drug'}});
                                   //----------------------------------------------------
                              const postCredit5 = await journal.create({
                                acc_id:resData5.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit5 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                            const data15 = await payment.update(
                           
                            {
                                        jid1: postCredit5.dataValues.id,
                                        jid2: postdebit5.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit5.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                            //-----------------REFUND----------------
                        const refundAddition = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                        if(refundAddition){
                             const postdebitrefundAddition = await journal.create({
                                acc_id:resData5.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundAddition.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundAddition.dataValues.amount

                            },{transaction: t})
                             const bankDataAddition = await bank.findOne({where:{id:refundAddition.dataValues.bank}});
                             const postCreditAddition  = await journal.create({
                                acc_id:bankDataAddition.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundAddition.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundAddition.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                              
                                        //-------------------------------------------
                        break
                        case 'Prescribed Drugs':
                             const resData6 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Drug'}});
                                   //----------------------------------------------------
                              const postCredit6 = await journal.create({
                                acc_id:resData6.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit6 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                             const data16 = await payment.update(
                           
                            {
                                        jid1: postCredit6.dataValues.id,
                                        jid2: postdebit6.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit6.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                                 //-----------------REFUND----------------
                        const refundDrug2 = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                        if(refundDrug2){
                             const postdebitrefundDrug = await journal.create({
                                acc_id:resData6.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundDrug2.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundDrug2.dataValues.amount

                            },{transaction: t})
                             const bankDatarDrug2 = await bank.findOne({where:{id:refundDrug2.dataValues.bank}});
                             const postCreditDrug2  = await journal.create({
                                acc_id:bankDatarDrug2.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundDrug2.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundDrug2.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                         
                                        //-------------------------------------------
                        break
                        case 'Prescribed Investigation':
                             const resData7 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Investigation'}});
                                   //----------------------------------------------------
                              const postCredit7 = await journal.create({
                                acc_id:resData7.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit7 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                             const data17 = await payment.update(
                           
                            {
                                        jid1: postCredit7.dataValues.id,
                                        jid2: postdebit7.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit7.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                                  //-----------------REFUND----------------
                        const refundInvestigation2 = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                        if(refundInvestigation2){
                             const postdebitrefundInvestigation2 = await journal.create({
                                acc_id:resData7.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundInvestigation2.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundInvestigation2.dataValues.amount

                            },{transaction: t})
                             const bankDatarInvestigation2 = await bank.findOne({where:{id:refundInvestigation2.dataValues.bank}});
                             const postCreditInvestigation2  = await journal.create({
                                acc_id:bankDatarInvestigation2.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundInvestigation2.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundInvestigation2.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                        
                                        //-------------------------------------------
                        break
                        case 'Prescribed Services':
                             const resData8 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Service'}});
                                    //----------------------------------------------------
                              const postCredit8 = await journal.create({
                                acc_id:resData8.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit8 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                              const data18 = await payment.update(
                           
                            {
                                        jid1: postCredit8.dataValues.id,
                                        jid2: postdebit8.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit8.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                                  //-----------------REFUND----------------
                        const refundService2 = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                        if(refundService2){
                             const postdebitrefundService2 = await journal.create({
                                acc_id:resData8.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundService2.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundService2.dataValues.amount

                            },{transaction: t})
                             const bankDataService2 = await bank.findOne({where:{id:refundService2.dataValues.bank}});
                             const postCreditService2  = await journal.create({
                                acc_id:bankDataService2.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundService2.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundService2.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                        
                                        //-------------------------------------------

                        break
                        case 'Prescribed Test':
                              const resData9 = await mapping.findOne({where:{mappingcode:data.dataValues.service_id, tablename:'Test'}});
                                    //----------------------------------------------------
                              const postCredit9 = await journal.create({
                                acc_id:resData9.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: data.dataValues.amount

                            },{transaction: t})
                             const postdebit9 = await journal.create({
                                acc_id:chartofaccountbank,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: data.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: data.dataValues.amount

                            }, {transaction: t});
                             const data19 = await payment.update(
                           
                            {
                                        jid1: postCredit9.dataValues.id,
                                        jid2: postdebit9.dataValues.id,
                                        confirm_note : 'Posted',
                                        confirmed_by : uid,
                                        confirmed_id : uid,
                                        confirmed_date : postCredit9.dataValues.updatedAt,
                                        isconfirm : 1,
                                        confirm : 1
                            },
                            {
                                where:{id: arr[i]}
                            },
                            {
                                transaction: t
                            }
                        
                        );
                                  //-----------------REFUND----------------
                        const refundTest2 = await refund.findOne({
                            where:{ pid: arr[i]}
                        })
                        if(refundTest2){
                             const postdebitrefundTest2 = await journal.create({
                                acc_id:resData9.dataValues.chartofaccount_id,
                                entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundTest2.dataValues.narration,
                                t_type: 'DEBIT',
                                amt: refundTest2.dataValues.amount

                            },{transaction: t})
                             const bankDataTest2 = await bank.findOne({where:{id:refundTest2.dataValues.bank}});
                             const postCreditTest2 = await journal.create({
                                acc_id:bankDataTest2.dataValues.chart_of_account_id,
                                 entity_id: uid,
                                d_entry: moment(new Date(vdate)).format('YYYY MM DD'),
                                descr: refundTest2.dataValues.narration,
                                t_type: 'CREDIT',
                                amt: refundTest2.dataValues.amount

                            }, {transaction: t});
                        }
                        //----------------END REFUND-----------------------
                        
                                        //-------------------------------------------
                        break
                        
                    }

                 });//============Transaction
                             

            }
        }

       
return res.status(200).json(obj)
    }//==================END OF ELSE STATEMENT
    }
    catch(err){
return res.status(500).json(err.message)
    }
}

const postBulk = async(req, res)=>{
    try{
 let data = []
        const result = await sequelize.transaction(async (t) => {
     data = await journal.bulkCreate(req.body, {transaction: t})
        })
     return res.status(200).json(data)
    }
    catch(err){
return res.status(500).json({err: err.message})
    }
}
const getAlls = async(req, res) =>{
    try{
        let arr = []
        const data = await journal.findAll({
            where:{
                id:{
                    [Op.in]: arr
                }
            },
            include: [chart_of_account],
            order: [['id','ASC']]
        })

    }
    catch(err){

    }
}
const getJournalWithDateTrialBalance = async(sdate, edate, entity_ids)=>{
    try{
 
        const data = await journal.findAll({
            attributes:['acc_id','t_type', [sequelize.fn('SUM', sequelize.col('amt')), 'amt'] ],
            where:{
                d_entry: {
                    [Op.between]: [sdate, edate]
                }
            },
           
            include: [chart_of_account],
            group:['acc_id', 't_type']
        });

        const result = await sequelize.transaction(async (t) => {
        const truncateData = await sequelize.query(`delete from reportchart where entity_id = ${entity_ids} ;`, {transaction: t});
        const report = await sequelize.query(`INSERT INTO reportchart(accountCode,    lineCode,    name,    parendId,    levelCode,    id,    entity_id,    acc_type_id,    credit,    debit,   tdate,    createdAt,   updatedAt) SELECT   accountCode,   lineCode,   name,   parendId,   levelCode,    id,   ${entity_ids},   acc_type_id, 0,    0,    now(),  now(),  now() FROM chart_of_account;`, {transaction: t});
    }); 

    
    data.map(async(item)=>{
    
    if(item.dataValues.t_type === 'CREDIT'){
     
      await sequelize.query(`update reportchart set credit = ${parseFloat(item.dataValues.amt)} where entity_id = ${entity_ids} and id = ${item.dataValues.acc_id} ;`);
        }
    if(item.dataValues.t_type === 'DEBIT'){
       await sequelize.query(`update reportchart set debit = ${parseFloat(item.dataValues.amt)} where entity_id = ${entity_ids} and id = ${item.dataValues.acc_id} ;`);
 
    }
})

     /* return Object.assign({
        acc_id: item.dataValues.acc_id,
        t_type: item.dataValues.t_type,
        amt: item.dataValues.amt,
        id: item.dataValues.chart_of_account.id,
        name: item.dataValues.chart_of_account.name,
        parendId: item.dataValues.chart_of_account.parendId,
        totalAmt: 0,
        Children: []

    })
    */
   

return true
    }
    catch(err){
        return false
    }
}
const getSumView = async(req, res)=>{
    try{
        const  sdate = req.params.sdate;
        const edate = req.params.edate;
        const arr = req.params.arrays.split(',')
        var options = []
        for (var i = 0; i < arr.length; i++){
            options.push(arr[i])
        }
      
        const data = await journal.findAll({
            attributes:['t_type', [sequelize.fn('SUM', sequelize.col('amt')), 'amt'] ],
            where:{
                d_entry: {
                    [Op.between]: [sdate, edate]
                },
                acc_id:{
                    [Op.in]: options
                }
            },
            group:['t_type']
        });
return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const loadData4view = async(req, res)=>{
    try{
        const  sdate = req.params.sdate;
        const edate = req.params.edate;
        const entity_ids = req.params.entity_id
        const resultReport = await chart_of_account.findAll({
            order:[['id','ASC']]
        });
        const chart = await chart_of_account.findAll({
            where:{
                parendId: 1
            }
        });
         return res.status(200).json({l: resultReport, h: chart})
    }
    catch(err){
        return res.status(500).json({err:err.message})
    }
}
const loadData4viewDetails = async(req, res)=>{
    try{
        const resultReport = await account_type.findAll({
            order:[['id','ASC']]
        });
        const chart = await chart_of_account.findAll({
          
        });
         return res.status(200).json({l: chart, h: resultReport})
    }
    catch(err){
        return res.status(500).json({err:err.message})
    }
}

const getData4viewDetails = async(req, res)=>{
    try{
        const id = req.params.id
        const chart = await chart_of_account.findAll({
          //  include: [{ model : account_type, as: 'account_type'}],
            where:{
                acc_type_id: id,
                parendId:{
                    [Op.ne]: 0
                }
            }
        });
         return res.status(200).json(chart)
    }
    catch(err){
        return res.status(500).json({err:err.message})
    }
}

const getJournalWithDate = async(req, res)=>{
    try{
        const  sdate = req.params.sdate;
        const edate = req.params.edate;
 const data = await journal.findAll({
    attributes:['descr','acc_id','d_entry', 't_type', [sequelize.fn('SUM', sequelize.col('amt')), 'amt'] ],
    where:{
        d_entry: {
            [Op.between]: [sdate, edate]
        }
    },
    order:[['d_entry', 'ASC']],
    include: [chart_of_account],
    group:['acc_id', 't_type', 'd_entry']
})
 return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const getJournalWithDateAccountId = async(req, res)=>{
    try{
        const  acc = req.params.acc;
        const  sdate = req.params.sdate;
        const edate = req.params.edate;
 const data = await journal.findAll({
    attributes:['descr','acc_id','d_entry', 't_type', [sequelize.fn('SUM', sequelize.col('amt')), 'amt'] ],
    where:{
        d_entry: {
            [Op.between]: [sdate, edate]
        },
        acc_id: acc

    },
    order:[['d_entry', 'ASC']],
    include: [chart_of_account],
    group:['acc_id', 't_type', 'd_entry']
})
 return res.status(200).json(data)
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const postJournalPv = async(req, res)=>{
    try{
        var obj ={}
        const pvid = req.body.id
      const entity_id = req.body.entity_id
      const data = await pvheader.findOne({
        where:{id: pvid},
        include:[chart_of_account, pv_detail]

      })
    
     obj['amt']= data.dataValues.amount
     obj['acc_id']= data.dataValues.account_id
     obj['descr']= data.dataValues.narration
     obj['d_entry'] = moment(new Date()).format('YYYYY MM DD'),
     obj['entity_id'] = entity_id
     obj['t_type'] = 'CREDIT'


   const obj2 =  data.pv_details.map((item)=>{
    return Object.assign({
        amt: item.dataValues.amount,
        acc_id : item.dataValues.acc_code,
        descr:  item.dataValues.line_narration,
        d_entry: moment(new Date()).format('YYYYY MM DD'),
        entity_id: entity_id,
        t_type: 'DEBIT',

    })
}
    )
    const result = await sequelize.transaction(async (t) => {
        const post1 = await journal.create(obj, { transaction: t})
        const post2 = await journal.bulkCreate(obj2, { transaction: t})
   const updatenow = await pvheader.update({
    approved: 1,
    approvedby: entity_id,
    approveddate: moment(new Date()).format('YYYYY MM DD')
   },
   
   {
       where:{id: pvid}
   },
   {
       transaction: t
   })
})
return res.status(200).json(obj)
    }
    catch(err){
return res.status(500).json({err: err.message})
    }
}

module.exports = {
  	getAll,
	getAllPagings,
	add,
    update,
	getOne,
    postJournal,
    postJournalPv,
    postBulk,
    getJournalWithDate,
    getJournalWithDateTrialBalance,
    loadData4view,
    getSumView,
    loadData4viewDetails,
    getData4viewDetails,
    getJournalWithDateAccountId
   
    
}
