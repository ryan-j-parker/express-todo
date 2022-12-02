const pool = require('../utils/pool');

module.exports = class Item {
  id;
  user_id;
  description;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.description = row.description;
  }

  static async getAll(user_id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM items
    WHERE
    user_id = $1
    `,
      [user_id]
    );
    return rows.map((item) => new Item(item));
  }
};
