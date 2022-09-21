import express, { NextFunction, Request, 
    Response } from 'express';
import morgan from 'morgan';
import { db } from './models';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/users', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
})

//  Katie please look at this section is this correct?
db.sync({ alter: true }).then(() => {
    console.info('you are soo connected right now!')
});

app.listen(3000);