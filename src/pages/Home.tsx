import { Button } from "@mui/material";


const Home = () => {
	return (
		<>
			<h1>Hello, visitor!</h1>
			<p>This is an example of a react app using <a href="https://mui.com/material-ui/getting-started/overview/" target="_blank">Material UI</a></p>
			<p>To start browsing click on <Button variant="contained">USERS</Button> in navbar</p>
			<p>You can filter result by <Button variant="contained">GENDER</Button> at top right select</p>
		</>
	)
}

export default Home;