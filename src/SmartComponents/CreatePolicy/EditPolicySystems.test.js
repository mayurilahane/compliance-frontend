import { policyFormValues } from '@/__fixtures__/benchmarks_rules.js';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { Provider as ReduxProvider } from 'react-redux';

const mockStore = configureStore();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: ''
    })
}));

import EditPolicySystems from './EditPolicySystems.js';

describe('EditPolicySystems', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore({ form: { policyForm: { values: policyFormValues } } });
    });

    it('expect to render without error', () => {
        component = renderer.create(
            <ReduxProvider store={store}>
                <MockedProvider>
                    <EditPolicySystems />
                </MockedProvider>
            </ReduxProvider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});
