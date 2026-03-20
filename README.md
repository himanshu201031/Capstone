# Capstone Project

## Development

```bash
# Install root dependencies
npm ci

# Install workspace dependencies
npm install --workspaces

# Start development servers (frontend + backend)
npm run dev
```

## Build

```bash
npm run build   # builds the frontend
```

## Environment Variables

Create a `.env` file at the project root with:

```text
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-very-strong-secret
```
