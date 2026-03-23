export const getInitials = (contact) => {
    if (!contact) return "?";

    const first =
        contact.first_name || contact.firstName || "";

    const last =
        contact.last_name || contact.lastName || "";

    const firstInitial = first.charAt(0).toUpperCase();
    const lastInitial = last.charAt(0).toUpperCase();

    return (firstInitial + lastInitial) || "?";
};