import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers)
    // console.log(loadedUsers)
    const handleDelete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/user/${_id}`, {
                    method: 'DELETE',
                    headers: { 'content-type': 'application/json' },
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'The user has been deleted.',
                                'success'
                            )
                        }
                        const remaining = users.filter(user => user._id !== _id);
                        setUsers(remaining)

                    })
            }
        })
    }
    return (
        <div>
            <h1 className='text-3xl text-green-400'>All Available Users</h1>
            <Link to="/user">
                <button className="btn btn-link text-purple-500">New User</button></Link>

            <div className="overflow-x-auto">
                <table className="table table-compact w-full my-12">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr
                                key={user._id}
                            >
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.status}</td>
                                <td>
                                    <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
                                        <Link to={`/update/${user._id}`}>
                                            <button className="btn btn-active bg-green-500 text-white">Edit</button></Link>

                                        <button onClick={() => handleDelete(user._id)} className="btn bg-red-500 text-black">x</button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllUsers;