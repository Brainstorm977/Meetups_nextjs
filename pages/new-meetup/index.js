import { useRouter } from "next/router";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
	const router = useRouter();
	async function newMeetupHandler(enteredMeetupData) {
		const response = await fetch("./api/new-meetup", {
			method: "POST",
			body: JSON.stringify(enteredMeetupData),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		console.log(data);
		router.push("/");
	}

	return (
		<>
			<Head>
				<title>Add a new Meetup</title>
				<meta name="description" content="Add a new Meetup" />
			</Head>
			<NewMeetupForm onAddMeetup={newMeetupHandler} />
		</>
	);
};

export default NewMeetupPage;
