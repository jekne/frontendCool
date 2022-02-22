import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { SpacesByID } from "../../store/space/action";
import { spaceDetailsShowStories } from "../../store/space/selector";

import { Link } from "react-router-dom";

export default function MyStories() {
  const params = useParams();
  const id = params.id;
  console.log("my id", id);

  const dispatch = useDispatch();

  // const LoadSpaces = useSelector(loadingSpaces);
  // console.log("loading Spaces", LoadSpaces);

  const specifSpaceStories = useSelector(spaceDetailsShowStories);
  console.log("specif space stories", specifSpaceStories);

  useEffect(() => {
    dispatch(SpacesByID(id));
  }, [dispatch, id]);
  return (
    <div>
      <div>WELKOME TO MY SPACE SHOWING MY STORIES</div>

      <div>
        {!specifSpaceStories ? (
          "Loading ..."
        ) : (
          <div>
            <h1
              style={{
                backgroundColor: `${specifSpaceStories.backgroundColor}`,
                color: `${specifSpaceStories.color}`,
              }}
            >
              {specifSpaceStories.title}
            </h1>
            <h1>{specifSpaceStories.description}</h1>

            {specifSpaceStories.stories.map((story) => {
              return (
                <div key={story.id}>
                  <h2>{story.name}</h2>
                  <img src={story.imageUrl} width={300} alt="" />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Link to={`/`}>
        <button>GO BACK TO ALL SPACES</button>
      </Link>
    </div>
  );
}
// }
// The stories are displayed with a name, description and an image         | 1      |
// | The space and its stories are queried from the database using 1 query   | 2  ?    |
// | The space has a backgroundColor and color as specified by their user
