import { Pool, ResultSetHeader } from 'mysql2/promise';
import IUser from '../interface/userInterface';

export default class UserModel {
  public connection : Pool;

  constructor(connection : Pool) {
    this.connection = connection;
  }

  public async createUser(user : IUser): Promise<number> {
    const [result] = await this.connection.execute<ResultSetHeader>(
      'insert into Trybesmith.Users (username, classe, level, password) value (?, ?, ?, ?)', 
      [user.username, user.classe, user.level, user.password],
    );
    const { insertId } = result;
    return insertId;
  }

  public async loginUser({ username, password }:Omit<IUser, 'class' | 'level'>): Promise<IUser[]> {
    const [rows] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?;',
      [username, password],
    );
    return rows as IUser[];
  }
}