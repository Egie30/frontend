import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const InventoryForm = () => {
    const [nama_produk, setNama_Produk] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [harga, setHarga] = useState('');
    const [tgl_masuk, setTgl_Masuk] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchInventoryById = useCallback(async () => {
        const response = await axios.get(`http://localhost:8080/egi/${id}`);
        const { nama_produk, jumlah, harga, tgl_masuk } = response.data;
        setNama_Produk(nama_produk);
        setJumlah(jumlah);
        setHarga(harga);
        setTgl_Masuk(tgl_masuk);
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchInventoryById();
        }
    }, [id, fetchInventoryById]);

    const submitForm = async (e) => {
        e.preventDefault();
        const inventory = { nama_produk, jumlah, harga, tgl_masuk };
        if (id) {
            await axios.put(`http://localhost:8080/egi/${id}`, inventory);
        } else {
            await axios.post('http://localhost:8080/egi', inventory);
        }
        navigate('/');
    };

    return (
        <div>
            <h2 className="my-3">{id ? 'Edit Inventory' : 'Tambah Inventory'}</h2>
            <Form onSubmit={submitForm}>
                <Form.Group controlId="formNama_Produk" className="mb-3">
                    <Form.Label>Nama_Produk</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Masukkan nama_produk"
                        value={nama_produk}
                        onChange={(e) => setNama_Produk(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formJumlah" className="mb-3">
                    <Form.Label>Jumlah</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Masukkan jumlah"
                        value={jumlah}
                        onChange={(e) => setJumlah(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formHarga" className="mb-3">
                    <Form.Label>Harga</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Masukkan harga"
                        value={harga}
                        onChange={(e) => setHarga(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formTgl_Masuk" className="mb-3">
                    <Form.Label>Tgl_Masuk</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Masukkan tgl_masuk"
                        value={tgl_masuk}
                        onChange={(e) => setTgl_Masuk(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default InventoryForm;
