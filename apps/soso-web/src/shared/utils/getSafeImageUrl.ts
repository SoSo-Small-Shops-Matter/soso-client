const isValidUrl = (url: string | undefined | null): url is string => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
export const getSafeImageUrl = (imgUrl: string | undefined | null, defaultUrl = '/images/default_profile.svg') => {
  return isValidUrl(imgUrl) ? imgUrl : defaultUrl;
};
