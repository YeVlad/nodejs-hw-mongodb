const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isContactType = ['work', 'home', 'personal'].includes(contactType);
  if (!isContactType) return;

  return contactType;
};
const parseBoolean = (Favourite) => {
  if (typeof Favourite === 'string') {
    if (Favourite === 'true') return true;
    if (Favourite === 'false') return false;
  }

  if (typeof Favourite === 'boolean') {
    return Favourite;
  }

  return;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;
  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
