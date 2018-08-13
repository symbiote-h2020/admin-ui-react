import axios from "axios";
import {ROOT_URL} from "../configuration";
import {
    ACTIVATE_MAPPING_DELETE_MODAL,
    DEACTIVATE_MAPPING_DELETE_MODAL,
    DELETE_MAPPING,
    FETCH_ALL_MAPPINGS, GET_MAPPING_DEFINITION,
    headers,
    REGISTER_MAPPING,
    UPLOADING_MAPPING_PROGRESS
} from "./index";

axios.defaults.withCredentials = true;

export function fetchAllMappings() {
    const url = `${ROOT_URL}/user/cpanel/list_all_mappings`;

    const config = {
        url: url,
        method: 'post',
        headers: headers
    };

    const request = axios.request(config);

    return {
        type: FETCH_ALL_MAPPINGS,
        payload: request
    };
}

export function registerMapping(props, cb, uploadingMappingProgress) {
    const url = `${ROOT_URL}/user/cpanel/register_info_model_mapping`;
    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'multipart/form-data'};
    let formData = new FormData();
    formData.append('name', props.name);
    formData.append('sourceModelId', props.sourceModelId);
    formData.append('destinationModelId', props.destinationModelId);
    formData.append('definition', props.definition.file);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders,
        onUploadProgress: function (progressEvent) {
            if (progressEvent.lengthComputable) {
                uploadingMappingProgress(progressEvent.loaded / progressEvent.total * 100)
            }
        }
    };

    const request = axios.request(config)
        .then(res => {
            cb(res);
            return res;
        });
    return {
        type: REGISTER_MAPPING,
        payload: request
    };
}

export function uploadingMappingProgress(loadedPerCent) {
    return {
        type: UPLOADING_MAPPING_PROGRESS,
        payload: Math.round(loadedPerCent)
    };
}

export function deleteMapping(mappingIdToDelete, cb) {
    const url = `${ROOT_URL}/user/cpanel/delete_info_model_mapping`;
    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('mappingIdToDelete', mappingIdToDelete);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders
    };

    const request = axios.request(config)
        .then((res) => {
            cb(res);
            return res;
        });

    return {
        type: DELETE_MAPPING,
        payload: request
    };
}

export function getMappingDefinition(mappingId, cb) {
    const url = `${ROOT_URL}/user/cpanel/get_mapping_definition`;
    // eslint-disable-next-line
    const customHeaders = {...headers, ['Content-Type']: 'application/x-www-form-urlencoded; charset=UTF-8'};
    let formData = new FormData();
    formData.append('mappingId', mappingId);

    const config = {
        url: url,
        method: 'post',
        data: formData,
        headers: customHeaders,
        responseType: 'arraybuffer'
    };

    const request = axios.request(config)
        .then((res) => {
            cb(res);
            return res;
        });

    return {
        type: GET_MAPPING_DEFINITION,
        payload: request
    };
}

export function activateMappingDeleteModal(mappingId) {
    return {
        type: ACTIVATE_MAPPING_DELETE_MODAL,
        payload: mappingId
    };
}

export function deactivateMappingDeleteModal() {
    return {
        type: DEACTIVATE_MAPPING_DELETE_MODAL,
    };
}