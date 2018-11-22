const moment = require('moment');
  
const getLocalTime = (date) => {
  const raw_time = moment.utc(date).toDate();
  const wrap_time = moment(moment.utc(raw_time).toDate());
  return wrap_time;
};

const local_map = {
  ko: {
    years: '년 전',
    months: '달 전',
    days: '일 전',
    hours: '시간 전',
    minutes: '분 전',
    seconds: '초 전',
    now: '지금',
    full_format: 'YYYY년 M월 D일',
    mmdd_format: 'M월 D일',
  },
  en: {
    years: ' years ago',
    months: ' months ago',
    days: ' days ago',
    hours: ' hours ago',
    minutes: ' minutes ago',
    seconds: ' seconds ago',
    now: 'now',
    full_format: 'mm/dd/YYYY',
    mmdd_format: 'mm/dd',
  }
};

function timeSince(date, lang) {
  const seconds = Math.floor((getLocalTime(new Date()) - getLocalTime(date)) / 1000);// + 32400 - 60 * 60 * 9;
  let interval = Math.floor(seconds / 31536000);  // 60 * 60 * 24 * 31 * 365?
  if (interval >= 1) {
    return getLocalTime(date).format(local_map[lang].full_format);
  }
  interval = Math.floor(seconds / 2592000); // 60 * 60 * 24 * 31?
  if (interval >= 1) {
    return getLocalTime(date).format(local_map[lang].mmdd_format);
  }
  interval = Math.floor(seconds / 86400); // 60 * 60 * 24
  if (interval >= 1) {
    return interval + local_map[lang].days;
  }
  interval = Math.floor(seconds / 3600); // 60 * 60
  if (interval >= 1) {
    return interval + local_map[lang].hours;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + local_map[lang].minutes;
  }
  return local_map[lang].now;
//   return Math.floor(seconds) + local_map[lang].seconds;
}




// console.log(raw_time);
// console.log(wrap_time);


export default timeSince;