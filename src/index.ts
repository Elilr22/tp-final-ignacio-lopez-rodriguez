import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors'

import 'dotenv/config';
import authRoutes from './routes/auth.routes';
import { authenticate, authorize } from './middlewares/auth.middleware';
import { connectDB } from './config/database';
import { errorHandler } from './middlewares/error.middleware';
import { AppError } from './types/appError';
import mascotasRoutes from './routes/mascotas.routes';



const app = express();

//va y busca en .env el PORT
const PORT = process.env.PORT || 3000;


app.use(cors())
//esto me permite recibir jason
app.use(express.json());
//esto me permite mostrar los archivos estaticos 
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/auth', authRoutes);
app.use(errorHandler);



app.get('/public', (req: Request, res: Response) => {
  res.json({
    message: 'Cualquiera puede entrar!',
  });
});

//esta ruta requiere autenticación pero cualquier usuario autenticado puede acceder
app.get('/protected', authenticate, (req, res) => {
  res.json({
    message: 'Acceso permitido esta es la ruta protegida',
  });
});

// Ruta de administrador (requiere autenticación y rol admin)
app.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({
    message: 'Acceso de administrador permitido esta es la ruta de admin',
  });
});




app.use('/api/mascotas', mascotasRoutes);




app.get('/api/test-error', (req, res, next) => {
  next(new AppError('Este es un error de prueba!', 418));
});











//con esto nos conectamos cuando la base de datos ya esta levantado 
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
  });
});
