# MCP Shark Common

> **⚠️ ALPHA VERSION - STILL TESTING**  
> This is an alpha version of MCP Shark Common. The software is still under active development and testing. Features may change, and there may be bugs or incomplete functionality. Use at your own risk.

> **Common library for MCP Shark related work**

MCP Shark Common is a shared library that provides common functionality for MCP Shark projects. This package contains reusable utilities including database initialization, logging, query utilities, and configuration management that are used across various MCP Shark components.

## 🎯 Overview

This package provides:

- **Database Management**: SQLite database initialization and schema creation
- **Audit Logging**: Structured logging for MCP communications
- **Query Utilities**: Database query helpers for packets, conversations, and sessions
- **Configuration Management**: Path resolution for app data directories

## ✨ Features

- **📊 Database Schema**: Complete SQLite schema for packet capture, conversations, and sessions
- **🔍 Query Helpers**: Convenient functions for querying audit logs
- **📝 Structured Logging**: Comprehensive logging with correlation IDs and metadata
- **🔧 Path Management**: Automatic resolution of app data directories (`~/.mcp-shark/`)

## 📦 Installation

```bash
npm install @mcp-shark/mcp-shark-common
```

## 🚀 Usage

This is a common library for MCP Shark projects. Import the utilities you need:

```javascript
import {
  // Database initialization
  initDb,
  openDb,
  // Logging
  getLogger,
  // Query utilities
  queryPackets,
  queryRequests,
  queryConversations,
  getSessionPackets,
  getSessions,
  getStatistics,
  // Configuration paths
  getWorkingDirectory,
  getDatabasePath,
  getDatabaseFile,
  getMcpConfigPath,
  prepareAppDataSpaces,
  readHelpState,
  writeHelpState
} from '@mcp-shark/mcp-shark-common';
```

### Database Initialization

```javascript
import { openDb } from '@mcp-shark/mcp-shark-common';

// Open or create database with schema
const db = openDb('/path/to/database.sqlite');
```

### Logging

```javascript
import { getLogger } from '@mcp-shark/mcp-shark-common';

const logger = getLogger(db);

// Log a request packet
logger.logRequestPacket({
  method: 'POST',
  url: '/mcp',
  headers: { /* ... */ },
  body: { /* ... */ },
  userAgent: '...',
  remoteAddress: '...'
});

// Log a response packet
logger.logResponsePacket({
  statusCode: 200,
  headers: { /* ... */ },
  body: { /* ... */ },
  requestFrameNumber: frameNumber,
  requestTimestampNs: timestampNs
});
```

### Configuration Paths

```javascript
import {
  getWorkingDirectory,
  getDatabasePath,
  getDatabaseFile,
  getMcpConfigPath,
  prepareAppDataSpaces
} from '@mcp-shark/mcp-shark-common';

// Get paths
const workingDir = getWorkingDirectory(); // ~/.mcp-shark
const dbPath = getDatabasePath();        // ~/.mcp-shark/db
const dbFile = getDatabaseFile();        // ~/.mcp-shark/db/mcp-shark.sqlite
const configPath = getMcpConfigPath();   // ~/.mcp-shark/mcps.json

// Create directories if they don't exist
prepareAppDataSpaces();
```

## 📁 Project Structure

This library is organized into modules:

```
@mcp-shark/mcp-shark-common/
├── index.js             # Main entry point (exports all utilities)
├── db/
│   ├── init.js          # Database initialization and schema
│   ├── logger.js        # Audit logging functions
│   └── query.js         # Database query utilities
└── configs/
    └── index.js         # Configuration path management
```

## 🗄️ Database Schema

The package defines a comprehensive SQLite schema with three main tables:

### `packets`
Individual HTTP request/response packets with full metadata:
- Timestamps (nanosecond precision)
- Direction (request/response)
- HTTP metadata (method, URL, status code)
- Headers and body (raw and parsed JSON)
- JSON-RPC metadata (ID, method, result, error)
- Session identification
- Network metadata

### `conversations`
Correlated request/response pairs:
- Links requests to their corresponding responses
- Tracks conversation flow
- Includes timing and performance metrics

### `sessions`
Session tracking for stateful MCP interactions:
- Session ID management
- Session metadata
- Lifecycle tracking

## 🛠️ Development

### Scripts

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Code Quality

- **ESLint**: Code linting with Prettier integration
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **Commitlint**: Conventional commit message validation

## 📝 License

ISC

## 🤝 Contributing

Contributions are welcome! Please ensure your code passes linting and formatting checks before submitting.

---

**Built with ❤️ for MCP Shark**

