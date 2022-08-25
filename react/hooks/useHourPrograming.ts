
export const useHourPrograming = () => {

 const currentTime = new Date()
 const scheduledTime = new Date()
  scheduledTime.setHours(3)
  scheduledTime.setMinutes(25)
  scheduledTime.setSeconds(0)
  return scheduledTime.getTime() - currentTime.getTime()
}
