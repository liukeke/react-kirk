import urlManager from '../public/js/urlManager';
import utils from '../public/js/utils';
export default {
    /*查询标签*/
    "getTagAll":function(data,successCb,errorCb){
        utils.post(
            urlManager.aTagAll,
            data,
            function (data, status, xhr) {
                successCb(data.data)
            },
            errorCb
        )
    }
};