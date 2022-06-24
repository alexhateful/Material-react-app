import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import { UserData } from "../pages/Users";

interface HeadCell {
	id: keyof UserData,
	numeric: Boolean,
	label: String,
}

const headCells: readonly HeadCell[] = [
	{
		id: 'id',
		numeric: false,
		label: 'ID',
	},
	{
		id: 'name',
		numeric: true,
		label: 'Name',
	},
	{
		id: 'email',
		numeric: true,
		label: 'Email',
	},
	{
		id: 'gender',
		numeric: true,
		label: 'Gender',
	},
	{
		id: 'status',
		numeric: true,
		label: 'Status',
	},
];

export default function UsersTableHead() {
	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}