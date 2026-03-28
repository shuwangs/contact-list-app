export const loginUser = async (payload) => {
	const result = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});
	const data = await result.json();

	if (!result.ok) {
		throw new Error(data.message || "Login failed.");
	}

	return data.data;
};

export const registerUser = async (payload) => {
	const result = await fetch("/api/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});
	const data = await result.json();
	console.log("Register return data are: ", data);
	if (!result.ok) {
		throw new Error(data.message || "Register failed.");
	}
	return data.data;
};
