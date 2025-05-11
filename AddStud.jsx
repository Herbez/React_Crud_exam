import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AddStud = () => {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/viewstud')
            .then(result => setStudents(result.data.students))
            .catch(err => console.error(err));
    }, []);

    const [student_name, setName] = useState();
    const [student_class, setClass] = useState();

    const SaveStud = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/create", { student_name, student_class })
            .then(result => {
                console.log(result);
                alert("Student saved successfully!");
                window.location.reload(); 
            })
            .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/delete/${id}`)
            .then((res) => {
                alert("Student deleted");
                setStudents(prevUsers => prevUsers.filter(students => students.id !== id));
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to delete user");
            });
    };

    return (

        <div className="ml-8 h-screen">
            <form onSubmit={SaveStud}>
                <input type="text"
                    placeholder="Student name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    
                    className="p-2 border border-2 border-gray-500"
                /><br />
                <input type="text"
                    placeholder="Enter Class"
                    required
                    onChange={(e) => setClass(e.target.value)}
                    className="p-2 border border-2 border-gray-500 mt-2"
                /> <br />
                <button className="mt-2 bg-blue-500  p-2">Save</button>
            </form>


            <div className="mt-4">
                <h1 className="text-2xl ml-20">Student List</h1>



                <table >
                    <thead >
                        <th className="border-2 border-gray-500 p-2 ">Student Name</th>
                        <th className="border-2 border-gray-500">Class</th>
                        <th className="border-2 border-gray-500" colSpan={2}>Action</th>
                    </thead>
                    <tbody >
                        {
                            students.map((stud, index) => (
                                <tr key={index}  ><td className="border-2 border-gray-500 p-2">{stud.student_name}</td>
                                    <td className="border-2 border-gray-500 p-2">{stud.student_class}</td>
                                    <td className="p-2 border-2 border-gray-500">
                                        <button className="mt-2 bg-blue-500 p-1 mr-2 " >
                                        <Link to={`/editstud/${stud.id}`}>Edit</Link></button>
                                        <button className="mt-2 bg-red-500   p-1"
                                        onClick={(e) => handleDelete(stud.id)}>
                                        Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>




            </div>
        </div>

    )

}

export default AddStud