import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditStud = () => {
    const { id } = useParams()
    const [student_name, setName] = useState()
    const [student_class, setClass] = useState()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/view/${id}`)
            .then(result => {
                console.log(result)
                setName(result.data.student_name)
                setClass(result.data.student_class)
            })
            .catch(err => console.error(err));
    }, [id]);

    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/update/${id}`, {
            student_name,
            student_class
        })
        .then(res => {
            alert("Student updated successfully");
            navigate('/crud')
        })
        .catch(err => console.error(err));
    };
    

    return (
        <div className="ml-8 h-screen">
            <h1 className="text-2xl mb-2">Edit Student</h1>
            <form onSubmit={handleUpdate}>
                <input type="text"
                    placeholder="Student name"
                    required
                    className="p-2 border border-2 border-gray-500"
                    value={student_name}
                    onChange={(e) => setName(e.target.value)} />
                <br/>
                <input type="text"
                    placeholder="Enter Class"
                    required
                    className="p-2 border border-2 border-gray-500 mt-2"
                    value={student_class}
                    onChange={(e) => setClass(e.target.value)} />
                <br/>
                <button className="mt-2 bg-blue-500  p-2">Update</button>
            </form>
        </div>
    )

}

export default EditStud;