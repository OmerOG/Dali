import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useState } from "react";
import { Marker, Polyline, useMapEvent } from "react-leaflet";
import { Socket } from "socket.io-client";

interface Props {
	socket: Socket;
}

export default function Points({ socket }: Props) {
	const [points, setPoints] = useState<LatLngExpression[]>([]);

	useMapEvent("dblclick", (e: LeafletMouseEvent) => {
		if (!e.originalEvent.ctrlKey) return;
		setPoints(points => [...points, e.latlng]);

        socket.emit("point:add", {
            
        });
	});

	return (
		<>
			{points.map(point => {
				return <Marker key={point.toString()} position={point}></Marker>;
			})}
			<Polyline positions={points} color="red"></Polyline>
		</>
	);
}
