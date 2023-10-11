const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    
    const token=req.cookies.token;
    if (!token){ 
       res.status(401).json({ msg: "No authentication token, authorization denied." });
    }

    const verified= jwt.verify(token,process.env.SECRET_KEY);
    console.log("verifying");

    if(!verified){
      res.status(401).json({ msg: "No authentication token, authorization denied." });
    }

    req.userid=verified.id
    console.log(req.userid);
    
    next();
  } catch (err) {
    // res.status(500).json({ error: err.message });
  }
};

module.exports = auth;