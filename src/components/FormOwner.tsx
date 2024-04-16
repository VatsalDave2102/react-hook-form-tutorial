import { Control, useWatch } from "react-hook-form";
import { FormValues } from "../types";

export const FormOwner = ({ control }: { control: Control<FormValues> }) => {
	const firstName = useWatch({
		control,
		name: "username",
		defaultValue: "",
	});
	return (
		<h1 className="text-3xl font-bold text-center">Form owner: {firstName}</h1>
	);
};
