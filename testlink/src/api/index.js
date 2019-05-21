import url from './url';
import request from './request';

function getfather_id(params) {
  return request.post(url.father_idList, "project_name=酒店-艺龙现付").then(res => {
    if (res) {
      return res;
    };
  });
}

export default {
    getfather_id
}