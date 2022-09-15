/*
 * @Author: Amelia
 * @email: zhangshan1@able-elec.com
 * @Date: 2022-09-15 14:52:21
 */
export function formatDate(time: string, format: string = 'YYYY-MM-DD hh:mm:ss') {
  const datetime: Date & Record<string, any> = new Date(time);
  if (format === 'timestamp') {
    return datetime.getTime();
  }

  const fmt: Record<string, string> = {
    YYYY: 'getFullYear',
    YY: 'getFullYear',
    MM: 'getMonth',
    DD: 'getDate',
    hh: 'getHours',
    mm: 'getMinutes',
    ss: 'getSeconds',
  };

  const result = format.replace(/(Y{2,4}|MM|DD|hh|mm|ss)/g, (prop: string): string => {
    let result:string | number = '';
    if (prop === 'MM') {
      result = datetime[fmt[prop]]() + 1;
    } else if (prop === 'YY') {
      result = datetime[fmt[prop]]().slice(-2);
    } else {
      result = datetime[fmt[prop]]();
    }

    result = result < 10 ? '0' + result : result;

    return result as string;
  });

  return result;
}
