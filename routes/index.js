const { Router, request } = require('express');
const user = require('../controllers/user');
const login = require('../controllers/login');
const logout = require('../controllers/logout');
const posts = require('../controllers/posts');
const role = require('../controllers/role');
const router = Router();
const multer = require('multer');
const gifship = require('../controllers/gifship')
const country = require('../controllers/country')
const region = require('../controllers/regions')
const state = require('../controllers/states')
const lga = require('../controllers/lga')
const ward = require('../controllers/ward')
const hospital = require('../controllers/hospital')
const gform = require('../controllers/gforms')
const gifshipPackage = require('../controllers/gifshipPackage')
const hmo = require('../controllers/hmo')
const lookup = require('../controllers/lookups')
const user_rrr = require('../controllers/user_rrr')
const perm = require('../controllers/permission')
const role_perm = require('../controllers/role-permission')
const enrolee_rrr_code = require('../controllers/user_rrr_code');
const { hashedPasswords } = require('../helpers/hashPassword');
const account_type = require('../controllers/account_type')
const chartofaccount = require('../controllers/chart_of_account')
const bank = require('../controllers/bank');
const send = require('../helpers/email')
const mapping = require('../controllers/mapping')
const drug = require('../controllers/drug')
//const nhisdrug = require('../controllers/nhisdrug')
//const nhisservice = require('../controllers/nhisservice');
const additional_item = require('../controllers/additional_item');
//const antenatal = require('../controllers/antenatal')
const bank_transaction = require('../controllers/bank_transaction')
//const dependant = require('../controllers/dependant')
const enrollee = require('../controllers/enrollee')
const ewallet = require('../controllers/ewallet')
const insurance = require('../controllers/insurance')
const investigation = require('../controllers/investigation')
const journal = require('../controllers/journal')
//const nhisinvestigation = require('../controllers/nhisinvestigation')
//const nhistest = require('../controllers/nhistest')
const outpts = require('../controllers/outpts')
const patient = require('../controllers/patient')
const payment = require('../controllers/payment')
const prescribeddrug = require('../controllers/prescribeddrug')
const prescribedimaging = require('../controllers/prescribedimaging')
const prescribedservice = require('../controllers/prescribedservice')
const prescribedtest = require('../controllers/prescribedtest')
const refund = require('../controllers/refund')
const service = require('../controllers/service')
const staff = require('../controllers/staff')
const test = require('../controllers/test')
const alert = require('../controllers/alert')
const cash_transaction = require('../controllers/cash_transaction')
const account = require('../controllers/account')
const info = require('../controllers/info')
const cart = require('../controllers/cart')
const patiennt_insurace =  require('../controllers/patient_isurance')
const inventory_item = require('../controllers/inventory_item')
const inventory = require('../controllers/inventory')
const pvheader = require('../controllers/pvheader')
const pv_details = require('../controllers/pv-detail')
const initialdeposit = require('../controllers/initialdeposit')
const notificats = require('../controllers/notificats')
const salaryItem = require('../controllers/pyrlsalaryscale')
const pyrllevel = require('../controllers/pyrllevel')
const step = require('../controllers/steps')
const salaryitem = require('../controllers/salaryitem')
const psdetail = require('../controllers/psdetail')
const scalewide  = require('../controllers/scalewide')
const levelwide = require('../controllers/levelwide')
const stepwide = require('../controllers/stepwide')
const employeepecific = require('../controllers/employeepecific');
const visits = require('../controllers/visits')
const units = require('../controllers/units')
const test_samples = require('../controllers/test_samples')
const imaging = require('../controllers/imagings')
const dosageForm = require('../controllers/dosage_form')
const measurement = require('../controllers/measurement')
const bed = require('../controllers/bed')
const bedWard = require('../controllers/wards')
const triage = require('../controllers/triage')
const complaint = require('../controllers/complaint')
const allergies = require('../controllers/allergies')
const physical_exam = require('../controllers/physical-examination')
const antenatal_account = require('../controllers/antenatal_account')
const antenatal_triage = require('../controllers/antenatal_triage')
const antenatal_observation = require('../controllers/antenatal_obervation')
const previous_pregnancy = require('../controllers/previous_pregnancy')
const route_of_administration = require('../controllers/route-of-administration')
const vendor = require('../controllers/vendor')
const pharmacy_store_item = require('../controllers/pharmacy_store_item')
const clinical_note = require('../controllers/clinical_notes')
const diagnose = require('../controllers/diagnose')
const icd10_disease = require('../controllers/icd10_disease')
const icpc2_diseases= require('../controllers/icpc2_diseases')
const hmoplan= require('../controllers/hmoplan')
const requests = require('../controllers/request')
const return_item = require('../controllers/return_item')
const test_prescription = require('../controllers/test_prescription')
const admission = require('../controllers/admission')
const patient_treatnent = require('../controllers/patient_treatment')
const care_plan = require('../controllers/care_plan')
const surgery_request = require('../controllers/surgery_request');
const immunization = require('../controllers/immunization');
const delivery = require('../controllers/delivery');
const requireJsonContent = (request, response, next) => {
  if (request.headers['content-type'] !== 'application/json') {
    response.status(400).send('Server requires application/json')
  } else {
    next()
  }
}
//READ UNIT AND SAMPLE TEST FILE===========
router.get('/units/', units.getAll)
router.get('/sample/units/', test_samples.getAll)
//Create user and login routes=============================
router.get('/info', info.getOne)
router.post('/login', requireJsonContent, login.Login)
router.post('/signin/0', requireJsonContent, login.signin)
router.post('/logout', logout.Logout);
router.post('/users', requireJsonContent, user.createUser);
router.post('/users/bulk', requireJsonContent, user.BulkcreateUser);
router.put('/users/change-profile/', requireJsonContent, user.updateUser)
router.post('/users/bulk/:user_rrrId', requireJsonContent, user.BulkcreateUserAndCodes);
router.put('/changepassword/:id', requireJsonContent, user.changePassword);
router.put('/Resetpassword/:id/1/0', requireJsonContent, user.ResetPassword);
router.get('/users', user.findAllUser);
router.get('/findUserByUsername/:username/1/1/1/1', user.findUserByUsername);
router.get('/find/email/1/:email/1/1/1/1', user.findUserByEmail);
router.get('/users/:page/:per_page/0/1', user.getUsersPaging);
router.put('/activate/:id/', requireJsonContent, user.ActivateUser)
router.put('/deactivate/:id/1/1', requireJsonContent, user.DeactivateUser)
router.put('/change-role/:id/:roleid/1/1', requireJsonContent, user.ChangeRole)
router.put('/upload/:id/change', requireJsonContent, user.changePassport)
router.delete('/users/:id', user.deleteUserById)
router.get('/user/get/0/:id/1/0/0/0/0', user.findUserById)
router.get('/user/get/0/:uiid/1/0/0/0/0/', user.findUserByUiid)
router.post('/sendmail/user/auth/email/send', send.send)

