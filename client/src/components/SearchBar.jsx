import React, { useState } from "react";
import FormInput from "./ui/FormInput.jsx"
import FormBtn from "./ui/FormBtn.jsx";
import { useUser } from "../context/userContext.jsx";
import { useContact } from "../context/contactContext.jsx";
import { IoMdCloseCircle } from "react-icons/io";

const SearchBar = () => {
	const [keyword, setKeyword] = useState("");
	const { currentUser } = useUser();
	const { fetchSearch, fetchContacts } = useContact();

	const handleChange = (e) => {
		const trimmed = e.target.value.trim()
		setKeyword(trimmed);
	};
	const handleSearch = () => {
		fetchSearch(currentUser.id, keyword);
	};
	const handleClear = () => {
		setKeyword("")
		fetchContacts(currentUser.id, keyword);
	};


	return (
		<div className="flex gap-4">
			<div className="flex gap-4 bg-[#]" >
				<FormInput
					value={keyword}
					onChange={handleChange}
					className="w-full w-lg"
					type="text" placeholder="Search contact..."
				/>
				{keyword && (
					<button
						type="button"
						onClick={handleClear}
						className="text-xl text-gray-400 hover:text-gray-600"
					>
						<IoMdCloseCircle />
					</button>
				)}
			</div>



			<button
				onClick={handleSearch}
				className="rounded-lg bg-[#0081a7] px-5 py-2 text-[#fdfcdc] hover:bg-[#00afb9]"
			>
				Search
			</button>
		</div >
	);
};
export default SearchBar;
