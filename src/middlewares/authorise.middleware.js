module.exports = function (permittedRoles) {
	return function (req, res, next) {
		const user = req.user.user; // console.log(user);

		let isPermitted = false;
		//role => ["seller", "admin"]
		permittedRoles.map((role) => {
			if (user.roles.includes(role)) {
				isPermitted = true;
			}
		});

		//if not then throw an error
		if (! isPermitted) {
			return res.status(403).send({ message: "Permission Denied" });
		}

		// if yes then return next
        return next();
	};
};
