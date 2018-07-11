import React, { Fragment } from "react";

export const ROOT_URL = "/administration";
export const USER_CPANEL_URL = "/administration/user/cpanel";
export const ADMIN_CPANEL_URL = "/administration/admin/cpanel";
export const RESET_PASSWORD_URL = "/administration/password_reset";
export const RESEND_VERIFICATION_EMAIL_URL = "/administration/resend_verification_email";

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

export const termsAndConditions = (name, dataProtectionOrganization, address, country, phoneNumber, email, website) => {
    return (
        <Fragment>
            <p>Data protection is of a particularly high priority for the management of the symbIoTe.
                The use of the Internet pages of the symbIoTe is possible without any indication of personal data;
                however, if a data subject wants to use special enterprise services via our website, processing of
                personal data could become necessary. If the processing of personal data is necessary and there is
                no statutory basis for such processing, we generally obtain consent from the data subject.
            </p>
            <p>The processing of personal data, such as the name, address, e-mail address, or telephone number of a
                data subject shall always be in line with the General Data Protection Regulation (GDPR), and in
                accordance with the country-specific data protection regulations applicable to the symbIoTe. By means of
                this data protection declaration, our enterprise would like to inform the general public of the nature,
                scope, and purpose of the personal data we collect, use and process. Furthermore, data subjects are informed,
                by means of this data protection declaration, of the rights to which they are entitled.
            </p>
            <p>As the controller, the symbIoTe has implemented numerous technical and organizational measures to ensure
                the most complete protection of personal data processed through this website. However, Internet-based
                data transmissions may in principle have security gaps, so absolute protection may not be guaranteed.
                For this reason, every data subject is free to transfer personal data to us via alternative means, e.g. by telephone.
            </p>
            <h5><strong>1. Definitions</strong></h5>
            <p>The data protection declaration of the symbIoTe is based on the terms used by the European legislator for
                the adoption of the General Data Protection Regulation (GDPR). Our data protection declaration should be
                legible and understandable for the general public, as well as our customers and business partners.
                To ensure this, we would like to first explain the terminology used.
            </p>
            <p>In this data protection declaration, we use, inter alia, the following terms:
            </p>
            <ol type="a" style={{fontWeight: "bold"}}>
                <li>
                    <h5><strong>Personal data</strong></h5>
                    <p>Personal data means any information relating to an identified or identifiable natural person
                        (“data subject”). An identifiable natural person is one who can be identified, directly or
                        indirectly, in particular by reference to an identifier such as a name, an identification number,
                        location data, an online identifier or to one or more factors specific to the physical,
                        physiological, genetic, mental, economic, cultural or social identity of that natural person.
                    </p>
                </li>
                <li>
                    <h5><strong>Data subject</strong></h5>
                    <p>Data subject is any identified or identifiable natural person, whose personal data is processed
                        by the controller responsible for the processing.
                    </p>
                </li>
                <li>
                    <h5><strong>Processing</strong></h5>
                    <p>Processing is any operation or set of operations which is performed on personal data or on sets
                        of personal data, whether or not by automated means, such as collection, recording, organisation,
                        structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by
                        transmission, dissemination or otherwise making available, alignment or combination, restriction,
                        erasure or destruction.
                    </p>
                </li>
                <li>
                    <h5><strong>Restriction of processing</strong></h5>
                    <p>Restriction of processing is the marking of stored personal data with the aim of limiting
                        their processing in the future.
                    </p>
                </li>
                <li>
                    <h5><strong>Profiling</strong></h5>
                    <p>Profiling means any form of automated processing of personal data consisting of the use of
                        personal data to evaluate certain personal aspects relating to a natural person, in particular
                        to analyse or predict aspects concerning that natural person's performance at work, economic
                        situation, health, personal preferences, interests, reliability, behaviour, location or movements.
                    </p>
                </li>
                <li>
                    <h5><strong>Pseudonymisation</strong></h5>
                    <p>Pseudonymisation is the processing of personal data in such a manner that the personal data can
                        no longer be attributed to a specific data subject without the use of additional information,
                        provided that such additional information is kept separately and is subject to technical and
                        organisational measures to ensure that the personal data are not attributed to an identified or
                        identifiable natural person.
                    </p>
                </li>
                <li><h5><strong>Controller or controller responsible for the processing</strong></h5>
                    <p>Controller or controller responsible for the processing is the natural or legal person,
                        public authority, agency or other body which, alone or jointly with others, determines the
                        purposes and means of the processing of personal data; where the purposes and means of such
                        processing are determined by Union or Member State law, the controller or the specific criteria
                        for its nomination may be provided for by Union or Member State law.
                    </p>
                </li>
                <li>
                    <h5><strong>Processor</strong></h5>
                    <p>Processor is a natural or legal person, public authority, agency or other body which processes
                        personal data on behalf of the controller.
                    </p>
                </li>
                <li>
                    <h5><strong>Recipient</strong></h5>
                    <p>Recipient is a natural or legal person, public authority, agency or another body, to which the
                        personal data are disclosed, whether a third party or not. However, public authorities which may
                        receive personal data in the framework of a particular inquiry in accordance with Union or Member
                        State law shall not be regarded as recipients; the processing of those data by those public
                        authorities shall be in compliance with the applicable data protection rules according to the
                        purposes of the processing.
                    </p>
                </li>
                <li>
                    <h5><strong>Third party</strong></h5>
                    <p>Third party is a natural or legal person, public authority, agency or body other than the data
                        subject, controller, processor and persons who, under the direct authority of the controller or
                        processor, are authorised to process personal data.
                    </p>
                </li>
                <li>
                    <h5><strong>Consent</strong></h5>
                    <p>Consent of the data subject is any freely given, specific, informed and unambiguous indication
                        of the data subject's wishes by which he or she, by a statement or by a clear affirmative action,
                        signifies agreement to the processing of personal data relating to him or her.
                    </p>
                </li>
            </ol>

            <h5><strong>2. Name and Address of the controller</strong></h5>
            <p>Controller for the purposes of the General Data Protection Regulation (GDPR), other data protection laws
                applicable in Member states of the European Union and other provisions related to data protection is:
            </p>
            <ul style={{fontWeight: "bold", listStyleType: "none"}}>
                <li>{name}</li>
                <li>{dataProtectionOrganization}</li>
                <li>{address}</li>
                <li>{country}</li>
                <li>Phone: {phoneNumber}</li>
                <li>Email: {email}</li>
                <li>Website: {website}</li>
            </ul>

            <h5><strong>3. Cookies</strong></h5>
            <p>The Internet pages of the symbIoTe use cookies. Cookies are text files that are stored in a computer
                system via an Internet browser.
            </p>
            <p>Many Internet sites and servers use cookies. Many cookies contain a so-called cookie ID. A cookie ID is
                a unique identifier of the cookie. It consists of a character string through which Internet pages and
                servers can be assigned to the specific Internet browser in which the cookie was stored. This allows
                visited Internet sites and servers to differentiate the individual browser of the data subject from
                other Internet browsers that contain other cookies. A specific Internet browser can be recognized and
                identified using the unique cookie ID.
            </p>
            <p>Through the use of cookies, the symbIoTe can provide the users of this website with more user-friendly
            services that would not be possible without the cookie setting.
            </p>
            <p>By means of a cookie, the information and offers on our website can be optimized with the user in mind.
                Cookies allow us, as previously mentioned, to recognize our website users. The purpose of this
                recognition is to make it easier for users to utilize our website. The website user that uses cookies,
                e.g. does not have to enter access data each time the website is accessed, because this is taken over
                by the website, and the cookie is thus stored on the user's computer system. Another example is the
                cookie of a shopping cart in an online shop. The online store remembers the articles that a customer
                has placed in the virtual shopping cart via a cookie.
            </p>
            <p>The data subject may, at any time, prevent the setting of cookies through our website by means of a
            corresponding setting of the Internet browser used, and may thus permanently deny the setting of cookies.
            Furthermore, already set cookies may be deleted at any time via an Internet browser or other software
            programs. This is possible in all popular Internet browsers. If the data subject deactivates the setting of
            cookies in the Internet browser used, not all functions of our website may be entirely usable.
            </p>

            <h5><strong>4. Collection of general data and information</strong></h5>
            <p>The website of the symbIoTe collects a series of general data and information when a data subject or
                automated system calls up the website. This general data and information are stored in the server log
                files. Collected may be (1) the browser types and versions used, (2) the operating system used by the
                accessing system, (3) the website from which an accessing system reaches our website (so-called referrers),
                (4) the sub-websites, (5) the date and time of access to the Internet site, (6) an Internet protocol
                address (IP address), (7) the Internet service provider of the accessing system, and (8) any other
                similar data and information that may be used in the event of attacks on our information technology systems.
            </p>
            <p>When using these general data and information, the symbIoTe does not draw any conclusions about the data
                subject. Rather, this information is needed to (1) deliver the content of our website correctly,
                (2) optimize the content of our website as well as its advertisement, (3) ensure the long-term viability
                of our information technology systems and website technology, and (4) provide law enforcement authorities
                with the information necessary for criminal prosecution in case of a cyber-attack. Therefore, the symbIoTe
                analyzes anonymously collected data and information statistically, with the aim of increasing the data
                protection and data security of our enterprise, and to ensure an optimal level of protection for the
                personal data we process. The anonymous data of the server log files are stored separately from all
                personal data provided by a data subject.
            </p>

            <h5><strong>5. Registration on our website</strong></h5>
            <p>The data subject has the possibility to register on the website of the controller with the indication of
                personal data. Which personal data are transmitted to the controller is determined by the respective
                input mask used for the registration. The personal data entered by the data subject are collected and
                stored exclusively for internal use by the controller, and for his own purposes. The controller may
                request transfer to one or more processors (e.g. a parcel service) that also uses personal data for an
                internal purpose which is attributable to the controller.
            </p>
            <p>By registering on the website of the controller, the IP address—assigned by the Internet service provider
                (ISP) and used by the data subject—date, and time of the registration are also stored. The storage of
                this data takes place against the background that this is the only way to prevent the misuse of our
                services, and, if necessary, to make it possible to investigate committed offenses. Insofar, the storage
                of this data is necessary to secure the controller. This data is not passed on to third parties unless
                there is a statutory obligation to pass on the data, or if the transfer serves the aim of criminal prosecution.
            </p>
            <p>The registration of the data subject, with the voluntary indication of personal data, is intended to
                enable the controller to offer the data subject contents or services that may only be offered to
                registered users due to the nature of the matter in question. Registered persons are free to change
                the personal data specified during the registration at any time, or to have them completely deleted from
                the data stock of the controller.
            </p>The data controller shall, at any time, provide information upon request to each data subject as to what
            personal data are stored about the data subject. In addition, the data controller shall correct or erase
            personal data at the request or indication of the data subject, insofar as there are no statutory storage
            obligations. The entirety of the controller’s employees are available to the data subject in this respect
            as contact persons.

            <h5><strong>6. Contact possibility via the website</strong></h5>
            <p>The website of the symbIoTe contains information that enables a quick electronic contact to our enterprise,
                as well as direct communication with us, which also includes a general address of the so-called electronic
                mail (e-mail address). If a data subject contacts the controller by e-mail or via a contact form, the
                personal data transmitted by the data subject are automatically stored. Such personal data transmitted on
                a voluntary basis by a data subject to the data controller are stored for the purpose of processing or
                contacting the data subject. There is no transfer of this personal data to third parties.
            </p>

            <h5><strong>7. Routine erasure and blocking of personal data</strong></h5>
            <p>The data controller shall process and store the personal data of the data subject only for the period
                necessary to achieve the purpose of storage, or as far as this is granted by the European legislator or
                other legislators in laws or regulations to which the controller is subject to.
            </p>
            <p>If the storage purpose is not applicable, or if a storage period prescribed by the European legislator or
                another competent legislator expires, the personal data are routinely blocked or erased in accordance
                with legal requirements.
            </p>

            <h5><strong>8. Rights of the data subject</strong></h5>
            <ol type="a" style={{fontWeight: "bold"}}>
                <li>
                    <h5><strong>Right of confirmation</strong></h5>
                    <p>Each data subject shall have the right granted by the European legislator to obtain from the
                        controller the confirmation as to whether or not personal data concerning him or her are being
                        processed. If a data subject wishes to avail himself of this right of confirmation, he or she may,
                        at any time, contact any employee of the controller.
                    </p>
                </li>
                <li>
                    <h5><strong>Right of access</strong></h5>
                    <p>Each data subject shall have the right granted by the European legislator to obtain from the controller free information about his or her personal data stored at any time and a copy of this information. Furthermore, the European directives and regulations grant the data subject access to the following information:
                    </p>
                    <ul style={{fontWeight: "normal"}}>
                        <li>the purposes of the processing;</li>
                        <li>the categories of personal data concerned;</li>
                        <li>the recipients or categories of recipients to whom the personal data have been or will be
                            disclosed, in particular recipients in third countries or international organisations;</li>
                        <li>where possible, the envisaged period for which the personal data will be stored, or, if
                            not possible, the criteria used to determine that period;</li>
                        <li>the existence of the right to request from the controller rectification or erasure of
                            personal data, or restriction of processing of personal data concerning the data subject,
                            or to object to such processing;</li>
                        <li>the existence of the right to lodge a complaint with a supervisory authority;</li>
                        <li>where the personal data are not collected from the data subject, any available information
                            as to their source;</li>
                        <li>the existence of automated decision-making, including profiling, referred to in Article
                            22(1) and (4) of the GDPR and, at least in those cases, meaningful information about the
                            logic involved, as well as the significance and envisaged consequences of such processing
                            for the data subject.</li>
                    </ul>
                    <p>Furthermore, the data subject shall have a right to obtain information as to whether personal data are transferred to a third country or to an international organisation. Where this is the case, the data subject shall have the right to be informed of the appropriate safeguards relating to the transfer.
                    </p>
                    <p>If a data subject wishes to avail himself of this right of access, he or she may, at any time, contact any employee of the controller.
                    </p>
                </li>
                <li>
                    <h5><strong>Right to rectification</strong></h5>
                    <p>
                        Each data subject shall have the right granted by the European legislator to obtain from the
                        controller without undue delay the rectification of inaccurate personal data concerning him or her.
                        Taking into account the purposes of the processing, the data subject shall have the right to have
                        incomplete personal data completed, including by means of providing a supplementary statement.
                    </p>
                    <p>If a data subject wishes to exercise this right to rectification, he or she may, at any time,
                        contact any employee of the controller.
                    </p>
                </li>
                <li>
                    <h5><strong>Right to erasure (Right to be forgotten)</strong></h5>
                    <p>
                        Each data subject shall have the right granted by the European legislator to obtain from the
                        controller the erasure of personal data concerning him or her without undue delay, and the
                        controller shall have the obligation to erase personal data without undue delay where one of the
                        following grounds applies, as long as the processing is not necessary:
                    </p>
                    <ul style={{fontWeight: "normal"}}>
                        <li>The personal data are no longer necessary in relation to the purposes for which they
                            were collected or otherwise processed.</li>
                        <li>The data subject withdraws consent to which the processing is based according to point
                            (a) of Article 6(1) of the GDPR, or point (a) of Article 9(2) of the GDPR, and where
                            there is no other legal ground for the processing.</li>
                        <li>The data subject objects to the processing pursuant to Article 21(1) of the GDPR and
                            there are no overriding legitimate grounds for the processing, or the data subject
                            objects to the processing pursuant to Article 21(2) of the GDPR.</li>
                        <li>The personal data have been unlawfully processed.</li>
                        <li>The personal data must be erased for compliance with a legal obligation in Union or
                            Member State law to which the controller is subject.</li>
                        <li>The personal data have been collected in relation to the offer of information society
                            services referred to in Article 8(1) of the GDPR.</li>
                    </ul>
                    <p>If one of the aforementioned reasons applies, and a data subject wishes to request the erasure of
                        personal data stored by the symbIoTe, he or she may, at any time, contact any employee of the
                        controller. An employee of symbIoTe shall promptly ensure that the erasure request is complied with immediately.
                    </p>
                    <p>Where the controller has made personal data public and is obliged pursuant to Article 17(1) to
                        erase the personal data, the controller, taking account of available technology and the cost of
                        implementation, shall take reasonable steps, including technical measures, to inform other
                        controllers processing the personal data that the data subject has requested erasure by such
                        controllers of any links to, or copy or replication of, those personal data, as far as processing
                        is not required. An employees of the symbIoTe will arrange the necessary measures in individual cases.
                    </p>
                </li>
                <li>
                    <h5><strong>Right of restriction of processing</strong></h5>
                    <p>
                        Each data subject shall have the right granted by the European legislator to obtain from the
                        controller restriction of processing where one of the following applies:
                    </p>
                    <ul style={{fontWeight: "normal"}}>
                        <li>The accuracy of the personal data is contested by the data subject, for a period enabling
                            the controller to verify the accuracy of the personal data.</li>
                        <li>The processing is unlawful and the data subject opposes the erasure of the personal data
                            and requests instead the restriction of their use instead.</li>
                        <li>The controller no longer needs the personal data for the purposes of the processing, but
                            they are required by the data subject for the establishment, exercise or defence of legal claims.</li>
                        <li>The data subject has objected to processing pursuant to Article 21(1) of the GDPR pending
                            the verification whether the legitimate grounds of the controller override those of the data subject.</li>
                    </ul>
                    <p>If one of the aforementioned conditions is met, and a data subject wishes to request the
                        restriction of the processing of personal data stored by the symbIoTe, he or she may at any time
                        contact any employee of the controller. The employee of the symbIoTe will arrange the restriction of the processing.
                    </p>
                </li>
                <li>
                    <h5><strong>Right to data portability</strong></h5>
                    <p>Each data subject shall have the right granted by the European legislator, to receive the personal
                        data concerning him or her, which was provided to a controller, in a structured, commonly used
                        and machine-readable format. He or she shall have the right to transmit those data to another
                        controller without hindrance from the controller to which the personal data have been provided,
                        as long as the processing is based on consent pursuant to point (a) of Article 6(1) of the GDPR
                        or point (a) of Article 9(2) of the GDPR, or on a contract pursuant to point (b) of Article 6(1)
                        of the GDPR, and the processing is carried out by automated means, as long as the processing is
                        not necessary for the performance of a task carried out in the public interest or in the exercise
                        of official authority vested in the controller.
                    </p>
                    <p>Furthermore, in exercising his or her right to data portability pursuant to Article 20(1) of the
                        GDPR, the data subject shall have the right to have personal data transmitted directly from one
                        controller to another, where technically feasible and when doing so does not adversely affect
                        the rights and freedoms of others.
                    </p>
                    <p>In order to assert the right to data portability, the data subject may at any time contact any employee of the symbIoTe.
                    </p>
                </li>
                <li>
                    <h5><strong>Right to object</strong></h5>
                    <p>
                        Each data subject shall have the right granted by the European legislator to object, on grounds
                        relating to his or her particular situation, at any time, to processing of personal data
                        concerning him or her, which is based on point (e) or (f) of Article 6(1) of the GDPR. This also
                        applies to profiling based on these provisions.
                    </p>
                    <p>The symbIoTe shall no longer process the personal data in the event of the objection, unless we
                        can demonstrate compelling legitimate grounds for the processing which override the interests,
                        rights and freedoms of the data subject, or for the establishment, exercise or defence of legal claims.
                    </p>
                    <p>If the symbIoTe processes personal data for direct marketing purposes, the data subject shall
                        have the right to object at any time to processing of personal data concerning him or her for
                        such marketing. This applies to profiling to the extent that it is related to such direct marketing.
                        If the data subject objects to the symbIoTe to the processing for direct marketing purposes,
                        the symbIoTe will no longer process the personal data for these purposes.
                    </p>
                    <p>In addition, the data subject has the right, on grounds relating to his or her particular situation,
                        to object to processing of personal data concerning him or her by the symbIoTe for scientific or
                        historical research purposes, or for statistical purposes pursuant to Article 89(1) of the GDPR,
                        unless the processing is necessary for the performance of a task carried out for reasons of public interest.
                    </p>
                    <p>In order to exercise the right to object, the data subject may contact any employee of the symbIoTe.
                        In addition, the data subject is free in the context of the use of information society services,
                        and notwithstanding Directive 2002/58/EC, to use his or her right to object by automated means using
                        technical specifications.
                    </p>
                </li>
                <li>
                    <h5><strong>Automated individual decision-making, including profiling</strong></h5>
                    <p>Each data subject shall have the right granted by the European legislator not to be subject to a
                        decision based solely on automated processing, including profiling, which produces legal effects
                        concerning him or her, or similarly significantly affects him or her, as long as the decision
                        (1) is not is necessary for entering into, or the performance of, a contract between the data
                        subject and a data controller, or (2) is not authorised by Union or Member State law to which
                        the controller is subject and which also lays down suitable measures to safeguard the data
                        subject's rights and freedoms and legitimate interests, or (3) is not based on the data subject's
                        explicit consent.
                    </p>
                    <p>If the decision (1) is necessary for entering into, or the performance of, a contract between the
                        data subject and a data controller, or (2) it is based on the data subject's explicit consent,
                        the symbIoTe shall implement suitable measures to safeguard the data subject's rights and freedoms
                        and legitimate interests, at least the right to obtain human intervention on the part of the
                        controller, to express his or her point of view and contest the decision.
                    </p>
                    <p>If the data subject wishes to exercise the rights concerning automated individual decision-making,
                        he or she may, at any time, contact any employee of the symbIoTe.
                    </p>
                </li>
                <li>
                    <h5><strong>Right to withdraw data protection consent</strong></h5>
                    <p>
                        Each data subject shall have the right granted by the European legislator to withdraw his or her
                        consent to processing of his or her personal data at any time. If the data subject wishes to
                        exercise the right to withdraw the consent, he or she may, at any time, contact any employee of the symbIoTe.
                    </p>
                </li>
            </ol>

            <h5><strong>9. Legal basis for the processing</strong></h5>
            <p>Art. 6(1) lit. a GDPR serves as the legal basis for processing operations for which we obtain consent for
                a specific processing purpose. If the processing of personal data is necessary for the performance of a
                contract to which the data subject is party, as is the case, for example, when processing operations are
                necessary for the supply of goods or to provide any other service, the processing is based on
                Article 6(1) lit. b GDPR. The same applies to such processing operations which are necessary for
                carrying out pre-contractual measures, for example in the case of inquiries concerning our products
                or services. Is our company subject to a legal obligation by which processing of personal data is
                required, such as for the fulfillment of tax obligations, the processing is based on Art.
                6(1) lit. c GDPR. In rare cases, the processing of personal data may be necessary to protect the vital
                interests of the data subject or of another natural person. This would be the case, for example, if a
                visitor were injured in our company and his name, age, health insurance data or other vital information
                would have to be passed on to a doctor, hospital or other third party. Then the processing would be based
                on Art. 6(1) lit. d GDPR. Finally, processing operations could be based on Article 6(1) lit. f GDPR. This
                legal basis is used for processing operations which are not covered by any of the abovementioned legal grounds,
                if processing is necessary for the purposes of the legitimate interests pursued by our company or by a third party,
                except where such interests are overridden by the interests or fundamental rights and freedoms of the data
                subject which require protection of personal data. Such processing operations are particularly permissible
                because they have been specifically mentioned by the European legislator. He considered that a legitimate
                interest could be assumed if the data subject is a client of the controller (Recital 47 Sentence 2 GDPR).
            </p>

            <h5><strong>10. The legitimate interests pursued by the controller or by a third party</strong></h5>
            <p>Where the processing of personal data is based on Article 6(1) lit. f GDPR our legitimate interest is to
                carry out our business in favor of the well-being of all our employees and the shareholders.
            </p>

            <h5><strong>11. Period for which the personal data will be stored</strong></h5>
            <p>The criteria used to determine the period of storage of personal data is the respective statutory retention
                period. After expiration of that period, the corresponding data is routinely deleted, as long as it is
                no longer necessary for the fulfillment of the contract or the initiation of a contract.
            </p>

            <h5><strong>12. Provision of personal data as statutory or contractual requirement; Requirement necessary to enter
                into a contract; Obligation of the data subject to provide the personal data; possible consequences of
                failure to provide such data</strong>
            </h5>
            <p>We clarify that the provision of personal data is partly required by law (e.g. tax regulations) or can
                also result from contractual provisions (e.g. information on the contractual partner). Sometimes it may
                be necessary to conclude a contract that the data subject provides us with personal data, which must
                subsequently be processed by us. The data subject is, for example, obliged to provide us with personal
                data when our company signs a contract with him or her. The non-provision of the personal data would
                have the consequence that the contract with the data subject could not be concluded. Before personal
                data is provided by the data subject, the data subject must contact any employee. The employee clarifies
                to the data subject whether the provision of the personal data is required by law or contract or is
                necessary for the conclusion of the contract, whether there is an obligation to provide the personal
                data and the consequences of non-provision of the personal data.
            </p>

            <h5><strong>13. Existence of automated decision-making</strong></h5>
            <p>As a responsible company, we do not use automatic decision-making or profiling.</p>

            <h4>Informed Consent</h4>
            <p><strong>Informed Consent Form for</strong> developers and platform owners <strong>who are invited to participate
                in the research project “symbiosis of smart objects across IoT environments (symbIoTe)” core.</strong>
            </p>
            <p><strong>This project has received funding from the European Union’s Horizon 2020 research and innovation
                programme under grant agreement Nº 688156.</strong>
            </p>
            <p>symbIoTe project aims to remedy the fragmented IoT environment by providing an abstraction layer for a
                unified view on various platforms and their resources, making them transparent to application designers
                and developers. In addition, symbIoTe also chooses a challenging task to implement platform federations
                so that they can securely interoperate, collaborate and share resources for the mutual benefit and, what
                is more, support the migration of smart objects between various IoT domains and platforms.
            </p>

            <strong>Type of data collected and purpose</strong>
            <p>In order to register in a safely manner within the symbIote core, an email associated to the user is needed.
                The user will use this email to sign in the platform any time. The symbIoTe consortium guarantees that
                this information will not be used for other purposes apart from the ones above mentioned.
            </p>

            <strong>Voluntary Participation</strong>
            <p>Your registration within the symbIoTe core is entirely voluntary. It is you choice whether to do it or
                not and for how long. Whenever you decide to stop your participation contact the administrator in order
                to revoke the consent and to remove all your related personal data.
            </p>

            <strong>Procedure</strong>
            <p>For accessing to the symbIoTe core functionalities, you must provide an user name, which does not need to
                be a real one, and a valid email address. This information will be stored in order to grant you access to
                the core, and associate your activities within it. It will not be shared under the project neither with
                other third parties. No other personal information, neither sensitive one, will be collected.
            </p>

            <strong>Duration</strong>
            <p>The duration of the project is of 36 months, until December 2018, and collected information will not be
                stored after that time.
            </p>

            <strong>Risks</strong>
            <p>The project is taking into account any security and safety consideration of data management regulation
                and will act according to the European legislation.
            </p>

            <strong>Benefits</strong>
            <p>There is no direct benefit from the registration in the core apart from the possibility of accessing to
                project results and make use of them.
            </p>

            <strong>Reimbursements</strong>
            <p>You will not receive any incentive for registering and making use of the symbIoTe offering.
            </p>

            <strong>Confidentiality</strong>
            <p>According to the GDPR principles, personal information will not be shared outside of this project neither
                use for any commercial purposes.
            </p>

            <strong>Right to Refuse or Withdraw</strong>
            <p>Registering is not mandatory, whereas it involves no access to symbIoTe core, and, according to the
                current legislation, you can stop your participation at any time.
            </p>

            <strong>Who to Contact</strong>
            <p>For accessing/modifying/stopping participation you can contact the support organization:</p>

            <ul style={{fontWeight: "bold", listStyleType: "none"}}>
                <li>{name}</li>
                <li>{dataProtectionOrganization}</li>
                <li>{address}</li>
                <li>{country}</li>
                <li>Phone: {phoneNumber}</li>
                <li>Email: {email}</li>
                <li>Website: {website}</li>
            </ul>
        </Fragment>
    )
};

