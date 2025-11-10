# MCP Shark Common

> **⚠️ ALPHA VERSION - STILL TESTING**  
> This is an alpha version of MCP Shark Common. The software is still under active development and testing. Features may change, and there may be bugs or incomplete functionality. Use at your own risk.

> **Shared utilities and database management for MCP Shark**

MCP Shark Common is a shared package that provides common functionality used across MCP Shark components, including database initialization, logging, query utilities, and configuration management.

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
npm install
```

## 🚀 Usage

### Database Initialization

```javascript
import { initDatabase } from './db/init.js';

// Initialize database with schema
const db = initDatabase('/path/to/database.sqlite');
```

### Logging

```javascript
import { logRequest, logResponse } from './db/logger.js';

// Log a request
await logRequest(db, {
  sessionId: 'session-123',
  method: 'POST',
  url: '/mcp',
  headers: { /* ... */ },
  body: { /* ... */ },
  jsonrpcId: '1',
  jsonrpcMethod: 'tools/list'
});

// Log a response
await logResponse(db, {
  requestId: 'req-123',
  statusCode: 200,
  headers: { /* ... */ },
  body: { /* ... */ },
  duration: 150
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
} from './configs/index.js';

// Get paths
const workingDir = getWorkingDirectory(); // ~/.mcp-shark
const dbPath = getDatabasePath();        // ~/.mcp-shark/db
const dbFile = getDatabaseFile();        // ~/.mcp-shark/db/mcp-shark.sqlite
const configPath = getMcpConfigPath();   // ~/.mcp-shark/mcps.json

// Create directories if they don't exist
prepareAppDataSpaces();
```

## 📁 Project Structure

```
mcp-shark-common/
├── db/
│   ├── init.js          # Database initialization and schema
│   ├── logger.js        # Audit logging functions
│   └── query.js         # Database query utilities
├── configs/
│   └── index.js         # Configuration path management
├── package.json
└── README.md
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

