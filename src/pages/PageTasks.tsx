// Modules
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { ApiResponse, DataTask } from "../types";
import { taskService } from "../services/apiClient";
import FormTask from "../components/FormTask";

const PageTasks = () => {
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState<DataTask[]>([]);

  // Load Tasks
  useEffect(() => {
    const { request, cancel } = taskService.list<ApiResponse>();
    request
      .then((res) => {
        if (res.data.data.tasks) {
          setTasks(res.data.data.tasks);
        }
        return res;
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });
    return cancel;
  }, []);

  // Create Task
  const taskSubmit = (data: FieldValues, reset: () => void) => {
    //console.log("FORM TASK SUBMIT", data.title);
    const { request } = taskService.create(data);
    request.then((res) => {
      setTasks([...tasks, res.data.data.task]);
      reset();
    });
  };

  // Delete Task
  function taskDelete(task: DataTask) {
    const { request } = taskService.delete({
      id: task.id,
    });
    request.then(() => {
      // Filter out deleted Task
      setTasks(tasks.filter((t) => t.id !== task.id));
      return;
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-4 offset-lg-4 text-center">
          <h1>
            <i className="bi bi-check-circle"></i> Tasks
          </h1>
          <p>Keep track of things to do</p>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-9">
          {error && error.length > 0 && (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              {error}
            </Alert>
          )}
          {tasks && tasks.length > 0 ? (
            tasks.map((task: DataTask) => (
              <div key={task.id}>
                <p>
                  {task.title}
                  {" - "}
                  {task.description && `${task.description} - `}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => taskDelete(task)}
                  >
                    Completed
                  </Button>
                </p>
              </div>
            ))
          ) : (
            <h2 className="text-center">No Tasks</h2>
          )}
        </div>
        <div className="col col-3">
          <FormTask onSubmit={taskSubmit} />
        </div>
      </div>
    </div>
  );
};

export default PageTasks;
