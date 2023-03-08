import { createRef } from "react";
import { Socket } from "socket.io-client";

interface Props {
	socket: Socket;
	setConnected: (isConnected: boolean) => void;
}

export default function Login({ socket, setConnected }: Props) {
	const userRef = createRef<HTMLInputElement>();
    const workspaceRef = createRef<HTMLInputElement>();

	const connectSocket = () => {
		socket.auth = { userId: userRef.current?.value };
		socket.connect();
		setConnected(true);
	};

	return (
		<div>
			<input ref={userRef} placeholder="username"></input>
            <input ref={workspaceRef} placeholder="workspace"></input>
			<button onClick={connectSocket}>Connect</button>
		</div>
	);
}
