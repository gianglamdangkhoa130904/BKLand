
import express, { request, response } from 'express'
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'
import cors from 'cors'
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());
app.use(cors());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Specify the version of Swagger
        info: {
            title: 'BK Land API',
            version: '1.0.0',
            description: 'API documentation for my app',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs (will create later)
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome myPage")
})

app.use('/users',userRoute);

mongoose.connect(mongoDBURL)
.then(() => {
    console.log(`Connect to database!`);
    app.listen(PORT,() => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});