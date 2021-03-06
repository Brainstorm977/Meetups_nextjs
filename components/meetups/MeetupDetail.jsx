import styles from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
	return (
		<section className={styles.detail}>
			<img src={props.image} alt={props.title} />
			<h1>{props.title}</h1>
			<p>{props.description}</p>
			<address>{props.address}</address>
		</section>
	);
};

export default MeetupDetail;
