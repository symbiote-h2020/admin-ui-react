import React, { Fragment } from "react";

export const ROOT_URL = "/administration";
export const USER_CPANEL_URL = "/administration/user/cpanel";
export const ADMIN_CPANEL_URL = "/administration/admin/cpanel";

export const PLATFORM_TYPES = [
    {
        label : "Platform",
        value : "false"
    },
    {
        label : "Enabler",
        value : "true"
    }
];

export const FEDERATION_VISIBILITY_TYPES = [
    {
        label : "Yes",
        value : "true"
    },
    {
        label : "No",
        value : "false"
    }
];

export const QOS_METRICS = [
    {
        label : "Availability",
        value : "availability"
    },
    {
        label : "Load",
        value : "load"
    }
];

export const COMPARATOR = [
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

export const termsAndConditions = () => {
    return (
        <Fragment>
            <p>Terms and Conditions</p>
            <p>Lorem ipsum dolor sit amet, veniam numquam has te. No suas nonumes recusabo mea, est ut
                graeci definitiones. His ne melius vituperata scriptorem, cum paulo copiosae
                conclusionemque at. Facer inermis ius in, ad brute nominati referrentur vis. Dicat erant
                sit ex. Phaedrum imperdiet scribentur vix no, ad latine similique forensibus vel.</p>
            <p>Dolore populo vivendum vis eu, mei quaestio liberavisse ex. Electram necessitatibus ut
                vel, quo at probatus oportere, molestie conclusionemque pri cu. Brute augue tincidunt
                vim id, ne munere fierent rationibus mei. Ut pro volutpat praesent qualisque, an iisque
                scripta intellegebat eam.</p>
        </Fragment>
    )
};

export const breachPolicies = () => {
    return (
        <Fragment>
            <p>Breach Policy</p>
            <p>Lorem ipsum dolor sit amet, veniam numquam has te. No suas nonumes recusabo mea, est ut
                graeci definitiones. His ne melius vituperata scriptorem, cum paulo copiosae
                conclusionemque at. Facer inermis ius in, ad brute nominati referrentur vis. Dicat erant
                sit ex. Phaedrum imperdiet scribentur vix no, ad latine similique forensibus vel.</p>
            <p>Dolore populo vivendum vis eu, mei quaestio liberavisse ex. Electram necessitatibus ut
                vel, quo at probatus oportere, molestie conclusionemque pri cu. Brute augue tincidunt
                vim id, ne munere fierent rationibus mei. Ut pro volutpat praesent qualisque, an iisque
                scripta intellegebat eam.</p>
        </Fragment>
    )
};