import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<>
		<h1>No Page Found</h1>
		<Link to="/">Back to Home</Link>
		</>
	)
}

export default NotFound;