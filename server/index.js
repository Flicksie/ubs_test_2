const port = process.env.PORT || 3001;
const app = require("./server.js");

app.listen(port, () => console.log(`Listening on port ${port}`));
