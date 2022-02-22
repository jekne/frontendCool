import { Jumbotron } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadingSpaces, selectAllSpaces } from "../../store/space/selector";
import { fetchSpaces } from "../../store/space/action";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();

  const LoadSpaces = useSelector(loadingSpaces);
  console.log("loading Spaces", LoadSpaces);

  const spaces = useSelector(selectAllSpaces);
  console.log("space home", spaces);

  useEffect(() => {
    dispatch(fetchSpaces());
  }, [dispatch]);
  return (
    <div>
      <Jumbotron>
        <h1>Home</h1>
        <div>
          {!spaces
            ? "Loading ..."
            : spaces.map((space) => {
                return (
                  <div key={space.id}>
                    <h1
                      style={{
                        backgroundColor: `${space.backgroundColor}`,
                        color: `${space.color}`,
                      }}
                    >
                      {space.title}
                    </h1>
                    <Link to={`/space/${space.id}`}>
                      <button>Visit my Space</button>
                    </Link>
                  </div>
                );
              })}
        </div>
      </Jumbotron>
    </div>
  );
}
// The spaces have a backgroundColor and color as specified by their users
