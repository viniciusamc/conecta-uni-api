require('dotenv').config();
const logger = require('pino')();
require('express-async-errors')

const cors = require('cors')
const express = require('express');
const routes = require('./routes/index.routes');
const AppError = require('./utils/AppError.js');
const { UPLOADS_FOLDER } = require('./utils/upload.js');
const morgan = require('morgan')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('common'));
app.use(express.json());
app.use(cors())
app.use("/images", express.static(UPLOADS_FOLDER))
app.use(routes);

app.use((error, request, response, next) => {
        if (error instanceof AppError) {
                return response.status(error.statusCode).json({
                        status: 'error',
                        message: error.message,
                        statusCode: error.statusCode
                })
        }

        console.error(error)

        return response.status(500).json({
                message: 'internal server error'
        })
})

app.listen(PORT, () => {
        logger.info(`RUNNING ON PORT ${PORT}`);
});
