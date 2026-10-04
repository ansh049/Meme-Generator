import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";
import Text from "../compoenents/Text";
import "./Edit.css";

const EMOJI_OPTIONS = ["😂", "🔥", "😍", "😭", "😎", "🤔", "💀", "✨", "🎉", "❤️", "👀", "💯"];

const EditPage = () => {
  const [textLayers, setTextLayers] = useState([]);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [params] = useSearchParams();
  const memeRef = useRef(null);
  const nextLayerId = useRef(0);
  const imageUrl = params.get("url");

  const addText = () => {
    setTextLayers((currentLayers) => [
      ...currentLayers,
      { id: nextLayerId.current++, type: "text", fontSize: 32, rotation: 0 },
    ]);
  };

  const addEmoji = (emoji) => {
    setTextLayers((currentLayers) => [
      ...currentLayers,
      { id: nextLayerId.current++, type: "emoji", content: emoji, fontSize: 44, rotation: 0 },
    ]);
    setIsEmojiPickerOpen(false);
  };

  const updateTextSize = (id, fontSize) => {
    setTextLayers((currentLayers) =>
      currentLayers.map((layer) =>
        layer.id === id ? { ...layer, fontSize: Number(fontSize) } : layer
      )
    );
  };

  const updateTextRotation = (id, rotation) => {
    setTextLayers((currentLayers) =>
      currentLayers.map((layer) =>
        layer.id === id ? { ...layer, rotation: Number(rotation) } : layer
      )
    );
  };

  const saveMeme = async () => {
    if (!memeRef.current) {
      setSaveError("Unable to save the meme. Please try again.");
      return;
    }

    setSaveError("");
    setIsSaving(true);
    try {
      const canvas = await html2canvas(memeRef.current, {
        useCORS: true,
        scale: 2,
      });
      const downloadLink = document.createElement("a");
      downloadLink.href = canvas.toDataURL("image/jpeg", 1);
      downloadLink.download = "meme.jpg";
      downloadLink.click();
    } catch (error) {
      console.error("Failed to export meme:", error);
      setSaveError("Could not save the meme. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="edit-page">
      <div className="editor-heading">
        <div>
          <Link className="editor-back-link" to="/">
            <span aria-hidden="true">←</span> Back to templates
          </Link>
          <h1>Make it yours</h1>
          <p>Drag your text into place, then save your masterpiece.</p>
        </div>
        <span className="editor-status">
          <span aria-hidden="true" /> Editing
        </span>
      </div>

      <div className="editor-layout">
        <aside className="editor-sidebar">
          <div className="editor-panel-heading">
            <span className="editor-icon" aria-hidden="true">Aa</span>
            <div>
              <h2>Text layers</h2>
              <p>Add a caption to your meme</p>
            </div>
          </div>

          <div className="layer-summary">
            <span>Canvas layers</span>
            <span className="layer-count">{textLayers.length}</span>
          </div>

          <button className="add-text-button" type="button" onClick={addText}>
            <span aria-hidden="true">＋</span> Add text
          </button>

          <div className="emoji-picker-section">
            <button
              className="add-emoji-button"
              type="button"
              aria-expanded={isEmojiPickerOpen}
              aria-controls="emoji-picker"
              onClick={() => setIsEmojiPickerOpen((isOpen) => !isOpen)}
            >
              <span aria-hidden="true">😊</span> Add emoji
              <span className="emoji-toggle-indicator" aria-hidden="true">
                {isEmojiPickerOpen ? "−" : "+"}
              </span>
            </button>
            {isEmojiPickerOpen && (
              <div className="emoji-picker" id="emoji-picker" role="group" aria-label="Choose an emoji">
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    className="emoji-option"
                    key={emoji}
                    type="button"
                    aria-label={`Add ${emoji} emoji`}
                    onClick={() => addEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          {textLayers.length > 0 && (
            <div className="text-layer-list" aria-label="Text and emoji layer controls">
              {textLayers.map((layer, index) => (
                <div className="text-layer-control" key={layer.id}>
                  <div className="text-layer-control-heading">
                    <label htmlFor={`text-size-${layer.id}`}>
                      {layer.type === "emoji" ? `Emoji ${index + 1} size` : `Text ${index + 1} size`}
                    </label>
                    <output htmlFor={`text-size-${layer.id}`}>{layer.fontSize}px</output>
                  </div>
                  <input
                    id={`text-size-${layer.id}`}
                    className="text-size-slider"
                    type="range"
                    min="12"
                    max="72"
                    step="1"
                    value={layer.fontSize}
                    onChange={(event) => updateTextSize(layer.id, event.target.value)}
                    aria-label={`${layer.type === "emoji" ? "Emoji" : "Text"} ${index + 1} size`}
                  />
                  <div className="text-size-range-labels" aria-hidden="true">
                    <span>Smaller</span>
                    <span>Larger</span>
                  </div>
                  <div className="text-layer-control-heading rotation-control-heading">
                    <label htmlFor={`text-rotation-${layer.id}`}>
                      {layer.type === "emoji" ? `Emoji ${index + 1} rotation` : `Text ${index + 1} rotation`}
                    </label>
                    <output htmlFor={`text-rotation-${layer.id}`}>{layer.rotation}°</output>
                  </div>
                  <input
                    id={`text-rotation-${layer.id}`}
                    className="text-rotation-slider"
                    type="range"
                    min="-180"
                    max="180"
                    step="1"
                    value={layer.rotation}
                    onChange={(event) => updateTextRotation(layer.id, event.target.value)}
                    aria-label={`${layer.type === "emoji" ? "Emoji" : "Text"} ${index + 1} rotation`}
                  />
                  <div className="text-size-range-labels" aria-hidden="true">
                    <span>−180°</span>
                    <span>+180°</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="editor-tip">
            <span aria-hidden="true">✦</span>
            <p><strong>Quick tip</strong><br />Double-click a caption to edit it. Drag, resize, or rotate it to fit your meme.</p>
          </div>

          <div className="sidebar-save">
            <button
              className="save-meme-button"
              type="button"
              onClick={saveMeme}
              disabled={isSaving || !imageUrl}
            >
              {isSaving ? "Preparing your meme…" : "Download meme"}
              <span aria-hidden="true">{isSaving ? "…" : "↓"}</span>
            </button>
            <span className="save-caption">Saved as a high-quality JPG</span>
            {saveError && <p className="save-error" role="alert">{saveError}</p>}
          </div>
        </aside>

        <section className="editor-workspace" aria-label="Meme preview">
          <div className="workspace-toolbar">
            <div>
              <span className="workspace-dot" aria-hidden="true" />
              <span>YOUR CANVAS</span>
            </div>
            <span>Double-click text to edit</span>
          </div>
          <div ref={memeRef} className="meme-stage">
            {imageUrl ? (
              <img className="meme-image" src={imageUrl} alt="Selected meme template" />
            ) : (
              <div className="missing-template">
                <span aria-hidden="true">🖼️</span>
                <p>No template selected</p>
                <Link to="/">Choose a meme template</Link>
              </div>
            )}
            {textLayers.map((layer) => (
              <Text
                key={layer.id}
                fontSize={layer.fontSize}
                rotation={layer.rotation}
                kind={layer.type}
                content={layer.content}
              />
            ))}
          </div>
          <div className="workspace-footer">
            <span><span aria-hidden="true">⠿</span> Drag captions to reposition</span>
            <span>{textLayers.length} {textLayers.length === 1 ? "layer" : "layers"}</span>
          </div>
        </section>
      </div>
    </main>
  );
};

export default EditPage;