//========================================================
router.get('/post', requireJsonContent, posts.getPosts);
router.get('/post/:id', requireJsonContent, posts.getPost);
router.post('/post', requireJsonContent, posts.addPost);
router.delete('/post/:id', requireJsonContent, posts.deletePost);
router.put('/post/:id', requireJsonContent, posts.updatePost);
//===============================
router.get('/role', role.getRoles);
router.get('/role/:page/:per_page', role.getRolesPaing);
router.get('/role/:id', role.getRole)
router.post('/role', requireJsonContent, role.addRole)
router.delete('/role/:id', role.deleteRole)
router.put('/role/:id', requireJsonContent, role.updateRole)
//========================================
router.get('/permissions', perm.getPermissions);
router.get('/permissions/:page/:per_page', perm.getPermissionsPaging);
router.get('/role-permissions/', role_perm.getRolesPermissionAll);
router.get('/:roleId/role-permissions', role_perm.getRolesPermissions);
router.delete('/:id/role-permissions/', role_perm.deleteRolePemissions);
router.delete('/:id/role-permissions/', role_perm.deleteRolePemissionRoleId);
router.delete('/:permissionId/:roleId/role-permissions/', role_perm.deleteRolePemissionRoleIdPermissionId);
router.post('/role-permissions/', requireJsonContent, role_perm.addRolesPermissions);
//===================================
router.get('/user-rrr/', user_rrr.getUser_rrrs);
router.get('/user-rrr/:page/:per_page/0', user_rrr.getUser_rrrsPaging);
router.get('/user-rrr/:id/', user_rrr.getUser_rrr)//
router.get('/user-rrr/:userId/0/', user_rrr.getUser_rrrByUserId)//
router.get('/rrr/:userId/0/0/1', user_rrr.getUser_rrrByUserIdAll)
router.post('/user-rrr/', requireJsonContent, user_rrr.addUser_rrr)
router.post('/user-rrr/code', requireJsonContent, user_rrr.addUser_rrrAndCode) //
router.post('/user-rrr/renew/', requireJsonContent, user_rrr.RenewUser_rrr)
router.delete('/user-rrr/:id/', user_rrr.deleteUser_rrr)
router.put('/user-rrr/:id/', requireJsonContent, user_rrr.updateUser_rrr)
router.put('/user-rrr/', user_rrr.bulkUpdate)
router.get('/user-rrr/rrr/:id/', user_rrr.getUser_rrrByRRR)
router.get('/:userId/user-rrr/getuserid/rrr/rrr/', user_rrr.getAllByUserId )
router.get('/:sdate/:edate/get-exp/exp/0/1', user_rrr.getUser_rrrByExpired )
router.get('/rrr/not/activate/0/1/1/', user_rrr.getUser_rrrsByNotActivated )
router.get('/rrr/:gifshipId/:gifshipTypeId/:gifshipPackageId/:userId/b/1/', user_rrr.getUser_rrrByUserIdAllBy4params )
//
//====================================
router.get('/codes/', requireJsonContent, enrolee_rrr_code.getEnrolee_rrr_codes);
router.get('/codes/:user_rrrId/code/rrr/', enrolee_rrr_code.getEnrolee_rrr_codeCount);
router.get('/codes/:ids', enrolee_rrr_code.getEnrolee_rrr_codeCountBy_In_Op);
router.get('/xyx/:id/', requireJsonContent, enrolee_rrr_code.getEnrolee_rrr_code)
router.get('/code/:userId/0/', enrolee_rrr_code.getEnrolee_rrr_codeByUserId)
router.get('/code/:code/', enrolee_rrr_code.getEnrolee_rrr_codeByCode);
router.get('/code/:userId/:code/', requireJsonContent, enrolee_rrr_code.getEnrolee_rrr_codeByUserIdCode)
router.post('/code/0', requireJsonContent, enrolee_rrr_code.addEnrolee_rrr_code)
router.post('/codes/', requireJsonContent, enrolee_rrr_code.addEnrolee_rrr_codes)
router.get('/:user_rrrId/codes/getuser_rrr/1/1/', enrolee_rrr_code.getEnrolee_rrr_codeByUser_rrrId )
router.get('/:userId/codes/getuserid/rrr/rrr/0/', enrolee_rrr_code.getEnrolee_rrr_codeByUserIdAll )
router.get('/getuserid/:uid/0/1/', enrolee_rrr_code.getActiveRegistration )

//=======================================================
router.get('/country', country.getCountrys);
router.get('/country/:page/:per_page', country.getAllCountry)
router.get('/country/:id', country.getCountry)
router.post('/country', requireJsonContent, country.addCountry)
router.delete('/country/:id', country.deleteCountry)
router.put('/country/:id', requireJsonContent, country.updateCountry)
//========================================
router.get('/hmos', hmo.getHmos);
router.get('/hmos/:page/:per_page', hmo.getHmoAll);
router.get('/hmo/:id', hmo.getHmo)
router.get('/hmo/insurance/:insurance_id/1/2', hmo.getHmosByInsurance)

