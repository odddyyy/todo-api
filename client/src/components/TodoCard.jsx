import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const SERVER = 'http://localhost:3001'

export default function TodoCard(props) {
    const deleteTodo = async (id) => {    
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            if (result.value) {
                const { data } = await axios({
                    method: 'DELETE',
                    url: `${SERVER}/todos/${id}`,
                    headers: {token:localStorage.token}
                })
                Swal.fire({
                    icon: 'success',
                    title: data,
                    showConfirmButton: false,
                    timer:700
                })
            }
        } catch (err) {
            console.log(err)
        }

    }
    
    const updateTodo = async (id, title, description) => {
        const { data } = await axios({
            method: 'PATCH',
            url: `${SERVER}/todos/${id}`,
            headers: {token:localStorage.token},
            data: {
                title,
                description,
                status: true
            }
        })
    }

    return(
        <>
            {props.todos.map((i, idx) => {
                return(
                    <div className="col-6 mt-3" key={idx}>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <h6>{i.title}</h6>
                                </div>
                                <div className="card-text text-left">
                                    <p style={{textAlign:'left', fontSize:'10px'}}>{i.description}</p>
                                </div>
                                <button className="btn btn-danger mt-5" onClick={() => deleteTodo(i._id)}>Delete</button>
                                {!i.status && <button className="btn btn-success mt-5 ml-3" onClick={() => updateTodo(i._id, i.title, i.description)}>Done</button>}
                                
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
