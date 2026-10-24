import React, { useState } from 'react';
import { storage } from '../../lib/db/storageEngine';
import { testTursoConnection, TursoStatusResult } from '../../lib/db/tursoClient';
import { useAuth } from '../../lib/auth/authContext';
import { AppSettings } from '../../lib/db/schema';
import {
  Settings,
  Database,
  Save,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Server,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { isOwner } = useAuth();
  const [settings, setSettings] = useState<AppSettings>(storage.getSettings());
  const [tursoStatus, setTursoStatus] = useState<TursoStatusResult | null>(null);
  const [testingTurso, setTestingTurso] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    storage.saveSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleTestTurso = async () => {
    setTestingTurso(true);
    const result = await testTursoConnection(settings.tursoDatabaseUrl);
    setTursoStatus(result);
    setTestingTurso(false);
  };

  const handleExportSql = () => {
    const dump = storage.exportSqlDump();
    const blob = new Blob([dump], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `verdaura_sqlite_dump_${new Date().toISOString().split('T')[0]}.sql`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetDatabase = () => {
    if (confirm('CAUTION: This will reset all leads, contacts, deals, tasks, and inquiries back to original verified factory seeds. Are you sure?')) {
      storage.resetToFactory();
      alert('Database reset completed successfully.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <span className="botanical-badge text-[11px] py-0.5 px-2.5">
          <Settings className="w-3.5 h-3.5 text-forest" />
          Workspace Configuration
        </span>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-forest-950 mt-1">
          System &amp; Database Settings
        </h1>
        <p className="text-xs text-charcoal-600">
          Configure business profile defaults, Turso Cloud endpoints, and database maintenance tools.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center gap-2.5 text-xs animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Business Profile */}
        <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-xs space-y-4">
          <div className="border-b border-sand-200 pb-2">
            <h3 className="font-serif font-bold text-base text-forest-950">
              Business Profile Defaults
            </h3>
            <p className="text-[11px] text-charcoal-500">
              Core company information shown across communications and exports.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Business Name</label>
              <input
                type="text"
                required
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest"
              />
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Administrative Email</label>
              <input
                type="email"
                required
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-forest-950 mb-1">Direct Phone</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest"
              />
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Currency Code</label>
              <input
                type="text"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest"
              />
            </div>

            <div>
              <label className="block font-semibold text-forest-950 mb-1">Primary Timezone</label>
              <input
                type="text"
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:ring-2 focus:ring-forest"
              />
            </div>
          </div>
        </div>

        {/* Turso Cloud Database Integration */}
        <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-xs space-y-4">
          <div className="border-b border-sand-200 pb-2 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-base text-forest-950 flex items-center gap-2">
                <Database className="w-4 h-4 text-forest" />
                <span>Turso Cloud Architecture</span>
              </h3>
              <p className="text-[11px] text-charcoal-500">
                SQLite-compatible distributed database integration via @libsql/client.
              </p>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-50 border border-forest-200 text-[10.5px] font-semibold text-forest-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Offline-First Fallback Active</span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-forest-950 mb-1">
              Turso Database URL (Optional Remote libSQL Sync)
            </label>
            <input
              type="text"
              value={settings.tursoDatabaseUrl}
              onChange={(e) => setSettings({ ...settings, tursoDatabaseUrl: e.target.value })}
              placeholder="libsql://verdaura-db.turso.io"
              className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 font-mono text-xs focus:ring-2 focus:ring-forest"
            />
            <p className="text-[11px] text-charcoal-500 mt-1">
              Leave blank to operate in high-speed local-first reactive storage with automatic browser persistence.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleTestTurso}
              disabled={testingTurso}
              className="btn-secondary text-xs px-4 py-2 min-h-[36px] gap-2"
            >
              <Server className="w-3.5 h-3.5" />
              <span>{testingTurso ? 'Pinging Endpoint...' : 'Test Connection'}</span>
            </button>

            {tursoStatus && (
              <span
                className={`text-xs flex items-center gap-1.5 ${
                  tursoStatus.connected ? 'text-emerald-700 font-semibold' : 'text-charcoal-600'
                }`}
              >
                {tursoStatus.connected ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                )}
                <span>{tursoStatus.message}</span>
              </span>
            )}
          </div>
        </div>

        {/* Database Export & Maintenance */}
        <div className="bg-white p-6 rounded-2xl border border-sand-200 shadow-xs space-y-4">
          <div className="border-b border-sand-200 pb-2">
            <h3 className="font-serif font-bold text-base text-forest-950">
              Database Maintenance &amp; Backup
            </h3>
            <p className="text-[11px] text-charcoal-500">
              Generate full SQLite DDL &amp; DML backups or restore default seed data.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportSql}
              className="btn-secondary text-xs px-4 py-2 min-h-[36px] gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download SQLite .sql Dump</span>
            </button>

            {isOwner && (
              <button
                type="button"
                onClick={handleResetDatabase}
                className="px-4 py-2 rounded-full border border-red-300 text-red-700 hover:bg-red-50 text-xs font-semibold flex items-center gap-2 transition-colors min-h-[36px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Factory Seeds</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="submit" className="btn-primary text-xs px-6 py-2.5 min-h-[40px] gap-2">
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
