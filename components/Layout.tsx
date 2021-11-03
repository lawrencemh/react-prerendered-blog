import Head from 'next/head'
import Header from '@/components/Header'
import config from '@/configs/blogConfig';

export default function Layout({children}: {
    children: React.ReactNode
}) {
    const hasLogo: boolean = !!(config?.logo && config.logo.length > 0);
    const hasExternalLink: boolean = !!(config?.externalLink?.show === true && config?.externalLink?.href);
    const externalLink: string = config?.externalLink?.href || '#';
    const externalCta: string = config?.externalLink?.cta || 'Visit site';

    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <meta
                    name="description"
                    content={config.description}
                />
                <meta
                    property="og:image"
                    content={hasExternalLink ? config.logo : ''}
                />
                <meta name="og:title" content={config.name}/>
                <meta name="twitter:card" content="summary_large_image"/>
            </Head>
            <Header
                blogName={config.name}
                hasLogo={hasLogo}
                hasExternalLink={hasExternalLink}
                externalLink={externalLink}
                externalCta={externalCta}
                logoSrc={config.logo}/>
            <main className='mainLayout'>{children}</main>
        </div>
    )
}
