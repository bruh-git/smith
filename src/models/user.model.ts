import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import User from '../interfaces/user.interface';

class UserModel {
  public connection: Pool;

  public constructor(connection: Pool) {
    this.connection = connection;
  }

  create = async (user: User): Promise<User> => {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  };

  login = async (user: User): Promise<User[]> => {
    const { username, password } = user;
    const [result] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ? and password = ?',
      [username, password],
    );

    return result as User[];
  };
}

export default UserModel;
