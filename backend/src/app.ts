import express from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { clerkMiddleware } from '@clerk/express'
import { errorHandler } from './errorHandler.js';
import path from 'path';


const app = express();
app.use(express.json());
app.use(clerkMiddleware());

app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/message', messageRoutes);


app.use(errorHandler);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../../web/build')))

    app.get('/{*any}', (_, res) => {
        res.sendFile(path.resolve(__dirname, '../../web/dist/index.html'))
    })

}


export default app; 