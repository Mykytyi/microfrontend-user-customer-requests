import React, { useCallback, useContext } from 'react';
import {
  Widget,
  WidgetBody,
  WidgetHeader,
  Button,
} from '@a1/gucci-common-ui-react';
import { OneCockpitEntityCase, OneCockpitFacts } from '@a1/onecockpit-definitions';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { ClientServicesContext } from '../../utils/context/ClientServicesContext';
import Summary from '../summary/Summary';
import Table from '../table/Table';
import { RootState } from '../../redux/store';
import { WidgetConfig } from '../../type-definitions';
import { useGetCases } from '../../queries';

export enum WidgetMode {
  SUMMARY = 'SUMMARY',
  TABLE = 'TABLE',
}

export default () => {
  const { oneCockpitService } = useContext(ClientServicesContext);
  const view = useSelector((state: RootState) => state.config.view);
  const appId = useSelector((state: RootState) => state.config.appId);
  const caseOwner = useSelector((state: RootState) => state.config.caseOwner);
  const intl = useIntl();

  let widgetMode: WidgetConfig['view'];

  switch (view) {
    case 'SUMMARY':
      widgetMode = WidgetMode.SUMMARY;
      break;
    case 'TABLE':
      widgetMode = WidgetMode.TABLE;
      break;
    default:
      widgetMode = WidgetMode.SUMMARY;
      break;
  }

  const { data, isSuccess } = useGetCases(caseOwner);

  const handleChangeRelations = () => {
    let facts: OneCockpitFacts = {
      entities: [],
    };

    const oneCockpitEntityCase = {
      id: '',
      entityType: 'Case',
      sourceSystem: 'case_master',
      caseOwner,
      masterCaseId: '',
      caseStatus: '',
      caseStatusDetail: '',
      typeLevel1: '',
      createdDate: '',
      partyId: '',
    } as OneCockpitEntityCase;

    facts = {
      entities: [oneCockpitEntityCase],
    };

    const action = oneCockpitService?.getAction(appId, 'User Customer Requests Table', facts);

    if (action) {
      oneCockpitService?.executeAction(action);
    } else {
      console.info('microfrontend-user-customer-requests - oneCockpitService or appId not found!');
    }
  };

  const renderHeaderChildren = useCallback(() => {
    return (
      <Button
        label={intl.formatMessage({ id: 'link.showAll' }, { amount: data?.length || 0 })}
        onClick={handleChangeRelations}
        type="link"
      />
    );
  }, [data, isSuccess]);

  return (
    <Widget>
      <WidgetHeader title={intl.formatMessage({ id: 'widgetName' })} variant="overview">
        {widgetMode === WidgetMode.SUMMARY && renderHeaderChildren()}
      </WidgetHeader>
      <WidgetBody>
        {widgetMode === WidgetMode.SUMMARY && <Summary />}
        {widgetMode === WidgetMode.TABLE && <Table />}
      </WidgetBody>
    </Widget>
  );
};
