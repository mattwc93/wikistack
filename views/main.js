const html = require("html-template-tag");
const layout = require("./layout");

// const getAuthorName = async (authId) => {
//   let author = await User.findById(authId);
//   author = author.name;
//   return author;
// }
// How can we do this and have it display each pages author in the page listing using
// something like <h4> by ${getAuthorName(page.authorId)}</h4> ?
module.exports = (pages) => layout(html`
  <h3>Pages</h3>
  <hr>
  <form method="GET" action="/wiki/search">
    <input type="text" name="search" />
    <button type="submit">Search</button>
  </form>
  <hr>
  <ul class="list-unstyled">
    <ul>
      ${pages.map(page => html`
        <div>
          <h3><a href = '/wiki/${page.slug}'>${page.title}</a></h3>
          <p>STATUS: ${page.status}</p>
        </div>`
        )}
    </ul>
  </ul>`);
