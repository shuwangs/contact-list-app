const FormDiv = ({ children, className }) => {
	return (
		<div
			className={`rounded-xl border-2px border-[#8ee9dc] shadow-sm ${className} `}
		>
			{children}
		</div>
	);
};

export default FormDiv;
