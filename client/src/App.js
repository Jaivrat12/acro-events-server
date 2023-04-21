import { useState } from 'react';

function App() {

	const [images, setImages] = useState([]);
	const [previews, setPreviews] = useState([]);

	const [event, setEvent] = useState(null);

	const onChange = (e) => {

		const images = [];
		const previews = [];
		for (const file of e.target.files) {
			images.push(file);
			previews.push(URL.createObjectURL(file));
		}
		setImages(images);
		setPreviews(previews);
	};

	const createEvent = (data) => {

		images.forEach((image) => {
			data.append('images', image);
		});

		fetch('http://localhost:8000/api/events', {
			method: 'POST',
			body: data,
		}).then(async (response) => {
			const data = await response.json();
			setEvent(data.event);
		}).finally(() => {
			setImages([]);
			setPreviews([]);
			console.log('created');
		});
	};

	const updateEvent = (id, data) => {

		data.append('images', JSON.stringify(event.images));

		images.forEach((image) => {
			data.append('newImages', image);
		});

		fetch(`http://localhost:8000/api/events/${id}`, {
			method: 'PUT',
			body: data,
		}).then(async (response) => {
			const data = await response.json();
			setEvent(data.event);
		}).finally(() => {
			setImages([]);
			setPreviews([]);
			console.log('updated');
		});
	};

	const onSubmit = (e) => {

		e.preventDefault();

		const data = new FormData();
		data.append('title', 'New Event');
		data.append('date', new Date());

		if (!event) {
			createEvent(data);
		} else {
			updateEvent(event._id, data);
		}
	};

	return (

		<>
			<form onSubmit={ onSubmit }>
				<input
					type="file"
					accept="image/*"
					multiple
					onChange={ onChange }
				/>
				<input type="submit" />
			</form>

			{ previews.map((preview) => (
				<img
					key={ preview }
					src={ preview }
					alt=""
					width="100px"
					style={{
						margin: '1rem 0.5rem 1rem 0'
					}}
				/>
			))}

			<h1>Event Images (Click to remove)</h1>
			{ event?.images.map(({ _id, url }) => (
				<img
					key={ _id }
					src={ url }
					alt=""
					width="100px"
					style={{
						margin: '1rem 0.5rem 1rem 0',
						cursor: 'pointer',
					}}
					onClick={ () => {
						setEvent((event) => ({
							...event,
							images: event.images.filter(image => image._id !== _id)
						}));
					}}
				/>
			))}
		</>
	);
}

export default App;