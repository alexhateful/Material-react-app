import { TableContainer, Table, TableBody, TableCell, TableRow, TablePagination, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import UsersTableHead from '../components/UsersTableHead';
import { GenderContext } from '../App';

export interface UserData extends Object {
	id: Number;
	name: String;
	email: String;
	gender: String;
	status: String;
	key: keyof this;
}

const Users = () => {
	const gender = useContext(GenderContext);

	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(0);
	const [total, setTotal] = useState(1);
	const [limit, setLimit] = useState(1);
	const [loading, setLoading] = useState(true);

	const getUsers = () => {
		let url = `https://gorest.co.in/public/v2/users?page=${page+1}`;

		if ( gender != 'all' ) {
			url += `&gender=${gender}`;
		}

		setLoading(true);

		fetch(url,{
			headers: new Headers({
				Authorization: 'Bearer 1d4f52e789865963f7c56f2909eb12c85f40e3057b6d8382a337ee8bb30287fc',
				'Content-Type': 'application/json'
			}),
		})
		.then((response) => {
			const page = response.headers.get('X-Pagination-Page');
			if (page != null) {
				setPage(Number(page)-1);
			}
			const total = response.headers.get('X-Pagination-Total');
			if ( total != null ) {
				setTotal(Number(total));
			}
			const limit = response.headers.get('X-Pagination-Limit');
			if ( limit != null ) {
				setLimit(Number(limit));
			}
			return response.json();
		})
		.then(
			result => {
				setUsers( result );
			}
		)
		.finally(() => {
			setLoading(false);
		})
	}

	useEffect(() => {
		getUsers();
	}, [page, gender]);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	return (
		<>
		{ users.length == 0 ? (
			<Box sx={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<CircularProgress />
			</Box>
		) : (
			<>
				{ loading && (
					<Box sx={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<CircularProgress />
					</Box>
				)}
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
					>
						<UsersTableHead />
						<TableBody>
							{ users.map((user: UserData) => (
								<TableRow
								key={user.key}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">{ String(user.id) }</TableCell>
									<TableCell align="right">
										<Link to={`/edit/${user.id}`}>
											{user.name}
										</Link>
									</TableCell>
									<TableCell align="right">{user.email}</TableCell>
									<TableCell align="right">{user.gender}</TableCell>
									<TableCell align="right">{user.status}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					component="div"
					rowsPerPageOptions={[-1]}
					count={total}
					rowsPerPage={limit}
					page={page}
					onPageChange={handleChangePage}
				/>
			</>
		)}
		</>
	)
}

export default Users;