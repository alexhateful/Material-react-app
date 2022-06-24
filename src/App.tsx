import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Edit from './pages/Edit';
import NotFound from './pages/NotFound';
import { AppBar, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Toolbar, Button, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GenderContext = React.createContext('');

export default function App() {
	const [gender, setGender] = React.useState('all');

	const handleGenderChange = (event: SelectChangeEvent) => {
		setGender(event.target.value as string);
	};

	return (
		<>
			<AppBar>
				<Container maxWidth="xl">
					<Toolbar sx={{ p: 3, display: 'flex', justifyContent: 'space-between' }}>
						<Box>
							<Button component={RouterLink} to="/" variant="contained">
								Home
							</Button>
							&nbsp;
							<Button component={RouterLink} to="/users" variant="contained">
								Users
							</Button>
						</Box>
						<FormControl variant="standard" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<span>Gender: </span>
							<Select
								labelId="gender"
								id="gender"
								value={gender}
								label="Age"
								onChange={handleGenderChange}
								sx={{marginInlineStart:3, color: 'white', svg: {fill: 'white'}, before: { borderColor: 'white' } }}
							>
								<MenuItem value={'all'}>All</MenuItem>
								<MenuItem value={'male'}>Male</MenuItem>
								<MenuItem value={'female'}>Female</MenuItem>
							</Select>
						</FormControl>
					</Toolbar>
				</Container>
			</AppBar>
			<Container maxWidth="xl">
				<Box component="main" sx={{ pt: 15, position: 'relative' }}>
					<ToastContainer />
					<Routes>
						<Route path="/" element={ <Home /> } />
						<Route path="/users" element={
							<GenderContext.Provider value={gender}>
								<Users />
							</GenderContext.Provider>
						} />
						<Route path="/edit/:id" element={ <Edit /> } />
						<Route path="*" element={ <NotFound /> } />
						<Route path="/Material-react-app" element={ <Home /> } />
					</Routes>
				</Box>
			</Container>
		</>
	);
}
