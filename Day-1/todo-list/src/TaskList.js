import React, {useContext, useState} from "react";
import {Link} from 'react-router-dom';
import { TaskContext } from "./TaskContext";
import {Alert, Input, ListGroup, ListGroupItem} from 'reactstrap';
import alertify from 'alertifyjs';

function TaskList(){

    const {taskList, addTask} = useContext(TaskContext)

    const [newTask, setNewTask] = useState('');
    const [error, setError] = useState('');

    const handleAddTask = () =>{
        if(newTask.trim() === ''){
            alertify.error('Görev adı boş olamaz');
            return;
        }
        addTask(newTask);
        setNewTask('');
        setError('');
        alertify.success('Görev başarıyla eklendi.')
    }

    return(
        <div className="container mt-4">
            <h1 className="mb-4">Görev Listesi</h1>
            {taskList.length === 0 ? (
                <Alert color="warning">Henüz bir görev eklenmedi</Alert>
            ) : (
            <ListGroup>
               {taskList.map((task, index) =>(
                <ListGroupItem key={index}>{task} - <Link to={`/task/${index}`}>Detaya Git</Link></ListGroupItem>
               ))}
            </ListGroup>
            )}
            <Input
            type="text"
            className="mt-4"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Yeni görev ekleyin"/>
            <button className="mt-2 btn btn-primary" onClick={handleAddTask}>Görev Ekle</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
}

export default TaskList;