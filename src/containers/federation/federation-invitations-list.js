import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import CollapsibleFederationInvitationPanel from "../../components/federation/collapsible-federation-invitation-panel";
import { FieldError } from "../../helpers/errors";
import { getFederationsInvitations } from "../../selectors";

class FederationInvitationList extends Component {

    render() {
        const { isAdmin, userInvitations, userPlatforms, informationModels, federations } = this.props;
        const { availableFederations, fetching_error } = federations;

        return(
            <Fragment>
                <FieldError error={fetching_error}/>

                {_.map(userInvitations, (invitation, key) => {
                    const [federationId, platformId] = _.split(key, ',');

                    return (
                        <CollapsibleFederationInvitationPanel
                            key={key}
                            platform={userPlatforms[platformId]}
                            federation={availableFederations[federationId]}
                            informationModels={informationModels}
                            isAdmin={isAdmin} />
                    )
                })}

            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        userPlatforms: state.userPlatforms.availablePlatforms,
        federations: state.federations,
        informationModels: state.informationModels,
        userInvitations: getFederationsInvitations(state)
    };
}

export default connect(mapStateToProps, {
})(withRouter(FederationInvitationList));