import { DevTool } from "@hookform/devtools";
import { useForm, useFieldArray } from "react-hook-form";

// type for field values
type FormValues = {
	username: string;
	email: string;
	social: {
		instagram: string;
		twitter: string;
	};
	phoneNumbers: string[]; // to store two phone numbers of users

	// to dynamically add hobbies
	hobbies: {
		hobby: string;
	}[];
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
			phoneNumbers: ["", ""],
			hobbies: [{ hobby: "" }],
		},
	});

	const { register, control, handleSubmit, formState } = form;

	const { errors } = formState; //formstate contains info about entire form state, helps to keep on track with user's interaction

	// useFieldArray to add fields dynamically
	const { fields, append, remove } = useFieldArray({
		name: "hobbies",
		control,
	});

	// function to handle validated form data
	const onSubmitHandler = (formdata: FormValues) => {
		console.log("Form data:", formdata);
	};

	return (
		<div className="p-5 bg-white rounded-md max-w-[800px] mx-auto">
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
							required: {
								value: true,
								message: "Instagram username is required",
							},
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
							required: {
								value: true,
								message: "Twitter handle is required",
							},
						})}
					/>
					<p className="text-red-500">{errors.social?.twitter?.message}</p>
				</div>

				{/* Array fields */}
				<div className="form-control">
					<label htmlFor="primary-phone">Primary phone number</label>
					<input
						type="text"
						id="primary-phone"
						{...register("phoneNumbers.0", {
							required: {
								value: true,
								message: "Primary phone number is required",
							},
						})}
					/>
					<p className="text-red-500">
						{errors.phoneNumbers ? errors.phoneNumbers[0]?.message : ""}
					</p>
				</div>
				<div className="form-control">
					<label htmlFor="secondary-phone">Secondary phone number</label>
					<input
						type="text"
						id="secondary-phone"
						{...register("phoneNumbers.1", {
							required: {
								value: true,
								message: "Secondary phone number is required",
							},
						})}
					/>
					<p className="text-red-500">
						{errors.phoneNumbers ? errors.phoneNumbers[1]?.message : ""}
					</p>
				</div>

				{/* dynamic fields */}
				<label htmlFor="hobbies">Hobbies</label>
				<div>
					{/* mapping through dynamic fields */}
					{fields.map((field, index) => {
						return (
							<div key={field.id}>
								<input
									type="text"
									className="mb-2 w-full"
									{...register(`hobbies.${index}.hobby` as const, {
										required: {
											value: true,
											message: "Field cannot be empty",
										},
									})}
								/>
								<p className="text-red-500">
									{errors.hobbies ? errors.hobbies[index]?.hobby?.message : ""}
								</p>
								{/* if more than one field, show remove button */}
								{index > 0 && (
									<button
										type="button"
										onClick={() => remove(index)}
										className="px-4 py-2 bg-indigo-700 text-white rounded-md mb-2"
									>
										Remove
									</button>
								)}
							</div>
						);
					})}

					{/* button to add another dynamic field */}
					<button
						type="button"
						onClick={() => append({ hobby: "" })}
						className="px-4 py-2 bg-indigo-700 text-white rounded-md "
					>
						Add another hobby
					</button>
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
