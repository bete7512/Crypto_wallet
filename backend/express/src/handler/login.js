import client from '../configuration/apollo.config'
const handler = async (req, res) => {
    return res.status(200).json({ message: 'Hello World' }) 
}


module.exports  = handler