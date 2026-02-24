import mongoose, { Schema, Document } from 'mongoose';

export interface IMascota extends Document {
    nombre: string;
    tipo: string;
    edad: number;
    raza: string;
    createdAt?: Date;
    updatedAt?: Date;
}


const mascotaSchema = new Schema<IMascota>(
{
    nombre: { type: String, required: true, trim: true },
    tipo: { type: String, required: true, trim: true },
    edad: { type: Number, required: true, min: 0 },
    raza: { type: String, required: true, trim: true },
}, { timestamps: true }
);

mascotaSchema.index({ nombre: 1 });

export const Mascota = mongoose.model<IMascota>('Mascota', mascotaSchema);