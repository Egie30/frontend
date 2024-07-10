import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';

function App() {
  return (
    <Router>
<Navbar bg="dark" variant="dark">
<Container>
<Navbar.Brand href="/">INVENTORY PRODUK</Navbar.Brand>
<Nav className="me-auto">
<Nav.Link href="/">Home</Nav.Link>
<Nav.Link href="/add">Add Inventory</Nav.Link>
</Nav>
</Container>
</Navbar>
<Container className="mt-5">
<Routes>
<Route path="/" element={<InventoryList />} />
<Route path="/add" element={<InventoryForm />} />
<Route path="/edit/:id" element={<InventoryForm />} />
</Routes>
</Container>
</Router>
  );
}

export default App;
