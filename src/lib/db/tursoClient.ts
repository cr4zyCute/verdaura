/**
 * Turso Cloud Integration Client
 * Follows the guidelines from turso-cloud skill using @libsql/client/web
 */
import { createClient, Client } from '@libsql/client/web';
import { storage } from './storageEngine';

let tursoClientInstance: Client | null = null;

export function getTursoClient(): Client | null {
  if (tursoClientInstance) return tursoClientInstance;

  const settings = storage.getSettings();
  const url = import.meta.env.VITE_TURSO_DATABASE_URL || settings.tursoDatabaseUrl;
  const authToken = import.meta.env.VITE_TURSO_AUTH_TOKEN || '';

  if (!url || !url.startsWith('libsql://') && !url.startsWith('https://')) {
    return null;
  }

  try {
    tursoClientInstance = createClient({
      url,
      authToken: authToken || undefined,
    });
    return tursoClientInstance;
  } catch (err) {
    console.warn('Could not initialize Turso client:', err);
    return null;
  }
}

export interface TursoStatusResult {
  connected: boolean;
  message: string;
  databaseUrl?: string;
  latencyMs?: number;
}

export async function testTursoConnection(
  customUrl?: string,
  customToken?: string
): Promise<TursoStatusResult> {
  const settings = storage.getSettings();
  const url = customUrl || import.meta.env.VITE_TURSO_DATABASE_URL || settings.tursoDatabaseUrl;
  const authToken = customToken || import.meta.env.VITE_TURSO_AUTH_TOKEN || '';

  if (!url) {
    return {
      connected: false,
      message: 'No Turso Database URL configured. Operating in High-Speed Local-First Engine.',
    };
  }

  const start = performance.now();
  try {
    const testClient = createClient({
      url,
      authToken: authToken || undefined,
    });

    const res = await testClient.execute('SELECT 1 as connected, datetime("now") as server_time;');
    const latencyMs = Math.round(performance.now() - start);

    if (res.rows.length > 0) {
      return {
        connected: true,
        message: `Turso Cloud connection verified successfully (${latencyMs}ms latency).`,
        databaseUrl: url,
        latencyMs,
      };
    }

    return {
      connected: false,
      message: 'Connected to endpoint but returned unexpected result.',
    };
  } catch (err: any) {
    return {
      connected: false,
      message: `Turso connection failed: ${err.message || 'Unknown network error'}.`,
      databaseUrl: url,
    };
  }
}
