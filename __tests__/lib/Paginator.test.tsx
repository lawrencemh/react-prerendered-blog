import each from "jest-each";
import {paginate, PaginatedCollection} from "../../lib/Paginator";

describe('Paginator', () => {
    it('returns the correct array size', () => {
        const arr: string[] = [
            'one',
            'two',
            'three',
            'four',
            'five',
            'six',
        ];

        const paginated: PaginatedCollection = paginate(arr, 5, 1);

        expect(paginated.items).toHaveLength(5);

        // assert correct items
        for (let i = 0; i < 5; i++) {
            expect(paginated.items).toContain(arr[i]);
        }

        // assert other items missing as expected
        expect(paginated.items).not.toContain(arr[5]);
    });

    it('returns the correct array size for page 2', () => {
        const arr: string[] = [
            'one',
            'two',
            'three',
            'four',
            'five',
            'six',
        ];

        const paginated: PaginatedCollection = paginate(arr, 5, 2);

        expect(paginated.items).toHaveLength(1);

        // assert correct items
        expect(paginated.items).toContain(arr[5]);

        // assert other items missing as expected
        for (let i = 0; i < 5; i++) {
            expect(paginated.items).not.toContain(arr[i]);
        }
    });

    each([
        [25, 10, 3],
        [100, 5, 20],
        [75, 12, 7],
        [2, 10, 1],
    ]).it('returns the total pages', (arrLength, perPage, expectedTotalPages) => {
        const arr: number[] = [...Array(arrLength).keys()];

        const paginated: PaginatedCollection = paginate(arr, perPage, 3);

        expect(paginated.totalPages).toEqual(expectedTotalPages);
    });

    it('shows the current active page', () => {
        const arr: number[] = [...Array(5).keys()];

        const paginated: PaginatedCollection = paginate(arr, 2, 3);

        expect(paginated.currentPage).toEqual(3);
    });

    each([
        [50, 5, 5, 2, [3, 4]],
        [100, 10, 9, 4, [5, 6, 7, 8]],
        [100, 10, 1, 3, []],
    ]).it('Shows the control pages array to the left', (length, perPage, page, spread, expected) => {
        const arr: number[] = [...Array(length).keys()];

        const paginated: PaginatedCollection = paginate(arr, perPage, page, spread);

        expect(paginated.controls.pageOptionsLeft).toEqual(expected);
    });

    each([
        [100, 5, 5, 2, [6, 7]],
        [100, 10, 9, 4, [10]],
        [100, 10, 10, 3, []],
        [100, 10, 1, 5, [2, 3, 4, 5, 6]],
    ]).it('Shows the control pages array to the right', (length, perPage, page, spread, expected) => {
        const arr: number[] = [...Array(length).keys()];

        const paginated: PaginatedCollection = paginate(arr, perPage, page, spread);

        expect(paginated.controls.pageOptionsRight).toEqual(expected);
    });
});
