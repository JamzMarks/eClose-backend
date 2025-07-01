export const UserCommands = {
  FIND_ALL: 'find-users',
  FIND_BY_ID: 'find-users-by-id',
  FIND_BY_EMAIL: 'find-users-by-email',
  FIND_BY_EMAIL_WITH_PASSWORD: 'find-users-by-email-with-password',
  FIND_BY_USERNAME: 'find-users-by-username',
  CREATE: 'created-user',
  UPDATE: 'updated-user',
  DELETE: 'deleted-user',
  PROFILE: 'profile-user',
  CREATE_EMPTY_PROFILE: 'create-empty-profile',
} as const;