router.get('/lookup/hmo/:id', hmo.lookupHmo)
router.post('/hmo', requireJsonContent, hmo.addHmo)
router.delete('/hmo/:id', hmo.deleteHmo)
router.put('/hmo/:id', requireJsonContent, hmo.updateHmo)
//=========================================
router.get('/region', region.getRegions);
router.get('/region/:page/:per_page/0', region.getRegionsPaging);
router.get('/region/:id', region.getRegion)
router.post('/region', requireJsonContent, region.addRegion)
router.delete('/region/:id', region.deleteRegion)
router.put('/region/:id', requireJsonContent, region.updateRegion)
router.get('/region/country/:countryId', region.loadRegions)
//========================================
router.get('/state', state.getStates);
router.get('/state/:page/:per_page/0', state.getStatesPaging);
router.get('/state/:id', state.getState)
router.post('/state', requireJsonContent, state.addState)
router.delete('/state/:id', state.deleteState)
router.put('/state/:id', requireJsonContent, state.updateState)
router.get('/state/region/:regionId', state.loadStateswithRegion)
//========================================
router.get('/lga', lga.getLgas);
router.get('/lga/:page/:per_page/0', lga.getLgasPaging);
router.get('/lga/:id', lga.getLga)
router.post('/lga', requireJsonContent, lga.addLga);
router.post('/lga/bulk', requireJsonContent, lga.BulkaddLga)
router.delete('/lga/:id', lga.deleteLga)
router.put('/lga/:id', requireJsonContent, lga.updateLga)
router.get('/lga/state/:stateId', lga.loadLgaswithState)
//==================================
router.get('/ward', ward.getWards);
router.get('/ward/:page/:per_page/0', ward.getWardsPaging);
router.get('/ward/:id', ward.getWard)
router.post('/ward', requireJsonContent, ward.addWard)
router.post('/ward/bulk', requireJsonContent, ward.BulkaddWard)
router.delete('/ward/:id', ward.deleteWard)
router.put('/ward/:id', requireJsonContent, ward.updateWard)
router.get('/ward/lga/:lgaId', ward.loadWardswithLga)
////===========================
router.get('/hospital', hospital.getHospitals);
router.get('/hospital/:page/:per_page/0', hospital.getHospitalsPaging);
router.get('/hospital/:id', hospital.getHospital)
router.get('/hospital/:id/hospital', hospital.getHospitalWithInclude)
router.post('/hospital', requireJsonContent, hospital.addHospital)
router.delete('/hospital/:id', hospital.deleteHospital)
router.get('/hospital/:countryId/:regionId/:stateId/:lgaId/lga', hospital.getHospitalWithLga)
router.put('/hospital/:id', requireJsonContent, hospital.updateHospital)
//===============================
router.get('/forms/register', gform.getGforms);
router.get('/forms/register/:page/:per_page', gform.getGformsPaging);
router.get('/register/:id', gform.getGform)
router.post('/register/add/', requireJsonContent, gform.addGform)
router.delete('/register/:id', gform.deleteGform)
router.put('/register/:id', requireJsonContent, gform.updateGform)
router.get('/register/:userId/userId', gform.getGformuserId)
router.get('/register/:userId/userId/auth/f', gform.getGformuserId)
//=====================================================
router.get('/gifship/:id', gifship.getGifship);
router.post('/gifship-type', gifship.createGifshipType)
router.get('/gifshipList/:page/:per_page', gifship.getGifshipList);
router.delete('/gifshipList/:id', gifship.getGifshipDelete);
router.get('/gifshipedit/:id', gifship.Gifshipone);
router.put('/gifshipList/:id', gifship.GifshipUpdate);
router.get('/gifshipLists/:id', gifship.GifshipbyId);
//============GifshipPackage================getGifshipPackage
router.get('/gifshipPackage/:page/:per_page', gifshipPackage.getGifshipPackages);
router.post('/gifshipPackage', gifshipPackage.addGifshipPackage)
router.delete('/gifshipPackage/:id', gifshipPackage.deleteGifshipPackage);
router.get('/gifshipPackage/:id', gifshipPackage.getGifshipPackage);
router.get('/gifshipPackageList/:id', gifshipPackage.getGifshipPackageWithGigshipTypeId);
router.put('/gifshipPackage/:id', gifshipPackage.updateGifshipPackage);
router.get('/getGifshipPackagesAll/1/1/all/1', gifshipPackage.getGifshipPackagesAll);
//==============LOOKUPS TABLES==========
router.get('/lookups/:id/lga', lookup.lookUpLga)
router.get('/lookups/:id/state', lookup.lookUpState)
router.get('/lookups/:id/region', lookup.lookUpRegion)
router.get('/lookups/:id/country', lookup.lookUpCountry)
//ACCOUNT TYPE TABLE======================
router.get('/account/type/', account_type.getAllAccpount_type)
router.get('/accout/type/:id/0', account_type.getOneAccount_typeById)
router.get('/account/type/name/:name/0', account_type.getOneAccount_typeByName)
router.post('/account/type/add',requireJsonContent, account_type.addAccount_type)
router.put('/account/type/:id/', requireJsonContent, account_type.updateAccount_type)
router.delete('/account/type/:id', account_type.deleteAccount_typeById)
//===============image function=========
router.get('/account', account.getAll)
router.get('/account/:page/:per_page', account.getAllPagings)
router.post('/account/add', requireJsonContent, account.addAccount)
router.get('/account/:id', account.getOneAccount)
router.put('/account/0/:id', requireJsonContent, account.updateAccount)
router.delete('/account/:id', account.deleteAccount)
//chart of account router
router.get('/chart/of/account/getChartofaccount', chartofaccount.getChartofaccount)
router.get('/chart/of/account/getChartofaccount/lookup/0', chartofaccount.getChartofaccountlookup)
router.get('/chart/of/account/getChartofaccount/:id', chartofaccount.getOneChartofaccount) 
router.post('/chart/of/account/', requireJsonContent, chartofaccount.addChartofaccount)
router.delete('/chart/of/account/:id', chartofaccount.deletechartofaccount)
router.put('/chart/of/account/:id', requireJsonContent, chartofaccount.editChartofaccount)
// Bank info=========================
router.get('/bank/bank/', bank.getAll)
router.post('/bank/bank/add', requireJsonContent, bank.add)
router.get('/bank/bank/get/:page/:per_page', bank.getAllPagings)
router.delete('/bank/:id', bank.deletebank)
router.put('/bank/:id', requireJsonContent, bank.updateBank)
router.get('/bank/1/0/:id', bank.getOneBank)
//=============================
router.get('/mappings', mapping.getAll)
router.post('/mappings/add', requireJsonContent, mapping.add)
router.get('/mappings/get/:page/:per_page', mapping.getAllPagings);
router.delete('/mapping/:id', mapping.deletes)
router.put('/mapping/:id', requireJsonContent, mapping.update)
router.post('/mapping/bulk/add', requireJsonContent, mapping.Bulkcreate)
router.delete('/mapping/bulk/delete/:tablename/:arr', mapping.deleteBulk)
router.delete('/mapping/bulk/delete/1/:tablename/:ar', mapping.deleteBulkPK)
router.get('/mapping/:tablename/:tableinclude/:page/:per_page', mapping.getAllPagings2Params)
//=====================================
router.post('/pv-header/add', requireJsonContent, pvheader.addPvheader)
router.get('/pv-header/:id/1', pvheader.getOne)
router.get('/pv-header', pvheader.getAll)
router.delete('/pv-header/:id', pvheader.deletePvheader)
router.get('/get-evoucher/list/all/1/2', pvheader.getAll)
//=================================================
router.post('/pv-details/', requireJsonContent, pv_details.addBulkpv_detail)
router.get('/pv-details/:pvheaderid/1', pv_details.getPVheader)
router.get('/pv-details/list/:pvheaderid/1', pv_details.getPVheaderList)
//============================================================
router.post('/triages/add/', requireJsonContent, triage.createTriage)
router.delete('/triages/:id', triage.deleteTriage )
router.get('/triages/:patient_id/', triage.viewByPatientId)
router.get('/triages/all/view/', triage.getAll)
router.get('/triages/1/view/:id/', triage.viewOne)
//-----------------------------------
router.get('/babk-transaction/', bank_transaction.getAll)
router.get('/bank-transation/:page/:per_page', bank_transaction.getAllPagings)
router.get('/bank-transaction/0/1/:id',bank_transaction.getOne)
router.put('/bank-transaction/:id',bank_transaction.update)
router.post('/bank-transaction/',bank_transaction.add)
//-----------------------------------
router.get('/cash-transaction/', cash_transaction.getAll)
router.get('/cash-transation/:page/:per_page', cash_transaction.getAllPagings)
router.get('/cash-transaction/0/1/:id', cash_transaction.getOne)
router.put('/cash-transaction/:id', cash_transaction.update)
router.post('/cash-transaction/',cash_transaction.add)
//--------------------------------------------------------
router.get('/care-plans/:patient_id', care_plan.getAll)
router.post('/care-plans/', requireJsonContent, care_plan.add)
//-----------------------------------------------
router.get('/enrollee/', enrollee.getAll)
router.get('/enrollee/:page/:per_page', enrollee.getAllPagings)
router.get('/enrollee/0/1/:enrollee_id', enrollee.getOne)
//------------------------------------------------------
router.get('/ewallet/', ewallet.getAll)
router.get('/ewallet/get/:Id/print/:customer_id', ewallet.getAllById)
router.get('/ewallet/customer/1/:customer_Id/', ewallet.getSumAmount)
router.get('/e-wallet/get/date/:sdate/:edate', ewallet.getSumAmountByDate)
router.get('/ewallet/person/1/:customer_id', ewallet.getAllPerPerson)
router.get('/ewallet/:page/:per_page', ewallet.getAllPagings)
router.get('/ewallet/:id', ewallet.getOneewallet)
router.put('/ewallet/:id', requireJsonContent, ewallet.deleteewallet)
router.post('/ewallet/', requireJsonContent, ewallet.add)
router.delete('/ewallet/:id', ewallet.deleteewallet)
//-----------------------------------------------
router.get('/insurance/', insurance.getAll)
router.get('/insurance/:insurance_id', insurance.getOne)
router.get('/insurance/:page/:per_page', insurance.getAllPagings)
router.post('/insurance', requireJsonContent, insurance.addInsurance)
router.put('/insurance/edit/',requireJsonContent, insurance.editInsurance)
router.delete('/insurance/delete/:id', insurance.deleteInsurance)
//==============================

router.put('/close/', requireJsonContent, immunization.closeImmunization)
router.get('/immunization/:patient_id', immunization.viewAll)
router.get('/immunization/view/:id', immunization.viewOne)
router.post('/immunization/', requireJsonContent, immunization.add)
router.get('/imm/viewOneByPatient/:patient_id', immunization.viewOneByPatient)
router.put('/updatedAt6weeks/', requireJsonContent, immunization.updatedAt6weeks)
router.put('/updatedAt10weeks/', requireJsonContent, immunization.updatedAt10weeks)
router.put('/updatedAt14weeks/', requireJsonContent, immunization.updatedAt14weeks)
router.put('/updatedAt6months/', requireJsonContent, immunization.updatedAt6months)
router.put('/updatedAt9months/', requireJsonContent, immunization.updatedAt9months)
router.put('/updatedAt1year/', requireJsonContent, immunization.updatedAt1year)
router.put('/updatedAt15months/', requireJsonContent, immunization.updatedAt15months)
router.put('/updatedAt2years/', requireJsonContent, immunization.updatedAt2years)

//=============================
router.get('/patient-insurance/1/:patient_id', patiennt_insurace.getOne)
router.put('/insurance/', requireJsonContent, patiennt_insurace.edit)
router.get('/patient-insurance/1/2/:patient_id', patiennt_insurace.getOneAll)
router.get('/patient-insurance/1', patiennt_insurace.getAll)
//-------------------------------------------------------
router.get('/investigation/', investigation.getAll)
router.get('/invest/:name/:filter/', investigation.getAllFilter)
router.get('/investigation/:investigation_id', investigation.getOne)
router.get('/investigation/:page/:per_page', investigation.getAllPagings)
router.get('/investigation/ext/:page/:per_page', investigation.getAllPagingexclude)
router.get('/investigation/incl/1/:page/:per_page', investigation.getAllPagingInclude)
//-------------------------------------------------------------
router.get('/initialdeposit/', initialdeposit.getAll)
router.get('/initialdeposit/:patient_id/1/2/3', initialdeposit.getByPatientIdAll)
router.get('/initialdeposit/all/1/2/3/4/5/6/', initialdeposit.getAlls)
router.get('/initialdeposit/:id', initialdeposit.getOne)
router.put('/initialdeposit/update/', requireJsonContent, initialdeposit.getUpdate)
router.get('/initialdeposit/:id/patient/1', initialdeposit.getByPatientId)
router.get('/initialdeposit/:id/sum/patient/1/2', initialdeposit.getSum)
router.put('/initialdeposit/update/patient/id', requireJsonContent, initialdeposit.getUpdateByPatientId)
router.post('/initialdeposit/', requireJsonContent,  initialdeposit.getAdd)
//========================================
router.get('/journal/', journal.getAll)
router.get('/journal/:id', journal.getOne)
router.post('/journal/add', requireJsonContent, journal.add)
router.get('/journal/:page/:per_page', journal.getAllPagings)
router.put('/journal/:id', requireJsonContent, journal.update)
router.post('/journal/postJournal/post/', requireJsonContent, journal.postJournal)
router.post('/pv-header/js/post/journal/1', requireJsonContent, journal.postJournalPv)
router.post('/journal/add/journalpv/entry/1/2',requireJsonContent, journal.postBulk)
router.get('/journal/get/all/:sdate/:edate/1/2/3', journal.getJournalWithDate)
router.get('/journal/get/all/:sdate/:edate/1/2/3/:acc/xyz/1/2/3/4/', journal.getJournalWithDateAccountId)
router.get('/journal/get/all/:sdate/:edate/1/2/3/:entity_id', journal.loadData4view)
router.get('/journal/get/all/0/d/1/2/3/xyz/1/', journal.loadData4viewDetails)
router.get('/journal/get/all/0/d/1/2/3/xyz/1/:id/', journal.getData4viewDetails)
router.get('/journal/get/all/:sdate/:edate/:arrays/2/2/2/2/1', journal.getSumView)
//======================================
router.get('/vendor', vendor.getAll)
router.get('/vendor/:id', vendor.getOne)
router.post('/vendor/', requireJsonContent, vendor.add)
router.put('/vendor/update/', requireJsonContent, vendor.updates)
router.delete('/delete/:id', vendor.deletes)
//=================================================
router.post('/surgery/', requireJsonContent, surgery_request.add)
router.get('/surgery/:patient_id', surgery_request.surgerGetAll)
router.get('/surgery/one/:id', surgery_request.surgerGetOne)
router.post('/surgery_procedure/', requireJsonContent, surgery_request.surgery_procedureAdd)
router.get('/surgery_procedure/:patient_id', surgery_request.Surgery_procedure)
//--------------------------------
router.get('/diagnose/:patient_id', diagnose.getAllByPatient)
router.get('/diagnose/2/:visit_id/1/1/1/1/1', diagnose.getAllByVisit)

