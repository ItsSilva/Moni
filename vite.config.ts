import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()], server: { allowedHosts: ['terminal.local'] }, test: { include: ['tests/**/*.unit.test.ts'] } });
