import React from 'react';
import propTypes from 'prop-types';
import * as reactRouterDom from 'react-router-dom';
import * as reactCore from '@patternfly/react-core';
import * as pfReactTable from '@patternfly/react-table';
import * as ReactRedux from 'react-redux';
import * as reactIcons from '@patternfly/react-icons';
import { Skeleton, SkeletonSize } from '@redhat-cloud-services/frontend-components';
import registryDecorator from '@redhat-cloud-services/frontend-components-utilities/files/Registry';

@registryDecorator()
class InventoryDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            InventoryCmp: () => <Skeleton size={ SkeletonSize.md } />,
            InvWrapper: React.Fragment
        };

        this.fetchInventory = this.fetchInventory.bind(this);
        this.fetchInventory();
    }

    async fetchInventory() {
        const {
            inventoryConnector,
            mergeWithDetail
        } = await insights.loadInventory({
            ReactRedux,
            react: React,
            reactRouterDom,
            pfReact: reactCore,
            reactIcons,
            pfReactTable
        });

        this.getRegistry().register({
            ...mergeWithDetail()
        });

        this.setState(() => ({
            InventoryCmp: inventoryConnector(this.props.store).InventoryDetail,
            InvWrapper: inventoryConnector(this.props.store).DetailWrapper
        }));
    }

    render() {
        const { InventoryCmp, InvWrapper } = this.state;
        const Wrapper = InvWrapper || React.Fragment;
        return (
            <Wrapper>
                <InventoryCmp hideBack />
            </Wrapper>
        );
    }
}

InventoryDetails.propTypes = {
    entity: propTypes.object,
    store: propTypes.object
};

const ConnectedInventoryDetails = (props) => {
    return <InventoryDetails {...props} store={ReactRedux.useStore()} />;
};

export default ConnectedInventoryDetails;
