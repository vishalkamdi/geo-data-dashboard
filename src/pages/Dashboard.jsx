import { useState, useEffect } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";

import { useGeoData } from "../hooks/useGeoData";
import DataTable from "../components/DataTable/DataTable";
import MapView from "../components/MapView/MapView";

const PAGE_SIZE = 200;

export default function Dashboard() {
  const [page, setPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const { rows, total, loading } = useGeoData(page, PAGE_SIZE);

  useEffect(() => {
    setSelectedProject(null);
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        p: 3,
        overflow: "hidden", //
      }}
    >
      {/* Header */}
      <Typography variant="h4" fontWeight="bold">
        🌍 Geo Data Dashboard
      </Typography>
      <Typography color="text.secondary">
        Real-time project locations & status overview
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "420px 1fr",
          gap: 3,
          overflow: "hidden",
        }}
      >
        <DataTable
          rows={rows}
          loading={loading}
          selectedRow={selectedProject}
          onRowSelect={setSelectedProject}
        />

        <MapView
          rows={rows}
          selectedRow={selectedProject}
          onMarkerClick={setSelectedProject}
        />
      </Box>

      {/* Pagination */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          Prev
        </Button>

        <Button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>

        <Typography sx={{ ml: 2 }}>
          Showing {rows.length} of {total} records
        </Typography>

        <Typography color="text.secondary">
          Page {page + 1} of {totalPages}
        </Typography>
      </Box>
    </Box>
  );
}
