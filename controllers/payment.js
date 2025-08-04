const { payment, patient, outpts, sequelize, chart_of_account, prescribed_drug, prescribed_test,bank, prescribed_investigation, prescribed_service, additional_item_prescription, journal, users, cart, drug,investigation,service, test, refund, ewallet} = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op, Sequelize, QueryTypes} = require('sequelize');
const { formatDate } = require('../helpers/formatDate');
const moment = require('moment');


const getAll = async(req, res)=>{
	try{
	const data = await payment.findAll({
		include: [users, journal],
            order:[['updatedAt','DESC']]});
         return res.status(200).json(data);
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getAllSummaryBF = async(req, res)=>{
	try{
	const id = req.params.patient_id
	const sdate = req.params.sdate
	const dataDrug = await prescribed_drug.findAll({         
		     include:[drug],
			 order: [['updatedAt','ASC']],
			  where:{
			  patient_id: id,
			  payment_status: {
				[Op.in]:['Paid', 'Permitted']
			  },
			  updatedAt: {
				[Op.lt]:sdate
			  }
			}
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			updatedAt: result.updatedAt,
			name: result.drug.name,
			amount: result.total_price,
			payment_status: result.payment_status,
			amount_paid: result.payment_status ==='Paid'? result.total_price:0

		})
	});

	const dataAdditional_items = await additional_item_prescription.findAll({         
		include:[drug],
		order: [['updatedAt','ASC']],
		 where:{
		 patient_id: id,
		 payment_status: {
		   [Op.in]:['Paid', 'Permitted']
		 },
		 updatedAt: {
			[Op.lt]:sdate
		 }
	   }
 

});
const obj2 = dataAdditional_items.map((result, index)=>{
   return Object.assign({
	   updatedAt: result.updatedAt,
	   name: result.drug.name,
	   amount: result.total_price,
	   payment_status: result.payment_status,
	   amount_paid: result.payment_status ==='Paid'? result.total_price:0

   })
});
const dataService = await prescribed_service.findAll({         
	include:[service],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
	   [Op.in]:['Paid', 'Permitted']
	 },
	 updatedAt: {
		[Op.lt]:sdate
	 }
   }


});
const obj3 = dataService.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.service.name,
   amount: result.price,
   payment_status: result.payment_status,
   amount_paid: result.payment_status ==='Paid'? result.price:0

})
});
const dataInvestigation = await prescribed_investigation.findAll({         
	include:[investigation],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
	   [Op.in]:['Paid', 'Permitted']
	 },
	 updatedAt: {
		[Op.lt]:sdate
	 }
   }


});
const obj4 = dataInvestigation.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.investigation.name,
   amount: result.price,
   payment_status: result.payment_status,
   amount_paid: result.payment_status ==='Paid'? result.price:0

})
});
const dataTest = await prescribed_test.findAll({         
	include:[test],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
	   [Op.in]:['Paid', 'Permitted']
	 },
	 updatedAt: {
		[Op.lt]:sdate
	 }
   }


});
const obj5 = dataTest.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.test.name,
   amount: result.price,
   payment_status: result.payment_status,
   amount_paid: result.payment_status ==='Paid'? result.price:0

})
});

const dataRefund = await refund.findAll({         
	order: [['updatedAt','ASC']],
	 where:{
	 refid: id,
	 updatedAt: {
		[Op.lt]:sdate
	 }
   }


});
const obj6 = dataRefund.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.narration,
   amount: result.amount,
   payment_status: 'Paid',
   amount_paid: result.amount

})
});
const dataEwallet = await ewallet.findAll({         
	order: [['updatedAt','ASC']],
	 where:{
	 customer_id: id,
	 updatedAt: {
		[Op.lt]:sdate
	 }
   }


});
const obj7 = dataEwallet.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.narration,
   amount: 0 , //result.amt > 0?  0 : result.amt,
   payment_status: 'Paid',
   amount_paid: result.amt, //<0? (-1 * result.amt):result.amt

})
});

const obj = [...obj1, ...obj2, ...obj3, ...obj4, ...obj5, ...obj6, ...obj7]

obj.sort(function(a,b){
	var c = new Date(a.updatedAt);
	var d = new Date(b.updatedAt);
	return c-d;
})
         return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllSummaryBFOutpatient = async(req, res)=>{
	try{
	const id = req.params.patient_id
	const sdate = req.params.sdate
	const dataDrug = await payment.findAll({         
		     include:[drug],
			 order: [['updatedAt','ASC']],
			  where:{
			  uid: id,
			  service_name: 'Outpts_Drugs',
			  updatedAt: {
				[Op.lt]:sdate
			  }
			}
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			updatedAt: result.updatedAt,
			name: result.drug.name,
			amount: result.amount,
			amount_paid: result.amount

		})
	});

const dataService = await payment.findAll({         
	include:[service],
	order: [['updatedAt','ASC']],
	 where:{
	 uid: id,
	 service_name: 'Outpts_Services',
	 updatedAt: {
		[Op.lt]:sdate
	 }
   }


});
const obj3 = dataService.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.service.name,
   amount: result.amount,
   amount_paid: result.amount

})
});
const dataInvestigation = await payment.findAll({         
	include:[investigation],
	order: [['updatedAt','ASC']],
	 where:{
	 uid: id,
	service_name: 'Outpts_Investigations',
	 updatedAt: {
		[Op.lt]:sdate
	 }
   }


});
const obj4 = dataInvestigation.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.investigation.name,
   amount: result.amount,
   amount_paid: result.amount

})
});
const dataTest = await payment.findAll({         
	include:[test],
	order: [['updatedAt','ASC']],
	 where:{
		uid: id,
		service_name: 'Outpts_Tests',
	 updatedAt: {
		[Op.lt]:sdate
	 }
   }


});
const obj5 = dataTest.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.test.name,
   amount: result.amount,
   amount_paid: result.amount

})
});

const dataMiscellaneous = await payment.findAll({         
	include:[chart_of_account],
	order: [['updatedAt','ASC']],
	 where:{
		uid: id,
		service_name: 'Outpts_Miscellanous',
	 updatedAt: {
		[Op.lt]:sdate
	 }
   }


});
const obj6 = dataMiscellaneous.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.narration,
   amount: result.amount,
   amount_paid: result.amount

})
});
const dataRefund = await refund.findAll({         
	order: [['updatedAt','ASC']],
	 where:{
		refid: id,
		
	 updatedAt: {
		[Op.lt]:sdate
	 }
   }


});
const obj7 = dataRefund.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.narration,
   amount: (-1 * result.amount),
   amount_paid: (-1 * result.amount)

})
});
const obj = [...obj1, ...obj3, ...obj4, ...obj5, ...obj6, ...obj7]

obj.sort(function(a,b){
	var c = new Date(a.updatedAt);
	var d = new Date(b.updatedAt);
	return c-d;
})
         return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllSummary = async(req, res)=>{
	try{
	const id = req.params.patient_id
	const sdate = moment(req.params.sdate)
	const edate = moment(req.params.edate)

	const dataDrug = await prescribed_drug.findAll({         
		     include:[drug],
			 order: [['updatedAt','ASC']],
			  where:{
			  patient_id: id,
			  payment_status: {
				[Op.in]:['Paid', 'Permitted']
			  },
			  updatedAt: {
				[Op.between]:[sdate, edate]
			  }
			}
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			updatedAt: result.updatedAt,
			name: result.drug.name,
			qty: result.quantity_to_dispense,
			uprice: (parseFloat(result.total_price)/parseInt(result.quantity_to_dispense)),
			amount: result.total_price,
			service_name: 'Drugs',
			payment_status: result.payment_status,
			amount_paid: result.payment_status ==='Paid'? result.total_price:0

		})
	});

	const dataAdditional_items = await additional_item_prescription.findAll({         
		include:[drug],
		order: [['updatedAt','ASC']],
		 where:{
		 patient_id: id,
		 payment_status: {
		   [Op.in]:['Paid', 'Permitted']
		 },
		 updatedAt: {
		   [Op.between]:[sdate, edate]
		 }
	   }
 

});
const obj2 = dataAdditional_items.map((result, index)=>{
   return Object.assign({
	   updatedAt: result.updatedAt,
	   name: result.drug.name,
	   qty: result.quantity_to_dispense,
	   uprice: (parseFloat(result.total_price)/parseInt(result.quantity_to_dispense)),
	   amount: result.total_price,
	   service_name: 'Consumables',
	   payment_status: result.payment_status,
	   amount_paid: result.payment_status ==='Paid'? result.total_price:0

   })
});
const dataService = await prescribed_service.findAll({         
	include:[service],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
	   [Op.in]:['Paid', 'Permitted']
	 },
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj3 = dataService.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.service.name,
   qty: result.quantity,
   uprice: (parseFloat(result.price)),
   amount: result.price,
   service_name: 'Services',
   payment_status: result.payment_status,
   amount_paid: result.payment_status ==='Paid'? result.price:0

})
});
const dataInvestigation = await prescribed_investigation.findAll({         
	include:[investigation],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
	   [Op.in]:['Paid', 'Permitted']
	 },
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj4 = dataInvestigation.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.investigation.name,
   qty: 1,
   uprice: (parseFloat(result.price)),
   amount: result.price,
   service_name: 'Imaging',
   payment_status: result.payment_status,
   amount_paid: result.payment_status ==='Paid'? result.price:0

})
});
const dataTest = await prescribed_test.findAll({         
	include:[test],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
	   [Op.in]:['Paid', 'Permitted']
	 },
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj5 = dataTest.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.test.name,
   qty: 1,
   uprice: (parseFloat(result.price)),
   amount: result.price,
   service_name: 'Test',
   payment_status: result.payment_status,
   amount_paid: result.payment_status ==='Paid'? result.price:0

})
});

const dataRefund = await refund.findAll({         
	order: [['updatedAt','ASC']],
	 where:{
	 refid: id,
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj6 = dataRefund.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.narration,
   qty: result.qty,
   uprice: (parseFloat(result.amount)/parseInt(qty)),
   amount: result.amount,
   service_name: 'Refund',
   payment_status: 'Paid',
   amount_paid: result.amount

})
});
const dataEwallet = await ewallet.findAll({         
	order: [['updatedAt','ASC']],
	 where:{
	 customer_id: id,
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj7 = dataEwallet.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.narration,
   qty: 1,
   uprice: (parseFloat(result.amt)),
   amount: 0 , //result.amt > 0?  0 : result.amt,
   service_name: 'Deposit',
   payment_status: 'Paid',
   amount_paid: result.amt, //<0? (-1 * result.amt):result.amt

})
});

const obj = [...obj1, ...obj2, ...obj3, ...obj4, ...obj5, ...obj6, ...obj7]

obj.sort(function(a,b){
	var c = new Date(a.updatedAt);
	var d = new Date(b.updatedAt);
	return c-d;
})
         return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllSummaryWithDetail = async(req, res)=>{
	const id = req.params.patient_id
	const sdate = req.params.sdate
	const edate = req.params.edate
 const data = await sequelize.query(`
SELECT 
    'REFUND' as 'name',
    0 AS 'price',
    sum(-1 * p.amount) AS 'amount'
   
FROM
	refund p 
WHERE
     p.updatedAt >= '${sdate}' AND   p.updatedAt <= '${edate}' and p.refid = '${id}'  group by 'name'
        UNION ALL
SELECT 
    'DEPOSIT' as 'name', 
    0 AS 'price',
   sum(p.amt) AS 'amount'
   
FROM
    ewallets p
WHERE
 p.updatedAt >= '${sdate}' AND   p.updatedAt <= '${edate}' and p.customer_id = '${id}' group by 'name'
        UNION ALL 
        SELECT 
    'LABORATORY TEST' as 'name',
    sum(p.price) AS 'price',
    0 AS 'amount'
    
FROM
    prescribed_tests p inner join tests a  on a.id = p.test_id
WHERE
  (p.payment_status = 'Paid'
        OR p.payment_status = 'Permitted')
        AND  p.updatedAt >= '${sdate}' AND   p.updatedAt <= '${edate}' and  p.patient_id = '${id}' group by 'name'
        UNION ALL 
        SELECT 
    s.name,
    p.price AS 'price',
    0 AS 'amount'
   
   
FROM
    prescribed_services p inner join services s on s.id = p.service_id
WHERE
  
        (p.payment_status = 'Paid'
        OR p.payment_status = 'Permitted')
        AND  p.updatedAt >= '${sdate}' AND   p.updatedAt <= '${edate}' and p.patient_id = '${id}'
    
        UNION ALL SELECT 
    i.name,
    p.price AS 'price',
    0 AS 'amount'
   

FROM
    prescribed_investigations p inner join investigations i on i.id = p.investigation_id
WHERE
  
        (p.payment_status = 'Paid'
        OR p.payment_status = 'Permitted')
        AND  p.updatedAt >= '${sdate}' AND   p.updatedAt <= '${edate}' and  p.patient_id = '${id}'
        
        UNION ALL SELECT 
    'DRUGS' as 'name',
    sum(p.total_price) AS 'price',
    0 AS 'amount'
   
FROM
    prescribed_drugs p inner join drugs d on d.id = p.drug_id
WHERE
 (p.payment_status = 'Paid'
        OR p.payment_status = 'Permitted')
        AND  p.updatedAt >= '${sdate}' AND   p.updatedAt <= '${edate}' and p.patient_id = '${id}'
       group by 'name' 
        UNION ALL SELECT 
    'CONSUMABLES' as 'name',
   sum(p.total_price ) AS 'price',
    0 AS 'amount'
    
FROM
    additional_item_prescriptions p inner join drugs d on d.id = p.drug_id
WHERE
   (p.payment_status = 'Paid'
        OR p.payment_status = 'Permitted')
        AND  p.updatedAt >= '${sdate}' AND   p.updatedAt <= '${edate}' and p.patient_id = '${id}' group by 'name'
        
        UNION ALL SELECT 
    'PAYMENTS' as 'name',
    0 AS 'price',
   sum(pp.amount) AS 'amount'
    
FROM
    payment pp
WHERE
   pp.updatedAt >= '${sdate}' AND   pp.updatedAt <= '${edate}' and pp.uid = '${id}' group by 'name'
`, {
					replacements: { id: id, sdate: sdate, edate: edate },
					type: QueryTypes.SELECT,
				  });
		
		return res.status(200).json(data);
	}
