import ky, { HTTPError, type KyInstance } from "ky";
import slugify from "slugify";
import { BlizzardAPIError, MissingCredentialsError } from "./errors";
import type { CharacterEquipmentResponse } from "./responses";

interface ArcaneClientConfig {
	BLIZZARD_CLIENT_ID: string;
	BLIZZARD_CLIENT_SECRET: string;
	region?: "us" | "eu" | "kr" | "tw";
	locale?: string;
}

interface OAuthTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope?: string;
}

interface CachedToken {
	token: string;
	expiresAt: number;
}

export class ArcaneClient {
	private http: KyInstance;
	private clientId?: string;
	private clientSecret?: string;
	private region: string;
	private cachedToken?: CachedToken;

	constructor(config: ArcaneClientConfig) {
		this.clientId = config.BLIZZARD_CLIENT_ID;
		this.clientSecret = config.BLIZZARD_CLIENT_SECRET;
		this.region = config.region || "us";

		this.http = ky.create({
			prefixUrl: `https://${this.region}.api.blizzard.com`,
			hooks: {
				beforeRequest: [
					async (request) => {
						const token = await this.getAccessToken();
						if (token) {
							request.headers.set("Authorization", `Bearer ${token}`);
						}
					},
				],
			},
		});
	}

	private async getAccessToken(): Promise<string | null> {
		if (!this.clientId || !this.clientSecret) {
			throw new MissingCredentialsError(
				"Blizzard client credentials are required for API access",
			);
		}

		if (this.cachedToken && Date.now() < this.cachedToken.expiresAt) {
			return this.cachedToken.token;
		}

		try {
			const credentials = btoa(`${this.clientId}:${this.clientSecret}`);
			const response = await ky
				.post("https://oauth.battle.net/token", {
					headers: {
						Authorization: `Basic ${credentials}`,
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: "grant_type=client_credentials",
				})
				.json<OAuthTokenResponse>();

			this.cachedToken = {
				token: response.access_token,
				expiresAt: Date.now() + response.expires_in * 1000 - 60000,
			};

			return this.cachedToken.token;
		} catch (error) {
			if (error instanceof HTTPError) {
				throw new BlizzardAPIError(
					`Failed to obtain OAuth token: ${error.message}`,
					error.response.status,
				);
			}
			throw new BlizzardAPIError(`Failed to obtain OAuth token: ${error}`, 500);
		}
	}

	async getCharacterEquipment(
		name: string,
		realm: string,
		locale: string = "en_US",
		namespace?: string,
	): Promise<CharacterEquipmentResponse> {
		const defaultNamespace = `profile-${this.region}`;
		const slugName = slugify(name, {
			lower: true,
		});
		const slugRealm = slugify(realm, {
			lower: true,
		});

		try {
			return await this.http
				.get(`profile/wow/character/${slugRealm}/${slugName}/equipment`, {
					searchParams: {
						namespace: namespace || defaultNamespace,
						locale,
					},
				})
				.json<CharacterEquipmentResponse>();
		} catch (error) {
			if (error instanceof HTTPError) {
				throw new BlizzardAPIError(
					`Failed to fetch character equipment: ${error.message}`,
					error.response.status,
				);
			}
			throw new BlizzardAPIError(
				`Failed to fetch character equipment: ${error}`,
				500,
			);
		}
	}
}
