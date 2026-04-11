import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { defaultConditionContent, defaultVitaminInfusionsContent, defaultOurTeamContent, defaultEvaluationsContent } from '@/lib/templates/newDefaults';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertTriangle, XCircle, Database, Code, Upload } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
// Map of slug → hardcoded default content
const KNOWN_DEFAULTS: Record<string, object> = {
  'evaluations': defaultEvaluationsContent,
  'our-team': defaultOurTeamContent,
  'vitamin-infusions': defaultVitaminInfusionsContent,
  'conditions-depression': defaultConditionContent.depression,
  'conditions-anxiety': defaultConditionContent.anxiety,
  'conditions-ptsd': defaultConditionContent.ptsd,
  'conditions-ocd': defaultConditionContent.ocd,
  'conditions-pain-management': defaultConditionContent['pain-management'],
};

// Known slugs we expect in the DB
const ALL_SLUGS = [
  'home',
  'spravato-Englewood',
  'ketamine',
  'evaluations',
  'faq',
  'contact',
  'our-team',
  'vitamin-infusions',
  'conditions-depression',
  'conditions-anxiety',
  'conditions-ptsd',
  'conditions-ocd',
  'conditions-pain-management',
];

interface PageRow {
  id: string;
  slug: string;
  title: string;
  template: string | null;
  content_json: Record<string, unknown> | null;
  status: string;
}

type DiffEntry = {
  path: string;
  type: 'missing_in_db' | 'missing_in_defaults' | 'value_mismatch';
  dbValue?: unknown;
  defaultValue?: unknown;
};

function deepCompare(
  dbObj: unknown,
  defaultObj: unknown,
  path: string,
  diffs: DiffEntry[]
) {
  if (dbObj === defaultObj) return;

  if (
    typeof defaultObj === 'object' &&
    defaultObj !== null &&
    !Array.isArray(defaultObj)
  ) {
    const defKeys = Object.keys(defaultObj as Record<string, unknown>);
    const dbKeys = Object.keys((dbObj as Record<string, unknown>) || {});

    for (const key of defKeys) {
      const defVal = (defaultObj as Record<string, unknown>)[key];
      const dbVal = (dbObj as Record<string, unknown>)?.[key];
      if (dbVal === undefined) {
        diffs.push({ path: `${path}.${key}`, type: 'missing_in_db', defaultValue: defVal });
      } else {
        deepCompare(dbVal, defVal, `${path}.${key}`, diffs);
      }
    }

    for (const key of dbKeys) {
      if (!defKeys.includes(key)) {
        diffs.push({
          path: `${path}.${key}`,
          type: 'missing_in_defaults',
          dbValue: (dbObj as Record<string, unknown>)[key],
        });
      }
    }
  } else if (Array.isArray(defaultObj)) {
    const dbArr = Array.isArray(dbObj) ? dbObj : [];
    const maxLen = Math.max(defaultObj.length, dbArr.length);
    if (defaultObj.length !== dbArr.length) {
      diffs.push({
        path: `${path}[]`,
        type: 'value_mismatch',
        dbValue: `${dbArr.length} items`,
        defaultValue: `${defaultObj.length} items`,
      });
    }
    for (let i = 0; i < Math.min(defaultObj.length, dbArr.length); i++) {
      deepCompare(dbArr[i], defaultObj[i], `${path}[${i}]`, diffs);
    }
  } else {
    // Primitive mismatch
    if (JSON.stringify(dbObj) !== JSON.stringify(defaultObj)) {
      diffs.push({ path, type: 'value_mismatch', dbValue: dbObj, defaultValue: defaultObj });
    }
  }
}

function truncate(val: unknown, max = 80): string {
  const s = typeof val === 'string' ? val : JSON.stringify(val);
  return s && s.length > max ? s.slice(0, max) + '…' : s || '(empty)';
}

