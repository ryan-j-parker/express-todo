const pool = require('../utils/pool');

module.exports = class Item {
  id;
  user_id;
  description;
  urgency;
  completed;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.description = row.description;
    this.urgency = row.urgency;
    this.completed = row.completed;
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

  static async insert({ description, urgency, completed, user_id }) {
    const { rows } = await pool.query(
      `
        INSERT 
        INTO items (description, urgency, completed, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING * 
        `,
      [description, urgency, completed, user_id]
    );
    return new Item(rows[0]);
  }
};
