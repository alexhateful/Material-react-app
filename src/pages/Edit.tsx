import { Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = () => {
	const params = useParams();
	const id = params.id;
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState( Object );
	const navigate = useNavigate();

	useEffect(() => {
		let url = `https://gorest.co.in/public/v2/users/${id}`;

		setLoading(true);

		fetch(url, {
			headers: new Headers({
				Authorization: 'Bearer 1d4f52e789865963f7c56f2909eb12c85f40e3057b6d8382a337ee8bb30287fc',
				'Content-Type': 'application/json'
			}),
		})
		.then((response) => {
			if ( response.status === 404 ) {
				toast(`ERROR: User not found`);
				navigate("/notfound", { replace: true });
			}
			return response.json();
		})
		.then(
			( result ) => {
				setUser( result );
			}
		)
		.finally(() => {
			setLoading(false);
		})
	}, [])

	const handleSubmit = ( event: React.SyntheticEvent ) => {
		event.preventDefault();

		let url = `https://gorest.co.in/public/v2/users/${id}`;

		const target = event.target as typeof event.target & {
			name: { value: string };
			email: { value: string };
			gender: { value: string };
			status: { value: string };
		};

		fetch(url, {
			method: 'put',
			headers: new Headers({
				Authorization: 'Bearer 1d4f52e789865963f7c56f2909eb12c85f40e3057b6d8382a337ee8bb30287fc',
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({
				id: user.id,
				name: target.name.value,
				email: target.email.value,
				gender: target.gender.value,
				status: target.status.value
			})
		})
		.then((response) => {
			if (response.status == 200) {
				toast('User updated!');
				navigate("/users", { replace: true });
			} else {
				toast(`ERROR: User not found`);
			}
		})
	}

	return (
		<>
		{ loading ? (
			<Box sx={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<CircularProgress />
			</Box>
		) : (
			<>
				<h1>Edit user {id}</h1>
				<Box sx={{ maxWidth: '300px' }}>
					<form onSubmit={handleSubmit}>
						<FormControl sx={{ pb: 3, width: '100%' }}>
							<FormLabel id="gender-label">Name</FormLabel>
							<TextField id="name" name="name" variant="standard" defaultValue={user.name} />
						</FormControl>
						<FormControl sx={{ pb: 3, width: '100%' }}>
							<FormLabel id="gender-label">Email</FormLabel>
							<TextField id="email" name="email" variant="standard" defaultValue={user.email} />
						</FormControl>
						<FormControl sx={{ pb: 3, width: '100%' }}>
							<FormLabel id="gender-label">Gender</FormLabel>
							<RadioGroup
								aria-labelledby="gender-label"
								defaultValue={user.gender}
								name="gender"
							>
								<FormControlLabel value="female" control={<Radio />} label="Female" />
								<FormControlLabel value="male" control={<Radio />} label="Male" />
							</RadioGroup>
						</FormControl>
						<FormControl sx={{ pb: 3, width: '100%' }}>
							<FormLabel id="status-label">Status</FormLabel>
							<RadioGroup
								aria-labelledby="status-label"
								defaultValue={user.status}
								name="status"
							>
								<FormControlLabel value="active" control={<Radio />} label="Active" />
								<FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
							</RadioGroup>
						</FormControl>
						<Button variant="contained" type="submit">Update</Button>
					</form>
				</Box>
			</>
		)}
		</>
	)
}

export default Edit;
