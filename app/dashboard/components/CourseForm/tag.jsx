import { useState, useRef  } from 'react';

function TagsInput({ setTags }) {
    const [tags, setTTags] = useState([]);
    const inputRef = useRef(null);
    function handleKeyDown(e) {
        const value = e.target.value;
        if ( e.key === ',' || e.key === ' ') {
            if (!value) return;
            // Add the tag to the tags array
            setTTags([...tags, value]);
            // Update the parent component's tags state
            setTags([...tags, value]);
           // Clear the input value using useRef
           inputRef.current.value = "";
        } else if (e.key === 'Backspace' && value === '' && tags.length > 0) {
            // Remove the last tag when backspace is pressed and input is empty
            const updatedTags = [...tags];
            updatedTags.pop();
            setTTags(updatedTags);
            // Update the parent component's tags state
            setTags(updatedTags);
        }
    }

    function removeTag(index) {
        const updatedTags = tags.filter((_, i) => i !== index);
        setTTags(updatedTags);
        // Update the parent component's tags state
        setTags(updatedTags);
    }

    return (
        <div className="tags-input-container">
            {tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            ))}
            <input  ref={inputRef} onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Enter tags and press space or"/>

        </div>
    );
}

export default TagsInput;
