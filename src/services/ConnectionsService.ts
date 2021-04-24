import { Request, Response } from 'express';
import { getCustomRepository, Repository } from 'typeorm';

import { ConnectionsRepository } from '../repositories/ConnectionsRepository';
import { Connection } from '../entities/Connection';

interface ConnectionData {
	id?: string;
	admin_id?: string;
	user_id: string;
	socket_id: string;
}

class ConnectionsService {
	private connectionsRepository: Repository<Connection>;

	constructor() {
		this.connectionsRepository = getCustomRepository(ConnectionsRepository);
	}

	async create(data: ConnectionData): Promise<Connection> {
		const connection = await this.connectionsRepository.create({
			...data,
		});

		await this.connectionsRepository.save(connection);

		return connection;
	}

	async findByUserId(user_id: string): Promise<Connection> {
		const connection = await this.connectionsRepository.findOne({
			user_id,
		});

		return connection;
	}

	async findAllWithoutAdmin(): Promise<Connection[]> {
		const connection = await this.connectionsRepository.find({
			where: { admin_id: null },
			relations: ['user'],
		});

		return connection;
	}

	async findBySocketID(socket_id: string): Promise<Connection> {
		const connection = await this.connectionsRepository.findOne({
			socket_id,
		});

		return connection;
	}

	async updateAdminID(user_id: string, admin_id: string) {
		await this.connectionsRepository
			.createQueryBuilder()
			.update(Connection)
			.set({ admin_id })
			.where('user_id = :user_id', {
				user_id,
			})
			.execute();
	}
}

export { ConnectionsService };
