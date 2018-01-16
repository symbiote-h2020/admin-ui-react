import { lengthValidation } from "./helpers";

export function validateName(value) {
    return lengthValidation("name", value ? value.length : 0, 2, 30);
}

export function validateUri(value) {
    const pattern = new RegExp('^((http(s?)|ftp(s?)):\\/\\/www\\.|(http(s?)|ftp(s?)):\\/\\/)[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$');

    if (!pattern.test(value)) {
        return "A valid uri is required";
    } else
        return null;
}

export function validateRdfExtension(value) {

    if (value && value.file) {
        const { file } = value;
        const pattern = new RegExp('((\\.ttl)|(\\.nt)|(\\.rdf)|(\\.xml)|(\\.n3)|(\\.jsonld))$');

        if (!pattern.test(file.name)) {
            return "This format is not supported";
        } else
            return null;
    } else
        return "This field is required";

}
