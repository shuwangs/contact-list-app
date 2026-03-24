import React from "react";
import FormInput from "./ui/FormInput.jsx"
import FormBtn from "./ui/FormBtn.jsx";
const SearchBar = () => {
	return (
		<div className="flex search-bar gap-4">
			<FormInput className="w-full w-lg"
				type="text" placeholder="Search contact..." />

			<button className="rounded-lg bg-[#0081a7] px-5 py-2 text-[#fdfcdc] hover:bg-[#00afb9]">Search</button>
		</div>
	);
};
export default SearchBar;
