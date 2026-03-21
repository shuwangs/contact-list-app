const FormLabel = ({children, ...rest}) => {
	return (
		<label
			className="mb-3 block text-xl font-semibold text-teal-700"
            {...rest}
		>
        {children}
		</label>
	);
};

export default FormLabel;
