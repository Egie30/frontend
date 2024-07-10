import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

const InventoryList = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        const response = await axios.get('http://localhost:8080/egi');
        setInventory(response.data);
    };

    const deleteInventory = async (id) => {
        await axios.delete(`http://localhost:8080/egi/${id}`);
        fetchInventory();
    };

    return (
        <div>
            <h2 className="my-3">Inventory</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nama_Produk</th>
                        <th>Jumlah</th>
                        <th>Harga</th>
                        <th>Tgl_Masuk</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((inventory) => (
                        <tr key={inventory.id}>
                            <td>{inventory.nama_produk}</td>
                            <td>{inventory.jumlah}</td>
                            <td>{inventory.harga}</td>
                            <td>{inventory.tgl_masuk}</td>
                            <td>
                                <Link to={`/edit/${inventory.id}`} className="btn btn-warning me-2">Edit</Link>
                                <Button variant="danger" onClick={() => deleteInventory(inventory.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default InventoryList;
