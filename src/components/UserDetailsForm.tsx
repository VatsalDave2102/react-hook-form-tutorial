import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

// type for field values
type FormValues = {
	username: string;
	email: string;
};

const UserDetailsForm = () => {
	// for managing forms with ease
	const form = useForm<FormValues>();

	const { register, control, handleSubmit } = form;

	// function to handle validated form data
	const onSubmitHandler = (formdata: FormValues) => {
		console.log("Form data:", formdata);
	};

	return (
		<div className="p-5 bg-white rounded-md">
			<form
				className="flex flex-col gap-y-2"
				onSubmit={handleSubmit(onSubmitHandler)} // handleSubmit will recieve form data if form validation is successful
			>
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
