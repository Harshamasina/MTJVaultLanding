import Link from 'next/link';
import type { BlogPost } from './types';

function Content() {
    return (
        <>
            <p>
                Migrating a patent portfolio from spreadsheets, legacy docketing tools, or scattered firm files into a
                modern{' '}
                <Link href="/blog/what-is-ip-management-software/">IP management platform</Link> is one of the most
                consequential projects an IP team will run. A clean migration sets up years of accurate docketing,
                analytics, and compliance reporting. A messy migration creates a permanent data quality debt that haunts
                every downstream workflow. This guide walks through how to plan and execute a CSV-based patent data
                migration without losing data integrity.
            </p>

            <h2>Why Migration Quality Matters</h2>
            <p>
                Patent management is unforgiving of bad data. A wrong priority date can shift a national phase deadline
                by a year. A missing fee status can lead to abandonment. A mislinked family relationship can hide a
                continuation from the team that needs to manage it. Unlike a CRM where bad data means a missed sales
                call, bad patent data can mean lost rights worth millions.
            </p>
            <p>
                The good news: CSV import is the right tool when done carefully. Spreadsheets are still the most common
                source of truth for IP data, and a well-structured CSV captures the field-by-field detail needed to
                rebuild the portfolio inside a structured database.
            </p>

            <h2>Step 1: Inventory Your Source Data</h2>
            <p>
                Before exporting anything, audit what you actually have. Most IP teams discover their data lives in more
                places than they realize:
            </p>
            <ul>
                <li><strong>Master docketing spreadsheet</strong> - usually maintained by the docketing team or paralegal</li>
                <li><strong>Attorney case lists</strong> - individual partners often keep their own portfolios in personal spreadsheets</li>
                <li><strong>Outside counsel reports</strong> - quarterly status updates from foreign agents</li>
                <li><strong>Fee tracking spreadsheets</strong> - often separate from case docketing</li>
                <li><strong>Document management systems</strong> - patent files, office actions, responses, and grants</li>
                <li><strong>Email archives</strong> - the worst place to find patent data, but a place where critical information often lives</li>
            </ul>
            <p>
                Designate a single source of truth before migration. Pick the most authoritative source for each data
                category - usually the master docketing spreadsheet for cases, the fee tracker for fees - and resolve
                conflicts before migrating, not after.
            </p>

            <h2>Step 2: Map Fields to the Target Schema</h2>
            <p>
                Every IP management platform has its own data model. Before exporting your CSV, get the target schema
                from the platform vendor and create a field mapping. Typical patent data fields include:
            </p>
            <ul>
                <li><strong>Reference code</strong> - your firm&apos;s internal case number</li>
                <li><strong>Title</strong> - invention title</li>
                <li><strong>Application type</strong> - provisional, utility, PCT, national phase, design, divisional, continuation, CIP</li>
                <li><strong>Jurisdiction</strong> - US, EP, JP, CN, etc.</li>
                <li><strong>Application number</strong> - serial number assigned by the patent office</li>
                <li><strong>Filing date</strong> - the date filed with the patent office</li>
                <li><strong>Priority date</strong> - the earliest claimed priority</li>
                <li><strong>Status</strong> - pending, granted, abandoned, expired</li>
                <li><strong>Family ID</strong> - identifier linking related applications</li>
                <li><strong>Parent application</strong> - for continuations and divisionals</li>
                <li><strong>Inventors</strong> - listed inventors, often a comma-separated string</li>
                <li><strong>Owner / assignee</strong> - the entity that owns the application</li>
                <li><strong>Examiner</strong> - assigned examiner name (if assigned)</li>
                <li><strong>Next deadline</strong> - upcoming critical date with type and due date</li>
            </ul>
            <p>
                Document the mapping explicitly: source column name, target field name, transformation rule, validation
                rule. This document is the migration contract and the artifact you will refer to when something looks
                wrong post-migration.
            </p>

            <h2>Step 3: Clean the Data</h2>
            <p>
                The biggest determinant of migration success is the data cleaning that happens before import. Common
                issues to address:
            </p>
            <ul>
                <li><strong>Date format inconsistency</strong> - mix of DD/MM/YYYY, MM/DD/YYYY, ISO 8601, and free-text dates. Normalize to ISO 8601 (YYYY-MM-DD) before import.</li>
                <li><strong>Jurisdiction codes</strong> - &quot;USA&quot;, &quot;US&quot;, &quot;United States&quot; are all the same country. Standardize to ISO 3166-1 alpha-2 codes (US, GB, DE, JP).</li>
                <li><strong>Application numbers</strong> - leading zeros, slashes, and prefixes (&quot;US63/988,001&quot; vs &quot;63988001&quot;). Pick a format and apply consistently.</li>
                <li><strong>Status values</strong> - free-text status fields full of variants (&quot;pending&quot;, &quot;Pending&quot;, &quot;in prosecution&quot;, &quot;awaiting action&quot;). Map to a controlled vocabulary.</li>
                <li><strong>Missing required fields</strong> - rows missing priority date or filing date will fail import. Decide whether to fix at source or skip.</li>
                <li><strong>Duplicate records</strong> - same application appearing in multiple sheets with conflicting data. Reconcile before import.</li>
            </ul>
            <p>
                Keep a data quality log. Every row you fix, skip, or transform should be recorded so the team can audit
                migration decisions later. This log becomes critical evidence if a deadline question arises post-migration.
            </p>

            <h2>Step 4: Run a Pilot Import</h2>
            <p>
                Never migrate the full portfolio in one run. Start with a 50-100 row pilot covering representative
                cases - a mix of granted, pending, and abandoned; multiple jurisdictions; at least one family with parent
                and child applications.
            </p>
            <p>
                After the pilot import, validate every field on every row against the source. Spot-check is not enough -
                full validation catches systematic issues like date misparsing or jurisdiction mismapping that would
                otherwise propagate through the full portfolio.
            </p>

            <h2>Step 5: Validate Family Relationships</h2>
            <p>
                Patent family relationships are the hardest part of migration. A continuation references a parent
                application; a national phase entry references a PCT application; a PCT references a priority application.
                These relationships are typically captured by application number references, which means import order
                matters - parents must exist before children can link to them.
            </p>
            <p>
                Most platforms support a two-pass import: first pass creates all applications without family links;
                second pass adds the parent-child links. After the second pass, validate the family tree visually for
                each major family. Missing links are easier to spot in a tree view than in a CSV.
            </p>

            <h2>Step 6: Migrate Fees and Deadlines</h2>
            <p>
                Fees and deadlines are usually a separate import step after applications are loaded. The reason: fees
                reference applications by ID, and the application must exist in the target system before the fee can
                be linked.
            </p>
            <p>
                Fee data validation is critical. Spot-check the next 10 upcoming fees per jurisdiction against the
                source system after import. A misformatted fee due date can cascade into a missed annuity payment and
                an abandoned patent.
            </p>

            <h2>Step 7: Run a Parallel Period</h2>
            <p>
                Do not switch off the old system the day after migration. Run the new system in parallel with the old
                for at least 30 days. The docketing team should add new cases to both systems and verify both produce
                the same upcoming deadline list each week. Discrepancies surface integration bugs, missing fields, or
                unmigrated data that would otherwise be discovered as missed deadlines.
            </p>

            <h2>Common Migration Pitfalls</h2>
            <ul>
                <li><strong>Migrating without mapping</strong> - importing whatever CSV structure you happen to have, then trying to remap inside the target system. Always map first.</li>
                <li><strong>Skipping the pilot</strong> - importing the full portfolio in one shot to save time. The cleanup time after a bad full import always exceeds the pilot time would have cost.</li>
                <li><strong>Trusting source data</strong> - assuming spreadsheet data is accurate because it has been used for years. Years of manual edits accumulate errors.</li>
                <li><strong>Migrating documents separately</strong> - importing case data without linking documents creates orphaned files that are nearly impossible to reconcile later.</li>
                <li><strong>No rollback plan</strong> - having no way to revert if migration fails halfway. Every import should be reversible until validation completes.</li>
            </ul>

            <h2>Getting Started</h2>
            <p>
                Design Your Invention provides a structured CSV import workflow with field mapping, validation,
                two-pass family linking, and a full audit trail of every imported row. The import system enforces the
                target schema and surfaces validation errors before any data is committed - so a malformed date or
                missing priority date never makes it into the live portfolio. See our{' '}
                <Link href="/#features">platform features</Link> for the full data import workflow, and review{' '}
                <Link href="/blog/patent-docketing-best-practices/">docketing best practices</Link> to understand how
                clean migration enables better long-term docketing hygiene.
            </p>
        </>
    );
}

export const post: BlogPost = {
    slug: 'patent-data-migration-csv-import',
    title: 'Migrating Your Patent Portfolio: A CSV Import Guide for IP Teams',
    shortTitle: 'Patent Data Migration',
    description:
        'A step-by-step guide to migrating patent portfolio data from spreadsheets and legacy docketing systems via CSV import. Covers field mapping, data cleaning, family relationships, and validation.',
    publishedAt: '2026-04-12',
    author: { name: 'Design Your Invention Team', role: 'IP Management Specialists' },
    category: 'Data Migration',
    readingTime: '11 min read',
    keywords: [
        'patent data migration',
        'csv import patent management',
        'migrate patent spreadsheets',
        'ip data migration',
        'patent portfolio migration',
        'docketing data import',
    ],
    content: Content,
};
