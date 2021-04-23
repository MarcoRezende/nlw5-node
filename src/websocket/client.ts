import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';

interface ParamsData {
	email: string;
	text: string;
}

io.on('connect', socket => {
	const connectionsService = new ConnectionsService();
	const usersService = new UsersService();
	const messagesService = new MessagesService();

	socket.on('client_first_access', async params => {
		const socket_id = socket.id;
		const { email, text } = params as ParamsData;

		let user_id;

		const userExists = await usersService.findByEmail(email);

		if (!userExists) {
			const user = await usersService.create(email);

			await connectionsService.create({
				user_id: user.id,
				socket_id,
			});

			user_id = user.id;
		} else {
			user_id = userExists.id;
			const connection = await connectionsService.findByUserId(userExists.id);

			if (!connection) {
				await connectionsService.create({
					user_id: userExists.id,
					socket_id,
				});
			} else {
				connection.socket_id = socket_id;
				await connectionsService.create(connection);
			}
		}

		await messagesService.create({
			user_id,
			text,
		});
	});
});
