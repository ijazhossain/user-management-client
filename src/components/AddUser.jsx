import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddUser = () => {
    const handelAddUser = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const gender = form.gender.value;
        const status = form.status.value;
        // console.log(name, email, gender, status);
        const newUser = { name, email, gender, status };
        console.log(newUser);
        fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
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
            <h1 className=' text-3xl text-green-400 mb-8'>New user</h1>

            <p>Use the below form to create a new user</p>
            <Link to="/">
                <button className="btn btn-link ">All Users</button>
            </Link>
            <form onSubmit={handelAddUser}>
                <div className="form-control mb-7">
                    <label className="label ">
                        <span className="label-text ">Your Name</span>
                    </label>
                    <label className="input-group">

                        <input type="text" name="name" placeholder="Enter your name" className="w-full input input-bordered" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">YourEmail</span>
                    </label>
                    <label className="input-group">

                        <input type="email" name="email" placeholder="Enter your email" className="w-full input input-bordered" />
                    </label>
                </div>
                <div className='text-left flex my-10'>
                    <span className="label-text mr-4">Gender:</span>
                    <input type="radio" value='male' name="gender" className="radio radio-success mr-3" defaultChecked />
                    <span> Male</span>
                    <input type="radio" value='female' name="gender" className="radio radio-success mx-3" />
                    <span>Female</span>
                </div>
                <div className='text-left flex my-5 items-center'>
                    <span className="label-text mr-4">Status:</span>
                    <input type="radio" value='Active' name="status" className="radio radio-success mr-3" defaultChecked />
                    <span> Active</span>
                    <input type="radio" value='Inactive' name="status" className="radio radio-success mx-3" />
                    <span>Inactive</span>
                </div>
                <input type="submit" className="mt-7 btn btn-success w-full" value="Save" />
            </form>
        </div>
    );
};

export default AddUser;