const getAllSummaryAwait = async(req, res)=>{
	const id = req.params.patient_id
	const sdate = req.params.sdate
	const edate = req.params.edate
 const data = await sequelize.query(`
SELECT 
    p.narration as 'name',
    0 AS 'price',
    (-1 * p.amount) AS 'amount',
    p.refid,
    0 AS 'datecreated',
    p.updatedAt AS 'datepay',
    0 as 'quantity', 
	p.updatedAt
FROM
	refund p 
WHERE
    p.updatedAt >= '${sdate}' AND   p.updatedAt <= '${edate}'
        AND p.refid = '${id}' 
UNION ALL
SELECT 
    p.narration as 'name', 
    0 AS 'price',
    p.amt AS 'amount',
    p.customer_id,
    0 AS 'datecreated',
    p.updatedAt AS 'datepay',
    0 as 'quantity', 
	p.updatedAt
FROM
    ewallets p
WHERE
    p.updatedAt >= '${sdate}' AND   p.updatedAt <= '${edate}'
        AND p.customer_id = '${id}' 
UNION ALL SELECT 
    a.name,
    p.price AS 'price',
    0 AS 'amount',
    p.patient_id,
    p.updatedAt AS 'datecreated',
    0 AS 'datepay',
    1 as 'quantity',
	p.updatedAt
FROM
    prescribed_tests p inner join tests a  on a.id = p.test_id
WHERE
    p.updatedAt >= '${sdate}' AND   p.updatedAt <= '${edate}'
        AND (p.payment_status = 'Paid'
        OR p.payment_status = 'Permitted')
        AND p.patient_id = '${id}'
UNION ALL SELECT 
    s.name,
    p.price AS 'price',
    0 AS 'amount',
    p.patient_id,
    p.updatedAt AS 'datecreated',
    0 AS 'datepay',
    p.quantity,
	p.updatedAt
FROM
    prescribed_services p inner join services s on s.id = p.service_id
WHERE
   p.updatedAt >= '${sdate}' AND   p.updatedAt <= '${edate}'
        AND (p.payment_status = 'Paid'
        OR p.payment_status = 'Permitted')
        AND p.patient_id = '${id}'
UNION ALL SELECT 
    i.name,
    p.price AS 'price',
    0 AS 'amount',
    p.patient_id,
    p.updatedAt AS 'datecreated',
    0 AS 'datepay',
    1 as 'quantity',
	p.updatedAt

FROM
    prescribed_investigations p inner join investigations i on i.id = p.investigation_id
WHERE
    p.updatedAt >= '${sdate}' AND   p.updatedAt <= '${edate}'
        AND (p.payment_status = 'Paid'
        OR p.payment_status = 'Permitted')
        AND p.patient_id = '${id}' 
UNION ALL SELECT 
    d.name,
    p.total_price AS 'price',
    0 AS 'amount',
    p.patient_id,
    p.updatedAt AS 'datecreated',
    0 AS 'datepay',
    p.quantity_dispensed,
	p.updatedAt
FROM
    prescribed_drugs p inner join drugs d on d.id = p.drug_id
WHERE
    p.updatedAt >= '${sdate}' AND   p.updatedAt <= '${edate}'
        AND (p.payment_status = 'Paid'
        OR p.payment_status = 'Permitted')
        AND p.patient_id = '${id}'
UNION ALL SELECT 
    d.name,
    p.total_price AS 'price',
    0 AS 'amount',
    p.patient_id,
    p.updatedAt AS 'datecreated',
    0 AS 'datepay',
    p.quantity_dispensed,
	p.updatedAt
FROM
    additional_item_prescriptions p inner join drugs d on d.id = p.drug_id
WHERE
    p.updatedAt >= '${sdate}' AND p.updatedAt <= '${edate}'
        AND (p.payment_status = 'Paid'
        OR p.payment_status = 'Permitted')
        AND p.patient_id = '${id}'
UNION ALL SELECT 
    pp.narration as 'name',
    0 AS 'price',
    sum(pp.amount) AS 'amount',
    pp.uid,
    0 AS 'datecreated',
    pp.updatedAt AS 'datepay',
    0 as 'quantity',
	pp.updatedAt
FROM
    payment pp
WHERE
    pp.updatedAt >= '${sdate}' AND   pp.updatedAt <= '${edate}'
        AND pp.uid = '${id}' group by batch_no
		order by updatedAt asc
`, {
					replacements: { id: id, edate: edate, sdate: sdate },
					type: QueryTypes.SELECT,
				  });
			  
		data.sort(function(a,b){
			var c = new Date(a.updatedAt);
			var d = new Date(b.updatedAt);
			return c-d;
		})
		
		return res.status(200).json(data);
	}
const getAllSummaryAwaitUp = async(req, res)=>{
		const id = req.params.patient_id
		const sdate = req.params.sdate
		const edate = req.params.edate
	 const data = await sequelize.query(`
	SELECT 
		p.narration as 'name',
		0 AS 'price',
		(-1 * p.amount) AS 'amount',
		p.refid,
		0 AS 'datecreated',
		p.createdAt AS 'datepay',
		0 as 'quantity', 
		p.createdAt
	FROM
		refund p 
	WHERE
		p.createdAt < '${sdate}'
			AND p.refid = '${id}' 
	UNION ALL
	SELECT 
		p.narration as 'name', 
		0 AS 'price',
		p.amt AS 'amount',
		p.customer_id,
		0 AS 'datecreated',
		p.createdAt AS 'datepay',
		0 as 'quantity', 
		p.createdAt
	FROM
		ewallets p
	WHERE
		p.createdAt < '${sdate}' 
			AND p.customer_id = '${id}' 
	UNION ALL SELECT 
		a.name,
		p.price AS 'price',
		0 AS 'amount',
		p.patient_id,
		p.createdAt AS 'datecreated',
		0 AS 'datepay',
		1 as 'quantity',
		p.createdAt
	FROM
		prescribed_tests p inner join tests a  on a.id = p.test_id
	WHERE
		p.createdAt < '${sdate}'
			AND (p.payment_status = 'Paid'
			OR p.payment_status = 'Permitted')
			AND p.patient_id = '${id}'
	UNION ALL SELECT 
		s.name,
		p.price AS 'price',
		0 AS 'amount',
		p.patient_id,
		p.createdAt AS 'datecreated',
		0 AS 'datepay',
		p.quantity,
		p.createdAt
	FROM
		prescribed_services p inner join services s on s.id = p.service_id
	WHERE
		p.createdAt < '${sdate}' 
			AND (p.payment_status = 'Paid'
			OR p.payment_status = 'Permitted')
			AND p.patient_id = '${id}'
	UNION ALL SELECT 
		i.name,
		p.price AS 'price',
		0 AS 'amount',
		p.patient_id,
		p.createdAt AS 'datecreated',
		0 AS 'datepay',
		1 as 'quantity',
		p.createdAt
	
	FROM
		prescribed_investigations p inner join investigations i on i.id = p.investigation_id
	WHERE
		p.createdAt < '${sdate}'
			AND (p.payment_status = 'Paid'
			OR p.payment_status = 'Permitted')
			AND p.patient_id = '${id}' 
	UNION ALL SELECT 
		d.name,
		p.total_price AS 'price',
		0 AS 'amount',
		p.patient_id,
		p.createdAt AS 'datecreated',
		0 AS 'datepay',
		p.quantity_dispensed,
		p.createdAt
	FROM
		prescribed_drugs p inner join drugs d on d.id = p.drug_id
	WHERE
		p.createdAt < '${sdate}'
			AND (p.payment_status = 'Paid'
			OR p.payment_status = 'Permitted')
			AND p.patient_id = '${id}'
UNION ALL SELECT 
    d.name,
    p.total_price AS 'price',
    0 AS 'amount',
    p.patient_id,
    p.createdAt AS 'datecreated',
    0 AS 'datepay',
    p.quantity_dispensed,
	p.createdAt
FROM
    additional_item_prescriptions p inner join drugs d on d.id = p.drug_id
WHERE
    p.createdAt < '${sdate}'
        AND (p.payment_status = 'Paid'
        OR p.payment_status = 'Permitted')
        AND p.patient_id = '${id}'
	UNION ALL SELECT 
		pp.narration as 'name',
		0 AS 'price',
		pp.amount AS 'amount',
		pp.uid,
		0 AS 'datecreated',
		pp.createdAt AS 'datepay',
		0 as 'quantity',
		pp.createdAt
	FROM
		payment pp
	WHERE
		pp.createdAt < '${sdate}'
			AND pp.uid = '${id}'
			order by createdAt asc
	`, {
						replacements: { id: id, edate: edate, sdate: sdate },
						type: QueryTypes.SELECT,
					  });
				  
			data.sort(function(a,b){
				var c = new Date(a.createdAt);
				var d = new Date(b.createdAt);
				return d-c;
			})
			
			return res.status(200).json(data);
		}
const getAllSummaryBroughtout = async(req, res)=>{
	try{
	const id = req.params.patient_id
	const sdate = moment(req.params.sdate)
	const edate = moment(req.params.edate)

	const dataDrug = await prescribed_drug.findAll({         
		     include:[drug],
			 order: [['updatedAt','ASC']],
			  where:{
			  patient_id: id,
			  payment_status: {
				[Op.in]:['Paid', 'Permitted']
			  },
			  createdAt: {
				[Op.between]:[sdate, edate]
			  }
			}
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			createdAt: result.updatedAt,
			name: result.drug.name,
			amount: result.total_price,
			service_name: 'Drugs',
			payment_status: result.payment_status,
			amount_paid: result.payment_status ==='Paid'? result.total_price:0

		})
	});

	const dataDrugs = await prescribed_drug.findAll({         
		include:[drug],
		order: [['updatedAt','ASC']],
		 where:{
		 patient_id: id,
		 payment_status: {
		   [Op.in]:['Paid', 'Permitted']
		 },
		 updatedAt: {
		   [Op.between]:[sdate, edate]
		 }
	   }
 

});
const obj1s = dataDrugs.map((result, index)=>{
   return Object.assign({
	   updatedAt: result.updatedAt,
	   name: result.drug.name,
	   amount: result.total_price,
	   service_name: 'Drugs',
	   payment_status: result.payment_status,
	   amount_paid: result.payment_status ==='Paid'? result.total_price:0

   })
});


	const dataAdditional_items = await additional_item_prescription.findAll({         
		include:[drug],
		order: [['updatedAt','ASC']],
		 where:{
		 patient_id: id,
		 payment_status: {
		   [Op.in]:['Paid', 'Permitted']
		 },
		 updatedAt: {
		   [Op.between]:[sdate, edate]
		 }
	   }
 

});
const obj2 = dataAdditional_items.map((result, index)=>{
   return Object.assign({
	   updatedAt: result.updatedAt,
	   name: result.drug.name,
	   amount: result.total_price,
	   service_name: 'Consumables',
	   payment_status: result.payment_status,
	   amount_paid: result.payment_status ==='Paid'? result.total_price:0

   })
});

const dataAdditional_itemss = await additional_item_prescription.findAll({         
	include:[drug],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
	   [Op.in]:['Paid', 'Permitted']
	 },
	 createdAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj2s = dataAdditional_itemss.map((result, index)=>{
return Object.assign({
   createdAt: result.updatedAt,
   name: result.drug.name,
   amount: result.total_price,
   service_name: 'Consumables',
   payment_status: result.payment_status,
   amount_paid: result.payment_status ==='Paid'? result.total_price:0

})
});

const dataService = await prescribed_service.findAll({         
	include:[service],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
	   [Op.in]:['Paid', 'Permitted']
	 },
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj3 = dataService.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.service.name,
   amount: result.price,
   service_name: 'Services',
   payment_status: result.payment_status,
   amount_paid: result.payment_status ==='Paid'? result.price:0

})
});

const dataServices= await prescribed_service.findAll({         
	include:[service],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
	   [Op.in]:['Paid', 'Permitted']
	 },
	 createdAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj3s = dataServices.map((result, index)=>{
return Object.assign({
   createdAt: result.updatedAt,
   name: result.service.name,
   amount: result.price,
   service_name: 'Services',
   payment_status: result.payment_status,
   amount_paid: result.payment_status ==='Paid'? result.price:0

})
});

const dataInvestigation = await prescribed_investigation.findAll({         
	include:[investigation],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
	   [Op.in]:['Paid', 'Permitted']
	 },
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj4 = dataInvestigation.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.investigation.name,
   amount: result.price,
   service_name: 'Imaging',
   payment_status: result.payment_status,
   amount_paid: result.payment_status ==='Paid'? result.price:0

})
});

const dataInvestigations = await prescribed_investigation.findAll({         
	include:[investigation],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
	   [Op.in]:['Paid', 'Permitted']
	 },
	 createdAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj4s = dataInvestigations.map((result, index)=>{
return Object.assign({
   createdAt: result.updatedAt,
   name: result.investigation.name,
   amount: result.price,
   service_name: 'Imaging',
   payment_status: result.payment_status,
   amount_paid: result.payment_status ==='Paid'? result.price:0

})
});

const dataTest = await prescribed_test.findAll({         
	include:[test],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
	   [Op.in]:['Paid', 'Permitted']
	 },
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj5 = dataTest.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.test.name,
   amount: result.price,
   service_name: 'Test',
   payment_status: result.payment_status,
   amount_paid: result.payment_status ==='Paid'? result.price:0

})
});

const dataTests = await prescribed_test.findAll({         
	include:[test],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
	   [Op.in]:['Paid', 'Permitted']
	 },
	 createdAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj5s = dataTests.map((result, index)=>{
return Object.assign({
   createdAt: result.updatedAt,
   name: result.test.name,
   amount: result.price,
   service_name: 'Test',
   payment_status: result.payment_status,
   amount_paid: result.payment_status ==='Paid'? result.price:0

})
});

const dataRefund = await refund.findAll({         
	order: [['updatedAt','ASC']],
	 where:{
	 refid: id,
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj6 = dataRefund.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.narration,
   amount: result.amount,
   service_name: 'Refund',
   payment_status: 'Paid',
   amount_paid: result.amount

})
});
const dataEwallet = await ewallet.findAll({         
	order: [['updatedAt','ASC']],
	 where:{
	 customer_id: id,
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj7 = dataEwallet.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.narration,
   amount: 0 , //result.amt > 0?  0 : result.amt,
   service_name: 'Deposit',
   payment_status: 'Paid',
   amount_paid: result.amt, //<0? (-1 * result.amt):result.amt

})
});

const obj = [...obj1, ...obj1s ,...obj2, ...obj2s,...obj3, ...obj3s,...obj4, ...obj4s,...obj5, ...obj5s, ...obj6, ...obj7]

