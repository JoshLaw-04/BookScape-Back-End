import express, { NextFunction, Request, 
    Response } from 'express';
import morgan from 'morgan';
import { db } from './models';
import userRoutes from './routes/userRoutes';
import reviewRoutes from './routes/reviewRoutes';
import bookRoutes from './routes/bookRoutes';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3001'
};
app.use(cors(corsOptions));

// routes
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
})

//****remember to take out FORCE after testing**** */
db.sync().then(() => {
    console.info('you are soo connected right now!')
});

app.listen(3000);