const checkRole = (roles) => {
  const allowed = Array.isArray(roles) ? roles : [roles];
  return (req, res, next) => {
    if (!req.userInfo || !allowed.includes(req.userInfo.role)) {
      return res.status(403).json({ error: true, message: "Access Denied: Unauthorized role" });
    }
    next();
  };
};

module.exports = {checkRole}