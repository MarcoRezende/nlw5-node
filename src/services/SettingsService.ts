import { Request, Response } from "express";
import { getCustomRepository, Repository } from "typeorm";

import { SettingsRepository } from "../repositories/SettingsRepository";
import { Setting } from "../entities/Setting";

interface SettingsData {
	chat: boolean;
	username: string;
}

class SettingsService {
	private settingsRepository: Repository<Setting>;

	constructor() {
		this.settingsRepository = getCustomRepository(SettingsRepository);
	}

	async create({ username, chat }: SettingsData): Promise<Setting> {
		const usernameExists = await this.settingsRepository.findOne({ username });

		if (usernameExists)
			throw new Error("This username has already been taken!");

		const setting = await this.settingsRepository.create({
			username,
			chat,
		});

		await this.settingsRepository.save(setting);

		return setting;
	}
}

export { SettingsService };
