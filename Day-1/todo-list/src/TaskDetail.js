import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskContext } from "./TaskContext";
import { Alert, Button, Input, ListGroup, ListGroupItem } from "reactstrap";
import alertify from "alertifyjs";

function TaskDetail(){
    const { taskId } = useParams();

    const {taskList, setTaskList} = useContext(TaskContext);

    const [updateTask, setUpdateTask] = useState('');

    const task = taskList[taskId];
    const navigate = useNavigate();
    if(!task){
        return <Alert color="danger">Görev Bulunamadı.</Alert>
    }

    const handleUpdateTask =()=>{
        if(updateTask.trim() === ''){
            alertify.error('Görev adı boş olamaz');
            return;
        }
        const newTaskList = [...taskList];
        newTaskList[taskId] = updateTask;
        setTaskList(newTaskList);
        alertify.success('Görev başarıyla güncellendi!');
        setUpdateTask('');
    }

    const handleDeleteTask = () =>{
        const newTaskList = taskList.filter((_,index) => index !== parseInt(taskId));
        setTaskList(newTaskList);
        alertify.success('Görev Başarıyla Silindi!');
        navigate('/');
    }


    return(
        <div className="mt-4 container">
            <h1>Göre Detayı</h1>
            <ListGroup>
                <ListGroupItem><strong>Görev:</strong>{task}</ListGroupItem>
            </ListGroup>

            <div className="mt-4">
                <Input
                type="text"
                value={updateTask}
                onChange={(e)=>setUpdateTask(e.target.value)}
                placeholder="Görev Güncelle"
                className="mb-2"
                />
                <Button onClick={handleUpdateTask} color="primary" className="me-2">Güncelle</Button>
                <Button onClick={handleDeleteTask} color="danger" className="me-2">SİL</Button>
            </div>
            
        </div>
    );
}
export default TaskDetail;