export const breachPolicies = () => {
    return (
        <Fragment>
            <ol>
                <li>Introduction
                    <ol>
                        <li>This policy sets out the policies and procedure of symbIoTe (the “consortium”) with respect
                            to GDPR Art. 33 Notification of a personal data breach to the supervisory authority and
                            Art. 34 Communication of a personal data breach to the data subject.</li>
                        <li>When dealing with personal data breaches, the consortium and all consortium members must
                            focus on protecting individuals and their personal data, as well as protecting the interests
                            of the consortium.</li>
                    </ol>
                </li>
                <li>
                    Definition
                    <ol>
                        <li>In this policy:</li>
                        <ol type="a">
                            <li>“appointed person” means the individual primarily responsible for dealing with personal
                                data breaches affecting the company, being the one designed by the consortium for any specific case;</li>
                            <li>“data controller” means the natural or legal person, public authority, agency or other
                                body which, alone or jointly with others, determines the purposes and means of the
                                processing of personal data</li>
                            <li>“data processor” means a natural or legal person, public authority, agency or other body
                                which processes personal data on behalf of the controller;</li>
                            <li>“data subject” means as identified or identifiable natural person; an identifiable natural
                                person is one who can be identified, directly or indirectly, in particular by reference to
                                an identifier such as a name, an identification number, location data, an online identifier
                                or to one or more factors specific to the physical, physiological, genetic, mental,
                                economic, cultural or society identity of that natural person;</li>
                            <li>“personal data” means any information relating to a data subject;</li>
                            <li>“personal data breach” means a breach of security leading to the accidental or unlawful
                                destruction, loss, alteration, unauthorised disclosure of, or access to, personal data
                                transmitted, stored or otherwise processed by the company (including any temporary or
                                permanent loss of control of, or inability to access, personal); and</li>
                            <li>“supervisory authority” means the Information Commissioner’s Office of the European Union.</li>
                        </ol>
                    </ol>
                </li>
                <li>Detection of personal data breaches
                    <ol>
                        <li>The consortium has put in place technological measures to detect incidents which may result
                            in personal data breaches.</li>
                        <li>The consortium has put in place organisational measures to detect incidents which may result
                            in personal data breaches.</li>
                        <li>The consortium shall regularly review the technical and organisational measures it uses to
                            detect incidents which may result in a personal data breach. Such reviews shall be carried
                            out at least quarterly.</li>
                    </ol>
                </li>
                <li>
                    Responding to personal data breaches
                    <ol>
                        <li>All personnel of the consortium must notify the appointed person immediately if they become
                            aware of any actual or possible personal data breach.</li>
                        <li>The appointed person is primarily responsible for investigating possible and actual personal
                            data breaches and for determining whether any notification obligations apply. Where
                            notification obligations apply, the appointed person is responsible for notifying the relevant
                            third parties in accordance with this policy.</li>
                        <li>All personnel of the company must cooperate with the appointed person in relation to the
                            investigation and notification of personal data breaches.</li>
                        <li>The appointed person must determine whether the consortium is acting as a data controller
                            and/or data processor with respect to each category of personal data that is subject to a
                            personal data breach.</li>
                        <li>The steps to be taken by the appointed person when responding to a personal data breach may include:
                            <ol type="a">
                                <li>Ensuring that the personal data breach is contained as soon as possible;</li>
                                <li>Assessing the level of risk to data subjects as soon as possible;</li>
                                <li>Gathering and collating information from all relevant sources;</li>
                                <li>Considering relevant data protection impact assessments;</li>
                                <li>Informing all interested persons within the consortium of the personal data breach and the investigation;</li>
                                <li>Assessing the level of risk to the consortium; and</li>
                                <li>Notifying supervisory authorities, data controllers, data subjects and others of
                                    the breach in accordance with this policy.</li>
                            </ol>
                        </li>
                        <li>The appointed person shall keep a full record of the response of the company to a personal
                            data breach, including the facts relating to the personal data breach, its effects and the
                            remedial action taken.</li>
                    </ol>
                </li>
                <li>Notification to the supervisory authority
                    <ol>
                        <li>This section 5 applies to personal data breaches affecting personal data with respect to
                            which the consortium is acting as a data controller.</li>
                        <li>The consortium must notify the supervisory authority of any personal data breach to which
                            this section 5 applies without undue delay and, where feasible, not later than 72 hours after
                            the consortium becomes aware of the breach, save as set out in subsection 5.4.</li>
                        <li>Personal data breach notifications to the supervisory authority must be made by the appointed
                            person using the form set out in schedule 1 (Notification of personal data breach to
                            supervisory authority by secure and confidential means). The appointed person must keep a
                            record of all notifications, and all other communications with the supervisory authority r
                            elating to the breach.</li>
                        <li>The consortium will not notify the supervisory authority of a personal data breach where it
                            is unlikely to result in a risk to the rights and freedoms of natural persons. The appointed
                            person shall be responsible for determining whether this subsection 5.4 applies, and the
                            appointed person must create a record of any decision not to notify the supervisory authority.
                            This record should include the appointed person’s reasons for believing that the breach is
                            unlikely to result in a risk to the rights and freedoms of natural person.</li>
                        <li>To the extent that the consortium is not able to provide to the supervisory authority all
                            the information specified in schedule 1 (Notification of personal data breach to the supervisory
                            authority) at the time of the initial notification to the supervisory authority, the consortium
                            must make all reasonable efforts to ascertain the missing information. That information must be
                            provided to the supervisory authority, by the appointed person, as and when it becomes available.
                            The appointed person must create a record of the reasons for any delayed notification under this
                            subsection 5.5.</li>
                        <li>The consortium must keep the supervisory authority informed of changes in the facts ascertained
                            by the consortium which affect any notification made under this section 5.</li>

                    </ol>
                </li>
                <li>
                    Notification to data controller
                    <ol>
                        <li>This section 6 applies to personal data breaches affecting personal data with respect to
                            which the consortium is acting as a data processor.</li>
                        <li>The consortium must notify the affected data controller(s) of any personal data breach to
                            which this section 6 applies without undue delay and, where feasible, not later than 48 hours
                            after the consortium becomes aware of the breach.</li>
                        <li>Personal data breach notifications to the affected data controller(s) must be made by the
                            appointed person using the form set out in schedule 2 (Notification of personal data breach
                            to data controller). The completed form must be sent to the affected data controller(s) by
                            secure and confidential means. The appointed person must keep a record of all notification,
                            and all other communications with the affected data controller(s) relating to the breach, as
                            part of the personal data breach register of the consortium.</li>
                        <li>To the extent that the consortium is not able to provide to the affected data controller(s)
                            all the information specified in schedule 2 (Notification of personal data breach to data
                            controller), the consortium must make all reasonable efforts to ascertain the missing
                            information. That information must be provided to the affected data controller(s), by the
                            appointed person, as and when it becomes available.
                        </li>
                    </ol>
                </li>
                <li>
                    Notification to data subjects
                    <ol>
                        <li>This section 7 applies to personal data breaches affecting personal data with respect to
                            which the consortium is acting as a data controller.</li>
                        <li>Notifications to data subject under this section 7 should, where appropriate, be made in
                            consultation with the supervisory authority and in accordance with any guidance given by the
                            supervisory authority with respect to such notifications.</li>
                        <li>The consortium must notify the affected data subjects of any personal data breach to which
                            this section 7 applies if the personal data breach is likely to result in a high risk to the
                            rights and freedoms of natural persons, save as set out in subsection 7.5.</li>
                        <li>Personal data breach notifications to the affected data subjects must be made by the appointed
                            person in clear and plain language using the form set out in schedule 3 (Notification of
                            personal data breach to data subject). The completed form must be sent to the affected data
                            subjects by appropriate means. The appointed person must keep a record of all notifications,
                            and all other communications with the affected data subjects relating to the breach.</li>
                        <li>The consortium has no obligation to notify the affected data subject of a personal data breach if:
                            <ol type="a">
                                <li>The consortium has implemented appropriate technical and organisational protection
                                    measures (in particular those that render the personal data unintelligible to any
                                    person who is not authorised to access it, such as encryption), and those measures
                                    have been applied to the personal data affected by the personal data breach;</li>
                                <li>The consortium has taken subsequent measures which ensure that a high risk to the
                                    rights and freedoms of data subjects is no longer likely to materialise;</li>
                                <li>It would involve disproportionate effort (in which case, there shall instead be a
                                    public communication or similar measure whereby the data subjects are informed in
                                    an equally effective manner).</li>
                            </ol>
                            Providing that the appointed person shall be responsible for determining whether this
                            subsection 7.5 applies, and the appointed person must create a record of any decision not
                            to notify the affected data subjects. This record should include the appointed person’s
                            reasons for believing that the breach does not need to be notified to the affected data
                            subjects. This record shall be stored as part of the personal data breach register of the consortium.
                        </li>
                        <li>If the consortium is not required by this section 7 to notify affected data subjects of a
                            personal data breach, the company may nonetheless do so where such a notification is in the
                            interest of the company and/or the affected data subjects.</li>
                    </ol>
                </li>
                <li>
                    Other notifications
                    <ol>
                        <li>Without affecting the notification obligations set out elsewhere in this policy, the
                            appointed person should also consider whether to notify any other third parties of a
                            personal data breach. Notifications may be required under law or contract.</li>
                    </ol>
                </li>
            </ol>
        </Fragment>
    )
};