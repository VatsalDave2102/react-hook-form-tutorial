import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

// type for field values
type FormValues = {
	username: string;
	email: string;
	social: {
		instagram: string;
		twitter: string;
	};
};

const UserDetailsForm = () => {
	// for managing forms with ease
	const form = useForm<FormValues>({
		// adds default values to registered fields
		defaultValues: {
			username: "",
			email: "",
			social: {
				instagram: "",
				twitter: "",
			},
		},
	});

	const { register, control, handleSubmit, formState } = form;

	const { errors } = formState; //formstate contains info about entire form state, helps to keep on track with user's interaction

	// function to handle validated form data
	const onSubmitHandler = (formdata: FormValues) => {
		console.log("Form data:", formdata);
	};

	return (
		<div className="p-5 bg-white rounded-md">
			<form
				className="flex flex-col gap-y-2"
				onSubmit={handleSubmit(onSubmitHandler)} // handleSubmit will recieve form data if form validation is successful
				noValidate // disable HTML validation
			>
				<div className="form-control">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						{...register("username", {
							required: { value: true, message: "Username is required" },
						})}
					/>
					{/* to display error messages */}
					<p className="text-red-500">{errors.username?.message}</p>
				</div>
				<div className="form-control">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						{...register("email", {
							required: { value: true, message: "Email is required" },
							pattern: {
								value:
									/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
								message: "Invalid email format",
							},
							validate: {
								noAdmin: (fieldValue) => {
									return (
										fieldValue !== "admin@example.com" ||
										"Enter a different email address"
									);
								},
							},
						})}
					/>
					<p className="text-red-500">{errors.email?.message}</p>
				</div>

				{/* Nested fields */}
				<div className="form-control">
					<label htmlFor="instagram">Instagram</label>
					<input
						type="text"
						id="instagram"
						{...register("social.instagram", {
							required: "Instagram username is required",
						})}
					/>
					<p className="text-red-500">{errors.social?.instagram?.message}</p>
				</div>
				<div className="form-control">
					<label htmlFor="twitter">Twitter</label>
					<input
						type="text"
						id="twitter"
						{...register("social.twitter", {
							required: "Twitter handle is required",
						})}
					/>
					<p className="text-red-500">{errors.social?.twitter?.message}</p>
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
