import * as crypto from 'crypto';

export function passwordHash(password: string) {
	return crypto.createHmac('sha256', '123')
		.update(password)
		.digest('hex');
}