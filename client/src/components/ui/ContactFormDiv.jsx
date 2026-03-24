const ContactFormDiv = ({ children, className }) => {
    return (
        <div
            className={`mb-3 block text-xl text-left font-semibold text-[#0081a7] ${className} `}
        >
            {children}
        </div>
    );
};

export default ContactFormDiv;
