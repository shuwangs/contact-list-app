import React from "react";
import FormInput from "./ui/FormInput.jsx"

const SearchBar = () => {
	return (
		<div className="search-bar">
			<FormInput className="w-full w-lg"
			 type="text" placeholder="Search contact..." />
		</div>
	);
};
export default SearchBar;
