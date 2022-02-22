import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectUserSpace, selectJustTheUser } from "../../store/space/selector";
import { SpacesWillBeUpdate } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";

export default function EditMySpace() {
  const [title, set_Title] = useState("");
  const [description, set_Description] = useState("");
  const [backgroundColor, set_BackgroundColor] = useState("");
  const [color, set_Color] = useState("");
  const [formHidden, set_FormHidden] = useState(true);

  const token = useSelector(selectToken);

  const dispatch = useDispatch();

  const creatStory = useSelector(selectUserSpace);
  console.log("this is my create Story", creatStory);

  const useToPlace = useSelector(selectJustTheUser);
  // console.log("this is user To Place", useToPlace);

  const handleSubmmit = (event) => {
    event.preventDefault();

    dispatch(
      SpacesWillBeUpdate({ title, description, backgroundColor, color, token })
    );
  };

  return (
    <div>
      {/* <h1>Edit my space just show a button just if i am logged in</h1> */}
      <div>
        <button
          onClick={() => {
            set_FormHidden(!formHidden);
          }}
        >
          EDIT YOUR SPACE
        </button>
        <div>
          {" "}
          {!formHidden ? (
            <div>
              <div>
                <Form>
                  <ul>
                    <li>
                      {" "}
                      <label>TITLE:</label>
                      <input
                        type="text"
                        placeholder={useToPlace.space.title}
                        value={title}
                        onChange={(event) => set_Title(event.target.value)}
                      />
                    </li>
                    <li>
                      {" "}
                      <label>DESCRIPTION:</label>
                      <input
                        value={description}
                        placeholder={useToPlace.space.description}
                        onChange={(event) =>
                          set_Description(event.target.value)
                        }
                      />
                    </li>
                    <li>
                      {" "}
                      <label>BACKGROUND COLOR:</label>
                      <input
                        type="color"
                        value={backgroundColor}
                        placeholder={useToPlace.space.backgroundColor}
                        onChange={(event) =>
                          set_BackgroundColor(event.target.value)
                        }
                      />
                    </li>
                    <li>
                      {" "}
                      <label>COLOR:</label>
                      <input
                        type="color"
                        value={color}
                        placeholder={useToPlace.space.color}
                        onChange={(event) => set_Color(event.target.value)}
                      />
                    </li>

                    <div>
                      {" "}
                      <button onClick={handleSubmmit}>SAVE YOUR STORY</button>
                    </div>
                  </ul>
                </Form>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
