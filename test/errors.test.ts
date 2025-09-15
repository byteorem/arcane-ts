import test from "ava";
import { MissingCredentialsError, BlizzardAPIError } from "../src/errors";

test("MissingCredentialsError creates error with correct name and message", (t) => {
	const message = "Credentials are missing";
	const error = new MissingCredentialsError(message);

	t.is(error.name, "MissingCredentialsError");
	t.is(error.message, message);
	t.true(error instanceof Error);
	t.true(error instanceof MissingCredentialsError);
});

test("BlizzardAPIError creates error with correct name, message, and status code", (t) => {
	const message = "API request failed";
	const statusCode = 404;
	const error = new BlizzardAPIError(message, statusCode);

	t.is(error.name, "BlizzardAPIError");
	t.is(error.message, message);
	t.is(error.statusCode, statusCode);
	t.true(error instanceof Error);
	t.true(error instanceof BlizzardAPIError);
});

test("BlizzardAPIError works with different status codes", (t) => {
	const testCases = [
		{ message: "Unauthorized", statusCode: 401 },
		{ message: "Forbidden", statusCode: 403 },
		{ message: "Internal Server Error", statusCode: 500 },
	];

	for (const { message, statusCode } of testCases) {
		const error = new BlizzardAPIError(message, statusCode);
		t.is(error.statusCode, statusCode);
		t.is(error.message, message);
	}
});

test("Error classes have proper prototype chain", (t) => {
	const missingCredsError = new MissingCredentialsError("test");
	const apiError = new BlizzardAPIError("test", 500);

	t.is(missingCredsError.constructor.name, "MissingCredentialsError");
	t.is(apiError.constructor.name, "BlizzardAPIError");
});