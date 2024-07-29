const { getTrustedSdk, serialize, handleError } = require("../api-util/sdk")

module.exports = async (req, res) => {
    try{
        const currentPassword =req.body.password
        // console.log("currentPassword",currentPassword)

        if(!currentPassword){
            return res.status(400).send("password is required")
            

        }
       
        const trustedSdk = await getTrustedSdk(req)
       const deleteUser = await trustedSdk.currentUser.delete({ currentPassword })
       const { status, statusText, data } = deleteUser;
       return res
        .status(status)
        .set('Content-Type', 'application/transit+json')
        .send(
          serialize({
            status,
            statusText,
            data,
          })
        )
        .end();
         

    }catch(e){
      handleError(res,e)
    }
}