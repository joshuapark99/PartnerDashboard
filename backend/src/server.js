const http = require("http");
const app = require("./app");
if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}


const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
