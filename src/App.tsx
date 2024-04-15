import UserDetailsForm from "./components/UserDetailsForm";

function App() {
	return (
		<div className="h-screen bg-gradient-to-r from-indigo-500">
			<div className="container mx-auto">
				<h1 className="text-3xl font-bold text-center mb-5">React Hook Form</h1>
				<UserDetailsForm />
			</div>
		</div>
	);
}

export default App;
