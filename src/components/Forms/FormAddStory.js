import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewStory } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";

export default function FormAddStory() {
  const [name, set_Name] = useState("");
  const [content, set_Content] = useState("");
  const [imageUrl, set_ImageUrl] = useState("");
  const [formHidden, set_FormHidden] = useState(true);

  const token = useSelector(selectToken);

  const dispatch = useDispatch();

  // const creatStory = useSelector(selectUserSpace);
  // console.log("this is my create Story", creatStory);

  const handleSubmmit = (event) => {
    event.preventDefault();

    dispatch(createNewStory({ name, content, imageUrl, token }));
  };

  return (
    <div>
      {/* <h1> THIS FORM SHOULD APPEAR ONLY IF YOU ARE LOGGED IN</h1> */}
      <button
        onClick={() => {
          set_FormHidden(!formHidden);
        }}
      >
        POST A COOL STORY BRO
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
                    <label>NAME:</label>
                    <input
                      value={name}
                      onChange={(event) => set_Name(event.target.value)}
                    />
                  </li>
                  <li>
                    {" "}
                    <label>CONTENT:</label>
                    <input
                      value={content}
                      onChange={(event) => set_Content(event.target.value)}
                    />
                  </li>
                  <li>
                    {" "}
                    <label>IMAGEURL:</label>
                    <input
                      value={imageUrl}
                      onChange={(event) => set_ImageUrl(event.target.value)}
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
  );
}

//  name: { type: DataTypes.STRING, allowNull: false },
//       content: DataTypes.TEXT,
//       imageUrl: DataTypes.STRING,
