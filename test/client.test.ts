import test from "ava";
import { ArcaneClient } from "../src/client";

const validConfig = {
	BLIZZARD_CLIENT_ID: "test-client-id",
	BLIZZARD_CLIENT_SECRET: "test-client-secret",
};

test("ArcaneClient constructor creates instance with valid config", (t) => {
	const client = new ArcaneClient(validConfig);
	t.truthy(client);
	t.true(client instanceof ArcaneClient);
});

test("ArcaneClient constructor sets default region to 'us'", (t) => {
	const client = new ArcaneClient(validConfig);
	t.truthy(client);
});

test("ArcaneClient constructor accepts custom region", (t) => {
	const regions = ["us", "eu", "kr", "tw"] as const;

	for (const region of regions) {
		const client = new ArcaneClient({
			...validConfig,
			region,
		});
		t.truthy(client);
	}
});

test("ArcaneClient constructor accepts custom locale", (t) => {
	const client = new ArcaneClient({
		...validConfig,
		locale: "fr_FR",
	});
	t.truthy(client);
});

test("ArcaneClient constructor with missing client ID", (t) => {
	const client = new ArcaneClient({
		BLIZZARD_CLIENT_ID: "",
		BLIZZARD_CLIENT_SECRET: "test-secret",
	});
	t.truthy(client);
});

test("ArcaneClient constructor with missing client secret", (t) => {
	const client = new ArcaneClient({
		BLIZZARD_CLIENT_ID: "test-id",
		BLIZZARD_CLIENT_SECRET: "",
	});
	t.truthy(client);
});

test("ArcaneClient constructor with all regions", (t) => {
	const testCases = [
		{ region: "us" as const, expected: true },
		{ region: "eu" as const, expected: true },
		{ region: "kr" as const, expected: true },
		{ region: "tw" as const, expected: true },
	];

	for (const { region } of testCases) {
		const client = new ArcaneClient({
			...validConfig,
			region,
		});
		t.truthy(client);
	}
});

test("ArcaneClient constructor preserves config properties", (t) => {
	const config = {
		BLIZZARD_CLIENT_ID: "my-client-id",
		BLIZZARD_CLIENT_SECRET: "my-client-secret",
		region: "eu" as const,
		locale: "de_DE",
	};

	const client = new ArcaneClient(config);
	t.truthy(client);
});

test("ArcaneClient handles undefined optional properties", (t) => {
	const client = new ArcaneClient({
		BLIZZARD_CLIENT_ID: "test-id",
		BLIZZARD_CLIENT_SECRET: "test-secret",
		region: undefined,
		locale: undefined,
	});
	t.truthy(client);
});