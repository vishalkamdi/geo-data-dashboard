import { Paper, Typography, Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView({ rows, selectedRow, onMarkerClick }) {
  return (
    <Paper
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
        overflow: "hidden",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={1}>
        🗺️ Project Locations
      </Typography>

      <Box sx={{ flex: 1 }}>
        <MapContainer
          center={[22.7, 75.8]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {rows.map((project) => (
            <Marker
              key={project.id}
              position={[project.latitude, project.longitude]}
              opacity={selectedRow?.id === project.id ? 1 : 0.5}
              eventHandlers={{
                click: () => onMarkerClick(project),
              }}
            >
              <Popup>
                <strong>{project.projectName}</strong>
                <br />
                Status: {project.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Paper>
  );
}
