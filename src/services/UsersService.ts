import { Request, Response } from 'express';
import { getCustomRepository, Repository } from 'typeorm';

import { UsersRepository } from '../repositories/UsersRepository';
import { User } from '../entities/User';

class UsersService {
	private usersRepository: Repository<User>;

	constructor() {
		this.usersRepository = getCustomRepository(UsersRepository);
	}

	async create(email: string): Promise<User> {
		const userExists = await this.usersRepository.findOne({ email });

		if (userExists) return userExists;

		const user = await this.usersRepository.create({
			email,
		});

		await this.usersRepository.save(user);

		return user;
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.usersRepository.findOne({ email });

		return user;
	}
}

export { UsersService };
