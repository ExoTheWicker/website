// links.js

const db = require('../db/db');

function getGroupedLinks(callback) {
  const query = 'SELECT category, title, url FROM links';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing the database query:', err);
      return callback(err, null);
    }

    // Group links by category
    const groupedLinks = {};
    results.forEach((row) => {
      const category = row.category;
      const title = row.title;
      const url = row.url;

      if (!groupedLinks[category]) {
        groupedLinks[category] = [];
      }

      groupedLinks[category].push({ title, url });
    });

    callback(null, groupedLinks);
  });
}

module.exports = {
  getGroupedLinks,
};
