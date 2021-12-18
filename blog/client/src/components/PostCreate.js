import React from "react";

const PostCreate = () => {
  return (
    <div className="post-create">
      <form className="form-group">
        <label htmlFor="title">Title</label>
        <br />
        <input type="text" name="title" id="title" />
        <br />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
