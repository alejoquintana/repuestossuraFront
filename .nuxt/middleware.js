const middleware = {}

middleware['checkAdmin'] = require('../middleware/checkAdmin.js')
middleware['checkAdmin'] = middleware['checkAdmin'].default || middleware['checkAdmin']

export default middleware
