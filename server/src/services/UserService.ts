import bcrypt from 'bcrypt';
import { Logger } from 'common';
import User from 'entities/User';
import { getConnection } from 'typeorm';

const logger = Logger(__filename);
const getUserRepository = () => getConnection().getRepository(User);

const findByEmail = async (email: string) => {
  try {
    const foundUser = await getUserRepository().findOne({
      where: { email },
    });

    return foundUser;
  } catch (error: any) {
    logger.error(`Find by email failed in UserService, error: ${error}`);
    throw new Error(error);
  }
};

const save = async (user: User): Promise<User> => {
  try {
    const savedUser = await getUserRepository().save(user);

    return savedUser;
  } catch (error: any) {
    logger.error(`Save failed in UserService, error: ${error}`);
    throw new Error(error);
  }
};

const comparePassword = async (
  password1: string,
  password2: string
): Promise<boolean> => {
  return await bcrypt.compare(password1, password2);
};

const generateHash = async (hashBase: string) => {
  return await bcrypt.hash(hashBase, 10);
};

const verifyPassword = async (
  password1: string,
  password2: string
): Promise<boolean> => {
  return await bcrypt.compare(password1, password2);
};

const validatePasswordMatch = (password: string, passwordConfirm: string) => {
  if (!password || password !== passwordConfirm) return false;

  return true;
};

export default {
  findByEmail,
  save,
  comparePassword,
  generateHash,
  verifyPassword,
  validatePasswordMatch,
};
