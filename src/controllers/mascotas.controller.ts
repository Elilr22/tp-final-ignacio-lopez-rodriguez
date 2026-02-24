import { Request, Response } from 'express';
import * as mascotaService from '../services/mascotas.service';
import { IMascota } from '../models/mascotas.model';

export const createMascota = async (req: Request, res: Response) => {
    try {
        console.log('createMascota');
        const mascotaData: IMascota = req.body;
        console.log(mascotaData)
        const mascota = await mascotaService.createMascota(mascotaData);
        return res.status(201).json(mascota);

    } catch (error: any) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json('duplicate key error');
        }
        return res.status(500).json('algo paso :(');
    }
};


export const getAllMascotas = async (req: Request, res: Response) => {
    try {
        console.log('getAllMascotas');
        const mascotas = await mascotaService.getAllMascotas();
        return res.status(200).json(mascotas);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener mascotas' });
    }
};

export const getMascotaById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        console.log('getMascotaById');
        console.log(req.params);
        const mascota = await mascotaService.getMascotaById(id);
        if (!mascota) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        return res.status(200).json(mascota);
    } catch (error) {
        return res.status(500).json({ error: `Error al obtener la mascota ${id}` });
    }
};


export const updateMascota = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        console.log('updateMascota');
        const mascotaData: IMascota = req.body;
        const mascota = await mascotaService.updateMascota(id, mascotaData);
        if (!mascota) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        return res.status(200).json(mascota);
    } catch (error) {
        return res.status(400).json({ error: `Error al actualizar la mascota ${id}` });
    }
};

export const deleteMascota = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        console.log('deleteMascota');
        const mascota = await mascotaService.deleteMascota(id);
        if (!mascota) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        return res.status(200).json(mascota);
    } catch (error) {
        return res.status(500).json({ error: `Error al eliminar la mascota ${id}` });
    }

};