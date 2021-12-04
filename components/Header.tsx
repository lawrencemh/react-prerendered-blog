import Link from 'next/link'
import Image from 'next/image'

const Header = ({blogName, hasLogo, hasExternalLink, externalLink, externalCta, logoSrc}: {
    blogName: string,
    hasLogo: boolean,
    hasExternalLink: boolean,
    externalLink: string,
    externalCta: string,
    logoSrc: string
}) => {
    const LogoHTML: any = (hasLogo
        ? <img
            src={logoSrc}
            className='max-w-48 w-full h-auto object-contain'
            alt={blogName}
        />
        : <span>{blogName}</span>);

    return (
        <header className="h-20 border-b border-gray-200 flex items-center overflow-y-hidden">
            <div className="px-4 sm:px-0 max-w-2xl w-full mx-auto flex justify-space-around">
                <div className="flex-1 hidden sm:flex">
                    &nbsp;
                </div>
                <div className="flex flex-1 justify-self-center items-center justify-center text-3xl uppercase pointer">
                    <Link href="/">
                        <a>
                            {LogoHTML}
                        </a>
                    </Link>
                </div>

                <div className="hidden sm:flex flex-1 items-center justify-end tracking-wide">
                    {hasExternalLink &&
                    <a className='header--extCta rounded-full text-white text-xs py-2 px-4 bg-primary hover:bg-primary-400 transition-colors'
                       target='_blank'
                       rel="noreferrer"
                       href={externalLink}>{externalCta}</a>}
                </div>
            </div>
        </header>
    );
};

export default Header;
