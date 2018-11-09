const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const slugger = (title) => {
  return title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/ /g, '_');
}

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: Sequelize.ENUM('open', 'closed')
});

Page.beforeValidate((page) => {
  if (page.title === '') {
    page.slug = Math.random().toString(36).replace(/[^a-z]+/g, '');
  } else {
    page.slug = slugger(page.title);
  }
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = { db, Page, User };