obj.sort(function(a,b){
	var c = new Date(a.updatedAt);
	var d = new Date(b.updatedAt);
	return c-d;
})
         return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllSummaryPermittedByUser = async(req, res)=>{
	try{
	const id = req.params.permittedby
	const sdate = moment(req.params.sdate)
	const edate = moment(req.params.edate)

	const dataDrug = await prescribed_drug.findAll({   
		attributes: [[sequelize.fn('SUM', sequelize.col('total_price')), 'total_price'],  'permittedby'],      
		  
			 //order: [['updatedAt','ASC']],
			  where:{
				permittedby: id,
			  payment_status: {
				[Op.in]:['Permitted']
			  },
			  permitted_date: {
				[Op.between]:[sdate, edate]
			  }
			},
			group:['permittedby']
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			
			name: 'Drugs',
			amount: result.total_price,
			service_name: 'Drugs'

		})
	});

	const dataAdditional_items = await additional_item_prescription.findAll({  
		attributes: [[sequelize.fn('SUM', sequelize.col('total_price')), 'total_price'],  'permittedby'],       
		
		//order: [['updatedAt','ASC']],
		 where:{
		 permittedby: id,
		 payment_status: {
			[Op.in]:['Permitted']
		  },
		 permitted_date: {
		   [Op.between]:[sdate, edate]
		 }
	   },
	   group:['permittedby']
 

});
const obj2 = dataAdditional_items.map((result, index)=>{
   return Object.assign({
	
	   name: 'Consumables',
	   amount: result.total_price,
	   service_name: 'Consumables'
   })
});
const dataService = await prescribed_service.findAll({   
	attributes: [[sequelize.fn('SUM', sequelize.col('price')), 'price'], 'permittedby'],      
	
	//order: [['updatedAt','ASC']],
	 where:{
	 permittedby: id,
	 payment_status: {
		[Op.in]:['Permitted']
	  },
	 permitted_date: {
	   [Op.between]:[sdate, edate]
	 }
   }
   ,
	 group:['permittedby']


});
const obj3 = dataService.map((result, index)=>{
return Object.assign({
	
   name: 'Services',
   amount: result.price,
   service_name: 'Services'

})
});
const dataInvestigation = await prescribed_investigation.findAll({  
	attributes: [ [sequelize.fn('SUM', sequelize.col('price')), 'price'], 'permittedby'],        
	
	//order: [['updatedAt','ASC']],
	 where:{
	 permittedby: id,
	 payment_status: {
		[Op.in]:['Permitted']
	  },
	 permitted_date: {
	   [Op.between]:[sdate, edate]
	 }
	
   },
   group:['permittedby']


});
const obj4 = dataInvestigation.map((result, index)=>{
return Object.assign({
   name: 'Investigation/Imagings',
   amount: result.price,
   service_name: 'Investigations'
 
 

})
});
const dataTest = await prescribed_test.findAll({  
	attributes: [ [sequelize.fn('SUM', sequelize.col('price')), 'price'], 'permittedby'],        
	
	//order: [['updatedAt','ASC']],
	 where:{
	 permittedby: id,
	 payment_status: {
		[Op.in]:['Permitted']
	  },
	 
	 permitted_date: {
	   [Op.between]:[sdate, edate]
	 }
   },
   group:['permittedby']


});
const obj5 = dataTest.map((result, index)=>{
return Object.assign({
   name: 'Laboratory tests',
   amount: result.price,
   service_name: 'Tests'

})
});


const obj = [...obj1, ...obj2, ...obj3, ...obj4, ...obj5]

