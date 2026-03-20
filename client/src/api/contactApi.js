export const getContacts = async (userId) => {
	const result = await fetch(`/api/contacts/user/${userId}`);

	if (!result.ok) {
		throw new Error("Login failed.");
	}
	const data = await result.json();
	return data;
};

export const createContact = async (newContact) => {
    const result = await fetch(`/api/contacts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newContact),
    });

	if (!result.ok) {
		throw new Error("Add Contact failed.");
	}
	const data = await result.json();
	return data;
}
export const updateContactById = async (contactId, updatedContact ) => {
    const result = await fetch(`/api/contacts/${contactId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedContact),
    });

	if (!result.ok) {
		throw new Error("Update Contact failed.");
	}
	const data = await result.json();
	return data;
}

export const deleteContactById = async (contactId ) => {
    const result = await fetch(`/api/contacts/${contactId}`, {
        method: "DELETE",
    });

	if (!result.ok) {
		throw new Error("Delete Contact failed.");
	}
	const data = await result.json();
	return data;
}