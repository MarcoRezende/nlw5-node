import { Request, Response } from "express";

import { MessagesService } from "../services/MessagesService";

class MessagesController {
	async create(req: Request, res: Response): Promise<Response> {
		const { admin_id, user_id, text } = req.body;

		const messagesService = new MessagesService();

		try {
			const message = await messagesService.create({ admin_id, user_id, text });

			return res.json(message);
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	async showByUser(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const messagesService = new MessagesService();

		try {
			const messages = await messagesService.listByUser(id);

			return res.json(messages);
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}
}

export { MessagesController };
