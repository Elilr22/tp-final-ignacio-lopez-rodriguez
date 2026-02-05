import bcrypt from 'bcrypt';
import * as userModel from '../models/users.model';
import jwt, { SignOptions } from 'jsonwebtoken';
//ESTO SE VE EN TYPES PARA VER QUE VALIDACION QUE ES LO QUE TE VOY A DEVOLVER EN EL TOKEN 
import { JwtPayload, UserRole } from '../types/auth';

//ESTO ME CURA DE ERRORES SI NO TENGO LA CONTRASENA EN .ENV
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET no definido');
}
//PARA GUARDAR LA INSTANCIA DE LA CONTRASENA NADA MAS 
const secretKey: string = process.env.JWT_SECRET;


export const register = async (
  username: string,
  email: string,
  password: string
): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await userModel.createUser({
    username,
    email,
    password: hashedPassword,
  });

  return userId;
};


export const login = async (
  email: string,
  password: string
): Promise<string> => {
  //CONSTANCIA DE ERROR
  const invalidCredentialsError = new Error('Credenciales inválidas');

  //BUSCAMOS EN EL MODELO LA FUNCION DE BUSCAR LE PASAMOS EL MAIL Y SI NO ENCUENTRA NADA ERROR
  const user = await userModel.findUser(email);
  if (!user) throw invalidCredentialsError;

  // COMPARA SI LAS CONTRASENAS SE HASHEAN 
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw invalidCredentialsError;

  /**
   * Payload del token JWT
   * Contiene la información básica del usuario
   */
  const payload: JwtPayload = {
    id: user.id,
    username: user.username,
    role: user.role as UserRole,
  };

  /**
   * Configuración del token JWT
   * expiresIn: tiempo de expiración
   * issuer: emisor del token
   */
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || '1h',
    issuer: 'curso-utn-backend',
  };

  /**
   * Generación del token JWT
   * Se firma el payload con el secreto y las opciones definidas
   */
  return jwt.sign(payload, secretKey, options);
};
