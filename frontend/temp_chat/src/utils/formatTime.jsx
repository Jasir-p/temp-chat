
import { formatDistance, subDays,format} from 'date-fns'


const formatTime = (date) => {
    console.log(date);
    
    const time = new Date(date)
    console.log(time);
    
  return format(time, 'PPpp')
}

export default formatTime


