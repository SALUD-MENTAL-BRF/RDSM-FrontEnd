// import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'User name', width: 170 }, 
  { field: 'email', headerName: 'Email', width: 150 },
  {
    field: 'imageUrl',
    headerName: 'Image Url',
    width: 150,
    renderCell: (params) => (
      <img src={params.value} alt="User Image" style={{ width: 52, height: 52, borderRadius: 50 }} />
    )
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 150,
  }
];

const rows = [
  { id: 1, username: 'Snow', email: 'Jon', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzw_Ti47ovNmMbRwz3HaY7hDhHFeAmER6kw&s', role: 'Admin' },
  { id: 2, username: 'Lannister', email: 'Cersei', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzw_Ti47ovNmMbRwz3HaY7hDhHFeAmER6kw&s', role: 'Admin' }, 
  { id: 3, username: 'Lannister', email: 'Jaime', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzw_Ti47ovNmMbRwz3HaY7hDhHFeAmER6kw&s', role: 'Admin' }, 
  { id: 4, username: 'Stark', email: 'Arya', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzw_Ti47ovNmMbRwz3HaY7hDhHFeAmER6kw&s', role: 'Admin' },
  { id: 5, username: 'Targaryen', email: 'Daenerys', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzw_Ti47ovNmMbRwz3HaY7hDhHFeAmER6kw&s', role: 'Admin' },
  { id: 6, username: 'Melisandre', email: null, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzw_Ti47ovNmMbRwz3HaY7hDhHFeAmER6kw&s', role: 'Admin' }, 
  { id: 7, username: 'Clifford', email: 'Ferrara', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzw_Ti47ovNmMbRwz3HaY7hDhHFeAmER6kw&s', role: 'Admin' },
  { id: 8, username: 'Frances', email: 'Rossini', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzw_Ti47ovNmMbRwz3HaY7hDhHFeAmER6kw&s', role: 'Admin' }, 
  { id: 9, username: 'Roxie', email: 'Harvey', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzw_Ti47ovNmMbRwz3HaY7hDhHFeAmER6kw&s', role: 'Admin' }, 
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '90%', marginLeft: 60, marginTop: 10}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
