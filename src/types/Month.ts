export interface GetMonthsWithResponse {
    message: string;
    data: PaginatedMonths;
}

export interface PaginatedMonths {
    current_page: number;
    data: MonthYear[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface MonthYear {
    year: number;
    month: number;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export const monthNames = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
export const monthFullNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

