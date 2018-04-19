import { Model } from "@bone/web";
import IotGateway from '@bone/iot-gateway';

export default class MyModel extends Model {
  // 初始状态
  static initialState = {
    list: []
  }
  // 异步action
  async getList(id) {
    const list = await IotGateway.post({
      url: 'http://official.api.feifengiot.com/iotx/datacenter/query',
      apiVer: '1.0.4',
      params: {
        userContextDTO: {},
        dataQueryJson: {
          mid: 9928577,
          cols: ['id', 'name', 'deviceIotId']
        }
      }
    })
      .then((res) => {
        if (res.code === 200) {
          return res.data.data;
        }
        return false;
      })
      .catch(res => {
        console.error(res);
      });

    return {
      list
    }
  }
  // action执行报错事件
  onError(e) {
    console.log(e);
  }
}