const mongoose = require('mongoose');
module.exports = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB Connected .....');
	} catch (e) {
		console.log(e);
		console.log('Refused to connect....');
	}
};
