import { homedir } from 'node:os';
import { join} from 'node:path';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';

const WORKING_DIRECTORY_NAME = 'mcp-shark';
const MCP_CONFIG_NAME = 'mcps.json';
const APP_DB_DIR_NAME = 'db';
const APP_DB_FILE_NAME = 'mcp-shark.sqlite';
const HELP_STATE_NAME = 'help-state.json';

export function getWorkingDirectory() {
  return join(homedir(), WORKING_DIRECTORY_NAME);
}

export function getDatabasePath() {
  return join(getWorkingDirectory(), APP_DB_DIR_NAME);
}

export function getDatabaseFile() {
  return join(getDatabasePath(), APP_DB_FILE_NAME);
}

export function createWorkingDirectorySpaces() {
  const workingDirectory = getWorkingDirectory();
  if (!existsSync(workingDirectory)) {
    mkdirSync(workingDirectory, { recursive: true });
  }
}

export function createDatabaseSpaces() {
  createWorkingDirectorySpaces();
  const databasePath = getDatabasePath();
  if (!existsSync(databasePath)) {
    mkdirSync(databasePath, { recursive: true });
    const databaseFile = getDatabaseFile();
    if (!existsSync(databaseFile)) {
      writeFileSync(databaseFile, '');
    }
  }
}

export function getMcpConfigPath() {
  return join(getWorkingDirectory(), MCP_CONFIG_NAME);
}

export function prepareAppDataSpaces() {
  createWorkingDirectorySpaces();
  createDatabaseSpaces();
}

export function getHelpStatePath() {
  return join(getWorkingDirectory(), HELP_STATE_NAME);
}

export function readHelpState() {
  try {
    const helpStatePath = getHelpStatePath();
    if (existsSync(helpStatePath)) {
      const content = readFileSync(helpStatePath, 'utf8');
      return JSON.parse(content);
    }
    return { dismissed: false };
  } catch (error) {
    console.error('Error reading help state:', error);
    return { dismissed: false };
  }
}

export function writeHelpState(state) {
  try {
    const helpStatePath = getHelpStatePath();
    prepareAppDataSpaces(); // Ensure directory exists
    writeFileSync(helpStatePath, JSON.stringify(state, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing help state:', error);
    return false;
  }
}