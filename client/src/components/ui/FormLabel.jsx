const FormLabel = ({ children, className = "", ...rest }) => {
	return (
		<label
			className="mb-3 block text-xl font-semibold text-[#05668d]"
			{...rest}
		>
			{children}
		</label>
	);
};

export default FormLabel;
