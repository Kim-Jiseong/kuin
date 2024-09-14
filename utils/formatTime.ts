import { format, formatDistance } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';

export type FormatOptions = {
  locale?: 'ko' | 'en';
  showRelative?: boolean;
};

export function formatDateTime(
  utcDateString: string,
  { locale = 'ko', showRelative = true }: FormatOptions = {}
): string {
  const utcDate = new Date(utcDateString); 
  const convertedDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000); 
  const nowLocal = new Date(); 
  const selectedLocale = locale === 'ko' ? ko : enUS;

  // 상대시간
  if (showRelative) {
    return formatDistance(convertedDate, nowLocal, { addSuffix: true, locale: selectedLocale });
  }

  // 절대시간
  const dateFormat = locale === 'ko' ? 'yyyy.MM.dd HH:mm' : 'MM/dd/yyyy HH:mm';
  return format(convertedDate, dateFormat);
}