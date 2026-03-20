/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://designyourinvention.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    outDir: './out',
    exclude: ['/blog', '/blog/*'],
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
        ],
        additionalSitemaps: [],
    },
};
