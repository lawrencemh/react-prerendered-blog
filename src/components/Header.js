import config from 'blogConfig';
import {Link} from 'react-router-dom';

const Header = () => {
    const hasLogo         = config?.logo && config.logo.length > 0;
    const hasExternalLink = config?.externalLink?.show === true && config?.externalLink?.href;
    const externalLink    = config?.externalLink?.href ?? '#';
    const externalCta     = config?.externalLink?.cta ?? 'Visit site';

    return (
        <header className="h-20 border-b border-gray-200 flex items-center">
            <div className="px-4 sm:px-0 max-w-2xl w-full mx-auto flex justify-space-around">
                <div className="flex-1 hidden sm:flex">
                    &nbsp;
                </div>
                <div className="flex flex-1 justify-self-center items-center justify-center text-3xl uppercase">
                    <Link to='/'>
                        {
                            hasLogo
                                ? <img className='max-w-48 w-full h-auto object-contain' src={config.logo}/>
                                : config.name
                        }
                    </Link>
                </div>
                <div className="hidden sm:flex flex-1 items-center justify-end tracking-wide">
                    {
                        hasExternalLink
                            ?
                            <a className='rounded-full text-white text-xs py-2 px-4 bg-primary hover:bg-primary-400 transition-colors'
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
