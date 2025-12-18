import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

const License = () => {
  const { membership } = useAuth();

  const features = [
    { key: 'blog', label: 'Blog Posts', description: 'Create and manage blog content' },
    { key: 'treatment_pages', label: 'Treatment Pages', description: 'Create specialized treatment landing pages' },
    { key: 'advanced_seo', label: 'Advanced SEO', description: 'Canonical URLs, OG tags, noindex settings' },
  ];

  const limits = [
    { key: 'max_posts', label: 'Maximum Posts', value: membership?.planFeatures.max_posts },
    { key: 'max_users', label: 'Maximum Users', value: membership?.planFeatures.max_users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">License</h1>
        <p className="text-muted-foreground">Your current plan and features</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Current Plan
              <Badge 
                variant={membership?.licenseActive ? 'default' : 'destructive'}
                className="ml-2"
              >
                {membership?.licenseActive ? 'Active' : 'Inactive'}
              </Badge>
            </CardTitle>
            <CardDescription>
              Your subscription details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {membership ? (
              <div className="space-y-4">
                <div className="text-center py-6 border rounded-lg bg-muted/50">
                  <div className="text-3xl font-bold capitalize mb-1">
                    {membership.planName}
                  </div>
                  <div className="text-muted-foreground">
                    Plan
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Limits</h4>
                  {limits.map((limit) => (
                    <div key={limit.key} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="text-muted-foreground">{limit.label}</span>
                      <span className="font-medium">
                        {limit.value === null ? 'Unlimited' : limit.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No active license
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>
              What's included in your plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {features.map((feature) => {
                const enabled = membership?.planFeatures[feature.key as keyof typeof membership.planFeatures];
                return (
                  <div 
                    key={feature.key} 
                    className={`flex items-start gap-3 p-3 rounded-lg ${enabled ? 'bg-green-50 dark:bg-green-950/20' : 'bg-muted/50'}`}
                  >
                    <div className={`mt-0.5 ${enabled ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {enabled ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className={`font-medium ${!enabled && 'text-muted-foreground'}`}>
                        {feature.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plan Comparison</CardTitle>
          <CardDescription>See what each plan includes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 pr-4">Feature</th>
                  <th className="text-center py-3 px-4">Starter</th>
                  <th className="text-center py-3 px-4">Growth</th>
                  <th className="text-center py-3 px-4">Lifetime</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 pr-4">Blog Posts</td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4">Treatment Pages</td>
                  <td className="text-center py-3 px-4"><X className="h-4 w-4 mx-auto text-muted-foreground" /></td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4">Advanced SEO</td>
                  <td className="text-center py-3 px-4"><X className="h-4 w-4 mx-auto text-muted-foreground" /></td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                  <td className="text-center py-3 px-4"><Check className="h-4 w-4 mx-auto text-green-600" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 pr-4">Max Posts</td>
                  <td className="text-center py-3 px-4">10</td>
                  <td className="text-center py-3 px-4">100</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">Max Users</td>
                  <td className="text-center py-3 px-4">2</td>
                  <td className="text-center py-3 px-4">10</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default License;
