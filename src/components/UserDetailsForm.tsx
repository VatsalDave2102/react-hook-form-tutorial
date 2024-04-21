import { DevTool } from "@hookform/devtools";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { FormValues } from "../types";
import { FormOwner } from "./FormOwner";

let renderCount = 0;
const UserDetailsForm = () => {
	// for managing forms with ease. It takes one object as optional argument,
	// which allows user to configure the validation strategy before a user submits the form,
	// validation occues during onSubmit event. For more info https://www.react-hook-form.com/api/useform/
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
			gender: "female",
			color: ["red"],
			weather: "sunny",
		},
		mode: "onBlur", // validation mode, i.e. fields will get validate when user shifts focus from field
	});

	const {
		register,
		control,
		handleSubmit,
		formState,
		reset,
		trigger,
		getValues,
	} = form;

	// register allows to register an input/select element and apply validation rules to the field,
	// by invoking the register function and supplying input's name,
	// we receive following methods: name, ref, onBlue, onChange.
	// We'll use these methods to register username input field by passing them as props.

	// But there's a simpler way, that is to directly destructure register function in input field, that way we can have less and clean code.

	// register function also takes optional argument in the form of RegisterOptions,
	// which is for validation properties such as required, validate, minLength, maxLength.
	// For more info about register https://www.react-hook-form.com/api/useform/register/
	const { name, ref, onBlur, onChange } = register("username", {
		required: {
			value: true,
			message: "Username is required",
		},
		minLength: {
			value: 1,
			message: "Username must be atleast to 1 character",
		},
	});

	// formstate contains info about entire form state, helps to keep on track with user's interaction.
	// For more info https://www.react-hook-form.com/api/useform/formstate/
	const { errors, isDirty, isValid, isSubmitting, submitCount } = formState;

	// useFieldArray to add fields dynamically
	const { fields, append, remove } = useFieldArray({
		name: "hobbies",
		control,
	});

	// function to handle validated form data, if form submitted with valid data, form data will be displayed in console
	const onSubmitHandler = (formdata: FormValues) => {
		console.log("Form data:", formdata);
	};

	// function to handle form errors, if form submitted with invalid data, form errors will be displayed in console
	const onErrorHandler = (error: FieldErrors<FormValues>) => {
		console.log("Form errors:", error);
	};

	const username = getValues("username");
	renderCount++;
	return (
		<div className="p-5 bg-white rounded-md max-w-[800px] mx-auto">
			<p>Render count: {renderCount}</p>
			<p>Successful submit count: {submitCount}</p>
			<FormOwner control={control} />
			<form
				className="flex flex-col gap-y-2"
				// handleSubmit will recieve form data if form validation is successful, provided that validation has been applied,
				// if validation fails it receives form error object.
				// handleSubmit also accept two callbacks for submitHandler and errorHandler respectively,
				// these callbacks execute upon form submission and input validation
				// For more info https://www.react-hook-form.com/api/useform/handlesubmit/
				onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}
				noValidate // disable HTML validation
			>
				<div className="form-control">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						name={name}
						ref={ref}
						onChange={onChange}
						onBlur={onBlur}
					/>
					{/* to display error messages */}
					<p className="text-red-500">{errors.username?.message}</p>
				</div>
				<div className="form-control">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						// destructuring register function on field itself to reduce code
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
							disabled: username === "",
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
							disabled: username === "",
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
				<label>Hobbies</label>
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

				{/* select field */}
				<div className="form-control">
					<label htmlFor="gender">Gender</label>
					<select id="gender" {...register("gender")}>
						<option value="female">Female</option>
						<option value="male">Male</option>
						<option value="other">Other</option>
					</select>
				</div>

				{/* Checkbox fields */}
				<div className="form-control">
					<label htmlFor="color">Favorite colors</label>
					<div className="flex items-center gap-x-2">
						<label htmlFor="red">Red</label>
						<input
							type="checkbox"
							value="red"
							{...register("color", {
								required: { value: true, message: "Color is required" },
							})}
						/>
						<label htmlFor="blue">Blue</label>

						<input
							type="checkbox"
							value="blue"
							{...register("color", {
								required: { value: true, message: "Color is required" },
							})}
						/>
						<label htmlFor="green">Green</label>

						<input
							type="checkbox"
							value="green"
							{...register("color", {
								required: { value: true, message: "Color is required" },
							})}
						/>
					</div>
					<p className="text-red-500">{errors.color?.message}</p>
				</div>

				{/* Radio fields */}
				<div className="form-control">
					<label htmlFor="weather">Favorite Weather</label>
					<div className="flex items-center gap-x-3">
						<label htmlFor="sunny">Sunny</label>
						<input
							type="radio"
							id="sunny"
							value="sunny"
							{...register("weather")}
						/>
						<label htmlFor="sunny">Rain</label>
						<input
							type="radio"
							id="rain"
							value="rain"
							{...register("weather")}
						/>
						<label htmlFor="sunny">Cold</label>
						<input
							type="radio"
							id="cold"
							value="cold"
							{...register("weather")}
						/>
					</div>
				</div>

				<div className="flex flex-start gap-x-3">
					<button
						className="px-4 py-2 bg-indigo-700 text-white rounded-md disabled:bg-indigo-500 disabled:cursor-default"
						disabled={!isDirty || !isValid || isSubmitting} // disable form if not dirty or if not valid
					>
						Submit
					</button>
					<button
						type="button"
						className="px-4 py-2 bg-indigo-700 text-white rounded-md disabled:bg-indigo-500 disabled:cursor-default"
						onClick={() => reset()} // reset the form values to default
					>
						Reset
					</button>
					<button
						type="button"
						className="px-4 py-2 bg-indigo-700 text-white rounded-md"
						onClick={() => trigger()} // will trigger field validation, for specific fields, pass them as argument
					>
						Trigger Validation
					</button>
				</div>
			</form>
			<DevTool control={control} />
		</div>
	);
};

export default UserDetailsForm;
