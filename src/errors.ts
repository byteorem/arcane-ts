export class MissingCredentialsError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "MissingCredentialsError";
	}
}

export class BlizzardAPIError extends Error {
	public statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.name = "BlizzardAPIError";
		this.statusCode = statusCode;
	}
}
