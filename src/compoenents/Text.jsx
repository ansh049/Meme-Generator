import { useRef, useState } from "react";
import Draggable from "react-draggable";

const Text = ({ fontSize, rotation, kind = "text", content }) => {
  const [editMode, setEditMode] = useState(false);
  const [val, setVal] = useState("Double click to edit");
  const nodeRef = useRef(null);
  const isEmoji = kind === "emoji";

  return (
    <Draggable nodeRef={nodeRef} disabled={editMode}>
      <div
        ref={nodeRef}
        className={`meme-text-layer${isEmoji ? " meme-emoji-layer" : ""}`}
      >
        {isEmoji ? (
          <span
            className="meme-emoji"
            role="img"
            aria-label={`${content} emoji`}
            style={{ fontSize, transform: `rotate(${rotation}deg)` }}
          >
            {content}
          </span>
        ) : editMode ? (
          <input
            autoFocus
            className="meme-text-input"
            aria-label="Edit meme text"
            style={{ fontSize, transform: `rotate(${rotation}deg)` }}
            value={val}
            onDoubleClick={() => setEditMode(false)}
            onChange={(event) => setVal(event.target.value)}
            onBlur={() => setEditMode(false)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === "Escape") {
                setEditMode(false);
              }
            }}
          />
        ) : (
          <h2
            onDoubleClick={() => setEditMode(true)}
            style={{ fontSize, transform: `rotate(${rotation}deg)` }}
          >
            {val}
          </h2>
        )}
      </div>
    </Draggable>
  );
};

export default Text;
