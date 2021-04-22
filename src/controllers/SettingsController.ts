import { Request, Response } from "express";

import { SettingsService } from "../services/SettingsService";

class SettingsController {
	async create(req: Request, res: Response): Promise<Response> {
		const { username, chat } = req.body;

		const settingsService = new SettingsService();

		try {
			const setting = await settingsService.create({
				username,
				chat,
			});

			return res.json(setting);
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}
}

export { SettingsController };
