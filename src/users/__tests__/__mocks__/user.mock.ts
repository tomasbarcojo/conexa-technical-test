import { UserRoles } from '../../../../core/enums/user_roles.enum';
import { User } from '../../../users/entities/user.entity';

export const userMock: User = {
  id: 1,
  firstName: 'Test',
  lastName: 'User',
  username: 'testuser',
  email: 'test@email.com',
  password: 'password',
  role: UserRoles.ADMIN,
  createdAt: new Date('2023-03-16T12:00:00Z'),
  updatedAt: new Date('2023-03-16T12:00:00Z'),
  deletedAt: null,
};
