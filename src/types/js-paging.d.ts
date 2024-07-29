declare module 'js-paging' {
  export default function pagesBadges(opts: {
    currentPage: number;
    pages: number;
    numBadges?: number;
  }): (number | null)[];
}
