import { Request, Response } from 'express';
import { getCustomRepository, Repository } from 'typeorm';

import { MessagesRepository } from '../repositories/MessagesRepository';
import { Message } from '../entities/Message';

interface MessageData {
	admin_id?: string;
	user_id: string;
	text: string;
}

class MessagesService {
	private messagesRepository: Repository<Message>;

	constructor() {
		this.messagesRepository = getCustomRepository(MessagesRepository);
	}

	async create({ admin_id, user_id, text }: MessageData): Promise<Message> {
		const message = await this.messagesRepository.create({
			admin_id,
			user_id,
			text,
		});

		await this.messagesRepository.save(message);

		return message;
	}

	async listByUser(user_id: string): Promise<Message[]> {
		const list = await this.messagesRepository.find({
			where: { user_id },
			relations: ['user'],
		});

		console.log(list);

		return list;
	}
}

export { MessagesService };
