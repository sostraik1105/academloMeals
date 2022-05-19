const { app } = require('./app');
const { db } = require('./utils/database');
const { relModels } = require('./models/relModel');

relModels();

db.sync()
    .then(() => {
        console.log('Connected');
    })
    .catch(err => console.log(err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
