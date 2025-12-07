/**
 * MCP Shark Common - Main Entry Point
 * 
 * Shared utilities and database management for MCP Shark
 */

// Database initialization and schema
export { initDb, openDb } from './db/init.js';

// Audit logging functions
export { getLogger } from './db/logger.js';

// Database query utilities
export {
  queryPackets,
  queryRequests,
  queryConversations,
  getSessionPackets,
  getSessionRequests,
  getSessions,
  getStatistics,
  getConversationStatistics,
} from './db/query.js';

// Configuration path management
export {
  getWorkingDirectory,
  getDatabasePath,
  getDatabaseFile,
  getMcpConfigPath,
  getHelpStatePath,
  createWorkingDirectorySpaces,
  createDatabaseSpaces,
  prepareAppDataSpaces,
  readHelpState,
  writeHelpState,
} from './configs/index.js';

