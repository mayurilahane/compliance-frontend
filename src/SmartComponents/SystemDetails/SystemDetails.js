import React from 'react';
import propTypes from 'prop-types';
import gql from 'graphql-tag';
import {
    useQuery
} from '@apollo/react-hooks';
import {
    useParams
} from 'react-router-dom';
import {
    PageHeader,
    Main,
    Skeleton,
    SkeletonSize
} from '@redhat-cloud-services/frontend-components';
import {
    Breadcrumb,
    BreadcrumbItem
} from '@patternfly/react-core';
import ComplianceSystemDetails from '@redhat-cloud-services/frontend-components-inventory-compliance';
import {
    BreadcrumbLinkItem,
    StateViewWithError,
    StateViewPart
} from 'PresentationalComponents';
import { InventoryDetails } from 'SmartComponents';
import { useTitleEntity } from 'Utilities/hooks/useDocumentTitle';

const QUERY = gql`
query System($inventoryId: String!){
    system(id: $inventoryId) {
        id
        name
    }
}
`;

export const SystemDetails = ({ route }) => {
    const { inventoryId } = useParams();
    const { data, error, loading } = useQuery(QUERY, {
        variables: { inventoryId }
    });
    const systemName = data?.system?.name;

    useTitleEntity(route, systemName);

    return <StateViewWithError stateValues={ { error, data, loading } }>
        <StateViewPart stateKey='data'>
            <PageHeader>
                <Breadcrumb ouiaId="pathToSystem">
                    <BreadcrumbLinkItem to='/'>
                        Compliance
                    </BreadcrumbLinkItem>
                    <BreadcrumbLinkItem to='/systems'>
                        Systems
                    </BreadcrumbLinkItem>
                    <BreadcrumbItem isActive>{ systemName }</BreadcrumbItem>
                </Breadcrumb>
                <InventoryDetails />
                <br/>
            </PageHeader>
            <Main>
                <ComplianceSystemDetails hidePassed inventoryId={ inventoryId } />
            </Main>
        </StateViewPart>
        <StateViewPart stateKey='loading'>
            <PageHeader>
                <Skeleton size={ SkeletonSize.md } />
            </PageHeader>
        </StateViewPart>
    </StateViewWithError>;
};

SystemDetails.propTypes = {
    route: propTypes.object
};

export default SystemDetails;
