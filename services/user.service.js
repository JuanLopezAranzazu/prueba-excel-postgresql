const pool = require("./../libs/postgres");
const boom = require("@hapi/boom");

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (error) => console.log(error));
  }

  async findAll() {
    const query = 'SELECT * FROM public."user" WHERE true';
    const { rows } = await this.pool.query(query);
    return rows;
  }

  async findOne(id) {
    const query = 'SELECT * FROM public."user" WHERE id = $1';
    const { rows } = await this.pool.query(query, [id]);
    if (!rows[0]) {
      throw boom.notFound(`User #${id} not found`);
    }
    return rows;
  }

  async create(payload) {
    const query =
      'INSERT INTO public."user"(fullname, email, password) VALUES($1, $2, $3) RETURNING *';
    const { fullname, email, password } = payload;
    const { rows } = await this.pool.query(query, [fullname, email, password]);
    return rows;
  }

  async update(id, payload) {
    const user = await this.findOne(id);
    if (!user) throw boom.notFound(`User #${id} not found`);
    const query =
      'UPDATE public."user" SET fullname = $1, email = $2, password = $3 WHERE id = $4 RETURNING *';
    const { fullname, email, password } = payload;
    const { rows } = await this.pool.query(query, [
      fullname,
      email,
      password,
      id,
    ]);
    return rows[0];
  }

  async delete(id) {
    const user = await this.findOne(id);
    if (!user) throw boom.notFound(`User #${id} not found`);
    const query = 'DELETE FROM public."user" WHERE id = $1';
    await this.pool.query(query, [id]);
    return id;
  }
}

module.exports = UserService;
