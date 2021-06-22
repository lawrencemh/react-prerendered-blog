const PaginationControls = ({currentPage, perPage, totalItems, onPageUpdate}) => {
    const pageNumbers      = [];
    const indexOfLastItem  = (currentPage * perPage) + 1;
    const indexOfFirstItem = Math.max(1, indexOfLastItem - perPage);
    const totalPages       = Math.ceil(totalItems / perPage);

    for (let i = 1; i <= Math.ceil(totalItems / perPage); i++) {
        pageNumbers.push(i);
    }

    const rangeFromIndex          = 2;
    const currentPageNumbersIndex = pageNumbers.indexOf(currentPage);
    const pageNumbersSliceFrom    = Math.max(0, currentPageNumbersIndex - rangeFromIndex);
    const pageNumbersSliceTo      = Math.min(pageNumbers.length, currentPageNumbersIndex + rangeFromIndex + 1);

    const Buttons = () => (
        <nav className="paginationControls" aria-label="Pagination">
            <button
                onClick={() => onPageUpdate(Math.max(1, currentPage - 1))}
                className="paginationControls__btn">
                <span className="sr-only">Previous</span>
                &lt;
            </button>

            {pageNumbers.slice(pageNumbersSliceFrom, pageNumbersSliceTo)
                .map(page => {
                    const className = page === currentPage
                        ? 'paginationControls__btn paginationControls__btn--active'
                        : 'paginationControls__btn';

                    return (
                        <button
                            key={page}
                            onClick={() => onPageUpdate(page)}
                            className={className}>
                            {page}
                        </button>
                    );
                })}

            <button
                onClick={() => onPageUpdate(Math.min(totalPages, currentPage + 1))}
                className="paginationControls__btn">
                <span className="sr-only">Next</span>
                &gt;
            </button>
        </nav>
    );

    return (
        <div className='w-full px-4 sm:px-2 py-4 flex items-center justify-between border-t border-gray-200'>
            <div className="hidden sm:block w-1/2 flex items-center">
                <p className='text-xxs sm:text-xs m-0'>
                    Showing {indexOfFirstItem} to {Math.min(indexOfLastItem - 1, totalItems)} of {totalItems}
                </p>
            </div>
            <div className="w-full sm:w-1/2 flex items-center justify-center">
                <Buttons/>
            </div>
        </div>
    );
};

PaginationControls.defaultProps = {
    page      : 1,
    perPage   : 5,
    totalItems: 5,
};


export default PaginationControls;
