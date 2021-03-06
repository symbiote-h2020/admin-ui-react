import {ROOT_URL} from "../configuration";
import {USER_LOGIN_MODAL} from "../reducers/modal/modal-reducer";

const downloadZipFile = (res, close, history, changeModalState) => {
    const pattern = new RegExp(`${ROOT_URL}$`);

    // If the root url is returned, that means that the user is not authenticated (possibly the
    // session is expired), so we redirect to the homepage and open the login modal
    if (pattern.test(res.request.responseURL)) {
        history.push(ROOT_URL);
        changeModalState(USER_LOGIN_MODAL, true);
    }  else if (res.status === 200) {
        close();
        let filename = "";
        const disposition = res.headers["content-disposition"];

        if (disposition && disposition.indexOf('attachment') !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches !== null && matches[1])
                filename = matches[1].replace(/['"]/g, '');
        }

        const type = res.headers["content-type"];
        const blob = typeof File === 'function'
            ? new File([res.data], filename, {type: type})
            : new Blob([res.data], {type: type});


        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they
            // were created. These URLs will no longer resolve as the data backing the URL has been freed."
            window.navigator.msSaveBlob(blob, filename);
        } else {
            const URL = window.URL || window.webkitURL;
            const downloadUrl = URL.createObjectURL(blob);

            if (filename) {
                // use HTML5 a[download] attribute to specify filename
                const a = document.createElement("a");
                // safari doesn't support this yet
                if (typeof a.download === 'undefined') {
                    window.location = downloadUrl;
                } else {
                    a.href = downloadUrl;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                }
            } else {
                window.location = downloadUrl;
            }

            setTimeout(function () {
                URL.revokeObjectURL(downloadUrl);
            }, 100); // cleanup
        }
    }
};

export default downloadZipFile;