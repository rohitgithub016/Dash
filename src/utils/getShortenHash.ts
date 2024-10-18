const getShortenHash = (hash: string, start = 12, end = 10) => {
  return `${hash?.slice(0, start)}....${hash?.slice(
    hash?.length - end,
    hash?.length
  )}`;
};

export default getShortenHash;
