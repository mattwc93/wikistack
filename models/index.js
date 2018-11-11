const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

const slugger = (title) => {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
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
    allowNull: false,
  }
});

Page.belongsTo(User, { as: 'author' });
User.hasMany(Page);

module.exports = { db, Page, User };
