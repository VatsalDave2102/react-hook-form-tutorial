import { DevTool } from "@hookform/devtools";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";

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
	age: number;
	dob: Date;
};

let renderCount = 0;
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
			age: 0,
			dob: new Date(),
		},
	});

	const { register, control, handleSubmit, formState, watch } = form;

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

	// function to handle form errors
	const onErrorHandler = (error: FieldErrors<FormValues>) => {
		console.log("Form errors:", error);
	};

	// watch method will watch specified inputs and return their values, useful to render input value and for determining what to render by condition
	const watchUserame = watch("username");

	renderCount++;
	return (
		<div className="p-5 bg-white rounded-md max-w-[800px] mx-auto">
			<p>Render count: {renderCount}</p>
			<h1 className="text-3xl font-bold text-center">
				Form owner: {watchUserame}
			</h1>
			<form
				className="flex flex-col gap-y-2"
				onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)} // handleSubmit will recieve form data if form validation is successful
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
							disabled: watchUserame === "",
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
							disabled: watchUserame === "",
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

				{/* input as number */}
				<div className="form-control">
					<label htmlFor="age">Age</label>
					<input
						type="number"
						id="age"
						{...register("age", {
							valueAsNumber: true, // to take input as number
							required: {
								value: true,
								message: "Age is required",
							},
						})}
					/>
					<p className="text-red-500">{errors.age?.message}</p>
				</div>
				{/* input as date field */}
				<div className="form-control">
					<label htmlFor="dob">Date of birth</label>
					<input
						type="date"
						id="dob"
						{...register("dob", {
							valueAsDate: true, // to take input as date
							required: { value: true, message: "Date of birth is required" },
						})}
					/>
					<p className="text-red-500">{errors.dob?.message}</p>
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
