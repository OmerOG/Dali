import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";
import Login from "./components/Login";
import Points from "./components/Points";

const socket = io("http://localhost:3000", { autoConnect: false });

function App() {
	const [isConnected, setConnected] = useState(false);

	return (
		<>
			<div className="App">{!isConnected && <Login socket={socket} setConnected={setConnected} />}</div>
			<MapContainer
				style={{ height: "100vh", width: "100wh" }}
				center={[32.24860746369632, 34.90738350609429]}
				zoom={13}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Points socket={socket}/>
			</MapContainer>
		</>
	);
}

export default App;