router.get('/diagnose/icpc/:patient_id', diagnose.getAllByPatientICPC)
router.get('/diagnose/2/icpc/:visit_id/1/1/1/1/1', diagnose.getAllByVisitICPC)

router.get('/diagnose/:id/1/1', diagnose.getOne)
router.post('/diagnose/', requireJsonContent, diagnose.add)
router.put('/diagnose/update/', requireJsonContent, diagnose.update)
router.delete('/diagnose/delete/:id', diagnose.deletes)
//===============================================
router.get('/clinical_note/1/:patient_id/1/2', clinical_note.getAll)
router.get('/clinical_note/:id', clinical_note.getOne)
router.post('/clinical_note/', requireJsonContent, clinical_note.add)
router.put('/clinical_note/update/', requireJsonContent, clinical_note.updates)
router.delete('/clinical_note/:id', clinical_note.deletes)
router.get('/clinical_note/1/:patient_id', clinical_note.viewByPatientId)
router.get('/clinical_note/2/2/:visit_id', clinical_note.getOneByVisit)
//========================================
router.post('/request/', requireJsonContent, requests.add)
router.put('/request/update', requireJsonContent, requests.getUpdate)
router.get('/request/:id', requests.getOne)
router.get('/request/', requests.getAll)
router.get('/getAllDeclined/', requests.getAllDeclined)
router.get('/getAllGranted/', requests.getAllGranted)
router.get('/request/:id/all', requests.getAllById)


//=======================================
router.get('/inv/lookup/pharmacy/:filter/:drug_type', inventory_item.getAlls)
router.get('/pharmacy_store_item/:page/:per_page/:drug_id/:drug_type', pharmacy_store_item.getAll)
router.get('/pharmacy/:drug_form', pharmacy_store_item.findAllStore)
router.get('/pharmacy_store_item/:id', pharmacy_store_item.getOne)
router.get('/history/List/:id/', inventory_item.historyList)
router.post('/pharmacy_store_item/', requireJsonContent, pharmacy_store_item.add)
router.put('/pharmacy_store_item/update/', requireJsonContent, pharmacy_store_item.updates)
router.delete('/pharmacy_store_item/:id', pharmacy_store_item.deletes)
router.get('/invitem/update/:drug_type/1/2/3', pharmacy_store_item.findFilter)
router.get('/invitem/update/:drug_type/1/2/3/all', pharmacy_store_item.findFilterConsumable)
router.get('/findStoreQty/:id/findStoreQty', pharmacy_store_item.findStoreQty)
//=======================================
router.get('/route_of_administration', route_of_administration.getAll)
router.get('/route_of_administration/:id', route_of_administration.getOne)
router.post('/route_of_administration/', requireJsonContent, route_of_administration.add)
router.put('/route_of_administration/update/', requireJsonContent, route_of_administration.updates)
router.delete('/route_of_administration/:id', route_of_administration.deletes)


router.get('/drug', drug.getAll)
router.get('/filterDrug/:name/:form', drug.filterDrug)
router.get('/drug/drug/1/2/3/4/5/6/:is_available_for_nhis/:type', drug.getAll4NHIS)
router.get('/drug/:drug_id', drug.getOne)
router.get('/drug/list/:page/:per_page', drug.getAllPagings)
router.get('/drug/list/ex/:page/:per_page', drug.getAllPagingexclude)
router.get('/drug/list/incl/1/:page/:per_page', drug.getAllPagingInclude)
router.post('/drug/', requireJsonContent, drug.addDrug)
router.put('/drug/update/', requireJsonContent, drug.updateDrug)
router.delete('/drug/update/:id', drug.deleteDrug)
//======================================
router.get('/dosage', dosageForm.getAll)
router.get('/dosage/:id', dosageForm.getOne)
router.post('/dosage/', requireJsonContent, dosageForm.addDosageForm)
router.put('/dosage/update/', requireJsonContent, dosageForm.updateDosaForm)
router.delete('/dosage/update/:id', dosageForm.deleteDosageForm)
//======================================
router.get('/measurement', measurement.getAll) 
router.get('/measurement/all/:dosage_form_id', measurement.getAllByDosage)
router.get('/measurement/:id', measurement.getOne)
router.post('/measurement/', requireJsonContent, measurement.addmeasurement)
router.put('/measurement/update/', requireJsonContent, measurement.updatemeasurement)
router.delete('/measurement/update/:id', measurement.deletemeasurement)
//===========================================
router.get('/bed', bed.getAll)
router.get('/view/bed/:ward_id', bed.findByWard)
router.get('/bed/:id', bed.getOne)
router.post('/bed/', requireJsonContent, bed.addBed)
router.put('/bed/update/', requireJsonContent, bed.updateBed)
router.delete('/bed/update/:id', bed.deleteBed)
//=====================================

router.get('/hmoplan/:insurance_id/:gifshipId/:gifshipTypeId/:gifshipPackageId/:hmo_id', hmoplan.getAll)
router.get('/hmoplan/:page/:per_page', hmoplan.getAlls)
router.get('/hmoplan/:id', hmoplan.getOne)
router.post('/hmoplan/', requireJsonContent, hmoplan.addhmoplan)
router.put('/hmoplan/update/', requireJsonContent, hmoplan.updatehmoplan)
router.delete('/hmoplan/update/:id', hmoplan.deletehmoplan) 
router.get('/hmo/:insurance_id/:gifshipId/:gifshipTypeId/:gifshipPackageId', hmo.getHmo4Plan)

