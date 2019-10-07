import moment from 'moment'

export function handleDate(time) {
    if (time) {
        console.log(time)
        return moment(time).format('YYYY-MM-DD')
    }
    return ''
}