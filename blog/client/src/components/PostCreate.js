const PostCreate = () => {
  return (
    <div className="post-create">
      <h1>Create Post</h1>
      <form>
        <label htmlFor="title">Title</label>
        <br />
        <input type="text" name="title" id="title" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
