export const validateForm = (formData) => {
    const errors = {}
    const phonePatter = /^\d{3}-\d{3}-\d{4}$/
    if (!formData.firstName.trim()) {
        errors.firstName = "First name is required.";
    }

    if (formData.phoneNumber && !phonePatter.test(formData.phoneNumber)
    ) {
        errors.phoneNumber = "Phone number must be in the format 123-456-7890.";
    }

    return errors;
}