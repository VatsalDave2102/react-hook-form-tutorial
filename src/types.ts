// type for field values
export type FormValues = {
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
	gender: "male" | "female" | "other";
};
