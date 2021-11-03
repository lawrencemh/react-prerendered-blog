import '@testing-library/jest-dom/extend-expect';

jest.mock(
    'next/image',
    () =>
        function Image({src, alt}) {
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={src} alt={alt} />
        },
);
