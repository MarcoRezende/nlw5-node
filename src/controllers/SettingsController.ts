import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SettingsRepository } from '../repositories/SettingsRepository';
import { Setting } from '../entities/Setting';

class SettingsController {
	async create(req: Request, res: Response) {
		const { username, chat } = req.body;

		const settingsRepository = getCustomRepository(SettingsRepository);

		const setting = await settingsRepository.create({
			username, chat
		});

		await settingsRepository.save(setting);

		return res.json(setting);
	}
}

export { SettingsController };