import { useDispatch, useSelector } from "react-redux";

import { selectUserSpace } from "../store/space/selector";
import { getUserWithStoredToken } from "../store/user/actions";
import { useEffect } from "react";
import { deleteStoryByID } from "../store/user/actions";
import FormAddStory from "../components/Forms/FormAddStory";
import EditMySpace from "../components/Forms/FormEditMySpace";

export default function UserMySpace() {
  const dispatch = useDispatch();

  const spaceWithStories = useSelector(selectUserSpace);
  // console.log("this is my selectUserSpace", spaceWithStories);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);
  return (
    <div>
      {/* <h1>THIS SPACE BELONGS TO THE USER WHO IS ALREADY SIGNUP</h1> */}
      <div>
        {!spaceWithStories ? (
          "You are Not Loggin, please login"
        ) : (
          <div>
            <div
              style={{
                backgroundColor: `${spaceWithStories.backgroundColor}`,
                color: `${spaceWithStories.color}`,
              }}
            >
              <h1
                style={{
                  backgroundColor: `${spaceWithStories.backgroundColor}`,
                  color: `${spaceWithStories.color}`,
                }}
              >
                {spaceWithStories.title}
              </h1>
              {/* <h1>{spaceWithStories.description}</h1> */}

              {spaceWithStories.stories.map((story, index) => {
                return (
                  <div key={index}>
                    <h2>{story.name}</h2>
                    <img src={story.imageUrl} width={300} alt="" />
                    <button
                      onClick={() => {
                        dispatch(deleteStoryByID(story.id));
                      }}
                    >
                      DELETE STORY
                    </button>
                  </div>
                );
              })}
            </div>
            <ul>
              <li>
                {" "}
                <FormAddStory />
              </li>

              <li>
                {" "}
                <EditMySpace />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
