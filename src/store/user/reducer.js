import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  space: null,
  // stories: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("action from the loggin", action.payload);
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case "USER/deleteById": {
      // console.log("action user", action.payload);
      const storyTodestroyWithId = action.payload;
      // console.log("storyTodestroyWithId", storyTodestroyWithId);
      const newStories = state.space.stories.filter(
        (story) => story.id !== storyTodestroyWithId
      );
      // console.log("newStories", newStories);
      //probably the stories before the newStories it is
      //comming from the data base, if dont use stories actually
      //the page do not delete automatically, without refreshing the page

      return {
        ...state,
        space: { ...state.space, stories: newStories },
      };
    }
    case "USERS/newStory": {
      console.log("action user new Story", action.payload);

      return {
        // copy of the state
        ...state,
        // with a new value for space
        space: {
          // copy of the space
          ...state.space,
          // the same stories but add the new one
          stories: [...state.space.stories, action.payload],
          // stories: newStoriesCreated, //stories: [...space.stories, {new story}]
        },
      };
    }
    case "SPACES/spaceToUpdate": {
      console.log("action payload SPACE TO UPDATE", action.payload);
      return {
        ...state,
        // copy of the state
        ...state,
        // with a new value for space
        space: {
          // copy of the space
          ...state.space,
          // the same stories but add the new one
          stories: [...state.space.stories, action.payload],
          // stories: newStoriesCreated, //stories: [...space.stories, {new story}]
        },
      };
    }
    default:
      return state;
  }
};
