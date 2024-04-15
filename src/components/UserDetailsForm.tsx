const UserDetailsForm = () => {
	return (
		<div className="p-5 bg-white rounded-md">
			<form className="flex flex-col gap-y-2">
				<div className="form-control">
					<label htmlFor="username">Username</label>
					<input type="text" id="username" name="username" />
				</div>
				<div className="form-control">
					<label htmlFor="username">Username</label>
					<input type="text" id="username" name="username" />
				</div>
				<div className="form-control">
					<label htmlFor="username">Username</label>
					<input type="text" id="username" name="username" />
				</div>
				<div>
					<button className="px-4 py-2 bg-indigo-700 text-white rounded-md">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default UserDetailsForm;
