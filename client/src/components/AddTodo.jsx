import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function AddTodo(props) {
    const { addNewTodo } = props
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleAddTodo = (e) => {
        e.preventDefault()
        addNewTodo(title, description)
    }

    return (
        <>
        <Modal show={props.show}>
            <Modal.Header>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleAddTodo}>
                <div class="form-group">
                    <label for="exampleInputEmail1">Title</label>
                    <input type="text" class="form-control" onChange={(e) => setTitle(e.target.value) }/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Description</label>
                    <input type="text" class="form-control" onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <button type="submit" class="btn btn-primary" onClick={() => props.handleShow(false)}>Submit</button>
                <button type="button" class="btn btn-danger ml-1" onClick={() => props.handleShow(false)}>Cancel</button>
            </form>
            </Modal.Body>
        </Modal>
        </>
    );
}
