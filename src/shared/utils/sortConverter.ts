export default function sortConverter(sortOrder: string) {
  switch (sortOrder) {
    case '최신순': {
      return 'recent';
    }
    case '별점순': {
      return 'rating';
    }
    case '리뷰순': {
      return 'reviewCount';
    }
    default:
      return sortOrder;
  }
}