obj.sort(function(a,b){
	var c = new Date(a.updatedAt);
	var d = new Date(b.updatedAt);
	return c-d;
})
         return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllSummaryPermittedByUserDetails = async(req, res)=>{
	try{
	const id = req.params.permittedby
	const sdate = moment(req.params.sdate)
	const edate = moment(req.params.edate)

	const dataDrug = await prescribed_drug.findAll({   
    
		  include:[drug, patient],
			 order: [['updatedAt','ASC']],
			  where:{
				permittedby: id,
			  payment_status: {
				[Op.in]:['Permitted']
			  },
			  permitted_date: {
				[Op.between]:[sdate, edate]
			  }
			}
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			permitted_date: result.permitted_date,
			patient: result.patient.lastname + ' ' + result.patient.firstname,
			hospital_id: result.patient.hospital_id,
			name: result.drug.name,
			amount: result.total_price,
			service_name: 'Drugs'

		})
	});

	const dataAdditional_items = await additional_item_prescription.findAll({  
		include:[drug, patient],
		order: [['updatedAt','ASC']],
		 where:{
		 permittedby: id,
		 payment_status: {
			[Op.in]:['Permitted']
		  },
		 permitted_date: {
		   [Op.between]:[sdate, edate]
		 }
	   }
 

});
const obj2 = dataAdditional_items.map((result, index)=>{
   return Object.assign({
	
	permitted_date: result.permitted_date,
	patient: result.patient.lastname + ' ' + result.patient.firstname,
	hospital_id: result.patient.hospital_id,
	name: result.drug.name,
	amount: result.total_price,
	   service_name: 'Consumables'
   })
});
const dataService = await prescribed_service.findAll({   
	include:[service, patient],
	order: [['updatedAt','ASC']],
	 where:{
	 permittedby: id,
	 payment_status: {
		[Op.in]:['Permitted']
	  },
	 permitted_date: {
	   [Op.between]:[sdate, edate]
	 }
   }
   


});
const obj3 = dataService.map((result, index)=>{
return Object.assign({
	permitted_date: result.permitted_date,
	patient: result.patient.lastname + ' ' + result.patient.firstname,
	hospital_id: result.patient.hospital_id,
	name: result.service.name,
	amount: result.price,
   service_name: 'Services'

})
});
const dataInvestigation = await prescribed_investigation.findAll({  
	include:[investigation, patient],
	order: [['updatedAt','ASC']],
	 where:{
	 permittedby: id,
	 payment_status: {
		[Op.in]:['Permitted']
	  },
	 permitted_date: {
	   [Op.between]:[sdate, edate]
	 }
	
   }

});
const obj4 = dataInvestigation.map((result, index)=>{
return Object.assign({
	permitted_date: result.permitted_date,
	patient: result.patient.lastname + ' ' + result.patient.firstname,
	hospital_id: result.patient.hospital_id,
	name: result.investigation.name,
	amount: result.price,
	service_name: 'Investigations'
 
 

})
});
const dataTest = await prescribed_test.findAll({  
	include:[test, patient],
	order: [['updatedAt','ASC']],
	 where:{
	 permittedby: id,
	 payment_status: {
		[Op.in]:['Permitted']
	  },
	 
	 permitted_date: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj5 = dataTest.map((result, index)=>{
return Object.assign({
	permitted_date: result.permitted_date,
	patient: result.patient.lastname + ' ' + result.patient.firstname,
	hospital_id: result.patient.hospital_id,
	name: result.test.name,
	amount: result.price,
   service_name: 'Tests'

})
});


const obj = [...obj1, ...obj2, ...obj3, ...obj4, ...obj5]

obj.sort(function(a,b){
	var c = new Date(a.updatedAt);
	var d = new Date(b.updatedAt);
	return c-d;
})
         return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllSummaryBillings = async(req, res)=>{
	try{
	const id = req.params.patient_id
	const sdate = moment(req.params.sdate)//.format('YYYY-MM-DD')
	const edate = moment(req.params.edate)//.format('YYYY-MM-DD')
	const dataDrug = await prescribed_drug.findAll({         
		     include:[drug],
			 order: [['updatedAt','ASC']],
			  where:{
			  patient_id: id,
			  billing_status: {
				[Op.in]:['Unbilled']
			  },
			  updatedAt: {
				[Op.between]:[sdate, edate]
			  }
			}
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			id: result.id + '&Drugs',
			billing_status: result.billing_status,
			updatedAt: result.updatedAt,
			name: result.drug.name,
			amount: result.total_price,
			service_name: 'Drugs',
			payment_status: result.payment_status

		})
	});

	const dataAdditional_items = await additional_item_prescription.findAll({         
		include:[drug],
		order: [['updatedAt','ASC']],
		 where:{
		 patient_id: id,
		 billing_status: {
			[Op.in]:['Unbilled']
		  },
		 updatedAt: {
		   [Op.between]:[sdate, edate]
		 }
	   }
 

});
const obj2 = dataAdditional_items.map((result, index)=>{
   return Object.assign({
	id: result.id + '&Consumables',
	billing_status: result.billing_status,
	   updatedAt: result.updatedAt,
	   name: result.drug.name,
	   amount: result.total_price,
	   service_name: 'Consumables',
	   payment_status: result.payment_status
   })
});
const dataService = await prescribed_service.findAll({         
	include:[service],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 billing_status: {
		[Op.in]:['Unbilled']
	  },
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj3 = dataService.map((result, index)=>{
return Object.assign({
	id: result.id + '&Services',
	billing_status: result.billing_status,
   updatedAt: result.updatedAt,
   name: result.service.name,
   amount: result.price,
   service_name: 'Services',
   payment_status: result.payment_status

})
});
const dataInvestigation = await prescribed_investigation.findAll({         
	include:[investigation],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 billing_status: {
		[Op.in]:['Unbilled']
	  },
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj4 = dataInvestigation.map((result, index)=>{
return Object.assign({
	id: result.id + '&Investigations',
	billing_status: result.billing_status,
   updatedAt: result.updatedAt,
   name: result.investigation.name,
   amount: result.price,
   service_name: 'Investigations',
   payment_status: result.payment_status,
 

})
});
const dataTest = await prescribed_test.findAll({         
	include:[test],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 billing_status: {
		[Op.in]:['Unbilled']
	  },
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj5 = dataTest.map((result, index)=>{
return Object.assign({
	id: result.id + '&Tests',
	billing_status: result.billing_status,
   updatedAt: result.updatedAt,
   name: result.test.name,
   amount: result.price,
   service_name: 'Tests',
   payment_status: result.payment_status

})
});


const obj = [...obj1, ...obj2, ...obj3, ...obj4, ...obj5]

obj.sort(function(a,b){
	var c = new Date(a.updatedAt);
	var d = new Date(b.updatedAt);
	return c-d;
})
         return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllSummaryUnBillings = async(req, res)=>{
	try{
	const id = req.params.patient_id
	const sdate = req.params.sdate
	const edate = req.params.edate

	const dataDrug = await prescribed_drug.findAll({         
		     include:[drug],
			 order: [['updatedAt','ASC']],
			  where:{
			  patient_id: id,
			  payment_status: {
				[Op.notIn]:['Paid']
			  },
			  billing_status: {
				[Op.in]:['Billed']
			  }
			}
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			id: result.id + '&Drugs',
			billing_status: result.billing_status,
			updatedAt: result.updatedAt,
			name: result.drug.name,
			amount: result.total_price,
			service_name: 'Drugs',
			payment_status: result.payment_status

		})
	});

	const dataAdditional_items = await additional_item_prescription.findAll({         
		include:[drug],
		order: [['updatedAt','ASC']],
		 where:{
		 patient_id: id,
		 payment_status: {
			[Op.notIn]:['Paid']
		  },
		  billing_status: {
			[Op.in]:['Billed']
		  }
	   }
 

});
const obj2 = dataAdditional_items.map((result, index)=>{
   return Object.assign({
	id: result.id + '&Consumables',
	billing_status: result.billing_status,
	   updatedAt: result.updatedAt,
	   name: result.drug.name,
	   amount: result.total_price,
	   service_name: 'Consumables',
	   payment_status: result.payment_status
   })
});
const dataService = await prescribed_service.findAll({         
	include:[service],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
		[Op.notIn]:['Paid']
	  },
	  billing_status: {
		[Op.in]:['Billed']
	  }
   }


});
const obj3 = dataService.map((result, index)=>{
return Object.assign({
	id: result.id + '&Services',
	billing_status: result.billing_status,
   updatedAt: result.updatedAt,
   name: result.service.name,
   amount: result.price,
   service_name: 'Services',
   payment_status: result.payment_status

})
});
const dataInvestigation = await prescribed_investigation.findAll({         
	include:[investigation],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
		[Op.notIn]:['Paid']
	  },
	  billing_status: {
		[Op.in]:['Billed']
	  }
   }


});
const obj4 = dataInvestigation.map((result, index)=>{
return Object.assign({
	id: result.id + '&Investigations',
	billing_status: result.billing_status,
   updatedAt: result.updatedAt,
   name: result.investigation.name,
   amount: result.price,
   service_name: 'Investigations',
   payment_status: result.payment_status,
 

})
});
const dataTest = await prescribed_test.findAll({         
	include:[test],
	order: [['updatedAt','ASC']],
	 where:{
	 patient_id: id,
	 payment_status: {
		[Op.notIn]:['Paid']
	  },
	  billing_status: {
		[Op.in]:['Billed']
	  }
   }


});
const obj5 = dataTest.map((result, index)=>{
return Object.assign({
	id: result.id + '&Tests',
	billing_status: result.billing_status,
   updatedAt: result.updatedAt,
   name: result.test.name,
   amount: result.price,
   service_name: 'Tests',
   payment_status: result.payment_status

})
});


const obj = [...obj1, ...obj2, ...obj3, ...obj4, ...obj5]

obj.sort(function(a,b){
	var c = new Date(a.updatedAt);
	var d = new Date(b.updatedAt);
	return c-d;
})
         return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getSummaryByUser = async(req, res)=>{
	try{
		const id = req.params.editedby
		const sdate = moment(req.params.sdate)
		const edate = moment(req.params.edate)
	
		const dataDrug = await payment.findAll({         
			attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 'createdAt', 'updatedAt', 'batch_no', 'narration'],
				 //order: [['createdAt','ASC']],
				  where:{
				  editedby: id,
				  createdAt: {
					[Op.between]:[sdate, edate]
				  }
				},
				group:['createdAt', 'updatedAt', 'batch_no', 'narration']
		  
		
		});
		const obj1 = dataDrug.map((result, index)=>{
			return Object.assign({
				updatedAt: result.updatedAt,
				amount: result.amount,
				narration: result.narration,
				batch_no: result.batch_no,
				createdAt: result.createdAt,
				amount_paid:0,
				tablename:'payment'
	
			})
		});
		const dataRefund = await refund.findAll({         
			attributes: [ [sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 'createdAt', 'updatedAt', 'batchno', 'narration'],
			//order: [['createdAt','ASC']],
			 where:{
			 uid: id,
			 createdAt: {
			   [Op.between]:[sdate, edate]
			 }
		   },
		   group:['createdAt', 'updatedAt', 'batchno', 'narration']
	 
		
		
		});
		const obj2 = dataRefund.map((result, index)=>{
		return Object.assign({
			updatedAt: result.updatedAt,
			amount: 0,
			narration: result.narration,
			batch_no: result.batchno,
			createdAt: result.createdAt,
			amount_paid:result.amount,
			tablename:'refund'
		
		})
		});
		const dataEwallet = await ewallet.findAll({         
			attributes: [ 'id', [sequelize.fn('SUM', sequelize.col('amt')), 'amt'], 'createdAt', 'updatedAt',  'narration'],
			//order: [['createdAt','ASC']],
			 where:{
			 uid: id,
			 createdAt: {
			   [Op.between]:[sdate, edate]
			 }
		   },
		   group:['createdAt', 'updatedAt', 'narration', 'id']
	 
		
		
		});
		const obj3 = dataEwallet.map((result, index)=>{
		return Object.assign({
			updatedAt: result.updatedAt,
			amount: parseFloat(result.amt) > 0? parseFloat(result.amt) :0,
			narration: result.narration,
			batch_no: '0000'+ result.id,
			createdAt: result.createdAt,
			amount_paid: parseFloat(result.amt) < 0? parseFloat(result.amt) * (-1): 0,
			tablename:'ewallets'
		})
		});
		
		const obj = [...obj1, ...obj2, ...obj3]
		
		obj.sort(function(a,b){
			var c = new Date(a.createdAt);
			var d = new Date(b.createdAt);
			return c-d;
		})
	
				 return res.status(200).json(obj);
		
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getSummaryByMode = async(req, res)=>{
	try{
		const id = req.params.pmode
		const sdate = moment(req.params.sdate)
		const edate = moment(req.params.edate)
		const uid = req.params.editedby
	
		const dataDrug = await payment.findAll({         
			attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 'createdAt', 'updatedAt', 'batch_no', 'narration'],
				 //order: [['createdAt','ASC']],
				  where:{
				  transid: id,
				  editedby: uid,
				  createdAt: {
					[Op.between]:[sdate, edate]
				  }
				},
				group:['createdAt', 'updatedAt', 'batch_no', 'narration']
		  
		
		});
		const obj1 = dataDrug.map((result, index)=>{
			return Object.assign({
				updatedAt: result.updatedAt,
				amount: result.amount,
				narration: result.narration,
				batch_no: result.batch_no,
				createdAt: result.createdAt,
				amount_paid:0,
				tablename:'payment'
	
			})
		});
		const dataRefund = await refund.findAll({         
			attributes: [ [sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 'createdAt', 'updatedAt', 'batchno', 'narration'],
			//order: [['createdAt','ASC']],
			 where:{
				uid: uid,
			 pmode: id,
			 createdAt: {
			   [Op.between]:[sdate, edate]
			 }
		   },
		   group:['createdAt', 'updatedAt', 'batchno', 'narration']
	 
		
		
		});
		const obj2 = dataRefund.map((result, index)=>{
		return Object.assign({
			updatedAt: result.updatedAt,
			amount: 0,
			narration: result.narration,
			batch_no: result.batchno,
			createdAt: result.createdAt,
			amount_paid:result.amount,
			tablename:'refund'
		
		})
		});
		const dataEwallet = await ewallet.findAll({         
			attributes: [ 'id', [sequelize.fn('SUM', sequelize.col('amt')), 'amt'], 'createdAt', 'updatedAt',  'narration'],
			//order: [['createdAt','ASC']],
			 where:{
				uid: uid,
			 pmode: id,
			 createdAt: {
			   [Op.between]:[sdate, edate]
			 }
		   },
		   group:['createdAt', 'updatedAt', 'id', 'narration']
	 
		
		
		});
		const obj3 = dataEwallet.map((result, index)=>{
		return Object.assign({
			updatedAt: result.updatedAt,
			amount: result.amt > 0? result.amt:0,
			narration: result.narration,
			batch_no: '0000'+ result.id,
			createdAt: result.createdAt,
			amount_paid: parseFloat(result.amt) < 0? parseFloat(result.amt) * (-1): 0,
			tablename:'ewallets'
		})
		});
		
		const obj = [...obj1, ...obj2, ...obj3]
		
		obj.sort(function(a,b){
			var c = new Date(a.createdAt);
			var d = new Date(b.createdAt);
			return c-d;
		})
	
				 return res.status(200).json(obj);
		
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getSummaryByDate = async(req, res)=>{
	try{
		const sdate = moment(req.params.sdate)
		const edate = moment(req.params.edate)
	
		const dataDrug = await payment.findAll({         
			attributes: [[sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 'createdAt', 'updatedAt', 'batch_no', 'narration'],
				 //order: [['createdAt','ASC']],
				  where:{
				  createdAt: {
					[Op.between]:[sdate, edate]
				  }
				},
				group:['createdAt', 'updatedAt', 'batch_no', 'narration']
		  
		
		});
		const obj1 = dataDrug.map((result, index)=>{
			return Object.assign({
				updatedAt: result.updatedAt,
				amount: result.amount,
				narration: result.narration,
				batch_no: result.batch_no,
				createdAt: result.createdAt,
				amount_paid:0,
				tablename:'payment'
	
			})
		});
		const dataRefund = await refund.findAll({         
			attributes: [ [sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 'createdAt', 'updatedAt', 'batchno', 'narration'],
			//order: [['createdAt','ASC']],
			 where:{
			 createdAt: {
			   [Op.between]:[sdate, edate]
			 }
		   },
		   group:['createdAt', 'updatedAt', 'batchno', 'narration']
	 
		
		
		});
		const obj2 = dataRefund.map((result, index)=>{
		return Object.assign({
			updatedAt: result.updatedAt,
			amount: 0,
			narration: result.narration,
			batch_no: result.batchno,
			createdAt: result.createdAt,
			amount_paid:result.amount,
			tablename:'refund'
		
		})
		});
		const dataEwallet = await ewallet.findAll({         
			attributes: [ 'id', [sequelize.fn('SUM', sequelize.col('amt')), 'amt'], 'createdAt', 'updatedAt',  'narration'],
			//order: [['createdAt','ASC']],
			 where:{
			 createdAt: {
			   [Op.between]:[sdate, edate]
			 }
		   },
		   group:['createdAt', 'updatedAt', 'id', 'narration']
	 
		
		
		});
		const obj3 = dataEwallet.map((result, index)=>{
		return Object.assign({
			updatedAt: result.updatedAt,
			amount: result.amt > 0? result.amt:0,
			narration: result.narration,
			batch_no: '0000'+ result.id,
			createdAt: result.createdAt,
			amount_paid:parseFloat(result.amt) < 0? parseFloat(result.amt) * (-1): 0,
			tablename:'ewallets'
		})
		});
		
		const obj = [...obj1, ...obj2, ...obj3]
		
		obj.sort(function(a,b){
			var c = new Date(a.createdAt);
			var d = new Date(b.createdAt);
			return c-d;
		})
	
				 return res.status(200).json(obj);
		
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getSummaryChart = async(req, res)=>{
	try{
    let objMonth = {}
	let total = []
	const tyear = moment(new Date()).format('YYYY')
	const month = [1,2,3,4,5,6,7,8,9,10,11,12] 
	//month.forEach( async element =>
	for (let element = 1; element<=month.length; element ++) {
		const dataPayment = await payment.findAll({         
			attributes: [ [sequelize.fn('SUM', sequelize.col('amount')), 'amount']],
				  where:{
					[Op.and]:
					[sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), tyear)
					,sequelize.where(sequelize.fn('MONTH', sequelize.col('createdAt')), element)
				]
					
				}
				, group:[sequelize.fn('MONTH', sequelize.col('createdAt'))]
		  
		
		});
		const obj1 = dataPayment.map((result, index)=>{
			return Object.assign({
				amount: result.amount
			})
		});
	
		const dataRefund = await refund.findAll({         
			attributes: [ [sequelize.fn('SUM', sequelize.col('amount')), 'amount']],
			//order: [['createdAt','ASC']],
			 where:{
					[Op.and]:
					[sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), tyear)
					,sequelize.where(sequelize.fn('MONTH', sequelize.col('createdAt')), element)
				]
					
				}
				,
				group:[sequelize.fn('MONTH', sequelize.col('createdAt'))]
		  
		});
		const obj2 = dataRefund.map((result, index)=>{
		return Object.assign({
			amount: (-1 * result.amount)
		})
		});
		const dataEwallet = await ewallet.findAll({         
			attributes: [ [sequelize.fn('SUM', sequelize.col('amt')), 'amt']],
			//order: [['createdAt','ASC']],
	where:{
					[Op.and]:
					[sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), tyear)
					,sequelize.where(sequelize.fn('MONTH', sequelize.col('createdAt')), element)
				]
					
				}
				,group:[sequelize.fn('MONTH', sequelize.col('createdAt'))]
		  
		
		});
		const obj3 = dataEwallet.map((result, index)=>{
		return Object.assign({
			
			amount: result.amt
		})
		}); 
		
		objMonth['month' + element] = [...obj1, ...obj2, ...obj3]
			
		}
		for( let i = 1; i <= month.length; i ++){
			let sum = 0
		objMonth['month' + i].map((item)=>{
			
			sum = sum + item.amount
		})
		  total.push(sum)
       
		} 
		return res.status(200).json(total);		
		
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getSummaryByDatePrevious = async(req, res)=>{
	try{
		const sdate = moment(req.params.sdate)
		const edate = moment(req.params.edate)

		const dataPayment = await payment.findAll({         
			attributes: [ [sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 'createdAt','service_name', 'updatedAt', 'batch_no', 'narration', 'editedby'],
				 //order: [['createdAt','ASC']],
				  where:{
				  createdAt: {
					[Op.between]:[sdate, edate]
				  }
				},
				include:[users],
				group:['batch_no']
		  
		
		});
		const obj1 = dataPayment.map((result, index)=>{
			return Object.assign({
				updatedAt: result.updatedAt,
				amount: result.amount,
				narration: result.narration,
				batch_no: result.batch_no,
				createdAt: result.createdAt,
				tablename:'payment',
				user: result.user.username,
				service_name: result.service_name
	
			})
		});
		const dataRefund = await refund.findAll({         
			attributes: [ [sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 'createdAt','tablename', 'updatedAt', 'batchno', 'narration', 'uid'],
			//order: [['createdAt','ASC']],
			 where:{
			 createdAt: {
			   [Op.between]:[sdate, edate]
			 }
		   },
		   include:[users],
		   group:['batchno']
		});
		const obj2 = dataRefund.map((result, index)=>{
		return Object.assign({
			updatedAt: result.updatedAt,
			amount: (-1 * result.amount),
			narration: result.narration,
			batch_no: result.batchno,
			createdAt: result.createdAt,
			tablename:'refund',
			user: result.user.username,
			service_name: result.tablename

		
		})
		});
		const dataEwallet = await ewallet.findAll({         
			attributes: [ 'id', [sequelize.fn('SUM', sequelize.col('amt')), 'amt'], 'createdAt','tablename', 'updatedAt',  'narration', 'uid'],
			//order: [['createdAt','ASC']],
			 where:{
			 createdAt: {
			   [Op.between]:[sdate, edate]
			 }
		   },
		   include:[users],
		   group:['id','createdAt','tablename', 'updatedAt',  'narration', 'uid']
	 
		
		
		});
		const obj3 = dataEwallet.map((result, index)=>{
		return Object.assign({
			updatedAt: result.updatedAt,
			amount: result.amt,
			narration: result.narration,
			batch_no: '0000'+result.id,
			createdAt: result.createdAt,
			tablename:'ewallets',
			user: result.user.username,
			service_name: result.tablename
		})
		}); 
		
		const obj = [...obj1, ...obj2, ...obj3]
		
		obj.sort(function(a,b){
			var c = new Date(a.createdAt);
			var d = new Date(b.createdAt);
			return c-d;
		})
		
			 return res.status(200).json(obj);
				
		
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getAllSummaryoutpatient = async(req, res)=>{
	try{
	const id = req.params.patient_id
	const sdate = moment(req.params.sdate)
	const edate = moment(req.params.edate)

	const dataDrug = await payment.findAll({         
		     include:[drug],
			 order: [['updatedAt','ASC']],
			  where:{
				uid: id,
				service_name: 'Outpts_Drugs',
			  updatedAt: {
				[Op.between]:[sdate, edate]
			  }
			}
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			updatedAt: result.updatedAt,
			name: result.drug.name,
			qty: result.name.split('_')[0],
			amount: result.amount,
			amount_paid: result.amount

		})
	});

const dataService = await payment.findAll({         
	include:[service],
	order: [['updatedAt','ASC']],
	 where:{
		uid: id,
		service_name: 'Outpts_Services',
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj3 = dataService.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.service.name,
   qty: result.name.split('_')[0],
   amount: result.amount,
   amount_paid: result.amount

})
});
const dataInvestigation = await payment.findAll({         
	include:[investigation],
	order: [['updatedAt','ASC']],
	 where:{
		uid: id,
		service_name: 'Outpts_Investigations',
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj4 = dataInvestigation.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.investigation.name,
   qty: result.name.split('_')[0],
   amount: result.amount,
   amount_paid: result.amount

})
});
const dataTest = await payment.findAll({         
	include:[test],
	order: [['updatedAt','ASC']],
	 where:{
		uid: id,
		service_name: 'Outpts_Tests',
	 updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
   }


});
const obj5 = dataTest.map((result, index)=>{
return Object.assign({
   updatedAt: result.updatedAt,
   name: result.test.name,
   qty: result.name.split('_')[0],
   amount: result.amount,
   amount_paid: result.amount

})
});
const dataMiscellaneous = await payment.findAll({        
		     include:[chart_of_account],
			  where:{
			 	uid: id,
			  service_name: 'Outpts_Miscellanous',
			   updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
			}
		 
	  
	
	});
	const obj6 = dataMiscellaneous.map((result, index)=>{
		return Object.assign({
			 updatedAt: result.updatedAt,
   name: result.narration,
   qty: 1,
   amount: result.amount,
   amount_paid: result.amount

		})
	});

	
const dataRefund = await refund.findAll({        
			  where:{
			 	refid: id,
			 // service_name: 'Outpts_Miscellanous',
			   updatedAt: {
	   [Op.between]:[sdate, edate]
	 }
			}
		 
	  
	
	});
	const obj7 = dataRefund.map((result, index)=>{
		return Object.assign({
			 updatedAt: result.updatedAt,
   name: result.narration,
   qty: result.qty,
   amount: (-1 * result.amount),
   amount_paid: (-1 * result.amount)

		})
	});

const obj = [...obj1, ...obj3, ...obj4, ...obj5, ...obj6, ...obj7]

obj.sort(function(a,b){
	var c = new Date(a.updatedAt);
	var d = new Date(b.updatedAt);
	return c-d;
})
         return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllReceipt = async(req, res)=>{
	try{
	const batch_no = req.params.batch_no
	const dataDrug = await payment.findAll({
		attributes: ['name',  [sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 'createdAt', 'updatedAt'],          
		     include:[drug,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Prescribed Drugs'
			}
		  ,
		  group:['batch_no']
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			service_name: 'Drug(s)',
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataAdditional_items = await payment.findAll({
		attributes: ['name',  [sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 'createdAt', 'updatedAt'],          
		     include:[drug,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Additional Item'
			}
		  ,
		  group:['batch_no']
	  
	
	});
	const obj5 = dataAdditional_items.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			service_name: 'Consumables',
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataService = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[service,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Prescribed Services'
			}
		 
	  
	
	});
	const obj2 = dataService.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			service_name: result.service.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});

	const dataInvestigation = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[investigation,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Prescribed Investigation'
			}
		 
	  
	
	});
	const obj3 = dataInvestigation.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			service_name: result.investigation.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataTest = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[test,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Prescribed Test'
			}
		 
	  
	
	});
	const obj4 = dataTest.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			service_name: result.test.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const obj = [...obj1, ...obj2, ...obj3, ...obj4, ...obj5]

         return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllReceiptDetails = async(req, res)=>{
	try{
	const batch_no = req.params.batch_no
	const dataDrug = await payment.findAll({    
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],       
		     include:[drug,users, prescribed_drug],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Prescribed Drugs'
			}
		  //,  group:['batch_no']
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			qty: result.prescribed_drug.quantity_to_dispense,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.drug.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataAdditional_items = await payment.findAll({  
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],        
		     include:[drug,users, additional_item_prescription],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Additional Item'
			}
		  //, group:['batch_no']
	  
	
	});
	const obj5 = dataAdditional_items.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			qty: result.additional_item_prescription.quantity_to_dispense,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.drug.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataService = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[service,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Prescribed Services'
			}
		 
	  
	
	});
	const obj2 = dataService.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			qty: 1,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.service.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});

	const dataInvestigation = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[investigation,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Prescribed Investigation'
			}
		 
	  
	
	});
	const obj3 = dataInvestigation.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			qty: 1,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.investigation.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataTest = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[test,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Prescribed Test'
			}
		 
	  
	
	});
	const obj4 = dataTest.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			qty: 1,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.test.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	//===========================================
	const dataDrugout = await payment.findAll({    
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],       
		     include:[drug,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Drugs'
			}
		  //,  group:['batch_no']
	  
	
	});
	const obj11 = dataDrugout.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			qty: result.name.split('_')[0],
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.drug.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});

	const dataServiceout = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[service,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Services'
			}
		 
	  
	
	});
	const obj21 = dataServiceout.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			qty: 1,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.service.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});

	const dataInvestigationout = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[investigation,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Investigations'
			}
		 
	  
	
	});
	const obj31 = dataInvestigationout.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			qty: 1,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.investigation.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataTestout = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[test,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Tests'
			}
		 
	  
	
	});
	const obj41 = dataTestout.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			qty: 1,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.test.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataMiscellaneous = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt','narration', 'updatedAt'],          
		     include:[chart_of_account,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Miscellanous'
			}
		 
	  
	
	});
	const objM = dataMiscellaneous.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			qty: 1,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.narration,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const obj = [...obj11, ...obj21, ...obj31, ...obj41,...obj1, ...obj2, ...obj3, ...obj4, ...obj5, ...objM]

         return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllRefund = async(req, res)=>{
	try{
	const patient_id = req.params.patient_id
	const sdate = moment(req.params.sdate)
	const edate = moment(req.params.edate)
	const dataDrug = await payment.findAll({    
		attributes: ['name', 'id', 'batch_no',  'amount', 'createdAt', 'updatedAt'],       
		     include:[drug, users, prescribed_drug],
			  where:{
			  uid: patient_id,
			  service_name: 'Prescribed Drugs',
			  id:{
				[Op.notIn]: sequelize.literal(`(select pid from refund)`)
			 },
			 updatedAt:{
				[Op.between]:[sdate, edate]
			 },
			 confirm: {
				[Op.ne]: 1
			 }
			}
		  ,  order:[['updatedAt', 'DESC']]
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			qty: result.prescribed_drug.quantity_to_dispense,
			name: result.name,
			qty_returned: result.prescribed_drug.quantity_returned,
			returned_by: result.prescribed_drug.returned_by,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt: result.prescribed_drug.updatedAt,
			service_name: result.drug.name,
			id: result.id,
			batch_no: result.batch_no,
			service: 'Drug',
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataAdditional_items = await payment.findAll({  
		attributes: ['name', 'id','batch_no', 'amount', 'createdAt', 'updatedAt'],        
		     include:[drug,users, additional_item_prescription],
			  where:{
				uid: patient_id,
			  service_name: 'Additional Item'
			  ,
			  id:{
				[Op.notIn]: sequelize.literal(`(select pid from refund)`)
			 },
			 updatedAt:{
				[Op.between]:[sdate, edate]
			 },
			 confirm: {
				[Op.ne]: 1
			 }
			}
		  , order:[['createdAt','DESC']]
	  
	
	});
	const obj5 = dataAdditional_items.map((result, index)=>{
		return Object.assign({
			qty: result.additional_item_prescription.quantity_to_dispense,
			qty_returned: result.additional_item_prescription.quantity_returned,
			returned_by: result.additional_item_prescription.returned_by,
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt: result.additional_item_prescription.updatedAt,
			service_name: result.drug.name,
			id: result.id,
			service: 'Consumables',
			batch_no: result.batch_no,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataService = await payment.findAll({
		attributes: ['name', 'id', 'batch_no', 'amount', 'createdAt', 'updatedAt'],          
		     include:[service,users, prescribed_service],
			  where:{
				uid: patient_id,
			  service_name: 'Prescribed Services',
			  id:{
				[Op.notIn]: sequelize.literal(`(select pid from refund)`)
			 },
			 updatedAt:{
				[Op.between]:[sdate, edate]
			 },
			 confirm: {
				[Op.ne]: 1
			 }
			},
			order:[['createdAt', 'DESC']]
		 
	  
	
	});
	const obj2 = dataService.map((result, index)=>{
		return Object.assign({
			name: result.name,
			qty: 1,
			qty_returned: 0,
			returned_by: '',
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt: result.service.updatedAt,
			service_name: result.service.name,
			service: 'Services',
			batch_no: result.batch_no,
			id: result.id,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});

	const dataInvestigation = await payment.findAll({
		attributes: ['name','id', 'batch_no', 'amount', 'createdAt', 'updatedAt'],          
		     include:[investigation,users, prescribed_investigation],
			  where:{
				uid: patient_id,
			  service_name: 'Prescribed Investigation',
			  id:{
				[Op.notIn]: sequelize.literal(`(select pid from refund)`)
			 },
			 updatedAt:{
				[Op.between]:[sdate, edate]
			 },
			 confirm: {
				[Op.ne]: 1
			 }
			},
			order: [['createdAt', 'DESC']]
		 
	  
	
	});
	const obj3 = dataInvestigation.map((result, index)=>{
		return Object.assign({
			name: result.name,
			qty: 1,
			qty_returned: 0,
			returned_by: '',
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt: result.investigation.updatedAt,
			service_name: result.investigation.name,
			service: 'Imaging',
			id: result.id,
			batch_no: result.batch_no,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataTest = await payment.findAll({
		attributes: ['name', 'id','batch_no', 'amount', 'createdAt', 'updatedAt'],          
		     include:[test,users, prescribed_test],
			  where:{
				uid: patient_id,
			  service_name: 'Prescribed Test',
			  id:{
				[Op.notIn]: sequelize.literal(`(select pid from refund)`)
			 },
			 updatedAt:{
				[Op.between]:[sdate, edate]
			 },
			 confirm: {
				[Op.ne]: 1
			 }

			},
			order: [['createdAt', 'DESC']]
		 
	  
	
	});
	const obj4 = dataTest.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt: result.test.updatedAt,
			service_name: result.test.name,
			service: 'Test',
			id: result.id,
			qty: 1,
			qty_returned: 0,
			batch_no: result.batch_no,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const obj = [...obj1, ...obj2, ...obj3, ...obj4, ...obj5]
	obj.sort(function(a,b){
		var c = new Date(a.updatedAt);
		var d = new Date(b.updatedAt);
		return d-c ;
	})
         return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllWithBatchno = async(req, res)=>{
	try{
	const batch_no = req.params.batch_no
	const data = await payment.findAll({ where:{batch_no:batch_no},
		include: [users, journal],
            order:[['updatedAt','ASC']]});
         return res.status(200).json(data);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllWithBatchnoGroupOUT = async(req, res)=>{
	try{
	const uid = req.params.uid
	const data = await payment.findAll({
		attributes: ['id','batch_no', 'narration', 'uid', 'transid', [sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 'createdAt', 'updatedAt', 'editedby','bank'],          
		include:[ users],   
			  where:{
			  uid: uid,
			  service_name:{ [Op.like]:'Outpts_%'}
			},
			//order:[['updatedAt', 'DESC']],
		  group:['batch_no']
	  
	
	});
         return res.status(200).json(data);
}
catch(err){
	return res.status(500).json({err: err.message})
}

}
const getAllReceiptDetailsout = async(req, res)=>{
	try{
	const batch_no = req.params.batch_no
	const dataDrug = await payment.findAll({    
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],       
		     include:[drug,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Drugs'
			}
		  //,  group:['batch_no']
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.drug?.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataService = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[service,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Services'
			}
		 
	  
	
	});
	const obj2 = dataService.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.service?.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});

	const dataInvestigation = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[investigation,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Investigations'
			}
		 
	  
	
	});
	const obj3 = dataInvestigation.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.investigation?.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataTest = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[test,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Tests'
			}
		 
	  
	
	});
	const obj4 = dataTest.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.test?.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
		const dataMiscellaneous = await payment.findAll({
		attributes: ['name', 'narration', 'amount', 'createdAt', 'updatedAt'],          
		     include:[chart_of_account,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Miscellanous'
			}
		 
	  
	
	});
	const obj5 = dataMiscellaneous.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.narration,//chart_of_account.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const obj = [...obj1, ...obj2, ...obj3, ...obj4, ...obj5]

         return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllReceiptoutpatient = async(req, res)=>{
	try{
	const batch_no = req.params.batch_no
	const dataDrug = await payment.findAll({    
		attributes: ['name', 'service_name','createdAt', 'updatedAt', [sequelize.fn('SUM', sequelize.col('amount')), 'amount'] ],       
		     include:[drug,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Drugs'
			}
		  ,  group:['service_name']
		  //order:[['updatedAt', 'DESC']]
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: 'Drugs/Consumables',
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataService = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[service,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Services'
			}
		 
	  
	
	});
	const obj2 = dataService.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.service.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});

	const dataInvestigation = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[investigation,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Investigations'
			}
		 
	  
	
	});
	const obj3 = dataInvestigation.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.investigation.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataTest = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[test,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Tests'
			}
		 
	  
	
	});
	const obj4 = dataTest.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.test.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataMiscellaneous = await payment.findAll({
		attributes: ['name', 'narration', 'amount', 'createdAt', 'updatedAt'],          
		     include:[chart_of_account,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Miscellanous'
			}
		 
	  
	
	});
	const obj5 = dataMiscellaneous.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.narration,//chart_of_account.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const obj = [...obj1, ...obj2, ...obj3, ...obj4, ...obj5]

         return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllReceiptoutpatientDetails = async(req, res)=>{
	try{
	const batch_no = req.params.batch_no
	
	const dataDrug = await payment.findAll({    
		attributes: ['name', 'createdAt', 'updatedAt', [sequelize.fn('SUM', sequelize.col('amount')), 'amount'] ],       
		     include:[drug,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Drugs'
			},
			group: ['name']
		 // order:[['updatedAt', 'DESC']]
	  
	
	});
	const obj1 = dataDrug.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.drug.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataService = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[service,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Services'
			}
		 
	  
	
	});
	const obj2 = dataService.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.service.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});

	const dataInvestigation = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[investigation,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Investigations'
			}
		 
	  
	
	});
	const obj3 = dataInvestigation.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.investigation.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataTest = await payment.findAll({
		attributes: ['name',  'amount', 'createdAt', 'updatedAt'],          
		     include:[test,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Tests'
			}
		 
	  
	
	});
	const obj4 = dataTest.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.test.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const dataMiscellaneous = await payment.findAll({
		attributes: ['name', 'narration', 'amount', 'createdAt', 'updatedAt'],          
		     include:[chart_of_account,users],
			  where:{
			  batch_no: batch_no,
			  service_name: 'Outpts_Miscellanous'
			}
		 
	  
	
	});
	const obj5 = dataMiscellaneous.map((result, index)=>{
		return Object.assign({
			name: result.name,
			amount: result.amount,
			createdAt: result.createdAt,
			updatedAt:result.updatedAt,
			service_name: result.narration,//chart_of_account.name,
			createdBy: result.user.surname + ' ' + result.user.othername

		})
	});
	const obj = [...obj1, ...obj2, ...obj3, ...obj4, ...obj5]

         return res.status(200).json(obj);
	}
	catch(err){}
}
const getAllWithBatchnoGroup = async(req, res)=>{
	try{
	const uid = req.params.uid
	const data = await payment.findAll({
		attributes: ['id','batch_no', 'narration', 'uid', 'transid',
			 [sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 
			 'createdAt', 'updatedAt', 'editedby','bank'],          
		include:[ users],   
			  where:{
			  uid: uid
			},
			//order:[['updatedAt', 'DESC']],
		  group:['batch_no']
	  
	
	});
         return res.status(200).json(data);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
}
const getAllPagings = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
         const { limit, offset } = getPagination(page, per_page)
        const data = await payment.findAndCountAll({ 
			
			order:[['tdate','ASC']],
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
        const data = await payment.findOne({where:{id:Id}})
        return res.status(200).json(data)

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const add =async (req, res)=>{
    try{
/*		
		name, phone,bank,transid,tdate,amount,editedby,vdate,narration,confirm,service_id,service_name,jid1, jid2,batch_no, confirmed_by, confirmed_id,confirmed_date,payment_type=Cashbook, uid,payment_id, confirm_note,isconfirm
*/
const patient_id = req.body.id;
const patient_type = req.body.patient_type;
const batch_no = req.body.editedby + ''+ new Date().getTime()
const date = formatDate(new Date())

const carts = await cart.findAll({
	where:{
		pid: patient_id,
		patient_table: patient_type
	}
})

const patients = await patient.findOne({
	where:{
		id: patient_id
	}
})

const obj = carts.map((result, index)=>{
	return Object.assign({
	  name: patients.dataValues.hospital_id + '_'+ patients.dataValues.firstname + '_' + patients.dataValues.lastname,
	  phone:patients.dataValues.phone,
	  bank: req.body.bank,
	  transid: req.body.payment_type,
	  tdate: date,
	  amount:result.amount,
	  editedby: req.body.editedby,
	  vdate: req.body.vdate,
	  narration: req.body.narration,
	  confirm: 0,
	  service_id:result.service_id,
	  service_name: result.tablename,
	  jid1: 0,
	  batch_no: batch_no,
	  confirmed_by:'',
       confirmed_id:0,
	   confirmed_date: date,
	   payment_type: 'Cashbook',
	   uid: patient_id,
	   payment_id: result.tableid,
	   confirm_note:'',
	   isconfirm: 0,
	   jid:0

	  })
	   })

	   const result = await sequelize.transaction(async (t) => {
	   await payment.bulkCreate(obj, { transaction: t }).then( async resp=>{
		carts.map( async(result)=>{
		
			switch(result.tablename){
				case 'Additional Item':
					await additional_item_prescription.update(
						{
							 payment_status:'Paid',
							 billing_status: 'Billed'
						 },
						 
						 {
							 where:{
							 id:result.tableid
						 }
						}, { transaction: t });
						 break
						 case 'Prescribed Drugs':
					await prescribed_drug.update(
						{
							 payment_status:'Paid',
							 billing_status: 'Billed'
						 },
						
						 
						 {
							 where:{
							 id:result.tableid
						 }
						},
						{ transaction: t });
						 break
						 case 'Prescribed Services':
					await prescribed_service.update(
						{
							 payment_status:'Paid',
							 billing_status: 'Billed'
						 },
						
						 {
							 where:{
							 id:result.tableid
						 }
						},
						{ transaction: t });
						 break
						 case 'Prescribed Investigation':
					await prescribed_investigation.update(
						{
							 payment_status:'Paid',
							 billing_status: 'Billed'
						 },
						
						 {
							 where:{
							 id:result.tableid
						 }
						}, { transaction: t });
						 break
						 case 'Prescribed Test':
					await prescribed_test.update(
						{
							 payment_status:'Paid',
							 billing_status: 'Billed'
						 },
						
						 {
							 where:{
							 id:result.tableid
						 }
						}, { transaction: t });
						 break
						 
	
			}
		});
		await carts.map( async(result)=>{
			await cart.destroy({where:{id:result.id}},{ transaction: t })  
	  		  })
         return res.status(200).json(resp)
	}).catch(err=>{
		return res.status(500).json({err: err.message})
	})



	   })
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const addoutpatient =async (req, res)=>{
    try{
const patient_id = req.body.id;
const patient_type = req.body.patient_type;
const batch_no = req.body.editedby + ''+ new Date().getTime()
const c = req.body.editedby + ''+ new Date().getTime();
const payment_ids = c.substring(c.length - 7)
const date = formatDate(new Date())

const carts = await cart.findAll({
	where:{
		pid: patient_id,
		patient_table: patient_type
	}
})

const patients = await outpts.findOne({
	where:{
		outpt_id: patient_id
	}
})
const obj = carts.map((result, index)=>{
	return Object.assign({
	  name: result.qty + '_' + patients.dataValues.name,
	  phone:patients.dataValues.phone,
	  bank: req.body.bank,
	  transid: req.body.payment_type,
	  tdate: date,
	  amount:result.amount,
	  editedby: req.body.editedby,
	  vdate: req.body.vdate,
	  narration: req.body.narration,
	  confirm: 0,
	  service_id:result.service_id,
	  service_name: result.tablename,
	  jid1: 0,
	  batch_no: batch_no,
	  confirmed_by:'',
       confirmed_id:0,
	   confirmed_date: date,
	   payment_type: 'Cashbook',
	   uid: patient_id,
	   payment_id:  payment_ids + '' + index,
	   confirm_note:'',
	   isconfirm: 0,
	   jid2:0

	  })
	   })

const result = await sequelize.transaction(async (t) => {
	   await payment.bulkCreate(obj, { transaction: t }).then( async resp=>{
		
		carts.map( async(result)=>{
		
			switch(result.tablename){
				case 'Additional Item':
					await additional_item_prescription.update(
						{
							 payment_status:'Paid',
							 billing_status: 'Billed'
						 },
						 
						 {
							 where:{
							 id:result.tableid
						 }
						}, { transaction: t });
						 break
						 case 'Prescribed Drugs':
					await prescribed_drug.update(
						{
							 payment_status:'Paid',
							 billing_status: 'Billed'
						 },
						
						 
						 {
							 where:{
							 id:result.tableid
						 }
						},
						{ transaction: t });
						 break
						 case 'Prescribed Services':
					await prescribed_service.update(
						{
							 payment_status:'Paid',
							 billing_status: 'Billed'
						 },
						
						 {
							 where:{
							 id:result.tableid
						 }
						},
						{ transaction: t });
						 break
						 case 'Prescribed Investigation':
					await prescribed_investigation.update(
						{
							 payment_status:'Paid',
							 billing_status: 'Billed'
						 },
						
						 {
							 where:{
							 id:result.tableid
						 }
						}, { transaction: t });
						 break
						 case 'Prescribed Test':
					await prescribed_test.update(
						{
							 payment_status:'Paid',
							 billing_status: 'Billed'
						 },
						
						 {
							 where:{
							 id:result.tableid
						 }
						}, { transaction: t });
						 break
						 
	
			}
		});
		
		await carts.map( async(result)=>{
			await cart.destroy({where:{id:result.id}},{ transaction: t })  
	  		  })
			 
         return res.status(200).json(resp)
	}).catch(err=>{
		return res.status(500).json({err: err.message})
	})



	   })
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const addoutpatientMiscellaneous =async (req, res)=>{
    try{
const patient_id = req.body.id;
var batch_no = req.body.editedby + ''+ new Date().getTime()
var paymentids = batch_no.substring(batch_no.length - 9)
const date = formatDate(new Date())
const chart_of_accounts = req.body.chartofAccount
const amount = req.body.amount 

const patients = await outpts.findOne({
	where:{
		outpt_id: patient_id
	}
})
var obj = Object.assign({
	  name: '1_' + patients.dataValues.name,
	  phone:patients.dataValues.phone,
	  bank: req.body.bank,
	  transid: req.body.payment_type,
	  tdate: date,
	  amount: amount,
	  editedby: req.body.editedby,
	  vdate: req.body.vdate,
	  narration: req.body.narration,
	  confirm: 0,
	  service_id: chart_of_accounts,
	  service_name: req.body.service_name,
	  jid1: 0,
	  batch_no: batch_no,
	  confirmed_by:'',
       confirmed_id:0,
	   confirmed_date: date,
	   payment_type: 'Cashbook',
	   uid: patient_id,
	   payment_id:  paymentids,
	   confirm_note:'',
	   isconfirm: 0,
	   jid2:0
})

	 const resp =  await payment.create(obj)
	
  return res.status(200).json(resp)
    }
    catch(err){
	
        return res.status(500).json({err: err.message})
    }
}
const addDependant =async (req, res)=>{
    try{
/*		
		name, phone,bank,transid,tdate,amount,editedby,vdate,narration,confirm,service_id,service_name,jid1, jid2,batch_no, confirmed_by, confirmed_id,confirmed_date,payment_type=Cashbook, uid,payment_id, confirm_note,isconfirm
*/

const patient_id = req.body.id;
const patient_type = req.body.patient_type;
const batch_no = req.body.editedby + ''+ new Date().getTime()
const date = formatDate(new Date())

const carts = await cart.findAll({
	where:{
		pid: patient_id,
		patient_table: patient_type
	}
})

const patients = await patient.findOne({
	where:{
		id: patient_id
	}
})

const obj = carts.map((result, index)=>{
	return Object.assign({
	  name: patients.dataValues.hospital_id + '_'+ patients.dataValues.firstname + '_' + patients.dataValues.lastname,
	  phone:patients.dataValues.phone,
	  bank: req.body.bank,
	  transid: req.body.payment_type,
	  tdate: date,
	  amount:result.amount,
	  editedby: req.body.editedby,
	  vdate: date,
	  narration: req.body.narration,
	  confirm: 0,
	  service_id:result.service_id,
	  service_name: result.tablename,
	  jid1: 0,
	  batch_no: batch_no,
	  confirmed_by:'',
       confirmed_id:0,
	   confirmed_date: date,
	   payment_type: 'Cashbook',
	   uid: patient_id,
	   payment_id: result.tableid,
	   confirm_note:'',
	   isconfirm: 0,
	   jid:0

	  })
	   })

	   const result = await sequelize.transaction(async (t) => {
	   carts.map( async(result)=>{
		
		switch(result.tablename){
			case 'Additional Item':
				await additional_item_prescription.update(
					{
						 payment_status:'Paid',
						 billing_status: 'Billed'
						 

					 },
					 
					 {
						 where:{
						 id:result.tableid
					 }
					});
					 break
					 case 'Prescribed Drugs':
				await prescribed_drug.update(
					{
						 payment_status:'Paid',
						 billing_status: 'Billed'
					 },
					 
					 {
						 where:{
						 id:result.tableid
					 }
					});
					 break
					 case 'Prescribed Services':
				await prescribed_service.update(
					{
						 payment_status:'Paid',
						 billing_status: 'Billed'
					 },
					 
					 {
						 where:{
						 id:result.tableid
					 }
					});
					 break
					 case 'Prescribed Investigation':
				await prescribed_investigation.update(
					{
						 payment_status:'Paid',
						 billing_status: 'Billed'
					 },
					 
					 {
						 where:{
						 id:result.tableid
					 }
					});
					 break
					 case 'Prescribed Test':
				await prescribed_test.update(
					{
						 payment_status:'Paid',
						 billing_status: 'Billed'
					 },
					 
					 {
						 where:{
						 id:result.tableid
					 }
					});
					 break
					 

		}
	});

	await payment.bulkCreate(obj).then(resp=>{
return res.status(200).json(resp)
	}).catch(err=>{
		return res.status(500).json({err: err.message})
	})
	await carts.map( async(result)=>{
      await cart.destroy({where:{id:result.id}})  

	})


	   })


/*
     const data = await payment.create({name: req.body.name, phone: req.body.phone, tdate: req.body.tdate,transid: req.body.transid, amount: req.body.amount, editedby: req.body.editedby, vdate: req.body.vdate, narration: req.body.narration, confirm: req.body.confirm, service_id: req.body.service_id, service_name: req.body.service_name, jid1: req.body.jid1, jid2: req.body.jid2, batch_no: req.body.batch_no, confirmed_by: req.body.confirmed_by,confirmed_id:req.body.confirmed_id,confirmed_date: req.body.confirmed_date, payment_type: req.body.payment_type, uid: req.body.uid, payment_id: req.body.payment_id, confirm_note: req.body.confirm_note, isconfirm: req.body.isconfirm })
	 */
     
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
/*
const addDependant =async (req, res)=>{
    try{

const dependant_id = req.body.dependant_id;
const patient_type = req.body.patient_type;
const batch_no = req.body.editedby + ''+ new Date().getTime()
const date = formatDate(new Date())
const carts = await cart.findAll({
	where:{
		pid: dependant_id,
		patient_table: patient_type
	}
})
const dependants = await patient.findOne({
	where:{
		dependant_id: dependant_id
	}
})

const obj = carts.map((result, index)=>{
	return Object.assign({
	  name: dependants.dataValues.hospital_id + '_'+ dependants.dataValues.name,
	  phone:dependants.dataValues.phone,
	  bank: req.body.bank,
	  transid: req.body.payment_type,
	  tdate: date,
	  amount:result.amount,
	  editedby: req.body.editedby,
	  vdate: date,
	  narration: req.body.narration,
	  confirm: 0,
	  service_id:result.service_id,
	  service_name: result.tablename,
	  jid1: 0,
	  batch_no: batch_no,
	  confirmed_by:'',
       confirmed_id:0,
	   confirmed_date: date,
	   payment_type: 'Cashbook',
	   uid: dependant_id,
	   payment_id: result.tableid,
	   confirm_note:'',
	   isconfirm: 0,
	   jid:0

	  })
	   })

	   const result = await sequelize.transaction(async (t) => {
	   carts.map( async(result)=>{
		
		switch(result.tablename){
			case 'Additional Item':
				await additional_item.update(
					{
						 payment_status:'Paid'
					 },
					 
					 {
						 where:{
						 ai_id:result.tableid
					 }
					});
					 break
					 case 'Prescribed Drugs':
				await prescribeddrug.update(
					{
						 payment_status:'Paid'
					 },
					 
					 {
						 where:{
						 pd_id:result.tableid
					 }
					});
					 break
					 case 'Prescribed Services':
				await prescribedservice.update(
					{
						 payment_status:'Paid'
					 },
					 
					 {
						 where:{
						 ps_id:result.tableid
					 }
					});
					 break
					 case 'Prescribed Investigation':
				await prescribedimaging.update(
					{
						 payment_status:'Paid'
					 },
					 
					 {
						 where:{
						 pi_id:result.tableid
					 }
					});
					 break
					 case 'Prescribed Test':
				await prescribedtest.update(
					{
						 payment_status:'Paid'
					 },
					 
					 {
						 where:{
						 pt_id:result.tableid
					 }
					});
					 break
					 

		}
	});
	await payment.bulkCreate(obj).then(resp=>{
return res.status(200).json(resp)
	}).catch(err=>{
		return res.status(500).json({err: err.message})
	})
	await carts.map( async(result)=>{
      await cart.destroy({where:{id:result.id}})  

	})


	   })
     
    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
*/
const update = async(req, res)=>{
    try{//
	
     const Id = req.params.id;
     const data = await payment.findOne({where:{id: Id}});
	 data.name = req.body.name, 
	 data.phone = req.body.phone, 
	 data.tdate = req.body.tdate,
	 data.transid = req.body.transid, 
	 data.amount = req.body.amount,
	 data.editedby = req.body.editedby,
	 data.vdate = req.body.vdate, 
	 data.narration =  req.body.narration,
	 data.confirm = req.body.confirm,
	 data.service_id = req.body.service_id,
	 data.service_name = req.body.service_name,
	 data.jid1=  req.body.jid1,
	 data.jid2 = req.body.jid2, 
	 data.batch_no = req.body.batch_no,
	 data.confirmed_by = req.body.confirmed_by,
	 data.confirmed_id = req.body.confirmed_id,
	 data.confirmed_date = req.body.confirmed_date,
	 data.payment_type = req.body.payment_type,
	 data.uid = req.body.uid, 
	 data.payment_id = req.body.payment_id,
	 data.confirm_note = req.body.confirm_note,
	 data.isconfirm = req.boq.isconfirm
     data.save().then(rex=>{
        return res.status(200).json(data)
     })

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
}
const confirmed = async(req, res)=>{
	try{
     const id = req.params.id;
	 const data = await payment.findOne({id: id});
	 data.jid1 = req.body.jid1
	 data.jid2 = req.body.jid2
	 data.confirm_note = req.body.confirm_note
	 data.confirmed_by = req.body.confirmed_by
	 data.confirmed_id = req.body.confirmed_id
	 data.confirmed_date = req.body.confirmed_date
	 data.isconfirm = 1
	 data.save().then(resp=>{
		return res.status(200).json(resp)
	 }).catch(err=>{
		return res.status(500).json({err: err.message})
	 })
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const deletes = async(req, res)=>{
try{
const id = req.params.outpt_id;
const data = payment.destroy({id: id})
return res.status(200).json(data)
}
catch(err){
    return res.status(500).json({err: err.message})
}
}
const getAllHmoTransaction = async(req, res)=>{
	try{
		const sdate = moment(req.params.sdate)
		const edate = moment(req.params.edate)
         const insurance_id = req.params.insurance_id
		 const hmo_id = req.params.hmo_id

		 const dataAdditional_items = await additional_item_prescription.findAll(
			{ where:{
			 updatedAt:{
				[Op.between]: [sdate, edate]
			 },
			 payment_status:{
             [Op.in]:['Paid']
			 },
			 patient_id:{
				[Op.in]: sequelize.literal(`(select patient_id from patient_insurances where insurance_id = ${insurance_id} and hmo_id = ${hmo_id} )`)
			 }
			},
			include: [{model: drug}, {model: patient}],
				order:[['updatedAt','DESC']]
			}
		 )

		 const obj1 = dataAdditional_items.map((result, index)=>{
			return Object.assign({
				updatedAt: result.updatedAt,
				name: result.drug.name,
				amount: result.total_price,
				qty: result.quantity_to_dispense,
				payment_status: result.payment_status,
				drug_form: result.drug_form,
				patient_name: result.patient.firstname + ' ' + result.patient.lastname,
				hospital_id: result.patient.hospital_id
			})
		});

		const dataDrug = await prescribed_drug.findAll(
			{ where:{
			 updatedAt:{
				[Op.between]: [sdate, edate]
			 },
			 payment_status:{
				[Op.in]:['Paid']
			 },
			 patient_id:{
				[Op.in]: sequelize.literal(`(select patient_id from patient_insurances where insurance_id = ${insurance_id} and hmo_id = ${hmo_id} )`)
			 }
			},
			include: [{model: drug}, {model: patient}],
				order:[['updatedAt','DESC']]
			}
		 )

		 const obj2 = dataDrug.map((result, index)=>{
			return Object.assign({
				updatedAt: result.updatedAt,
				name: result.drug.name,
				amount: result.total_price,
				qty: result.quantity_to_dispense,
				payment_status: result.payment_status,
				drug_form: result.source,
				patient_name: result.patient.firstname + ' ' + result.patient.lastname,
				hospital_id: result.patient.hospital_id
			})
		});
		const dataInvestigation = await prescribed_investigation.findAll(
			{ where:{
			 updatedAt:{
				[Op.between]: [sdate, edate]
			 },
			 payment_status:{
				[Op.in]:['Paid']
			 },
			 patient_id:{
				[Op.in]: sequelize.literal(`(select patient_id from patient_insurances where insurance_id = ${insurance_id} and hmo_id = ${hmo_id} )`)
			 }
			},
			include: [{model: investigation}, {model: patient}],
				order:[['updatedAt','DESC']]
			}
		 )

		 const obj3 = dataInvestigation.map((result, index)=>{
			return Object.assign({
				updatedAt: result.updatedAt,
				name: result.investigation.name,
				amount: result.price,
				qty: 1,
				payment_status: result.payment_status,
				drug_form: 'Investigation',
				patient_name: result.patient.firstname + ' ' + result.patient.lastname,
				hospital_id: result.patient.hospital_id
			})
		});

		const dataService = await prescribed_service.findAll(
			{ where:{
			 updatedAt:{
				[Op.between]: [sdate, edate]
			 },
			 payment_status:{
				[Op.in]:['Paid']
			 },
			 patient_id:{
				[Op.in]: sequelize.literal(`(select patient_id from patient_insurances where insurance_id = ${insurance_id} and hmo_id = ${hmo_id} )`)
			 }
			},
			include: [{model: service}, {model: patient}],
				order:[['updatedAt','DESC']]
			}
		 )

		 const obj4 = dataService.map((result, index)=>{
			return Object.assign({
				updatedAt: result.updatedAt,
				name: result.service.name,
				amount: result.price,
				qty: 1,
				payment_status: result.payment_status,
				drug_form: 'Service',
				patient_name: result.patient.firstname + ' ' + result.patient.lastname,
				hospital_id: result.patient.hospital_id
			})
		});
		const dataTest = await prescribed_test.findAll(
			{ where:{
			 updatedAt:{
				[Op.between]: [sdate, edate]
			 },
			 payment_status:{
				[Op.in]:['Paid']
			 },
			 patient_id:{
				[Op.in]: sequelize.literal(`(select patient_id from patient_insurances where insurance_id = ${insurance_id} and hmo_id = ${hmo_id} )`)
			 }
			},
			include: [{model: test}, {model: patient}],
				order:[['updatedAt','DESC']]
			}
		 )

		 const obj5 = dataTest.map((result, index)=>{
			return Object.assign({
				updatedAt: result.updatedAt,
				name: result.test.name,
				amount: result.price,
				qty: 1,
				payment_status: result.payment_status,
				drug_form: 'Lab Test',
				patient_name: result.patient.firstname + ' ' + result.patient.lastname,
				hospital_id: result.patient.hospital_id
			})
		});

		const obj = [...obj1, ...obj2, ...obj3, ...obj4, ...obj5]

		obj.sort(function(a,b){
			var c = new Date(a.updatedAt);
			var d = new Date(b.updatedAt);
			return c-d;
		})
				 return res.status(200).json(obj);
		}
		catch(err){
			return res.status(500).json({err: err.message})
		}
	}
const getAllHmo = async(req, res)=>{
		try{
			const sdate = moment(req.params.sdate)
			const edate = moment(req.params.edate)
			 const insurance_id = req.params.insurance_id
			 const hmo_id = req.params.hmo_id
	
/** 
Posts.findAll({
  include: [{
    model: User,
    where: {year_birth: 1984}
    required: true,
   }]
}).then(posts => {

})
*/

			 const dataAdditional_items = await additional_item_prescription.findAll(
				{ where:{
				 updatedAt:{
					[Op.between]: [sdate, edate]},
					payment_status:{ [Op.in]:['Paid']},
				 	patient_id:{
					[Op.in]: sequelize.literal(`(select patient_id from patient_insurances where insurance_id = ${insurance_id} and hmo_id = ${hmo_id} )`)
				 }
				},
				include: [{model: drug}, {model: patient}],
					order:[['updatedAt','DESC']]
				}
			 )
	
			 const obj1 = dataAdditional_items.map((result, index)=>{
				return Object.assign({
					updatedAt: result.updatedAt,
					name: result.drug.name,
					amount: result.total_price,
					qty: result.quantity_to_dispense,
					payment_status: result.payment_status,
					drug_form: result.drug_form,
					patient_name: result.patient.firstname + ' ' + result.patient.lastname,
					hospital_id: result.patient.hospital_id
				})
			});
	
			const dataDrug = await prescribed_drug.findAll(
				{ where:{
				 updatedAt:{
					[Op.between]: [sdate, edate]
				 },
				 payment_status:{
					[Op.in]:['Paid']
				 },
				 patient_id:{
					[Op.in]: sequelize.literal(`(select patient_id from patient_insurances where insurance_id = ${insurance_id} and hmo_id = ${hmo_id} )`)
				 }
				},
				include: [{model: drug}, {model: patient}],
					order:[['updatedAt','DESC']]
				}
			 )
	
			 const obj2 = dataDrug.map((result, index)=>{
				return Object.assign({
					updatedAt: result.updatedAt,
					name: result.drug.name,
					amount: result.total_price,
					qty: result.quantity_to_dispense,
					payment_status: result.payment_status,
					drug_form: result.source,
					patient_name: result.patient.firstname + ' ' + result.patient.lastname,
					hospital_id: result.patient.hospital_id
				})
			});
			const dataInvestigation = await prescribed_investigation.findAll(
				{ where:{
				 updatedAt:{
					[Op.between]: [sdate, edate]
				 },
				 payment_status:{
					[Op.in]:['Paid']
				 },
				 patient_id:{
					[Op.in]: sequelize.literal(`(select patient_id from patient_insurances where insurance_id = ${insurance_id} and hmo_id = ${hmo_id} )`)
				 }
				},
				include: [{model: investigation}, {model: patient}],
					order:[['updatedAt','DESC']]
				}
			 )
	
			 const obj3 = dataInvestigation.map((result, index)=>{
				return Object.assign({
					updatedAt: result.updatedAt,
					name: result.investigation.name,
					amount: result.price,
					qty: 1,
					payment_status: result.payment_status,
					drug_form: 'Investigation',
					patient_name: result.patient.firstname + ' ' + result.patient.lastname,
					hospital_id: result.patient.hospital_id
				})
			});
	
			const dataService = await prescribed_service.findAll(
				{ where:{
				 updatedAt:{
					[Op.between]: [sdate, edate]
				 },
				 payment_status:{
					[Op.in]:['Paid']
				 },
				 patient_id:{
					[Op.in]: sequelize.literal(`(select patient_id from patient_insurances where insurance_id = ${insurance_id} and hmo_id = ${hmo_id} )`)
				 }
				},
				include: [{model: service}, {model: patient}],
					order:[['updatedAt','DESC']]
				}
			 )
	
			 const obj4 = dataService.map((result, index)=>{
				return Object.assign({
					updatedAt: result.updatedAt,
					name: result.service.name,
					amount: result.price,
					qty: 1,
					payment_status: result.payment_status,
					drug_form: 'Service',
					patient_name: result.patient.firstname + ' ' + result.patient.lastname,
					hospital_id: result.patient.hospital_id
				})
			});
			const dataTest = await prescribed_test.findAll(
				{ where:{
				 updatedAt:{
					[Op.between]: [sdate, edate]
				 },
				 payment_status:{
					[Op.in]:['Paid']
				 },
				 patient_id:{
					[Op.in]: sequelize.literal(`(select patient_id from patient_insurances where insurance_id = ${insurance_id} and hmo_id = ${hmo_id} )`)
				 }
				},
				include: [{model: test}, {model: patient}],
					order:[['updatedAt','DESC']]
				}
			 )
	
			 const obj5 = dataTest.map((result, index)=>{
				return Object.assign({
					updatedAt: result.updatedAt,
					name: result.test.name,
					amount: result.price,
					qty: 1,
					payment_status: result.payment_status,
					drug_form: 'Lab Test',
					patient_name: result.patient.firstname + ' ' + result.patient.lastname,
					hospital_id: result.patient.hospital_id
				})
			});
	
			const obj = [...obj1, ...obj2, ...obj3, ...obj4, ...obj5]
	
			obj.sort(function(a,b){
				var c = new Date(a.updatedAt);
				var d = new Date(b.updatedAt);
				return c-d;
			})
					 return res.status(200).json(obj);
			}
			catch(err){
				return res.status(500).json({err: err.message})
			}
		}
const getSelect = async(req, res)=>{
			try{
				const sdate = moment(req.params.sdate).format('YYYY-MM-DD')
				const edate = moment(req.params.edate).format('YYYY-MM-DD')
				const hmo = req.params.hmo
				const insurance = req.params.insurance
				const data = await sequelize.query(`
SELECT a.updatedAt, a.drug_id, d.name, q.hospital_id, q.firstname, q.lastname, a.total_price as 'cost', (a.total_price / a.quantity_to_dispense) as 'total_price', (i.selling_price * a.quantity_to_dispense) as 'selling_price', 
((i.selling_price * a.quantity_to_dispense) - a.total_price) as 'price',
 i.status, a.drug_type, a.quantity_to_dispense,  p.plan, a.patient_id, a.nhis_status, p.insurance_id, p.hmo_id, p.is_default, p.enrollee_code
FROM additional_item_prescriptions as a
 inner join patient_insurances p  on (a.patient_insurance_id = p.id and a.patient_id = p.patient_id )
 inner join inventory_items i on (i.drug_id = a.drug_id and i.drug_type = a.drug_type)
 inner join patients q on q.id = a.patient_id
 inner join drugs d on d.id = a.drug_id 
 where p.is_default = 1 and a.drug_type = 'NHIS' and p.hmo_id = ${hmo} and  p.insurance_id = ${insurance} and a.updatedAt between '${sdate}' and '${edate}'
 union all
SELECT a.updatedAt, a.drug_id, d.name,  q.hospital_id, q.firstname, q.lastname, a.total_price as 'cost', (a.total_price / a.quantity_to_dispense) as 'total_price', (i.selling_price * a.quantity_to_dispense) as 'selling_price',
 ((i.selling_price * a.quantity_to_dispense) - a.total_price) as 'price',
 i.status, a.drug_type, a.quantity_to_dispense, p.plan, a.patient_id, a.nhis_status, p.insurance_id, p.hmo_id, p.is_default, p.enrollee_code
FROM prescribed_drugs as a
 inner join patient_insurances p  on (a.patient_insurance_id = p.id and a.patient_id = p.patient_id )
 inner join inventory_items i on (i.drug_id = a.drug_id and i.drug_type = a.drug_type)
inner join patients q on q.id = a.patient_id
inner join drugs d on d.id = a.drug_id 
where p.is_default = 1 and a.drug_type = 'NHIS' and  a.drug_group = 'secondary' and p.hmo_id = ${hmo} and  p.insurance_id = ${insurance} and a.updatedAt between '${sdate}' and '${edate}'
order by updatedAt asc
 `, {
					replacements: { hmo: hmo, insurance: insurance, edate: edate, sdate: sdate  },
					type: QueryTypes.SELECT,
				  });
				  
		data.sort(function(a,b){
			var c = new Date(a.createdAt);
			var d = new Date(b.createdAt);
			return c-d;
		})
			  return res.status(200).json(data);
			}
			catch(err){
				return res.status(500).json({err: err.message});
			}
		}
const getSelectInvestigation = async(req, res)=>{
			try{
				const sdate = moment(req.params.sdate).format('YYYY-MM-DD')
				const edate = moment(req.params.edate).format('YYYY-MM-DD')
				const hmo = req.params.hmo
				const insurance = req.params.insurance
				const data = await sequelize.query(`SELECT a.updatedAt, a.investigation_id,a.investigation_type, a.price, b.nhis_price,  b.nhis_price - a.price,
 b.price, b.price - a.price, 
t.firstname, t.hospital_id, t.lastname, a.patient_id, b.name, b.type
FROM prescribed_investigations a
inner join investigations b on a.investigation_id = b.id
inner join patients t on a.patient_id = t.id
inner join patient_insurances p  on (a.patient_insurance_id = p.id and a.patient_id = p.patient_id)
where p.is_default = 1 and a.investigation_type = 'NHIS' and p.insurance_id = ${insurance} and p.hmo_id = ${hmo} and a.updatedAt between '${sdate}' and '${edate}'

 `, {
					replacements: { hmo: hmo, insurance: insurance, edate: edate, sdate: sdate  },
					type: QueryTypes.SELECT,
				  });
				  
		data.sort(function(a,b){
			var c = new Date(a.createdAt);
			var d = new Date(b.createdAt);
			return c-d;
		})
			  return res.status(200).json(data);
			}
			catch(err){
				return res.status(500).json({err: err.message});
			}
		}
const getSelectServes = async(req, res)=>{
			try{
				const sdate = moment(req.params.sdate).format('YYYY-MM-DD')
				const edate = moment(req.params.edate).format('YYYY-MM-DD')
				const hmo = req.params.hmo
				const insurance = req.params.insurance
				const data = await sequelize.query(`SELECT s.service_id, s.service_type, s.price, s.patient_id, s.quantity, t.hospital_id, t.firstname, t.lastname, sss.name, sss.price * s.quantity
 FROM prescribed_services s
 inner join services sss on sss.id = s.service_id
inner join patient_insurances ss on (ss.patient_id = s.patient_id and s.patient_insurance_id = ss.id)
inner join patients t on s.patient_id = t.id
where ss.is_default = 1 and s.service_type = 'NHIS' and ss.insurance_id = ${insurance} and ss.hmo_id = ${hmo} and s.updatedAt between '${sdate}' and '${edate}'

 `, {
					replacements: { hmo: hmo, insurance: insurance, edate: edate, sdate: sdate  },
					type: QueryTypes.SELECT,
				  });
				  
		data.sort(function(a,b){
			var c = new Date(a.createdAt);
			var d = new Date(b.createdAt);
			return c-d;
		})
			  return res.status(200).json(data);
			}
			catch(err){
				return res.status(500).json({err: err.message});
			}
		}
const getSelectTest = async(req, res)=>{
			try{
				const sdate = moment(req.params.sdate).format('YYYY-MM-DD')
				const edate = moment(req.params.edate).format('YYYY-MM-DD')
				const hmo = req.params.hmo
				const insurance = req.params.insurance
				const data = await sequelize.query(` SELECT t.test_id, t.test_type, t.price, t.patient_id, tt.nhis_price , tt.name, 
tt.price as 'normalPrce', ss.firstname, ss.hospital_id, ss.lastname
 FROM prescribed_tests t
inner join tests tt on tt.id = test_id
inner join patients ss on t.patient_id = ss.id
inner join patient_insurances p on (p.id = t.patient_insurance_id and p.patient_id = t.patient_id)
where tt.type = 'secondary' and t.test_type = 'NHIS'and p.insurance_id = ${insurance} and p.hmo_id = ${hmo} and t.updatedAt between '${sdate}' and '${edate}'

 `, {
					replacements: { hmo: hmo, insurance: insurance, edate: edate, sdate: sdate  },
					type: QueryTypes.SELECT,
				  });
				  
		data.sort(function(a,b){
			var c = new Date(a.createdAt);
			var d = new Date(b.createdAt);
			return c-d;
		})
			  return res.status(200).json(data);
			}
			catch(err){
				return res.status(500).json({err: err.message});
			}
		}
const getAllWithBatchnoAndUid = async(req, res)=>{
	const batch_no = req.params.batch_no
	const uid = req.params.uid
	try{
     const data = await payment.findAll(
		{  where:{
			batch_no:{ [Op.like]: `%${batch_no}%`},
			uid:uid,
			id:{
				[Op.notIn]: sequelize.literal(`(select pid from refund where tablename = 'Outpatients' and refid = ${uid} )`)
			 }
		}
			
		
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}
const getAll2Confirms = async(req, res)=>{
	const sdate = moment(req.params.sdate)
	const edate = moment(req.params.edate)
	const options = req.params.options
	let data = []
	try{
		switch(options){
			case 'all':
		const alldata = await payment.findAll(
		{  where:{

			updatedAt:{ 
				[Op.between]: [sdate, edate]
				},
			confirm:0

		}
		
	}
	 )
	 data = alldata.map((item)=>{
		return Object.assign({
			id: item.dataValues.id,
			updatedAt: item.dataValues.updatedAt,
			amount: item.dataValues.amount,
			narration: item.dataValues.narration,
			name: item.dataValues.name,
			originalname: 'Undefined'

		})
	 })
	 
	 break;
	 case 'drugs':
	    const ddatas = await payment.findAll(
			{  where:{
	            service_name:{
					[Op.like]: '%Drug%'
				},
				updatedAt:{ 
					[Op.between]: [sdate, edate]
					},
				confirm:0
	
			},
			include: [drug]
			
		}
		 )
		 data = ddatas.map((item)=>{
			return Object.assign({
				id: item.dataValues.id,
				updatedAt: item.dataValues.updatedAt,
				amount: item.dataValues.amount,
				narration: item.dataValues.narration,
				name: 'Drugs',
				originalname: item.dataValues.drug?.name

			})
		 })
		
	 break;
	 case 'imagings':
		const idatas = await payment.findAll(
			{  where:{
	            service_name:{
					[Op.like]: '%Investigation%'
				},
				updatedAt:{ 
					[Op.between]: [sdate, edate]
					},
				confirm:0
	
			},
			include: [investigation]
			
		}
		 )
		 data = idatas.map((item)=>{
			return Object.assign({
				id: item.dataValues.id,
				updatedAt: item.dataValues.updatedAt,
				amount: item.dataValues.amount,
				narration: item.dataValues.narration,
				name: 'Imaging/Investigation',
				originalname: item.dataValues.investigation?.name

			})
		 })
		
	 break
	 case 'services':
		const sdatas = await payment.findAll(
			{  where:{
	            service_name:{
					[Op.like]: '%Service%'
				},
				updatedAt:{ 
					[Op.between]: [sdate, edate]
					},
				confirm:0
	
			},
			include: [service]
			
		}
		 )
		 data = sdatas.map((item)=>{
			return Object.assign({
				id: item.dataValues.id,
				updatedAt: item.dataValues.updatedAt,
				amount: item.dataValues.amount,
				narration: item.dataValues.narration,
				name: 'Services',
				originalname: item.dataValues.service?.name

			})
		 })
	
	 break
	 case 'tests':
		const tdatas = await payment.findAll(
			{  where:{
	            service_name:{
					[Op.like]: '%Test%'
				},
				updatedAt:{ 
					[Op.between]: [sdate, edate]
					},
				confirm:0
	
			},
			include: [test]
			
		}
		 )
		 data = tdatas.map((item)=>{
			return Object.assign({
				id: item.dataValues.id,
				updatedAt: item.dataValues.updatedAt,
				amount: item.dataValues.amount,
				narration: item.dataValues.narration,
				name: 'Laboratory test',
				originalname: item.dataValues.test?.name

			})
		 })
	 break
	 case 'others':
		const odatas = await payment.findAll(
			{  where:{
	            service_name:{
					[Op.like]: '%Mis%'
				},
				updatedAt:{ 
					[Op.between]: [sdate, edate]
					},
				confirm:0
	
			},
			include: [chart_of_account]
			
		}
		 )
		 data = odatas.map((item)=>{
			return Object.assign({
				id: item.dataValues.id,
				updatedAt: item.dataValues.updatedAt,
				amount: item.dataValues.amount,
				narration: item.dataValues.narration,
				name: 'Miscellanous',
				originalname: item.dataValues.chart_of_account?.name

			})
		 })
		
	 break
	 case 'ewallet':
		const datas = await ewallet.findAll(
			{  where:{
				updatedAt:{ 
					[Op.between]: [sdate, edate]
					},
					posted:{
						[Op.is]: null
					}
	
			}
			
		}
		 )
		 data = datas.map((item)=>{
			return Object.assign({
				id: item.dataValues.id,
				updatedAt: item.dataValues.updatedAt,
				amount: item.dataValues.amt,
				narration: item.dataValues.narration,
				name: 'DEPOSIT',
				originalname: item.dataValues.narration // 'Cash deposit account'

			})
		 })
	 break
		}
		return res.status(200).json(data)

	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}
const getAll2Confirm = async(req, res)=>{
	const sdate = moment(req.params.sdate)
	const edate = moment(req.params.edate)

	try{
     const data = await payment.findAll(
		{  where:{
			updatedAt:{ 
				[Op.between]: [sdate, edate]
				},
			confirm:0

		}
		
	}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}
const getAllConfirmed = async(req, res)=>{
		const sdate = moment(req.params.sdate)
	const edate = moment(req.params.edate)

	try{
     const data = await payment.findAll(
		{  where:{
			updatedAt:{ 
				[Op.between]: [sdate, edate]
				},
			confirm:1

		}
	}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}
const getSummaryByDatePreviousByOne = async(req, res)=>{
	try{
		const sdate = moment(req.params.sdate)
		const edate = moment(req.params.edate)
		const id = req.params.id
		const dataPayment = await payment.findAll({         
			attributes: [ [sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 'createdAt','service_name', 'updatedAt', 'batch_no', 'narration', 'editedby'],
				 //order: [['createdAt','ASC']],
				  where:{
				  createdAt: {
					[Op.between]:[sdate, edate]
				  }
				  ,
				  editedby : id
				},
				include:[users],
				group:['batch_no']
		  
		
		});
		const obj1 = dataPayment.map((result, index)=>{
			return Object.assign({
				updatedAt: result.updatedAt,
				amount: result.amount,
				narration: result.narration,
				batch_no: result.batch_no,
				createdAt: result.createdAt,
				tablename:'payment',
				user: result.user.username,
				service_name: result.service_name
	
			})
		});
		const dataRefund = await refund.findAll({         
			attributes: [ [sequelize.fn('SUM', sequelize.col('amount')), 'amount'], 'createdAt','tablename', 'updatedAt', 'batchno', 'narration', 'uid'],
			//order: [['createdAt','ASC']],
			 where:{
			 createdAt: {
			   [Op.between]:[sdate, edate]
			 },
			 uid: id
		   },
		   include:[users],
		   group:['batchno']
		});
		const obj2 = dataRefund.map((result, index)=>{
		return Object.assign({
			updatedAt: result.updatedAt,
			amount: (-1 * result.amount),
			narration: result.narration,
			batch_no: result.batchno,
			createdAt: result.createdAt,
			tablename:'refund',
			user: result.user.username,
			service_name: result.tablename

		
		})
		});
		const dataEwallet = await ewallet.findAll({         
			attributes: [ 'id', [sequelize.fn('SUM', sequelize.col('amt')), 'amt'], 'createdAt','tablename', 'updatedAt',  'narration', 'uid'],
			//order: [['createdAt','ASC']],
			 where:{
			 createdAt: {
			   [Op.between]:[sdate, edate]
			 },
			 uid: id
		   },
		   include:[users],
		   group:['id','createdAt','tablename', 'updatedAt',  'narration', 'uid']
	 
		
		
		});
		const obj3 = dataEwallet.map((result, index)=>{
		return Object.assign({
			updatedAt: result.updatedAt,
			amount: result.amt,
			narration: result.narration,
			batch_no: '0000'+result.id,
			createdAt: result.createdAt,
			tablename:'ewallets',
			user: result.user.username,
			service_name: result.tablename
		})
		}); 
		
		const obj = [...obj1, ...obj2, ...obj3]
		
		obj.sort(function(a,b){
			var c = new Date(a.createdAt);
			var d = new Date(b.createdAt);
			return c-d;
		})
				 return res.status(200).json(obj);
		
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getPrivate = async(req, res)=>{
	try{
		
		const sdate = moment(req.params.sdate).format('YYYY-MM-DD')
		const edate = moment(req.params.edate).format('YYYY-MM-DD')
		const hmo = req.params.hmo
		const insurance = req.params.insurance
		const data = await sequelize.query(`
SELECT a.updatedAt, a.drug_id, d.name, q.hospital_id, q.firstname, q.lastname, a.total_price as 'cost',
 (a.total_price / a.quantity_to_dispense) as 'total_price', (i.selling_price * a.quantity_to_dispense) as 'selling_price', 
((i.selling_price * a.quantity_to_dispense) - a.total_price) as 'price',
i.status, a.drug_type, a.quantity_to_dispense,  p.plan, a.patient_id, a.nhis_status, 
p.insurance_id, p.hmo_id, p.is_default, p.enrollee_code
FROM additional_item_prescriptions as a
inner join patient_insurances p  on (a.patient_insurance_id = p.id and a.patient_id = p.patient_id )
inner join inventory_items i on (i.drug_id = a.drug_id and i.drug_type = a.drug_type)
inner join patients q on q.id = a.patient_id
inner join drugs d on d.id = a.drug_id 
where p.is_default = 1 and a.drug_type = 'private' and p.hmo_id = ${hmo} and  p.insurance_id = ${insurance} and a.updatedAt between '${sdate}' and '${edate}'
union all
SELECT a.updatedAt, a.drug_id, d.name,  q.hospital_id, q.firstname, q.lastname, a.total_price as 'cost', 
(a.total_price / a.quantity_to_dispense) as 'total_price', (i.selling_price * a.quantity_to_dispense) as 'selling_price',
((i.selling_price * a.quantity_to_dispense) - a.total_price) as 'price',
i.status, a.drug_type, a.quantity_to_dispense, p.plan, a.patient_id, a.nhis_status, p.insurance_id, 
p.hmo_id, p.is_default, p.enrollee_code
FROM prescribed_drugs as a
inner join patient_insurances p  on (a.patient_insurance_id = p.id and a.patient_id = p.patient_id )
inner join inventory_items i on (i.drug_id = a.drug_id and i.drug_type = a.drug_type)
inner join patients q on q.id = a.patient_id
inner join drugs d on d.id = a.drug_id 
where p.is_default = 1 and a.drug_type = 'private' and p.hmo_id = ${hmo} and  p.insurance_id = ${insurance} and a.updatedAt between '${sdate}' and '${edate}'
order by updatedAt asc
`, {
			replacements: { hmo: hmo, insurance: insurance, edate: edate, sdate: sdate  },
			type: QueryTypes.SELECT,
		  });
		  
data.sort(function(a,b){
	var c = new Date(a.createdAt);
	var d = new Date(b.createdAt);
	return c-d;
})
	  return res.status(200).json(data);
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}
const getPrivateInvestigation = async(req, res)=>{
	try{
		const sdate = moment(req.params.sdate).format('YYYY-MM-DD')
		const edate = moment(req.params.edate).format('YYYY-MM-DD')
		const hmo = req.params.hmo
		const insurance = req.params.insurance
		const data = await sequelize.query(`
			 SELECT a.updatedAt, a.investigation_id,a.investigation_type, a.price, phis_price
                         , b.phis_price - a.price,
        b.price,     b.price - a.price,
t.firstname, t.hospital_id, t.lastname, a.patient_id, b.name, b.type
FROM prescribed_investigations a
inner join investigations b on a.investigation_id = b.id
inner join patients t on a.patient_id = t.id
inner join patient_insurances p  on (a.patient_insurance_id = p.id and a.patient_id = p.patient_id)
where p.is_default = 1 and a.investigation_type = 'private' and p.insurance_id = ${insurance} and p.hmo_id = ${hmo} and a.updatedAt between '${sdate}' and '${edate}'

`, {
			replacements: { hmo: hmo, insurance: insurance, edate: edate, sdate: sdate  },
			type: QueryTypes.SELECT,
		  });
		  
data.sort(function(a,b){
	var c = new Date(a.createdAt);
	var d = new Date(b.createdAt);
	return c-d;
})
	  return res.status(200).json(data);
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}
const getPrivateServes = async(req, res)=>{
	try{
		const sdate = moment(req.params.sdate).format('YYYY-MM-DD')
		const edate = moment(req.params.edate).format('YYYY-MM-DD')
		const hmo = req.params.hmo
		const insurance = req.params.insurance
		const data = await sequelize.query(`
			SELECT s.service_id, s.service_type, s.price, s.patient_id, s.quantity, 
			t.hospital_id, t.firstname, t.lastname, sss.name, sss.price * s.quantity
FROM prescribed_services s
inner join services sss on sss.id = s.service_id
inner join patient_insurances ss on (ss.patient_id = s.patient_id and s.patient_insurance_id = ss.id)
inner join patients t on s.patient_id = t.id
where ss.is_default = 1 and s.service_type = 'private' and ss.insurance_id = ${insurance} and ss.hmo_id = ${hmo} and s.updatedAt between '${sdate}' and '${edate}'

`, {
			replacements: { hmo: hmo, insurance: insurance, edate: edate, sdate: sdate  },
			type: QueryTypes.SELECT,
		  });
		  
data.sort(function(a,b){
	var c = new Date(a.createdAt);
	var d = new Date(b.createdAt);
	return c-d;
})
	  return res.status(200).json(data);
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}
const getPrivateTest = async(req, res)=>{
	try{
		const sdate = moment(req.params.sdate).format('YYYY-MM-DD')
		const edate = moment(req.params.edate).format('YYYY-MM-DD')
		const hmo = req.params.hmo
		const insurance = req.params.insurance
		const data = await sequelize.query(`
			SELECT t.test_id, t.test_type, t.price, t.patient_id, tt.phis_price , tt.name, 
tt.price as 'normalPrce', ss.firstname, ss.hospital_id, ss.lastname
FROM prescribed_tests t
inner join tests tt on tt.id = test_id
inner join patients ss on t.patient_id = ss.id
inner join patient_insurances p on (p.id = t.patient_insurance_id and p.patient_id = t.patient_id)
where p.insurance_id = ${insurance} and p.hmo_id = ${hmo} and t.updatedAt between '${sdate}' and '${edate}'

`, {
			replacements: { hmo: hmo, insurance: insurance, edate: edate, sdate: sdate  },
			type: QueryTypes.SELECT,
		  });
		  
data.sort(function(a,b){
	var c = new Date(a.createdAt);
	var d = new Date(b.createdAt);
	return c-d;
})
	  return res.status(200).json(data);
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}
module.exports = { 
	getAll,
	getAllPagings,
	add,
	addDependant,
    update,
	getOne,
    deletes,
	confirmed,
	getAllWithBatchnoGroup,
	getAllWithBatchno,
	getAllReceipt,
	getAllReceiptDetails,
	getAllRefund,
	getAllSummary,
	getAllSummaryoutpatient,
	getAllSummaryBF,
	getAllSummaryBFOutpatient,
	addoutpatient,
	getAllWithBatchnoGroupOUT,
	getAllReceiptDetailsout,
	getAllReceiptoutpatient,
	getAllReceiptoutpatientDetails,
	getSummaryByUser,
	getSummaryByDate,
	getSummaryByMode,
	getAllSummaryBillings,
	getAllSummaryUnBillings,
	getAllSummaryPermittedByUser,
	getAllSummaryPermittedByUserDetails,
	getSummaryByDatePrevious,
	getAllHmoTransaction,
	addoutpatientMiscellaneous,
	getAllWithBatchnoAndUid,
	getSummaryChart,
	getAllConfirmed,
	getAll2Confirm,
	getAll2Confirms,
	getSummaryByDatePreviousByOne,
	getAllSummaryBroughtout,
	getSelect,
	getSelectInvestigation,
	getSelectServes,
	getSelectTest,
	getPrivate,
	getPrivateInvestigation,
	getPrivateServes,
	getPrivateTest,
	getAllSummaryWithDetail,
	getAllSummaryAwait,
	getAllSummaryAwaitUp

}
