/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://designyourinvention.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    outDir: './out',
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
        ],
        additionalSitemaps: [],
    },
};
