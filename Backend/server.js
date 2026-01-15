require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
connectDB();
const PORT = process.env.PORT || 5000; // Use env port for Render

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});