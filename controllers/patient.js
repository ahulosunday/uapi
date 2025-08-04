const { patient,country,states, prescribed_service, lga, hmo, insurance, users, patient_insurance, visits, sequelize } = require('../models');
const {getPagination, getPagingData} = require('../helpers/paging')
const {Op,} = require('sequelize')

const getAll = async(req, res)=>{
	try{
     const data = await patient.findAll(
		{ 
			include: [country,states, lga],
			order:[['hospital_id','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getAllDependant = async(req, res)=>{
	const principal_id = req.params.principal_id
	try{
     const data = await patient.findAll(
		{  where:{ 
			patient_type: 'dependant',
			principal_id: principal_id
		},
			//include: [hmo],
			order:[['hospital_id','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getAllWithName = async(req, res)=>{
	const fulname = req.params.fullname
	try{
     const data = await patient.findAll(
		{  where:{
			[Op.or]:{
			firstname:{ [Op.like]: `%${fulname}%`},
			id:{ [Op.like]: `%${fulname}%`},
			phone:{ [Op.like]: `%${fulname}%`},
		    hospital_id:{ [Op.like]: `%${fulname}%`},
			lastname:{ [Op.like]: `%${fulname}%`},

		},
		patient_type:{[Op.eq]: 'Patient'},
		has_insurance:{[Op.eq]: 0}
		},
		offset: 0,
		 limit: 30,
			//include: [hmo],
			order:[['hospital_id','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}
const getPrincipal = async(req, res)=>{
	try{
		const data = await patient.findAll(
			{
				attributes: ['id', 'lastname', 'firstname', 'middlename', 'hospital_id'], 
				 where:{
			patient_type:{[Op.eq]: 'Patient'},
			has_insurance:{[Op.eq]: 1}
			},
			//offset: 0,
		// limit: 2000,
			
				order:[['hospital_id','ASC']]
			}
		 )
	
		 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}
const filterPrincipal = async(req, res)=>{
	try{
		const fulname = req.params.name
		const data = await patient.findAll(
			{
				attributes: ['id', 'lastname', 'firstname', 'middlename', 'hospital_id', 'phone'], 
				 where:{
						[Op.or]:{
			firstname:{ [Op.like]: `%${fulname}%`},
			id:{ [Op.like]: `%${fulname}%`},
			phone:{ [Op.like]: `%${fulname}%`},
		    hospital_id:{ [Op.like]: `%${fulname}%`},
			lastname:{ [Op.like]: `%${fulname}%`},

		},
			
			patient_type:{[Op.eq]: 'Patient'},
			has_insurance:{[Op.eq]: 1}
			},
			//offset: 0,
		// limit: 2000,
			
				order:[['hospital_id','ASC']]
			}
		 )
	
		 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}
const getAllWithNameHmo = async(req, res)=>{
	const fulname = req.params.fullname
	try{
     const data = await patient.findAll(
		{  where:{
			[Op.or]:{
			firstname:{ [Op.like]: `%${fulname}%`},
			id:{ [Op.like]: `%${fulname}%`},
			phone:{ [Op.like]: `%${fulname}%`},
			lastname:{ [Op.like]: `%${fulname}%`},
		    hospital_id:{ [Op.like]: `%${fulname}%`} 
		},
		patient_type:{[Op.eq]: 'Patient'},
		has_insurance:{[Op.eq]: 1}
		},
			order:[['hospital_id','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}
const getAllWithNameDependant = async(req, res)=>{
	const fulname = req.params.fullname
	try{
     const data = await patient.findAll(
		{  where:{
			[Op.or]:{
				firstname:{ [Op.like]: `%${fulname}%`},
				id:{ [Op.like]: `%${fulname}%`},
			     phone:{ [Op.like]: `%${fulname}%`},
				lastname:{ [Op.like]: `%${fulname}%`},
				hospital_id:{ [Op.like]: `%${fulname}%`}
		},
		patient_type:{[Op.eq]: 'Dependant'},
		has_insurance:{[Op.eq]: 1}
		},
		offset: 0,
		 limit: 30,
			order:[['hospital_id','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}
const getAllPagings = async(req, res)=>{
	
    try{
        const  page =  req.params.page;
        const per_page = req.params.per_page
		const fulname = req.params.fullname
         const { limit, offset } = getPagination(page, per_page)
        const data = await patient.findAndCountAll({
			where:{
				[Op.or]:{
					firstname:{ [Op.like]: `%${fulname}%`},
					id:{ [Op.like]: `%${fulname}%`},
			phone:{ [Op.like]: `%${fulname}%`},
					hospital_id:{ [Op.like]: `%${fulname}%`},
					lastname:{ [Op.like]: `%${fulname}%`}
				},
			},
			order:[['hospital_id','ASC']],
            limit:limit, offset:offset
            })
           const response = getPagingData(data, page, limit);
        return res.status(200).json(response)
    }
    catch(err){
        return res.status(200).json({err: err.message})
    }
}
const getOne = async(req, res)=>{
	try{
		
		const Id = req.params.patient_id
     const data = await patient.findOne(
		{ 
			include:[country,states, lga],
			where:{ id: Id},
		
		order:[['hospital_id','ASC']]
		}
	 )
	 
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getEncludeHmo = async(req, res)=>{
	try{
		const Id = req.params.patient_id
     const data = await patient.findOne(
		{ where:{ id: Id,
			has_insurance: 0
		},
		
			order:[['hospital_id','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getIncludeHmo = async(req, res)=>{
	try{
		const Id = req.params.patient_id
     const data = await patient.findOne(
		{ where:{ id: Id,
			 has_insurance:1,
			 principal_id: null
			},
		
			order:[['hospital_id','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getAllInsurance = async(req, res)=>{
	try{
		
	const fulname = req.params.fulname
     const data = await patient.findAll(
		{ where:{ 
			[Op.or]:{
				firstname:{ [Op.like]: `%${fulname}%`},
				id:{ [Op.like]: `%${fulname}%`},
				phone:{ [Op.like]: `%${fulname}%`},
				lastname:{ [Op.like]: `%${fulname}%`},
				hospital_id:{ [Op.like]: `%${fulname}%`} 
			},
			 has_insurance:1,
			},
		  include:[country,states, lga],
			order:[['hospital_id','ASC']]
		}
	 )
	 console.log(data)
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const getDependantHmo = async(req, res)=>{
	try{
		const Id = req.params.patient_id
     const data = await patient.findOne(
		{ where:{ id: Id,
			 has_insurance:1,
			 principal_id:{ [Op.not]: null}
			},
		
			order:[['hospital_id','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
const addPatient = async(req, res)=>{
	const t = await sequelize.transaction();
	try{
		var unique = new Date().valueOf()
		var id = (String(unique).substring(4, 13))
	const data = await patient.create({
	id: id,
	 title: req.body.title,
	  firstname: req.body.surname, 
	  lastname: req.body.lastname,
	   middlename: req.body.middlename,
	    gender: req.body.gender,
		 phone:req.body.phone,
		  date_of_birth:req.body.dob,
		   email: req.body.email, 
		   religion: req.body.religion, 
		   alt_phone: req.body.alt_phone,
		    marital_status: req.body.marital_status, 
			country_id: req.body.country, 
			state_id: req.body.state,
			 lga_id: req.body.lga,
	photo: req.body.photo,
	address: req.body.address,
    hospital_id: req.body.hospital_id,
    next_of_kin_name: req.body.next_of_kin_name,
    next_of_kin_address: req.body.next_of_kin_address,
    next_of_kin_phone: req.body.next_of_kin_phone,
    next_of_kin_relationship: req.body.next_of_kin_relationship,
    occupation: req.body.occupation,
    relationship_to_principal: req.body.relationship_to_principal,
    photo_url: req.body.stateoforigin,
    staff_id: req.body.staff_id,
    has_insurance: req.body.has_insurance,
    principal_id: req.body.principal_id,
    patient_type: req.body.patient_type,
    patient_status: req.body.patient_status,
    complete_name: req.body.surname + ' ' + req.body.lastname + ' ' + req.body.middlename ,
	region: req.body.region,
	 bloodtype: req.body.bloodtype,
    rhfactor: req.body.rhfactor,
    weight: req.body.weight,
    height: req.body.height,
    admitted_days_in_year:null

},{transaction: t});
	if(req.body.has_insurance === 1){
	await patient_insurance.create({
		insurance_id: req.body.insurance_id,
		gifshipId: req.body.gifshipId,
		gifshipTypeId: req.body.gifshipTypeId,
		gifshipPackageId: req.body.gifshipPackageId,
		hmo_id: req.body.hmo_id,
		is_default: 1,
		plan: req.body.plan,
		staff_id: req.body.staff_id,
		patient_id: id,
		organization: req.body.organisation,
		enrollee_code: req.body.enrollee_id
       }
	 ,
      {transaction: t})
	  
	}

	 if(req.body.has_insurance ===0){
     const data = await prescribed_service.create({
		service_id: req.body.service_id,
		is_urgent: 0,
        service_type:'Cash',
	     payment_status: 'Pending',
   	requester: req.body.staff_id,
	price: req.body.amount,
	visit_id: null,
	patient_id: id,
    date_requested: new Date(),
    billing_status: 'Unbilled',
	quantity: 1,
    surgery_id: null,
    nhis_status: null,
    source: req.body.service_name,
    ante_natal_id: null,
    auth_code: null,
    permittedby: null,
    permitted_date: null,
	patient_insurance_id: (req.body.has_insurance === 1)? id: null,
	service_group: req.body.ServiceGroup,
	service_changed_by: null,
	nhis_service_processed_by: null,
	date_nhis_service_processed: null
	  },{
		transaction:t
	  })
	}
	await t.commit(); 
	await patient.update({
	hospital_id: req.body.short_name +'/'+ id
	  },
	  {
		where:{
			id: id
		}
	  })
	const one = await patient.findOne({
		where:{
			id: id
		}
	})
	
	return res.status(200).json(one)
	}
	catch(err){
		await t.rollback();
		return res.status(500).json({err: err.message})
	}
}
const deceased = async(req, res)=>{
	try{
    const data = await patient.update({
		patient_status: 'Deceased',
	},{
		where:{
			id: req.body.id
		}
	})
	await visits.update({
        date_visit_ended : moment(new Date()).format('YYYY-MM-DD'),
        status: 'Ended'
    },
        {
      where:{
            id: req.body.id
        }
    })
	return res.status(200).json(data)
	}catch(err){
		return res.status(500).json({err: err.message})
	}
}
const updates = async(req, res)=>{
	try{
	const data=	await  patient.update(req.body,
		{
			where: {
			  id: req.body.id,
			},
		  }
		)
		return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
/*
const addInsurancePerson = async(req, res)=>{
	try{
		
		const results = await sequelize.transaction(async (t) => {
		const resuit = await patient.update({
             has_insurance: req.body.has_insurance,
			 relationship_to_principal: req.body.relationship_to_principal,
			 patient_type: req.body.patient_type,
			 principal_id: req.body.principal_id
			},
			{
			where:{
			id: req.body.id
			}
			}
			,{transaction: t}
		)
		
		
		const result2 = await patient_insurance.create({
			insurance_id: req.body.insurance_id,
			hmo_id: req.body.hmo_id,
			is_default: 1,
			plan: req.body.plan,
			staff_id: req.body.staff_id,
			patient_id: req.body.patient_id,
			organization: req.body.organisation,
			enrollee_code: req.body.enrollee_id

		}
         ,
	{transaction: t}).then(res=>{
		
	}).catch(err=>{
		
	})
		
		return res.status(200).json(result2)
	})
	}
	catch(err){
		return res.status(500).json({err: err.message})
	}
}
*/
const loadall = async(req, res)=>{
	try{
		const patient_type = req.params.patient_type
		const fulname = req.params.fulname
		var s = {}
		if(patient_type === ''){

		}
		else{
			switch(patient_type){
				case 'patient':
             s = await patient.findAll({
				attributes: ['id', 'lastname', 'firstname', 'middlename', 'hospital_id'], 
				where:{
					
					has_insurance:0,
					patient_type: 'patient'
				}
			  })
        
			break
				case 'dependant':
					s = await patient.findAll({
						attributes: ['id', 'lastname', 'firstname', 'middlename', 'hospital_id'], 
						where:{
						
							has_insurance:1,
							patient_type: 'dependant'
						}
					  })

				break
				case 'principal':
					s = await patient.findAll({
						attributes: ['id', 'lastname', 'firstname', 'middlename', 'hospital_id'], 
						where:{
							
							has_insurance:1,
							patient_type: 'patient'
						}
					  })
				break
			}
			return res.status(200).json(s)
		}
	 	
	}
	catch(err){

return res.status(500).json({err: err.message})
	}
}
const getAllPatients = async(req, res)=>{
	const fulname = req.params.fulname
	try{
     const data = await patient.findAll(
		{  where:{
			[Op.or]:{
			firstname:{ [Op.like]: `%${fulname}%`},
			id:{ [Op.like]: `%${fulname}%`},
			phone:{ [Op.like]: `%${fulname}%`},
		    hospital_id:{ [Op.like]: `%${fulname}%`},
			lastname:{ [Op.like]: `%${fulname}%`},
					}
				},
	
			order:[['hospital_id','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}
const getsorts = async(req, res)=>{
	const patient_id = req.params.patient_id
	try{
     const data = await patient.findAll(
		{  where:{
			   id: patient_id
				},
	
			order:[['hospital_id','ASC']]
		}
	 )
	 return res.status(200).json(data)
	}
	catch(err){
		return res.status(500).json({err: err.message});
	}
}

module.exports={
	deceased,
	getAllPatients,
	getAll,
	updates,
	getOne,
	getsorts,
	getAllPagings,
	getAllWithName,
	getEncludeHmo,
	getIncludeHmo,
	getAllWithNameHmo,
	getAllWithNameDependant,
	getDependantHmo,
	addPatient,
	getPrincipal,
	//addInsurancePerson,
	loadall,
	getAllDependant,
	getAllInsurance,
	filterPrincipal
}