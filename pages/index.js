import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta
					name="description"
					content="Browse a hude list of highly active React Meetups"
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
};

export async function getStaticProps() {
	//fetch data from MongoDB
	const client = await MongoClient.connect(
		"mongodb+srv://brainstorm:0909@cluster0.mc7uz.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupCollection = db.collection("meetups");

	const meetups = await meetupCollection.find().toArray();

	client.close();
	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				description: meetup.description,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 100,
		//обновление каждые 100 сек
	};
}

export default HomePage;
