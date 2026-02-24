import e from "express";
import { IMascota } from "../models/mascotas.model";
import { Mascota } from "../models/mascotas.model";

export const createMascota = async (data: IMascota) => {
    const mascota = new Mascota(data);
    return await mascota.save();
};

export const getAllMascotas = async () => {
    return await Mascota.find();
}

export const getMascotaById = async (id: string) => {
    return await Mascota.findById(id);
}
export const updateMascota = async (id: string, data: Partial<IMascota>) => {
    return await Mascota.findByIdAndUpdate(id, data, { new: true });
}
export const deleteMascota = async (id: string) => {
    return await Mascota.findByIdAndDelete(id);
};