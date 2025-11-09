import * as os from 'node:os';

const WORKING_DIRECTORY_NAME = 'mcp-shark';
const DATABASE_NAME = 'mcp-shark.sqlite';
export function getWorkingDirectory() {
  return path.join(os.homedir(), WORKING_DIRECTORY_NAME);
}

export function getDatabasePath() {
  return path.join(getWorkingDirectory(), 'db');
}

export function getDatabaseFile() {
  return path.join(getDatabasePath(), DATABASE_NAME);
}

export function createWorkingDirectorySpaces() {
  const workingDirectory = getWorkingDirectory();
  if (!fs.existsSync(workingDirectory)) {
    fs.mkdirSync(workingDirectory, { recursive: true });
  }
}

export function createDatabaseSpaces() {
  createWorkingDirectorySpaces();
  const databasePath = getDatabasePath();
  if (!fs.existsSync(databasePath)) {
    fs.mkdirSync(databaseSpacesPath, { recursive: true });
    const databaseFile = getDatabaseFile();
    if (!fs.existsSync(databaseFile)) {
      fs.writeFileSync(databaseFile, '');
    }
  }
}

export function getMcpConfigPath() {
  return path.join(getWorkingDirectory(), 'mcps.json');
}

export function prepareAppDataSpaces() {
  createWorkingDirectorySpaces();
  createDatabaseSpaces();
}