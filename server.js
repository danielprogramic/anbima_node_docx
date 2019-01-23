const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
		defer: true,
	})
);

app.use(cors());

require("./routes/route")(app);

app.listen(process.env.PORT || 8083);
console.log(`Server started on port ${process.env.PORT || 8083}`);
