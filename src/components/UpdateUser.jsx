import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateUser = () => {
    const user = useLoaderData();
    console.log(user);
    const handelAddUser = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const gender = form.gender.value;
        const status = form.status.value;
        // console.log(name, email, gender, status);
        const updatedUser = { name, email, gender, status };
        // console.log(updatedUser);
        fetch(`http://localhost:5000/user/${user._id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'User added',

                    })
                }

            })
    }
    return (
        <div >
            <h1 className='mb-8 text-3xl text-green-400 '>Update user</h1>
            <p>Use the below form to update the user</p>
            <Link to="/">
                <button className="btn btn-link ">All Users</button>
            </Link>
            <form onSubmit={handelAddUser}>
                <div className="form-control mb-7">
                    <label className="label ">
                        <span className="label-text ">Your Name</span>
                    </label>
                    <label className="input-group">

                        <input type="text" name="name" placeholder="Enter your name" className="w-full input input-bordered" defaultValue={user?.name} />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">YourEmail</span>
                    </label>
                    <label className="input-group">

                        <input type="email" name="email" placeholder="Enter your email" className="w-full input input-bordered" defaultValue={user?.email} />
                    </label>
                </div>
                <div className='text-left flex my-10'>
                    <span className="label-text mr-4">Gender:</span>
                    <input type="radio" value='male' name="gender" className="radio radio-success mr-3" defaultChecked={user.gender == 'male'} />
                    <span> Male</span>
                    <input type="radio" value='female' name="gender" className="radio radio-success mx-3" defaultChecked={user.gender == 'female'} />
                    <span>Female</span>
                </div>
                <div className='text-left flex my-5 items-center'>
                    <span className="label-text mr-4">Status:</span>
                    <input type="radio" value='Active' name="status" className="radio radio-success mr-3" defaultChecked={user.status == 'Active'} />
                    <span> Active</span>
                    <input type="radio" value='Inactive' name="status" className="radio radio-success mx-3" defaultChecked={user.status == 'Inactive'} />
                    <span>Inactive</span>
                </div>
                <input type="submit" className="mt-7 btn btn-success w-full" value="Save" />
            </form>
        </div>
    );
};

export default UpdateUser;