//===============================================
router.get('/bedward', bedWard.getAll)
router.get('/bedward/:id', bedWard.getOne)
router.post('/bedward/', requireJsonContent, bedWard.addWard)
router.put('/bedward/update/', requireJsonContent, bedWard.updateWard)
router.delete('/bedward/update/:id', bedWard.deleteWard)
//---------------------------------------
router.get('/inventory/', inventory.getAll)
router.get('/inventory/:id', inventory.getOne)
router.get('/inventory/:page/:per_page', inventory.getAllPagings)
router.post('/inventory/', requireJsonContent, inventory.addInventory)
router.put('/inventory/update/', requireJsonContent, inventory.updateInventory)
router.delete('/inventory/update/:id', inventory.deleteInventory)
//--------------------------------
router.get('/inventory-item/:page/:per_page/:drug_id/:drug_form', inventory_item.getAll)
router.get('/inventory-item/:id/1/2/3/4/5', inventory_item.getOne)
router.get('/inventory-item/:id/1/2/3/4/5/:type/1/2', inventory_item.getOnes)
router.get('/inventory-item/:drug_id/drug/1', inventory_item.getOneByDrug)
router.get('/inventory-item/:inventory_id/inventory/1/2', inventory_item.getOneByInventory)
router.post('/invitem/', requireJsonContent, inventory_item.addInventoryitem)
router.put('/invitem/update/', requireJsonContent, inventory_item.updateInventoryitem)
router.delete('/invitem/update/:id', inventory_item.deleteInventoryitem)
router.get('/invitem/update/:drug_type/1/2/3/4/5/6', inventory_item.findFilter)
router.put('/invitem/update/approval/', inventory_item.approveReturn)
//--------------------------------
router.get('/previous/pregnancy/:patient_id', previous_pregnancy.getAll)
router.get('/previous_pregnancy/:id', previous_pregnancy.getOne)
router.post('/previous_pregnancy', requireJsonContent, previous_pregnancy.add)
router.put('/previous_pregnancy/update/', requireJsonContent, previous_pregnancy.updates)
router.delete('/previous_pregnancy/update/:id', previous_pregnancy.deletes)
//======================================
router.get('/delivery/:patient_id', delivery.getAll)
router.get('/delivery/getOne/:id', delivery.getOne)
router.post('/delivery/', requireJsonContent, delivery.add)
//--------------------------------------------------
router.get('/test/', test.getAll)
router.get('/filter/:name/:filter/', test.getAllFilter)
router.get('/test/:test_id', test.getOne)
router.get('/test/:page/:per_page', test.getAllPagings)
router.get('/test/ext/:page/:per_page', test.getAllPagingexclude)
router.get('/test/incl/1/:page/:per_page', test.getAllPagingInclude)
router.post('/test/', requireJsonContent, test.addtest)
router.put('/test/update/', requireJsonContent, test.updatetest)
router.delete('/test/update/:id', test.deleteTest)
//----------------------------------------------
router.get('/test-prescription/:patient_id', test_prescription.getAll)
router.get('/test-prescription/:patient_id/:visit_id', test_prescription.getAllVisitpatient)

//============================
router.get('/serv/:name', service.getAllFilter)
router.get('/service', service.getAll)
router.get('/serv/:id/all', service.getAlls)
router.get('/service/:id', service.getOne)
router.get('/service/:page/:per_page', service.getAllPagings)
router.get('/service/ext/:page/:per_page', service.getAllPagingexclude)
router.get('/service/incl/1/:page/:per_page', service.getAllPagingInclude)
router.post('/service/', requireJsonContent, service.addservice)
router.put('/service/update/', requireJsonContent, service.updateservice)
router.delete('/service/update/:id', service.deleteservice)
//---------------------------------------------------------
router.get('/imaging', imaging.getAll)
router.get('/imaging/:id', imaging.getOne)
router.get('/imaging/ext/:page/:per_page', imaging.getAllPagings)
router.post('/imaging/', requireJsonContent, imaging.addImaging)
router.put('/imaging/update/', requireJsonContent, imaging.updateImaging)
router.delete('/imaging/update/:id', imaging.deleteImaging)

//=====================================================
router.post('/investigation/', requireJsonContent, investigation.addInvestigation)
router.put('/investigation/update/', requireJsonContent, investigation.updateInvestigation)
router.delete('/investigation/update/:id', investigation.deleteInvestigation)
/*
router.get('/nhis/test/', nhistest.getAll)
router.get('/nhis/test/:test_id', nhistest.getOne)
router.get('/nhis/test/:page/:per_page', nhistest.getAllPagings)
router.get('/nhis/test/ext/:page/:per_page', nhistest.getAllPagingexclude)
router.get('/nhis/test/incl/1/:page/:per_page', nhistest.getAllPaginginclude)
*/
//---------------------------------------------------------
router.get('/outpts/', outpts.getAll)
router.get('/outpts/:outpt_id', outpts.getOne)
router.get('/outpts/:page/:per_page/:name', outpts.getAllPagings)
router.post('/outpts', requireJsonContent, outpts.add);
router.put('/outpts/:outpt_id', outpts.update)
router.delete('/outpts/:outpt_id', outpts.deletes);
router.get('/getAllWithName/get/:name/1/', outpts.getAllWithName)
//--------------------------------------------------------
router.get('/patient', patient.getAll)
router.put('/deceased/', requireJsonContent, patient.deceased)
router.get('/hmo/filter/:fulname', patient.getAllInsurance)
router.get('/sorting/all/:fulname/', patient.getAllPatients)
router.get('/sort/all/:patient_id/', patient.getsorts)
router.get('/patient/:patient_id', patient.getOne)
router.get('/patient/hmo/:patient_id', patient.getEncludeHmo)
router.get('/patient/hmo/:patient_id/1/2', patient.getIncludeHmo)
router.get('/filter/:page/:per_page/:fullname/0/1/2/3/4/5/6/8/', patient.getAllPagings)

router.get('/filterPrincipal/:name/', patient.filterPrincipal)
router.get('/patient/get/:fullname/1', patient.getAllWithName)
router.get('/patient/get/:fullname/1/hmo', patient.getAllWithNameHmo)
router.get('/dependant/get/:fullname/1/2', patient.getAllWithNameDependant)
router.get('/dependant/getDependantHmo/:patient_id/', patient.getDependantHmo)
router.post('/patient', requireJsonContent, patient.addPatient)
router.put('/patient/', requireJsonContent, patient.updates)
router.get('/patient/principal/all', patient.getPrincipal)
//router.put('/patient/has/insurance/1/', requireJsonContent, patient.addInsurancePerson)
router.get('/patient/:patient_type/:fulname/2/3/4/5/6/7/8/9/0', patient.loadall)
router.get('/patient/patient/principal/getAllDependant/:principal_id/', patient.getAllDependant)

router.post('/icd10_disease', requireJsonContent, icd10_disease.addicd10_disease)
router.get('/icd10_disease/all/:id', icd10_disease.getAll)
router.get('/icd10_disease/:id', icd10_disease.getOne)
router.delete('/icd10_disease/:id', icd10_disease.deleteicd10_disease)
router.get('/icd10_disease/:id/name/filter/', icd10_disease.getOneByName)
//----------------------------------------
router.post('/icpc2_diseases', requireJsonContent, icpc2_diseases.addicpc2_diseases)
router.get('/icpc2_diseases/all/:id', icpc2_diseases.getAll)
router.get('/icpc2_diseases/:id', icpc2_diseases.getOne)
router.delete('/icpc2_diseases/:id', icpc2_diseases.deleteicpc2_diseases)
router.get('/icpc2_diseases/:id/name/filter/', icpc2_diseases.getOneByName)
//==================================
router.post('/visits', requireJsonContent, visits.addvisits)
router.get('/visits/get/:patient_id', visits.selectbypatientid)
router.get('/visit/:name', visits.getAll)
router.put('/visits/visit/', requireJsonContent, visits.closedVisit)
router.put('/visits/visit/has/vitals', requireJsonContent, visits.hasdonevitals)
router.get('/visits/visit/has/vitals/:patient_id', visits.visits_view)
router.get('/selectbyID/:id', visits.selectbyID)
router.get('/selectMax/:patient_id', triage.selectMax)

router.post('/complaint', requireJsonContent, complaint.addComplaint)
router.put('/complaint/', requireJsonContent, complaint.updateComplaint)
router.delete('/complaint/', requireJsonContent, complaint.deleteComplaint)
router.get('/complaint/:patient_id', complaint.getAll)
router.get('/complaint/one/:id', complaint.getOne) 
 
router.post('/antenatals', requireJsonContent, antenatal_account.add)
router.put('/antenatals/', requireJsonContent, antenatal_account.updates)
router.delete('/antenatals/', requireJsonContent, antenatal_account.deletes)
router.get('/antenatals/:patient_id', antenatal_account.viewByPatientId)
router.get('/antenatals/one/:id', antenatal_account.getOne)

 
router.post('/ante-natals/add/', requireJsonContent, antenatal_triage.add)
router.put('/ante/natals/updates/', requireJsonContent, antenatal_triage.updates)
router.delete('/ante-natals/deletes/', requireJsonContent, antenatal_triage.deletes)
router.get('/ante-natals/view/:patient_id', antenatal_triage.viewByPatientId)
router.get('/ante-natals/1/one/:id', antenatal_triage.getOne)
router.get('/ante-natals/1/:visit_id/0', antenatal_triage.getOneByVisit)
router.get('/ante-natal/all/result/1/:patient_id', antenatal_triage.getAll )

