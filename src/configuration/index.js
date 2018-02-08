export const ROOT_URL = "/administration";
export const USER_CPANEL_URL = "/administration/user/cpanel";
export const ADMIN_CPANEL_URL = "/administration/admin/cpanel";

export const platformTypes = [
    {
        label : "Platform",
        value : "false"
    },
    {
        label : "Enabler",
        value : "true"
    }
];

export const qosMetrics = [
    {
        label : "Availability",
        value : "availability"
    },
    {
        label : "Load",
        value : "load"
    }
];

export const comparator = [
    {
        label : ">",
        value : "greaterThan"
    },
    {
        label : ">=",
        value : "greaterThanOrEqual"
    },
    {
        label : "=",
        value : "equal"
    },
    {
        label : "<",
        value : "lessThan"
    },
    {
        label : "<=",
        value : "lessThanOrEqual"
    },
];