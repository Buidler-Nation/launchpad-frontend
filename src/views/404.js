import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div>No Page Found.</div>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </>
  );
}
