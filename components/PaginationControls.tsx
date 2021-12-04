import {PaginatedCollection} from "@/lib/Paginator";

const PaginationControls = ({paginated, setPage}: {
    paginated: PaginatedCollection,
    setPage: any
}) => {
    const shouldShowButtons: boolean = paginated.totalPages > 1;
    const pageNumbers: number[] = [
        ...paginated.controls.pageOptionsLeft,
        paginated.currentPage,
        ...paginated.controls.pageOptionsRight
    ];
    const prevBtnClassName: string = paginated.currentPage === 1
        ? 'paginationControls__btn paginationControls__btn--disabled'
        : 'paginationControls__btn';
    const nextBtnClassName: string = paginated.currentPage === paginated.totalPages
        ? 'paginationControls__btn paginationControls__btn--disabled'
        : 'paginationControls__btn';
    const showingFrom: number = Math.max(((paginated.currentPage - 1) * paginated.itemsPerPage) + 1, 1);
    const showingTo: number = Math.min((showingFrom + paginated.itemsPerPage) - 1, paginated.totalItems);

    const Buttons = () => (
        <nav className="paginationControls" aria-label="Pagination">
            <button
                disabled={paginated.currentPage === 1}
                onClick={() => setPage(Math.max(1, paginated.currentPage - 1))}
                className={prevBtnClassName}>
                <span className="sr-only">Previous</span>
                &lt;
            </button>

            {pageNumbers
                .map(page => {
                    const isCurrentPage: boolean = page === paginated.currentPage;
                    const className: string = isCurrentPage
                        ? 'paginationControls__btn paginationControls__btn--active'
                        : 'paginationControls__btn';

                    return (
                        <button
                            key={page}
                            onClick={() => !isCurrentPage ? setPage(page) : null}
                            className={className}>
                            {page}
                        </button>
                    );
                })}

            <button
                disabled={paginated.currentPage === paginated.totalPages}
                onClick={() => setPage(Math.min(paginated.totalPages, paginated.currentPage + 1))}
                className={nextBtnClassName}>
                <span className="sr-only">Next</span>
                &gt;
            </button>
        </nav>
    );

    return (
        <div className='w-full px-4 sm:px-2 py-4 flex items-center justify-between border-t border-gray-200'>
            <div className="hidden sm:block w-1/2 flex items-center">
                <p className='text-xxs sm:text-xs m-0'>
                    Showing {showingFrom} to {showingTo} of {paginated.totalItems}
                </p>
            </div>
            <div className="w-full sm:w-1/2 flex items-center justify-center">
                {shouldShowButtons && <Buttons/>}
            </div>
        </div>
    );
};

export default PaginationControls;
