// export const loginUser = async (payload) => {
// 	const result = await fetch("/api/continue", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(payload),
// 	});

// 	if (!result.ok) {
// 		throw new Error("Login failed.");
// 	}
// 	const data = await result.json();
// 	console.log("current user is: ", data);
// 	return data.data;
// };

export const loginUser = async (payload) => {
	const result = await fetch("/api/auth/login", {
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
	console.log("current user is: ", data);
	return data.data;
};