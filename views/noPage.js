const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (message) => layout(html`
<div style = "text-align: center">
<h1>404: ${message}</h1>
<small> (<a href="/wiki/">Return to the main page.</a>)</small>
</div>
`);
