import {PaginatedCollection, PostEntity} from "@/types/types";

export const paginate = (items: PostEntity[], perPage: number, page: number, controlsSpread: number = 2): PaginatedCollection => {
    const lastIndex = perPage * page;
    const firstIndex = lastIndex - perPage;
    const chunk = items.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(items.length / perPage);

    return {
        items: chunk,
        totalPages: totalPages,
        totalItems: items.length,
        itemsPerPage: perPage,
        currentPage: page,
        controls: {
            pageOptionsLeft: generateLeftControlPageOptions(page, controlsSpread),
            pageOptionsRight: generateRightControlPageOptions(totalPages, page, controlsSpread)
        }
    }
};

const generateLeftControlPageOptions = (currentPage: number, controlsSpread: number): number[] => {
    const min: number = Math.max(currentPage - controlsSpread, 1);
    const arr: number[] = [];

    for (let i: number = min; i < currentPage; i++) {
        arr.push(i);
    }

    return arr;
};

const generateRightControlPageOptions = (totalPages: number, currentPage: number, controlsSpread: number): number[] => {
    const max: number = Math.min(currentPage + controlsSpread, totalPages);
    const arr: number[] = [];

    for (let i: number = currentPage + 1; i <= max; i++) {
        arr.push(i);
    }

    return arr;
};