router.post('/observation/add/', requireJsonContent, antenatal_observation.add)
router.put('/observation/updates/', requireJsonContent, antenatal_observation.updates)
router.delete('/observation/deletes/', requireJsonContent, antenatal_observation.deletes)
router.get('/observation/view/:patient_id', antenatal_observation.viewByPatientId)
router.get('/observation/1/one/:id', antenatal_observation.getOne)
router.get('/observation/1/:visit_id/0', antenatal_observation.getOneByVisit)
router.get('/observation/all/result/1/:patient_id', antenatal_observation.getAll )

router.post('/allergies', requireJsonContent, allergies.addAllergy)
router.put('/allergies/', requireJsonContent, allergies.updateAllergy)
router.delete('/allergies/', requireJsonContent, allergies.deleteAllergy)
router.get('/allergies/:patient_id', allergies.getAll)
router.get('/allergies/one/:id', allergies.getOne) 

router.post('/physical-examination', requireJsonContent, physical_exam.addphysical_exam)
router.put('/physical-examination/', requireJsonContent, physical_exam.updatephysical_exam)
router.delete('/physical-examination/', requireJsonContent, physical_exam.deletephysical_exam)
router.get('/physical-examination/:patient_id', physical_exam.getAll)
router.get('/physical-examination/one/:id', physical_exam.getOne) 
//================================================
router.post('/return/item', requireJsonContent,return_item.add)
router.get('/return/item', return_item.getAll)
router.get('/return/item/:id', return_item.getOne)
//==========================================
router.post('/notificats/',requireJsonContent, notificats.addMessage)
router.get('/notificats/:uid/', notificats.getAllByUser)
router.get('/notificats/1/:uid/', notificats.getAllByUserUnread)
router.get('/notificat/1/:uid/', notificats.getAllByUserread)
router.get('/notificats/1/all/1/', notificats.getAll)
router.get('/notificats/1/all/1/:uid/1/2', notificats.getAllByUserFrom)
router.delete('/notificats/1/:id/delete/1', notificats.deleteMessage)
router.put('/notificats/updateMessage/', notificats.updateMessage)

//-----------------------------------------------

router.get('/getSelect/:insurance/:hmo/:sdate/:edate', payment.getSelect)
router.get('/getSelect-investigation/:insurance/:hmo/:sdate/:edate', payment.getSelectInvestigation)
router.get('/getSelect-service/:insurance/:hmo/:sdate/:edate', payment.getSelectServes)
router.get('/getSelect-test/:insurance/:hmo/:sdate/:edate', payment.getSelectTest)

router.get('/getPrivate/private/:insurance/:hmo/:sdate/:edate', payment.getPrivate)
router.get('/getPrivateInvestigation/private/:insurance/:hmo/:sdate/:edate', payment.getPrivateInvestigation)
router.get('/getPrivateService/private/:insurance/:hmo/:sdate/:edate', payment.getPrivateServes)
router.get('/getPrivateTest/private/:insurance/:hmo/:sdate/:edate', payment.getPrivateTest)

router.get('/payment', payment.getAll)
router.get('/awit/:patient_id/:sdate/:edate', payment.getAllSummaryAwait)
router.get('/withdetails/:patient_id/:sdate/:edate', payment.getAllSummaryWithDetail)
router.get('/awit/:patient_id/:sdate', payment.getAllSummaryAwaitUp)
router.get('/payment/summary/patient/:patient_id/:sdate/:edate/1/2/3/4/5/6/7/8/9', payment.getAllSummaryBroughtout)
router.get('/payment/summary/patient/:patient_id/:sdate/bf/1', payment.getAllSummaryBF)
router.get('/payment/summary/patient/:patient_id/:sdate/bf/1/out', payment.getAllSummaryBFOutpatient)
router.get('/payment/summary/patient/:patient_id/:sdate/:edate', payment.getAllSummary)
router.get('/payment/summary/patient/:patient_id/:sdate/:edate/billings/1/get/', payment.getAllSummaryBillings)
router.get('/payment/summary/patient/:patient_id/1/2/billings/1/get/1/', payment.getAllSummaryUnBillings)
router.get('/payment/summary/user/:editedby/:sdate/:edate', payment.getSummaryByUser)
router.get('/payment/summary/user/:editedby/:pmode/:sdate/:edate/1/2/3/4', payment.getSummaryByMode)
router.get('/payment/summary/user/:permittedby/:sdate/:edate/1/2/3/4/5', payment.getAllSummaryPermittedByUser)
router.get('/payment/summary/user/:permittedby/:sdate/:edate/1/2/3/4/5/6', payment.getAllSummaryPermittedByUserDetails)
router.get('/payment/summary/user/date/:sdate/:edate/0/1', payment.getSummaryByDate)
router.get('/payment/summary/user/date/:sdate/:edate/0/1/2/prev/0', payment.getSummaryByDatePrevious)
router.get('/payment/summary/user/date/:id/:sdate/:edate/0/1/2/prev', payment.getSummaryByDatePreviousByOne)
router.get('/payment/summary/hmo/:sdate/:edate/:insurance_id/:hmo_id/hmo/', payment.getAllHmoTransaction)
router.get('/payment/summary/patient/:patient_id/:sdate/:edate/out', payment.getAllSummaryoutpatient)
router.get('/payment/batch/:batch_no', payment.getAllWithBatchno)
router.get('/payment/batch/sum/:uid/', payment.getAllWithBatchnoGroup)
router.get('/payment/:id', payment.getOne)
router.get('/payment/:page/:per_page', payment.getAllPagings)
router.post('/payment', requireJsonContent, payment.add)
router.post('/payment/addoutpatient', requireJsonContent, payment.addoutpatient)
router.post('/payment/addoutpatient/addoutpatientMiscellaneous/0', requireJsonContent, payment.addoutpatientMiscellaneous)
router.get('/payment/getAllWithBatchnoAndUid/:batch_no/:uid/', payment.getAllWithBatchnoAndUid)
router.get('/payment/getAllWithBatchnoGroupOUT/:uid/1/out/3', payment.getAllWithBatchnoGroupOUT)
router.post('/payment/dependant', requireJsonContent, payment.addDependant)
router.put('/payment/:id', requireJsonContent, payment.update)
router.put('/payment/0/:id', requireJsonContent, payment.confirmed)
router.delete('/payment/0/1/:id', requireJsonContent, payment.deletes)
router.get('/payment/receipt/1/:batch_no', payment.getAllReceipt)
router.get('/payment/receipt/details/1/:batch_no', payment.getAllReceiptDetails)
router.get('/payment/receipt/details/1/:batch_no/out/0', payment.getAllReceiptDetailsout)
router.get('/payment/out-patient/print/:batch_no/', payment.getAllReceiptoutpatient)
router.get('/payment/out-patient/print/:batch_no/details', payment.getAllReceiptoutpatientDetails)
router.get('/payment/refund/:patient_id/0/1/:sdate/:edate', payment.getAllRefund)
router.get('/getSummaryChart', payment.getSummaryChart)
router.get('/getAllConfirmed/:sdate/:edate/1', payment.getAllConfirmed)
router.get('/getAll2Confirm/:sdate/:edate', payment.getAll2Confirm)
router.get('/get/All/Confirms/:sdate/:edate/:options', payment.getAll2Confirms)
//--------------------------------------------------------------
router.get('/filter/prescribeddrug/1/:patient_id',prescribeddrug.hmodrug )
router.put('/cleared/', requireJsonContent, prescribeddrug.nhisCleared)
router.put('/filter/nhisAutharisation/', requireJsonContent, prescribeddrug.nhisAutharisation)
router.get('/prescribeddrug/', prescribeddrug.getAll)
router.post('/prescribeddrug/',requireJsonContent, prescribeddrug.add)
router.get('/prescribeddrug/:pd_id', prescribeddrug.getOne)
router.get('/prescribeddrug/:page/:per_page', prescribeddrug.getAllPagings)
router.put('/prescribeddrug/:pd_id', requireJsonContent, prescribeddrug.paid)
router.put('/prescribeddrug/:id/billings/1', requireJsonContent, prescribeddrug.Billings)
router.put('/prescribeddrug/:id/billings/1/2', requireJsonContent, prescribeddrug.UnBillings)
router.put('/prescribeddrug/permitted/:id/1/2/3/4', requireJsonContent, prescribeddrug.permitted)
router.get('/prescribeddrug/:patient_id/1/2/3', prescribeddrug.getAll4Patient)
router.get('/dispense/:patient_id/1', prescribeddrug.getAll4Patient2dispense)
router.get('/dispense/:id/1/2', prescribeddrug.getAll4Patient2Dispenses)
router.put('/dispense/', requireJsonContent, prescribeddrug.dispensedDrug)
router.put('/dispense/refund/', requireJsonContent, prescribeddrug.refundDrug)
router.get('/prescribeddrug/:patient_id/1/2/3/4', prescribeddrug.getAll4PatientHmo)
router.get('/prescribeddrug/:dependant_id/1/2/3/4/5', prescribeddrug.getAll4DeoendantHmo)
router.get('/prescribeddrug/:ante_natal_id/1/2/3/4/5/6', prescribeddrug.getAll4Antenatal)
//router.get('/prescibeddrug/hmo/not/1/2/3',  prescribeddrug.getAllPatientOnly)
//router.get('/prescibeddrug/hmo/is/1/2/3/4',  prescribeddrug.getAllPatientOnlyHmo)
router.get('/prescribeddrug/sum/:id/1/2/ok', prescribeddrug.sumAmount);
router.get('/prescribeddrug/amount/:id/1/2', prescribeddrug.getAll2PayPatient);
router.get('/prescribeddrug/amount/:id/1/2/3', prescribeddrug.getAll2PayDependant);
//--------------------------------------------------------------------------

