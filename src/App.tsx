import UserDetailsForm from "./components/UserDetailsForm";

function App() {
	return (
		<div className="h-screen bg-black">
			<div className="container mx-auto">
				<h1 className="text-3xl font-bold text-center mb-5 text-white">
					React Hook Form
				</h1>
				<UserDetailsForm />
			</div>
		</div>
	);
}

export default App;
