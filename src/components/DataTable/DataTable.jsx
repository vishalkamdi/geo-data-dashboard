import { useMemo, useState, memo } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";

const StatusBadge = ({ status }) => (
  <Chip
    size="small"
    label={status}
    color={status === "Active" ? "success" : "error"}
  />
);

const TableRow = memo(function TableRow({ row, isSelected, onSelect }) {
  return (
    <Box
      onClick={() => onSelect(row)}
      sx={{
        p: 1.5,
        mb: 1,
        borderRadius: 1,
        cursor: "pointer",
        border: "1px solid",
        borderColor: isSelected ? "primary.main" : "divider",
        backgroundColor: isSelected ? "rgba(79,70,229,0.15)" : "transparent",
      }}
    >
      <Typography fontWeight={600}>{row.projectName}</Typography>

      <Typography variant="caption" color="text.secondary">
        Updated: {row.lastUpdated}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography variant="caption">
          Lat: {row.latitude.toFixed(2)} | Lng: {row.longitude.toFixed(2)}
        </Typography>
        <StatusBadge status={row.status} />
      </Box>
    </Box>
  );
});

export default function DataTable({ rows, loading, selectedRow, onRowSelect }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const filteredRows = useMemo(() => {
    let data = rows.filter((r) =>
      r.projectName.toLowerCase().includes(search.toLowerCase()),
    );

    if (status !== "All") {
      data = data.filter((r) => r.status === status);
    }

    if (sortBy === "name") {
      data.sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else {
      data.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
    }

    return data;
  }, [rows, search, status, sortBy]);

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
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Projects
      </Typography>

      <TextField
        size="small"
        placeholder="Search project..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 1.5 }}
      />

      <Select
        size="small"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ mb: 1.5 }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </Select>

      <Select
        size="small"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="name">Sort by Name</MenuItem>
        <MenuItem value="date">Sort by Last Updated</MenuItem>
      </Select>

      {/* Scroll Area */}
      <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          filteredRows.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              isSelected={selectedRow?.id === row.id}
              onSelect={onRowSelect}
            />
          ))
        )}
      </Box>
    </Paper>
  );
}
