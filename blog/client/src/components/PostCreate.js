import React from "react";

const PostCreate = () => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" className="form-control" name="title" id="title" />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default PostCreate;
