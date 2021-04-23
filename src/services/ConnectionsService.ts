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
}

export { ConnectionsService };