router.post('/imaging/prescribedimaging/cash/', requireJsonContent, prescribedimaging.addCash)
router.post('/imaging/prescribedimaging/', requireJsonContent, prescribedimaging.add)
router.get('/view/prescribe/:patient_id/:visit_id', prescribedimaging.loadImagePrescription)
router.post('/post/image', requireJsonContent, prescribedimaging.result)
router.get('/views/results/:id', prescribedimaging.view4approveResult)
router.put('/approve/', requireJsonContent, prescribedimaging.approveResult)
router.get('/viewResult/:id', prescribedimaging.viewResult)
router.get('/viewAllResult/:patient_id', prescribedimaging.viewAllResult)
router.get('/view/prescribe/:patient_id', prescribedimaging.viewImaging)
router.put('/check/invest/', requireJsonContent, prescribedimaging.check)
router.put('/check/post', requireJsonContent, prescribedimaging.collectedImaging)
router.get('/prescribedimaging/', prescribedimaging.getAll)
router.get('/prescribedimaging/:pi_id', prescribedimaging.getOne)
router.get('/prescribedimaging/:page/:per_page', prescribedimaging.getAllPagings)
router.put('/prescribedimaging/:pi_id', requireJsonContent, prescribedimaging.paid)
router.put('/prescribedimaging/permitted/:id/1/2/3/4', requireJsonContent, prescribedimaging.permitted)
router.put('/prescribedimaging/:id/billings/1', requireJsonContent, prescribedimaging.Billings)
router.put('/prescribedimaging/:id/billings/1/2', requireJsonContent, prescribedimaging.UnBillings)
router.get('/prescribedimaging/hmo/:patient_id/1/2/3',  prescribedimaging.getAll4Patient)
router.get('/prescribedimaging/hmo/:patient_id/1/2/3/4',  prescribedimaging.getAll4PatientHmo)
router.get('/prescribedimaging/hmo/:dependant_id/1/2/3/4/5',  prescribedimaging.getAll4DependantHmo)
router.get('/prescribedimaging/:ante_natal_id/1/2/3/4/5/6', prescribedimaging.getAll4Antenatal)
router.get('/prescribedimaging/sum/:id/1/2', prescribedimaging.sumAmount);
router.get('/prescribedimaging/amount/:id/1/2', prescribedimaging.getAll2PayPatient);
router.get('/prescribedimaging/amount/:id/1/2/3', prescribedimaging.getAll2PayDependant);
//============================
router.get('/alert/:patient_id', alert.getAll)
router.get('/alert/a/:patient_id', alert.getOne)
router.post('/alert/',requireJsonContent, alert.add)
router.put('/alert',requireJsonContent, alert.Updates)
//---------------------------------------------------------
router.post('/notes/', requireJsonContent, admission.addNusingNotes)
router.get('/notes/:patient_id', admission.viewNotes)
router.get('/getadmission/:patient_id', admission.getAllByPatient)
router.put('/discharged/', requireJsonContent, admission.discharged)
router.get('/discharge/view/:patient_id', admission.dischargeHistory)
router.get('/getOne/1/:id', admission.getOne)
router.post('/post/obervation/', requireJsonContent, admission.addObservation)
router.get('/observationlist/view/:patient_id', admission.observationlist)
router.get('/viewByOnadmission/:patient_id', admission.viewByOnadmission)
//=======================================
router.get('/view/service/:patient_id', prescribedservice.viewService)
router.post('/post/prescribedservice', requireJsonContent, prescribedservice.add)
router.post('/post/prescribed/service', requireJsonContent, prescribedservice.admissionAdd)
router.put('/prescr/service', requireJsonContent, prescribedservice.cleared)
router.get('/prescribedservice/', prescribedservice.getAll)
router.get('/prescribedservice/:ps_id', prescribedservice.getOne)
router.get('/prescribedservice/:page/:per_page', prescribedservice.getAllPagings)
router.put('/prescribedservice/:ps_id', requireJsonContent, prescribedservice.paid);
router.put('/prescribedservice/permitted/:id/1/2/3/4', requireJsonContent, prescribedservice.permitted)
router.put('/prescribedservice/:id/billings/1', requireJsonContent, prescribedservice.Billings)
router.put('/prescribedservice/:id/billings/1/2', requireJsonContent, prescribedservice.UnBillings)
router.get('/prescribedservice/get/:patient_id/1/2/3', prescribedservice.getAll4Patient);
router.get('/prescribedservice/get/:patient_id/1/2/3/4', prescribedservice.getAll4PatientHmo);
router.get('/prescribedservice/get/:dependant_id/1/2/3/4/5', prescribedservice.getAll4DependantHmo);
router.get('/prescribedservice/:ante_natal_id/1/2/3/4/5/6', prescribedservice.getAll4Antenatal)
router.get('/prescribedservice/sum/:id/1/2', prescribedservice.sumAmount);
router.get('/prescribedservice/amount/:id/1/2', prescribedservice.getAll2PayPatient);
router.get('/prescribedservice/amount/:id/1/2/3', prescribedservice.getAll2PayDependant);
//--------------------------------------------------
router.get('/prescribedtest/', prescribedtest.getAll)

router.get('/test/0/result/xyz/:patient_id', prescribedtest.viewAllresult)
router.get('/ap/view/prescribedtest/:patient_id', prescribedtest.viewByPerson)
router.put('/ap/view/prescribedtest/', requireJsonContent, prescribedtest.check)
router.post('/ap/view/', requireJsonContent, prescribedtest.result)
router.get('/ap/view4approveresult/:id', prescribedtest.view4approveResult)
router.put('/ap/approveresult/', requireJsonContent, prescribedtest.approveResult)
router.get('/ap/view/:id', prescribedtest.view4result)
router.get('/tests/presciption/:id', test_prescription.getOne)
router.put('/ap/view/', requireJsonContent, prescribedtest.collectedSample)
router.post('/prescribedtest/',requireJsonContent, prescribedtest.add)
router.post('/prescribedtest/addCast/',requireJsonContent, prescribedtest.addCast)

router.get('/prescribedtest/:pt_id', prescribedtest.getOne)
router.get('/prescribedtest/:page/:per_page', prescribedtest.getAllPagings)
router.put('/prescribedtest/:pt_id', requireJsonContent, prescribedtest.paid)
router.put('/prescribedtest/permitted/:id/1/2/3/4', requireJsonContent, prescribedtest.permitted)
router.get('/prescribedtest/get/:patient_id/1/2/3', prescribedtest.getAll4Patient);
router.get('/prescribedtest/get/:patient_id/1/2/3/4', prescribedtest.getAll4PatientHmo);
router.get('/prescribedtest/get/:dependant_id/1/2/3/4/5', prescribedtest.getAll4DependantHmo);
router.get('/prescribedtest/:ante_natal_id/1/2/3/4/5/6', prescribedtest.getAll4Antenatal)
router.get('/prescribedtest/sum/:id/1/2', prescribedtest.sumAmount);
router.get('/prescribedtest/amount/:id/1/2', prescribedtest.getAll2PayPatient);
router.get('/prescribedtest/amount/:id/1/2/3', prescribedtest.getAll2PayDependant);
router.put('/prescribedtest/:id/billings/1', requireJsonContent, prescribedtest.Billings)
router.put('/prescribedtest/:id/billings/1/2', requireJsonContent, prescribedtest.UnBillings)
//===========================
router.post('/addAdditionalTreatment/', requireJsonContent, additional_item.addAdditionalTreatment)
router.get('/ViewAdditionalTreatmentByPatient/:patient_id', additional_item.ViewAdditionalTreatmentByPatient)
router.get('/ViewAdditionalTreatmentById/:id', additional_item.ViewAdditionalTreatmentById)

