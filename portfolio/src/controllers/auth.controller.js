export default {
   login : (req,res) =>{
      
      const ADMIN_USERNAME = process.env.ADMIN_USERNAME
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
      const { username, password} = req.body;

      if(username === ADMIN_USERNAME && password == ADMIN_PASSWORD){
         res.status(200).json({ status: 'success', admin_token: 'X4de58r122'})
      }else{
         res.status(400).json({status:'fail', message:'Wrong credentials'})
      }
      
   }
}