const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (user, pages) => layout(html`
  <div style='padding-top: 20px'>
  <form method="GET" action="/wiki/search">
    <input type="text" name="search" />
    <button type="submit">Search</button>
  </form>
  </div>
  <hr>
  <h3>Pages written by ${user.name}:</h3>
  <h4>Email: ${user.email}</h4>
  <hr>
  <ul class="list-unstyled">
    <ul>
      ${pages.map(page => html`<li><a href="/wiki/${page.slug}">${page.title}</a></li>`)}
    </ul>
  </ul>
  <a href="/users/${user.id}/delete" class="btn btn-danger">delete this user</a>
`);
