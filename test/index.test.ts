import test from "ava";
import * as arcane from "../src/index";
import { ArcaneClient } from "../src/client";
import { MissingCredentialsError, BlizzardAPIError } from "../src/errors";

test("exports ArcaneClient class", (t) => {
	t.is(typeof arcane.ArcaneClient, "function");
	t.is(arcane.ArcaneClient, ArcaneClient);
});

test("exports MissingCredentialsError class", (t) => {
	t.is(typeof arcane.MissingCredentialsError, "function");
	t.is(arcane.MissingCredentialsError, MissingCredentialsError);
});

test("exports BlizzardAPIError class", (t) => {
	t.is(typeof arcane.BlizzardAPIError, "function");
	t.is(arcane.BlizzardAPIError, BlizzardAPIError);
});

test("can create ArcaneClient from exports", (t) => {
	const client = new arcane.ArcaneClient({
		BLIZZARD_CLIENT_ID: "test-id",
		BLIZZARD_CLIENT_SECRET: "test-secret",
	});
	t.true(client instanceof ArcaneClient);
	t.true(client instanceof arcane.ArcaneClient);
});

test("can create error classes from exports", (t) => {
	const missingCredsError = new arcane.MissingCredentialsError("test message");
	const apiError = new arcane.BlizzardAPIError("api error", 500);

	t.true(missingCredsError instanceof MissingCredentialsError);
	t.true(missingCredsError instanceof arcane.MissingCredentialsError);
	t.true(apiError instanceof BlizzardAPIError);
	t.true(apiError instanceof arcane.BlizzardAPIError);
});

test("all exports are defined", (t) => {
	t.truthy(arcane.ArcaneClient);
	t.truthy(arcane.MissingCredentialsError);
	t.truthy(arcane.BlizzardAPIError);
});

test("exports have correct names", (t) => {
	t.is(arcane.ArcaneClient.name, "ArcaneClient");
	t.is(arcane.MissingCredentialsError.name, "MissingCredentialsError");
	t.is(arcane.BlizzardAPIError.name, "BlizzardAPIError");
});