import React from "react";

const ContactCard = () => {
	return (
		<div className="flex flex-row justify-around">
			<div className="flex flex-row ">
				<div className="text-3xl font-bold pr-4" >nameIcon</div>
				<div >
                    <div>Name</div> 
                    <div>📧 email</div>
                    <div>📱 Phone</div> 
                </div>
			</div>
			<div className="flex flex-row">
				<button>👀</button>
				<button>🗑️</button>
			</div>
		</div>
	);
};

export default ContactCard;
