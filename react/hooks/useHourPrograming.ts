
export const useHourPrograming = () => {

 const currentTime = new Date()
 const scheduledTime = new Date()
  scheduledTime.setHours(23)
  scheduledTime.setMinutes(59)
  scheduledTime.setSeconds(0)
  return scheduledTime.getTime() - currentTime.getTime()
}