router.get('/additional-item/',additional_item.getAll)
router.get('/additional-item/:page/:per_page', additional_item.getAllPagings)
router.get('/additional-item/0/1/:ai_id',additional_item.getOne)
router.get('/addition/dispense/:id', additional_item.getOne2dispense)
router.put('/dispensed/addition', requireJsonContent, additional_item.dispensedadditional)
router.put('/additional/refund/', requireJsonContent, additional_item.refundAdditional)
router.put('/additional-item/payment/:ai_id/1', requireJsonContent, additional_item.payment)
router.put('/additional-item/permitted/:id/1/2/3/4', requireJsonContent, additional_item.permitted)
router.get('/additional-item/get/:patient_id/1/2/3', additional_item.getAll4Patient);
router.get('/additional-item/get/:patient_id/1/2/3/4', additional_item.getAll4PatientHmo);
router.get('/additional-item/get/:dependant_id/1/2/3/4/5', additional_item.getAll4DependantHmo);
router.get('/additional-item/:ante_natal_id/1/2/3/4/5/6', additional_item.getAll4Antenatal)
router.get('/additional-item/sum/:id/1/2', additional_item.sumAmount);
router.get('/additional-item/amount/:id/1/2', additional_item.getAll2PayPatient);
router.get('/additional-item/amount/:id/1/2/3', additional_item.getAll2PayDependant);
router.put('/additional-item/:id/billings/1', requireJsonContent, additional_item.Billings)
router.put('/additional-item/:id/billings/1/2', requireJsonContent, additional_item.UnBillings)
router.post('/additional-item/', requireJsonContent, additional_item.add)
router.get('/dispense/:patient_id', additional_item.getAll4Patient4dispense)
router.put('/filter/dispense', requireJsonContent, additional_item.nhisCleared)
//--------------------------------------------------------------

router.get('/refund/', refund.getAll)
router.get('/refund/refund/:refid/:batchno', refund.getAllByBatch)
router.get('/refund/refund/batch/:batchno/1/3', refund.getAllByBatchOly)
router.get('/refund/refund/batch/:batchno/1/3/4/outpatient', refund.getAllByBatchOly4outpatient)

router.get('/refund/refund/:refid/1/2', refund.getAllByRefid)
router.get('/refund/refund/:refid/1/2/3', refund.getAllGroupByBatch)
router.get('/refund/:pid', refund.getOne)
router.get('/refund/:page/:per_page', refund.getAllPagings)
router.post('/refund', requireJsonContent, refund.add)
router.post('/refund/bulkCreate', refund.bulkAdd)
router.put('/refund/:pid', requireJsonContent, refund.update)
router.delete('/refund/:pid', refund.deletes)

//---------------------------------------------------------------
router.get('/staff', staff.getAll)
router.get('/staff/:staff_id', staff.getOne)
router.get('/staff/:page/:per_page/:fullname', staff.getAllPagings);
router.post('/staff', requireJsonContent, staff.add);
router.put('/staff',requireJsonContent, staff.updates);
router.delete('/staff/:id', staff.deletes);
router.put('/staff/img/', requireJsonContent, staff.updateImage)
router.put('/staff/pass/word/', requireJsonContent, staff.updatePassword)
//-----------------------------------------------------------
router.post('/cart/add', requireJsonContent, cart.Bulkcreate)
router.get('/cart/all', cart.getAll)
router.get('/cart/:pid/1', cart.getSumAmount)
router.get('/cart/:pid/1/dependant', cart.getSumAmountDependant)
router.get('/cart/:pid/1/antenatal', cart.getSumAmountAntenatal)
router.get('/cart/:pid/1/outpatient', cart.getSumAmountOutpatient)
router.delete('/cart/:ids/1/2')
router.get('/cart/', cart.getAll);
router.get('/cart/:pid/:patient_t/:page/:per_page', cart.getAllPagings)
router.delete('/cart/:id/:table_name', cart.getDelete)
router.delete('/cart/', cart.truncateCart)
//-----------------------------------
router.post('/salary/add', requireJsonContent, salaryItem.createAll)
router.get('/salary/list', salaryItem.getAll)
router.get('/salary/one/:id', salaryItem.getOne)
router.delete('/salary/one/delete/:id', salaryItem.deleteOne)
router.put('/salary/1', salaryItem.updateOne)
//==================================================
router.post('/level/add', requireJsonContent, pyrllevel.createAll)
router.get('/level/list', pyrllevel.getAll)
router.get('/level/one/:id', pyrllevel.getOne)
router.delete('/level/one/delete/:id', pyrllevel.deleteOne)
router.put('/level/1', pyrllevel.updateOne)
//---------------------------------------
router.post('/step/add', requireJsonContent, step.createAll)
router.get('/step/list', step.getAll)
router.get('/step/one/:id', step.getOne)
router.delete('/step/one/delete/:id', step.deleteOne)
router.put('/step/1', step.updateOne)
router.get('/level/resp/lookup/:scale/', step.getBelong)
router.get('/level/resp/lookup/:step/step/', step.getBelongStep)
//-------------------------------------
router.post('/item/add', requireJsonContent, salaryitem.createAll)
router.get('/item/list', salaryitem.getAll)
router.get('/item/one/:id', salaryitem.getOne)
router.delete('/item/one/delete/:id', salaryitem.deleteOne)
router.put('/item/1', salaryitem.updateOne)
//=============================
router.post('/psdetail/add', requireJsonContent, psdetail.createAll)
router.get('/psdetail/list', psdetail.getAll)
router.get('/psdetail/one/:id', psdetail.getOne)
router.delete('/psdetail/one/delete/:id', psdetail.deleteOne)
router.put('/psdetail/1', psdetail.updateOne)
router.get('/psdetail/1/:id', psdetail.getLookup)
//----------------------------
router.post('/scalewide/add', requireJsonContent, scalewide.createAll)
router.get('/scalewide/list', scalewide.getAll)
router.get('/scalewide/one/:id', scalewide.getOne)
router.delete('/scalewide/one/delete/:id', scalewide.deleteOne)
router.put('/scalewide/1', scalewide.updateOne)
//-----------------------------
router.post('/levelwide/add', requireJsonContent, levelwide.createAll)
router.get('/levelwide/list', levelwide.getAll)
router.get('/levelwide/one/:id', levelwide.getOne)
router.delete('/levelwide/one/delete/:id', levelwide.deleteOne)
router.put('/levelwide/1', levelwide.updateOne)
//------------------------------
router.post('/stepwide/add', requireJsonContent, stepwide.createAll)
router.get('/stepwide/list', stepwide.getAll)
router.get('/stepwide/one/:id', stepwide.getOne)
router.delete('/stepwide/one/delete/:id', stepwide.deleteOne)
router.put('/stepwide/1', stepwide.updateOne)
//-----------------------------------------
router.post('/employeepecific/add', requireJsonContent, employeepecific.createAll)
router.get('/employeepecific/list', employeepecific.getAll)
router.get('/employeepecific/one/:id', employeepecific.getOne)
router.delete('/employeepecific/one/delete/:id', employeepecific.deleteOne)
router.put('/employeepecific/1', employeepecific.updateOne)
router.get('/distinct/', icpc2_diseases.getNameGroup)
router.post('/csv/diagnosis/', requireJsonContent, icpc2_diseases.bulkCreates)
router.post('/csv/', requireJsonContent, hmo.bulkCreates)
//------------------------------------------------
router.post('/patient_treatnent/2/2/2/2/2/2/2/2/2', requireJsonContent, patient_treatnent.add)
router.get('/patient/treatnent/:patient_id/1/1/2', patient_treatnent.getAll)
router.get('/patient/:patient_id/1/2', patient_treatnent.getOne)

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, './public/upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
});
const upload = multer({
  storage,
  //limits:{fieldSize:1000000},

})
router.post('/uploadfile', upload.single('file'), function (req, res) {
  const file = req.file
  return res.status(200).json({ filename: file.filename })
})
 
router.get('/hashed/change/pass/:token/ok/ww', hashedPasswords)
//============END OF IMAGE

module.exports = router
