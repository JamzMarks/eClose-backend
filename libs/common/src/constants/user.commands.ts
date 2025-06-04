export const UserCommands = {
  FIND_ALL: 'find_users',
  FIND_BY_ID: 'find_users_by_id',
  FIND_BY_EMAIL: 'find_users_by_email',
  FIND_BY_EMAIL_WITH_PASSWORD: 'find_users_by_email_with_password',
  FIND_BY_USERNAME: 'find_users_by_username',
  CREATE: 'create_user',
  UPDATE: 'update_user',
  DELETE: 'delete_user',
} as const;