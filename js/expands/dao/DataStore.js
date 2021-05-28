import { AsyncStorage } from "react-native";


export default class DataStore {

  fetchData(url) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url).then((wrapData) => {
        if (wrapData && this.checkTimeStampValid(wrapData.timeStamp)) {
          resolve(wrapData);
        } else {
          this.fetchNetData(url).then((data) => {
            resolve(this._wrapData(data));
          }).catch((error) => {
            reject(error);
          });
        }
      }).catch((error)=>{
          this.fetchNetData(url).then((data) => {
            resolve(this._wrapData(data));
          }).catch((error) => {
            reject(error);
          });
      })

    });
  }

  fetchNetData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network disConnect");

        })
        .then((responseData) => {
          this.saveData(url, responseData);
          resolve(responseData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url).then((value) => {
        try {
          resolve(JSON.parse(value));
        } catch (error) {
          reject(error);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }

  saveData(url, data, callback) {
    if (!data || !url) return;
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
  }

  _wrapData(data) {
    return { data: data, timeStamp: new Date().getTime() };
  }

  checkTimeStampValid(timeStamp){
    const currentDate = new Date()
    const targetDate = new Date()
    targetDate.setTime(timeStamp)
    if (currentDate.getMonth() != targetDate.getMonth()) return false;
    if (currentDate.getDay() != targetDate.getDay()) return false;
    if (currentDate.getHours() - targetDate.getHours() > 4) return false;
    return true;

  }
}
