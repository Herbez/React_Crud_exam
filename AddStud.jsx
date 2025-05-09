import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const AddStud = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/viewstud')
            .then(result => setStudents(result.data.students))
            .catch(err => console.error(err));
    }, []);

    return (

        <div className="ml-8">
            <form>
                <input type="text"
                    placeholder="Student name"
                    required
                    className="p-2 border border-2 border-gray-500 text-gray-500 "
                /><br />
                <input type="text"
                    placeholder="Enter Class"
                    required
                    className="p-2 border border-2 border-gray-500 mt-2"
                /> <br />
                <button type="submit"
                    className="mt-2 bg-blue-500  p-2">Save</button>
            </form>


            <div className="mt-4">
                <h1 className="text-2xl ml-20">Student List</h1>



                <table className="border-2 border-gray-500">
                    <thead className="border-2 border-gray-500"><th>Student Name</th>
                        <th className="border-2 border-gray-500">Class</th>
                        <th colSpan={2}>Action</th>
                    </thead>
                    <tbody >
                        {
                            students.map((stud, index) => (
                                <tr key={index}  ><td className="border-2 border-gray-500 p-2">{stud.student_name}</td>
                                    <td className="border-2 border-gray-500 p-2">{stud.student_class}</td>
                                    <td className="p-2"><button className="mt-2 bg-blue-500 p-1 mr-2" >Edit</button>
                                        <button className="mt-2 bg-red-500  p-1">Delete</button></td>
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