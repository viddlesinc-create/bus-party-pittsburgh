#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const reportPath = path.join(distDir, 'audit-report.json');

console.log('📊 Generating SSR Audit Dashboard...\n');

// Check if audit report exists
if (!fs.existsSync(reportPath)) {
  console.error('❌ Error: audit-report.json not found!');
  console.error('   Run "npm run audit-ssr" first to generate the audit report.\n');
  process.exit(1);
}

// Load audit results
const auditResults = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

// Generate HTML dashboard
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SSR Audit Report - Pitt Party Bus</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      overflow: hidden;
    }
    
    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    
    header h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    
    header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }
    
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      padding: 40px;
      background: #f8f9fa;
    }
    
    .summary-card {
      background: white;
      padding: 25px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .summary-card .number {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 10px;
    }
    
    .summary-card .label {
      color: #666;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .passed { color: #10b981; }
    .warning { color: #f59e0b; }
    .failed { color: #ef4444; }
    
    .section {
      padding: 40px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .section:last-child {
      border-bottom: none;
    }
    
    .section h2 {
      font-size: 1.8rem;
      margin-bottom: 20px;
      color: #1f2937;
    }
    
    .checks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
      margin-top: 20px;
    }
    
    .check-item {
      display: flex;
      align-items: center;
      padding: 15px;
      background: #f9fafb;
      border-radius: 6px;
      border-left: 4px solid #10b981;
    }
    
    .check-item.warn {
      border-left-color: #f59e0b;
    }
    
    .check-item.fail {
      border-left-color: #ef4444;
    }
    
    .check-item .icon {
      font-size: 1.5rem;
      margin-right: 15px;
    }
    
    .check-item .text {
      flex: 1;
    }
    
    .check-item .label {
      font-weight: 600;
      color: #1f2937;
    }
    
    .check-item .count {
      color: #6b7280;
      font-size: 0.9rem;
    }
    
    .routes-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    
    .routes-table th {
      background: #f3f4f6;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #374151;
      border-bottom: 2px solid #e5e7eb;
    }
    
    .routes-table td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .routes-table tr:hover {
      background: #f9fafb;
    }
    
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    
    .status-badge.passed {
      background: #d1fae5;
      color: #065f46;
    }
    
    .status-badge.warning {
      background: #fef3c7;
      color: #92400e;
    }
    
    .status-badge.failed {
      background: #fee2e2;
      color: #991b1b;
    }
    
    .issues-list {
      list-style: none;
      margin-top: 20px;
    }
    
    .issues-list li {
      padding: 12px;
      background: #fef2f2;
      border-left: 4px solid #ef4444;
      margin-bottom: 10px;
      border-radius: 4px;
      color: #991b1b;
    }
    
    .warnings-list {
      list-style: none;
      margin-top: 20px;
    }
    
    .warnings-list li {
      padding: 12px;
      background: #fffbeb;
      border-left: 4px solid #f59e0b;
      margin-bottom: 10px;
      border-radius: 4px;
      color: #92400e;
    }
    
    .performance-chart {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .performance-item {
      padding: 20px;
      background: #f9fafb;
      border-radius: 8px;
      text-align: center;
    }
    
    .performance-item .value {
      font-size: 2rem;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 5px;
    }
    
    .performance-item .label {
      color: #6b7280;
      font-size: 0.9rem;
    }
    
    .schema-coverage {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 15px;
      margin-top: 20px;
    }
    
    .schema-item {
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
      text-align: center;
    }
    
    .schema-item .count {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .schema-item .type {
      font-size: 0.9rem;
      opacity: 0.9;
    }
    
    footer {
      text-align: center;
      padding: 30px;
      color: #6b7280;
      font-size: 0.9rem;
    }
    
    .timestamp {
      margin-top: 10px;
      font-size: 0.85rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🔍 SSR Audit Report</h1>
      <p>Pitt Party Bus - Complete SEO & Performance Analysis</p>
    </header>
    
    <div class="summary">
      <div class="summary-card">
        <div class="number">${auditResults.summary.totalRoutes}</div>
        <div class="label">Total Routes</div>
      </div>
      <div class="summary-card">
        <div class="number passed">✅ ${auditResults.summary.passed}</div>
        <div class="label">Passed</div>
      </div>
      <div class="summary-card">
        <div class="number warning">⚠️ ${auditResults.summary.warnings}</div>
        <div class="label">Warnings</div>
      </div>
      <div class="summary-card">
        <div class="number failed">❌ ${auditResults.summary.failed}</div>
        <div class="label">Failed</div>
      </div>
    </div>
    
    <div class="section">
      <h2>🎯 Critical Checks</h2>
      <div class="checks-grid">
        <div class="check-item">
          <span class="icon">✅</span>
          <div class="text">
            <div class="label">H1 Tags</div>
            <div class="count">${auditResults.routes.filter(r => r.checks.h1?.status === 'pass').length}/${auditResults.summary.totalRoutes} pages</div>
          </div>
        </div>
        <div class="check-item">
          <span class="icon">✅</span>
          <div class="text">
            <div class="label">Meta Descriptions</div>
            <div class="count">${auditResults.routes.filter(r => r.checks.description?.content).length}/${auditResults.summary.totalRoutes} pages</div>
          </div>
        </div>
        <div class="check-item">
          <span class="icon">✅</span>
          <div class="text">
            <div class="label">Canonical URLs</div>
            <div class="count">${auditResults.routes.filter(r => r.checks.canonical?.status === 'pass').length}/${auditResults.summary.totalRoutes} pages</div>
          </div>
        </div>
        <div class="check-item">
          <span class="icon">✅</span>
          <div class="text">
            <div class="label">Structured Data</div>
            <div class="count">${auditResults.routes.filter(r => r.checks.structuredData?.count > 0).length}/${auditResults.summary.totalRoutes} pages</div>
          </div>
        </div>
        <div class="check-item">
          <span class="icon">✅</span>
          <div class="text">
            <div class="label">Open Graph Tags</div>
            <div class="count">${auditResults.routes.filter(r => r.checks.openGraph?.present === 5).length}/${auditResults.summary.totalRoutes} pages</div>
          </div>
        </div>
        <div class="check-item">
          <span class="icon">✅</span>
          <div class="text">
            <div class="label">Twitter Cards</div>
            <div class="count">${auditResults.routes.filter(r => r.checks.twitterCards?.present === 4).length}/${auditResults.summary.totalRoutes} pages</div>
          </div>
        </div>
      </div>
    </div>
    
    ${auditResults.summary.criticalIssues.length > 0 ? `
    <div class="section">
      <h2>❌ Critical Issues (${auditResults.summary.criticalIssues.length})</h2>
      <ul class="issues-list">
        ${auditResults.summary.criticalIssues.map(issue => `<li>${issue}</li>`).join('')}
      </ul>
    </div>
    ` : ''}
    
    ${auditResults.routes.flatMap(r => r.warnings).length > 0 ? `
    <div class="section">
      <h2>⚠️ Warnings (${auditResults.routes.flatMap(r => r.warnings).length})</h2>
      <ul class="warnings-list">
        ${auditResults.routes.flatMap(r => r.warnings.map(w => `${r.name}: ${w}`)).slice(0, 20).map(warning => `<li>${warning}</li>`).join('')}
        ${auditResults.routes.flatMap(r => r.warnings).length > 20 ? `<li>... and ${auditResults.routes.flatMap(r => r.warnings).length - 20} more warnings</li>` : ''}
      </ul>
    </div>
    ` : ''}
    
    <div class="section">
      <h2>📈 Performance Metrics</h2>
      <div class="performance-chart">
        <div class="performance-item">
          <div class="value">${(auditResults.performance.totalSize / 1024 / 1024).toFixed(2)} MB</div>
          <div class="label">Total HTML Size</div>
        </div>
        <div class="performance-item">
          <div class="value">${(auditResults.performance.avgSize / 1024).toFixed(2)} KB</div>
          <div class="label">Average File Size</div>
        </div>
        <div class="performance-item">
          <div class="value">${(auditResults.performance.largestPage.size / 1024).toFixed(2)} KB</div>
          <div class="label">Largest Page<br><small>${auditResults.performance.largestPage.name}</small></div>
        </div>
        <div class="performance-item">
          <div class="value">${(auditResults.performance.smallestPage.size / 1024).toFixed(2)} KB</div>
          <div class="label">Smallest Page<br><small>${auditResults.performance.smallestPage.name}</small></div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2>🔗 Schema Coverage</h2>
      <div class="schema-coverage">
        <div class="schema-item">
          <div class="count">${auditResults.schemas.organization}</div>
          <div class="type">Organization</div>
        </div>
        <div class="schema-item">
          <div class="count">${auditResults.schemas.website}</div>
          <div class="type">WebSite</div>
        </div>
        <div class="schema-item">
          <div class="count">${auditResults.schemas.breadcrumb}</div>
          <div class="type">Breadcrumb</div>
        </div>
        <div class="schema-item">
          <div class="count">${auditResults.schemas.article}</div>
          <div class="type">Article/Blog</div>
        </div>
        <div class="schema-item">
          <div class="count">${auditResults.schemas.service}</div>
          <div class="type">Service</div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2>📋 All Routes</h2>
      <table class="routes-table">
        <thead>
          <tr>
            <th>Page</th>
            <th>Status</th>
            <th>H1</th>
            <th>Word Count</th>
            <th>File Size</th>
            <th>Schemas</th>
          </tr>
        </thead>
        <tbody>
          ${auditResults.routes.map(route => `
            <tr>
              <td><strong>${route.name}</strong><br><small style="color: #6b7280;">${route.path}</small></td>
              <td><span class="status-badge ${route.status}">${route.status}</span></td>
              <td>${route.checks.h1?.text ? `✅ ${route.checks.h1.text.substring(0, 30)}...` : '❌ Missing'}</td>
              <td>${route.checks.content?.wordCount || 0} words</td>
              <td>${route.checks.fileSize?.kb || 0} KB</td>
              <td>${route.checks.structuredData?.count || 0} schemas</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    
    <footer>
      <p><strong>Audit generated successfully!</strong></p>
      <p class="timestamp">Generated: ${new Date().toLocaleString()}</p>
      <p style="margin-top: 20px;">
        For detailed JSON report, see: <code>dist/audit-report.json</code>
      </p>
    </footer>
  </div>
</body>
</html>`;

// Write dashboard HTML
const dashboardPath = path.join(distDir, 'audit-dashboard.html');
fs.writeFileSync(dashboardPath, html);

console.log('✅ Dashboard generated successfully!');
console.log(`📄 View at: ${dashboardPath}`);
console.log('');
console.log('💡 Open the dashboard in your browser:');
console.log(`   file://${dashboardPath}`);
console.log('');
