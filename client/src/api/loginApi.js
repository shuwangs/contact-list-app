export const loginUser = async (payload) => {
	const result = fetch("/api/continue", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!result.ok) {
		throw new Error("Login failed.");
	}
	const data = await result.json();
	return data;
};
