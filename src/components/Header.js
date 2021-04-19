import config from 'blogConfig';

const Header = () => {
    const hasLogo         = config?.logo && config.logo.length > 0;
    const hasExternalLink = config?.externalLink?.show === true && config?.externalLink?.href;
    const externalLink    = config?.externalLink?.href ?? '#';
    const externalCta     = config?.externalLink?.cta ?? 'Visit site';

    return (
        <header className="h-20 border-b border-gray-200 flex items-center">
            <div className="px-4 sm:px-0 max-w-2xl w-full mx-auto grid grid-flow-col auto-cols-auto">
                <div className="h-1 w-1"></div>
                <div className="flex items-center justify-center text-3xl uppercase">
                    <a href="/">
                        {
                            hasLogo
                                ? <img className='max-w-48 w-full h-auto object-contain' src={config.logo}/>
                                : config.name
                        }
                    </a>
                </div>
                <div className="flex items-center justify-end tracking-wide">
                    {
                        hasExternalLink
                            ?
                            <a className='rounded-full text-white text-xs py-2 px-4 bg-blue-700 hover:bg-blue-500 transition-colors'
                               target='_blank'
                               href={externalLink}>{externalCta}</a>
                            : false
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;
