import Link from 'next/link';
import type { BlogPost } from './types';

function Content() {
    return (
        <>
            <p>
                The Patent Cooperation Treaty (PCT) provides a unified procedure for filing patent applications in
                multiple countries simultaneously. For IP teams managing international portfolios, PCT filing management
                is one of the most deadline-sensitive processes in patent prosecution. Missing the 30-month national
                phase entry deadline - even by a single day - means losing patent rights in that jurisdiction permanently.
            </p>

            <h2>How the PCT Process Works</h2>
            <p>
                Understanding the PCT timeline is essential for effective management. The process unfolds in distinct
                phases, each with its own deadlines and decision points.
            </p>

            <h3>Priority Filing and the 12-Month Window</h3>
            <p>
                The PCT clock starts with the priority date - typically the filing date of the original national
                application (often a US provisional). From this date, you have exactly 12 months to file a PCT
                international application. This is the first critical deadline that must be docketed the moment a
                provisional application is filed.
            </p>

            <h3>International Phase (Months 0-30)</h3>
            <p>
                Once the PCT application is filed, it enters the international phase. During this period:
            </p>
            <ul>
                <li><strong>International Search Report (ISR)</strong> - issued by the International Searching Authority, typically within 16 months of the priority date. This report identifies prior art relevant to your claims.</li>
                <li><strong>Written Opinion</strong> - accompanies the ISR and provides a preliminary assessment of patentability (novelty, inventive step, industrial applicability).</li>
                <li><strong>Publication</strong> - the PCT application is published 18 months after the priority date. This is automatic and creates a prior art date for your application.</li>
                <li><strong>Chapter II Demand (optional)</strong> - filing a demand for International Preliminary Examination within 22 months of the priority date allows you to amend claims and get a more formal patentability opinion before entering national phase.</li>
            </ul>

            <h3>National Phase Entry (Month 30)</h3>
            <p>
                The most critical deadline in the PCT process. At 30 months from the priority date (31 months in some
                jurisdictions), you must file national phase applications in each country where you want patent
                protection. This requires:
            </p>
            <ul>
                <li>Selecting target jurisdictions based on commercial strategy</li>
                <li>Engaging local patent agents in each jurisdiction</li>
                <li>Preparing translations where required</li>
                <li>Paying national filing fees</li>
                <li>Filing within the strict deadline - there is no extension</li>
            </ul>

            <h2>5 Tips for Managing PCT Filings</h2>

            <h3>1. Docket Backwards from National Phase Deadlines</h3>
            <p>
                Do not wait until month 28 to start planning national phase entry. Docket preparation milestones
                backwards from the 30-month deadline:
            </p>
            <ul>
                <li><strong>Month 24</strong> - client decision on target jurisdictions</li>
                <li><strong>Month 25</strong> - engage local agents, begin translations</li>
                <li><strong>Month 27</strong> - translations complete, filings under review</li>
                <li><strong>Month 29</strong> - all filings submitted with confirmation receipts</li>
            </ul>
            <p>
                Your <Link href="/blog/patent-docketing-best-practices/">patent docketing system</Link> should
                automatically calculate these intermediate milestones from the priority date.
            </p>

            <h3>2. Track All PCT Applications in a Family Context</h3>
            <p>
                A PCT application is never standalone. It connects to a priority application (often a US provisional or
                first filing), and it spawns multiple national phase entries. Your management system must visualize
                this entire family tree so that actions on any single node are visible in context.
            </p>
            <p>
                When you file national phase in the EP, US, JP, IN, and AU, that is five new cases - each with their
                own prosecution timelines, fee schedules, and deadlines. All five must be linked back to the PCT filing
                and the original priority application.
            </p>

            <h3>3. Monitor the ISR and Written Opinion Strategically</h3>
            <p>
                The International Search Report is not just a formality. The prior art cited in the ISR tells you
                which claims are likely to face objections during national prosecution. Use this intelligence to:
            </p>
            <ul>
                <li>Amend claims proactively before national phase entry</li>
                <li>Decide whether to file a Chapter II demand for additional examination</li>
                <li>Adjust the list of target jurisdictions based on the strength of the application</li>
            </ul>

            <h3>4. Centralize Translation Management</h3>
            <p>
                National phase entries in countries like Japan, South Korea, China, and Germany require certified
                translations. These translations take time (typically 4-6 weeks for a full patent specification) and
                are expensive. Centralize translation tracking in your IP management system so you can monitor
                progress across all jurisdictions simultaneously.
            </p>

            <h3>5. Use Automated Reminders for Every PCT Milestone</h3>
            <p>
                The PCT process has at least seven distinct deadlines for each application. Manual tracking of these
                deadlines across multiple applications is error-prone. Automated reminders should fire at each milestone,
                and the responsible attorney and paralegal should both receive notifications.
            </p>

            <h2>PCT-Specific Pitfalls</h2>
            <ul>
                <li><strong>Jurisdiction-specific exceptions</strong> - some countries have 31-month national phase deadlines instead of 30. Others have unique requirements (like Japan&apos;s request for examination within 3 years). Your system must know these exceptions.</li>
                <li><strong>Provisional application expiration</strong> - if the priority application is a US provisional, it expires at 12 months. If you miss the PCT filing window, the provisional cannot be revived for PCT purposes.</li>
                <li><strong>Chapter II vs. direct national phase</strong> - filing a Chapter II demand costs money and time but provides valuable claim guidance. The decision to file should be made strategically, not defaulted.</li>
            </ul>

            <h2>Managing PCT Filings at Scale</h2>
            <p>
                For firms handling dozens of PCT applications annually, the complexity multiplies rapidly. Each
                application has its own priority date, its own 30-month clock, and its own set of target jurisdictions.
                A dedicated <Link href="/blog/what-is-ip-management-software/">IP management platform</Link> that
                understands PCT-specific workflows - including automatic deadline calculations from priority dates,
                family tree visualization, and multi-jurisdiction tracking - is essential for managing this complexity
                without errors.
            </p>
            <p>
                Design Your Invention provides{' '}
                <Link href="/#features">purpose-built PCT filing management</Link> with automated
                date calculations, family-level tracking, and configurable reminders at every milestone in the
                international and national phase process.
            </p>
        </>
    );
}

export const post: BlogPost = {
    slug: 'pct-filing-management-tips',
    title: 'PCT Filing Management: Deadlines, Phases, and Tools for IP Teams',
    description:
        'Master PCT filing management with these 5 practical tips. Learn how to track the 30-month national phase deadline, manage translations, and avoid the most common PCT pitfalls.',
    publishedAt: '2026-03-01',
    author: { name: 'Design Your Invention Team', role: 'IP Management Specialists' },
    category: 'Patent Filing',
    readingTime: '9 min read',
    keywords: [
        'PCT filing management',
        'PCT filing management tool',
        'patent cooperation treaty',
        'national phase entry deadline',
        'international patent filing',
    ],
    content: Content,
};
