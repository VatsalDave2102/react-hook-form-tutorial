import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

const UserDetailsForm = () => {
	// for managing forms with ease
	const form = useForm();

	const { register, control } = form;

	// register method allows registering an input element and apply validation rules to react hook form,
	// register itself return 4 properties, rather than this destructure register on the input itself
	// const { name, ref, onBlur, onChange } = register("username");

	return (
		<div className="p-5 bg-white rounded-md">
			<form className="flex flex-col gap-y-2">
				<div className="form-control">
					<label htmlFor="username">Username</label>
					<input type="text" id="username" {...register("username")} />
				</div>
				<div className="form-control">
					<label htmlFor="email">Email</label>
					<input type="email" id="email" {...register("email")} />
				</div>
				<div>
					<button className="px-4 py-2 bg-indigo-700 text-white rounded-md">
						Submit
					</button>
				</div>
			</form>
			<DevTool control={control} />
		</div>
	);
};

export default UserDetailsForm;
