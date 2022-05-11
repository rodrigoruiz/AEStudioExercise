
function Notes({ text, setText, saveNewText, resetText, savedText }) {
    const textareaStyle = savedText === text ? {} : { border: "1px solid red" };
    
    return <div style={{ width: "390px", marginTop: "20px" }}>
        <p><b>Notes:</b></p>
        
        <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows="10" cols="50"
            className="form-control"
            aria-label="With textarea"
            style={textareaStyle}
        />
        
        <br clear="all" />
        
        <button
            className="btn btn-outline-danger"
            style={{ marginLeft: "20px", width: "100px", float: "right" }}
            onClick={resetText}
        >cancel</button>
        
        <button
            className="btn btn-outline-success"
            style={{ width: "100px", float: "right" }}
            onClick={saveNewText}
        >save</button>
    </div>;
}

export default Notes;
