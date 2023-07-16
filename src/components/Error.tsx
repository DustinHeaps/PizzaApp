import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

const Error = () => {
  const error: any = useRouteError();

  // if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Something went wrong 😢</h1>

        {error.message && <p>{error.message}</p>}
        <LinkButton to='-1'>&larr; Go back</LinkButton>
      </div>
    );
  }
// };

export default Error;
