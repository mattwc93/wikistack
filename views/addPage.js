const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form class="addForm" method="POST" action="/wiki/">
  
    <div class="form-group">
      <label for="name" class="col-sm-2 control-label">Name</label>
      <div class="col-sm-10">
        <input id="name" name="name" type="text" class="form-control" required/>
      </div>
    </div>
  
    <div class="form-group">
      <label for="email" class="col-sm-2 control-label">Email</label>
      <div class="col-sm-10">
        <input id="email" name="email" type="text" class="form-control" required/>
      </div>
    </div>
  
    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input id="title" name="title" type="text" class="form-control" required />
      </div>
    </div>
  
    <div class="form-group">
      <label for="content" class="col-sm-2 control-label">Content</label>
      <div class="col-sm-10">
        <textarea name="content" id="content" class="form-control" required></textarea>
      </div>
    </div>
  
    <div class="form-group">
      <label for="status" class="col-sm-2 control-label">Status</label>
      <div class="col-sm-10">
        <select name="status" id="statusBox">
          <option>open</option>
          <option>closed</option>
        </select>
      </div>
    </div>
  
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  
  </form>
`);