import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
	return (
		<>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta
					name="description"
					content={props.meetupData.description}
				/>
			</Head>
			<MeetupDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				description={props.meetupData.description}
				address={props.meetupData.address}
			/>
		</>
	);
};

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		"mongodb+srv://brainstorm:0909@cluster0.mc7uz.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupCollection = db.collection("meetups");

	const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
	client.close();
	return {
		fallback: "blocking",
		paths: meetups.map((meetup) => ({
			params: {
				meetupId: meetup._id.toString(),
			},
		})),
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(
		"mongodb+srv://brainstorm:0909@cluster0.mc7uz.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();
	const meetupCollection = db.collection("meetups");

	const selectedMeetup = await meetupCollection.findOne({
		_id: ObjectId(meetupId),
	});
	client.close();

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				image: selectedMeetup.image,
				address: selectedMeetup.address,
				description: selectedMeetup.description,
			},
		},
	};
}

export default MeetupDetails;
