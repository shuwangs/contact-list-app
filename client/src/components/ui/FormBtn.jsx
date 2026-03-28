const FormBtn = ({ children, className = "", ...rest }) => {
	return (
		<button
			className={`w-full rounded-lg border border-2 border-[#0081a7] bg-[#0081a7]
                text-[#fdfcdc] font-bold px-4 py-2 hover:bg-[#f07167] ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
};

export default FormBtn;
