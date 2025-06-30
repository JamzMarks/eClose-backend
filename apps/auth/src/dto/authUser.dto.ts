interface AuthUser {
  id: string;
  email: string;
  passwordHash: string;
  isVerified: boolean;
  roles: string[];
  createdAt: Date;
  lastLogin?: Date;
}