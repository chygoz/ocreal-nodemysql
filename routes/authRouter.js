// import controllers review, products
const authController = require('../controllers/authController.js')
const middleware = require('../middlewares/authMiddleware');


// router
const router = require('express').Router()




router.post('/validate_email', authController.validateEmail)
    //router.post('/select_user_type', middleware, authController.selectUserType)
router.post('/buyer_seller_signup', authController.buyerSellerSignup)
router.post('/agent_signup', authController.agentSignup)
router.post('/signin', authController.signin)
router.post('/user_types', authController.userTypes)
router.post('/connected_accounts', authController.connectedAccounts)
router.post('/subscription_status_list', authController.subscriptionStatusList)
router.post('/account/first_name', middleware, authController.firstName)
router.post('/account/last_name', middleware, authController.lastName)
router.post('/account/email', middleware, authController.email)
router.post('/account/password', middleware, authController.password)
router.post('/account/connected_account', middleware, authController.connectedAccount)
router.post('/account/subscription_status', middleware, authController.subscriptionStatus)
router.post('/account/delete_account', middleware, authController.deleteAccount)
router.post('/account/licence', middleware, authController.licence)
router.post('/account/state', middleware, authController.operationRegionState)
router.post('/account/city', middleware, authController.operationRegionCity)
    //router.post('/account/last_name', authController.lastName)



module.exports = router