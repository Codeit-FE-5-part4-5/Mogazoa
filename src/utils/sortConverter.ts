const sortConverter = (sortOrder: string) => {
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
    case 'recent': {
      return '가장 최근 상품';
    }
    case 'rating': {
      return '베스트 상품';
    }
    case 'reviewCount': {
      return '가장 핫한 상품';
    }
    default:
      return sortOrder;
  }
};

export default sortConverter;
