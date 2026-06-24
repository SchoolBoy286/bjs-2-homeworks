class AlarmClock {
  constructor() {
    this.alarmCollection = [];
    this.interValId = null;
  }

  addClock(time, callback) {
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы');
    }
    
    if (this.alarmCollection.some(alarm => alarm.time === time)) {
      console.warn('Уже присутствует звонок на это же время');
    }

    this.alarmCollection.push({ callback, time, canCall: true });
  }

  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
  }

  getCurrentFormattedTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  start() {
    if (this.interValId !== null) {
      return;
    }

    this.interValId = setInterval(() => {
      const currentTime = this.getCurrentFormattedTime();
      this.alarmCollection.forEach(alarm => {
        if (alarm.time === currentTime && alarm.canCall) {
          alarm.canCall = false;
          alarm.callback();
        }
      });
    }, 1000);
  }

  stop() {
    if (this.interValId !== null) {
      clearInterval(this.interValId);
      this.interValId = null;
    }    
  }

  resetAllCalls() {
    this.alarmCollection.foreach(alarm => alarm.canCall = true);
  }

  clearInterval() {
    this.stop();
    this.alarmCollection = [];
  }
}