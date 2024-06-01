// Modules
import Button from "react-bootstrap/Button";

const PageRegister = () => {
  return (
    <div className="row">
      <div className="col col-12 col-lg-4 offset-lg-4">
        <h1 className="mt-3 mb-3 text-center">
          <i className="bi bi-person-plus-fill"></i> Register
        </h1>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email
            </label>
            <input id="email" type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input id="password" type="password" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="code" className="form-label">
              Code
            </label>
            <input id="code" type="text" className="form-control" />
          </div>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageRegister;
