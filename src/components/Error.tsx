import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

const Error = () => {
  const error: unknown = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>

      {(error as Error)?.message ||
        (error as { statusText?: string })?.statusText}
      <LinkButton to='-1'>&larr; Go back</LinkButton>
    </div>
  );
};

export default Error;
