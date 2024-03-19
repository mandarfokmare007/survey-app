/**
 * Dashboard Table Date and Time formatting
 * @param data 
 * @returns formatted data
 */
export const dashboardTableDateAndTimeFormat = (data:any) => {          
    data.forEach((o:any) => {
    const [date, time] = o?.submittedDate.split(' ');
    const [y, m, d] = date.split('-');
    const [min, sec] = time.split(':')
    o.submittedDate = `${m}-${d}-${y} (${min}:${sec})`;
  })
  return data;
}