export default function ContentAudit() {
  const [pages, setPages] = useState<PageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [syncing, setSyncing] = useState<string | null>(null);

  const fetchPages = async () => {
    const { data, error: e } = await supabase
      .from('pages')
      .select('id, slug, title, template, content_json, status')
      .order('slug');

    if (e) {
      setError(e.message);
    } else {
      setPages((data as unknown as PageRow[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const pushDefaultsToDB = async (slug: string) => {
    const defaults = KNOWN_DEFAULTS[slug];
    if (!defaults) return;
    setSyncing(slug);
    try {
      const { error: e } = await supabase
        .from('pages')
        .update({ content_json: defaults as any })
        .eq('slug', slug);
      if (e) throw e;
      toast.success(`Pushed defaults to "${slug}"`);
      await fetchPages();
    } catch (err: any) {
      toast.error(`Failed: ${err.message}`);
    } finally {
      setSyncing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-destructive">Error: {error}</div>;
  }

  const pageMap = Object.fromEntries(pages.map((p) => [p.slug, p]));

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Content Audit</h1>
        <p className="text-muted-foreground mt-1">
          Compares DB <code>content_json</code> against hardcoded defaults. DB is source of truth.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Database className="mx-auto h-8 w-8 text-primary mb-2" />
            <p className="text-2xl font-bold">{pages.length}</p>
            <p className="text-muted-foreground text-sm">Pages in DB</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Code className="mx-auto h-8 w-8 text-primary mb-2" />
            <p className="text-2xl font-bold">{Object.keys(KNOWN_DEFAULTS).length}</p>
            <p className="text-muted-foreground text-sm">Pages with hardcoded defaults</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
            <p className="text-2xl font-bold">
              {pages.filter((p) => p.content_json && Object.keys(p.content_json).length > 0).length}
            </p>
            <p className="text-muted-foreground text-sm">Pages with DB content</p>
          </CardContent>
        </Card>
      </div>

      {/* Per-page audit */}
      <Accordion type="multiple" className="space-y-2">
        {ALL_SLUGS.map((slug) => {
          const page = pageMap[slug];
          const hasDbContent = page?.content_json && Object.keys(page.content_json).length > 0;
          const hasDefault = slug in KNOWN_DEFAULTS;
          const diffs: DiffEntry[] = [];

          if (hasDbContent && hasDefault) {
            deepCompare(page.content_json, KNOWN_DEFAULTS[slug], '', diffs);
          }

          let status: 'synced' | 'db-only' | 'defaults-only' | 'conflicts' | 'missing' | 'empty';
          if (!page) {
            status = 'missing';
          } else if (!hasDbContent && !hasDefault) {
            status = 'empty';
          } else if (hasDbContent && hasDefault && diffs.length === 0) {
            status = 'synced';
          } else if (hasDbContent && hasDefault && diffs.length > 0) {
            status = 'conflicts';
          } else if (hasDbContent && !hasDefault) {
            status = 'db-only';
          } else {
            status = 'defaults-only';
          }

          const statusBadge = {
            synced: <Badge className="bg-green-500/10 text-green-600 border-green-200">✓ Synced</Badge>,
            'db-only': <Badge className="bg-blue-500/10 text-blue-600 border-blue-200">DB Only</Badge>,
            'defaults-only': <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Defaults Only</Badge>,
            conflicts: <Badge variant="destructive">{diffs.length} Differences</Badge>,
            missing: <Badge variant="outline" className="text-red-600 border-red-200">Not in DB</Badge>,
            empty: <Badge variant="outline">Empty</Badge>,
          };

          return (
            <AccordionItem key={slug} value={slug} className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <span className="font-mono text-sm">{slug}</span>
                  {statusBadge[status]}
                  {page && (
                    <span className="text-xs text-muted-foreground">
                      ({page.status}{page.template ? ` • ${page.template}` : ''})
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {status === 'missing' && (
                  <p className="text-muted-foreground text-sm py-2">
                    This page is expected but doesn't exist in the <code>pages</code> table.
                  </p>
                )}
                {status === 'empty' && (
                  <p className="text-muted-foreground text-sm py-2">
                    Page exists in DB but has no <code>content_json</code> and no hardcoded defaults.
                  </p>
                )}
                {status === 'defaults-only' && (
                  <div className="text-sm py-2">
                    <p className="text-amber-700 mb-2">
                      <AlertTriangle className="inline h-4 w-4 mr-1" />
                      DB has no content — currently falling back to hardcoded defaults.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => pushDefaultsToDB(slug)}
                      disabled={syncing === slug}
                    >
                      {syncing === slug ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Upload className="h-4 w-4 mr-1" />}
                      Push Defaults to DB
                    </Button>
                  </div>
                )}
                {status === 'db-only' && (
                  <p className="text-blue-700 text-sm py-2">
                    Content is fully managed in DB. No hardcoded defaults exist for comparison.
                  </p>
                )}
                {status === 'synced' && (
                  <p className="text-green-700 text-sm py-2">
                    <CheckCircle className="inline h-4 w-4 mr-1" />
                    DB content matches hardcoded defaults exactly.
                  </p>
                )}
                {status === 'conflicts' && (
                  <div className="space-y-2 py-2">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-muted-foreground">
                        Differences found between DB content and hardcoded defaults. DB is source of truth.
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => pushDefaultsToDB(slug)}
                        disabled={syncing === slug}
                      >
                        {syncing === slug ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Upload className="h-4 w-4 mr-1" />}
                        Overwrite DB with Defaults
                      </Button>
                    </div>
                    <div className="space-y-1 max-h-96 overflow-y-auto">
                      {diffs.map((d, i) => (
                        <div key={i} className="text-xs border rounded p-2 bg-muted/30">
                          <div className="font-mono font-semibold text-foreground mb-1">
                            {d.path}
                            {d.type === 'missing_in_db' && (
                              <Badge variant="outline" className="ml-2 text-amber-600">Missing in DB</Badge>
                            )}
                            {d.type === 'missing_in_defaults' && (
                              <Badge variant="outline" className="ml-2 text-blue-600">Extra in DB</Badge>
                            )}
                            {d.type === 'value_mismatch' && (
                              <Badge variant="outline" className="ml-2 text-red-600">Mismatch</Badge>
                            )}
                          </div>
                          {d.type === 'value_mismatch' && (
                            <div className="grid grid-cols-2 gap-2 mt-1">
                              <div>
                                <span className="text-muted-foreground">DB:</span>{' '}
                                <span className="text-foreground">{truncate(d.dbValue)}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Default:</span>{' '}
                                <span className="text-foreground">{truncate(d.defaultValue)}</span>
                              </div>
                            </div>
                          )}
                          {d.type === 'missing_in_db' && (
                            <div className="mt-1">
                              <span className="text-muted-foreground">Default value:</span>{' '}
                              <span className="text-foreground">{truncate(d.defaultValue)}</span>
                            </div>
                          )}
                          {d.type === 'missing_in_defaults' && (
                            <div className="mt-1">
                              <span className="text-muted-foreground">DB value:</span>{' '}
                              <span className="text-foreground">{truncate(d.dbValue)}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}

        {/* Show any DB pages NOT in ALL_SLUGS */}
        {pages
          .filter((p) => !ALL_SLUGS.includes(p.slug))
          .map((page) => (
            <AccordionItem key={page.slug} value={page.slug} className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <span className="font-mono text-sm">{page.slug}</span>
                  <Badge className="bg-purple-500/10 text-purple-600 border-purple-200">Extra in DB</Badge>
                  <span className="text-xs text-muted-foreground">({page.status})</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground py-2">
                  This page exists in the DB but has no hardcoded route or defaults in the codebase.
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
