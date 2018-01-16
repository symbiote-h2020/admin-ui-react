import axios from "axios";
import {ROOT_URL} from "../configuration";
import {
    ACTIVATE_INFO_MODEL_DELETE_MODAL, DEACTIVATE_INFO_MODEL_DELETE_MODAL, DELETE_INFO_MODEL,
    FETCH_ALL_INFORMATION_MODELS, FETCH_USER_INFORMATION_MODELS, headers, REGISTER_INFO_MODEL,
    UPLOADING_INFO_MODEL_PROGRESS
} from "./index";

axios.defaults.withCredentials = true;

export function fetchAllInformationModels() {
    const url = `${ROOT_URL}/user/cpanel/list_all_info_models`;

    const config = {
        url: url,
        method: 'post',
        headers: headers
    };

    const request = axios.request(config);

    return {
        type: FETCH_ALL_INFORMATION_MODELS,
        payload: request
    };
}

export function fetchUserInformationModels() {
    const url = `${ROOT_URL}/user/cpanel/list_user_info_models`;

    const config = {
        url: url,
        method: 'post',
        headers: headers
    };

    const request = axios.request(config);

    return {
        type: FETCH_USER_INFORMATION_MODELS,
        payload: request
    };
}

export function registerInfoModel(props, cb, uploadingInfoModelProgress) {
    const url = `${ROOT_URL}/user/cpanel/register_information_model`;
    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'multipart/form-data'};
    let formData = new FormData();
    formData.append('info-model-name', props.name);
    formData.append('info-model-uri', props.uri);
    formData.append('info-model-rdf', props.rdf.file);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders,
        onUploadProgress: function (progressEvent) {
            if (progressEvent.lengthComputable) {
                uploadingInfoModelProgress(progressEvent.loaded / progressEvent.total * 100)
            }
        }
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });

    return {
        type: REGISTER_INFO_MODEL,
        payload: request
    };
}

export function uploadingInfoModelProgress(loadedPerCent) {
    return {
        type: UPLOADING_INFO_MODEL_PROGRESS,
        payload: Math.round(loadedPerCent)
    };
}

export function deleteInfoModel(infoModelId) {
    const url = `${ROOT_URL}/user/cpanel/delete_information_model`;
    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('infoModelIdToDelete', infoModelId);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config);

    return {
        type: DELETE_INFO_MODEL,
        payload: request
    };
}

export function activateInfoModelDeleteModal(infoModelId) {
    return {
        type: ACTIVATE_INFO_MODEL_DELETE_MODAL,
        payload: infoModelId
    };
}

export function deactivateInfoModelDeleteModal() {
    return {
        type: DEACTIVATE_INFO_MODEL_DELETE_MODAL,
    };
}