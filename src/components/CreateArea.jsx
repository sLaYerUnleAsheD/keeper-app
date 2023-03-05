import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

//   dynamically trace the title and content input fields
// and set note object from the above state to whatever user typed
// and return the object using spread operator ... to first add
// whatever user wrote like title or content then use [] operator
// to use target events name as a key for adding inside the object
// so if user latest edited content the name will be content: and value
// will be whatever they typed and ...prevNote will be title: whatever they typed
  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

//   when submit button is clicked I will trigger this function
// to prevent default refresh by React using event.preventDefault();
  function handleSubmit(event) {
    event.preventDefault();
  }

//   state for handling conditional rendering of zoom animation
// as well as title input field rendering
  const[isFocus, setFocus] = useState(false);
  function showTitle() {
    setFocus(true);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="create-note">
      {/* conditional rendering to render input only when user clicks textarea */}
        {
            isFocus 
            && 
            (<input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={note.title}
            />)
        }
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={isFocus ? "3" : "1"}
          onChange={handleChange}
          value={note.content}
          onClick={showTitle}
        />
        <Zoom in={isFocus}>
            <Fab
            // onclick we call psuedo function
            // inside which we received a function as a prop from
            // App component and we call that function from here and pass
            // the currently added note to App component where we add it to array
            // of notes objects and render it using .map() inside App component
            // and resent the title and content input fields using setNote state handler
            onClick={() => {
                props.onAdd(note);
                setNote({ title: "", content: "" });
            }}
            >
            <AddIcon />
            </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
