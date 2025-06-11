const authorize =(allowedRoles=[])=>{
    return (req,res,next)=>{

        const userRole= req.user?.role;
        if(!userRole || !allowedRoles.includes(userRole) ){
            return res.status(404).json({msg:"access denied "})
        }
    
        console.log("Role not found")
        next()
} 
}

module.exports= {authorize}