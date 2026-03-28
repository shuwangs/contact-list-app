const FormInput = ({ className = "", ...rest }) => {
	return (
		<input
			className={`w-full rounded-lg border border-2 border-[#0081a7] text-[#f07167] px-4 py-2  ${className}`}
			{...rest}
		/>
	);
};

export default FormInput;
