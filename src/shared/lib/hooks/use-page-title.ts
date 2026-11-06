import { useEffect } from 'react';
import { SITE } from '@shared/config/site';

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
  }, [title]);
};
