import { isRouteErrorResponse, useRouteError } from "react-router-dom";

// https://reactrouter.com/en/main/route/error-element
const PageError = () => {
  // const { error, isError, message }
  const error = useRouteError();

  // We handle this in a "*" wildcard route but
  // you can also handle 404s here. Instead, we
  // reserve this page for unexpected errors.
  // if (error.status == 404) {}
  return (
    <>
      <h1>Something went wrong...</h1>
      <p>{isRouteErrorResponse(error) ? "Invalid page" : "Unexpected error"}</p>
    </>
  );
};

export default PageError;
