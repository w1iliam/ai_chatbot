function InputForm({ prompt, placeholder, setPrompt, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        id="input"
        value={prompt}
        placeholder={placeholder}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default InputForm;
