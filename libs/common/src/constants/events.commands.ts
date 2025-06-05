export const EventsCommands = {
  // Busca
  FIND_ALL: 'find_all_events',
  FIND_BY_ID: 'find_event_by_id',
  FIND_BY_NAME: 'find_event_by_name',
  FIND_BY_ORGANIZER: 'find_events_by_organizer',
  FIND_BY_DATE: 'find_events_by_date',
  FIND_UPCOMING: 'find_upcoming_events', // eventos futuros
  FIND_PAST: 'find_past_events',         // eventos passados

  // Criação
  CREATE: 'create_event',

  // Atualização
  UPDATE: 'update_event',
  ADD_ADMIN: 'add_event_admin',
  REMOVE_ADMIN: 'remove_event_admin',
  CANCEL_EVENT: 'cancel_event', // marca como cancelado

  // Exclusão
  DELETE: 'delete_event',
} as const;