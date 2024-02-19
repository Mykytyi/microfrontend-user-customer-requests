import React from 'react';
import { CaseIcon } from '@a1/gucci-common-ui-react';
import dayjs from 'dayjs';
import { ConditionChip, StatusChip, SystemChip } from './chips/CustomChips';
import { Case } from '../../../../server/type-definitions';

import './SummaryItem.scss';

interface Props {
  data?: Partial<Case>
  noCases?: boolean | undefined;
}

const SummaryItem = ({
  data,
  noCases,
}: Props) => {
  if (noCases || !data) {
    return (
      <div className="NoCasesItem" data-testid="no-cases-block">
        <p>
          Derzeit keine angenommenen oder zurückgelegten Geschäftsfälle
        </p>
      </div>
    );
  }

  const {
    caseId,
    partyId,
    caseCondition,
    caseStatus,
    crmSystem,
    typeLevel1,
    typeLevel2,
    typeLevel3,
    typeLevel4,
    dueDate,
  } = data;

  const parsedTitle = (() => {
    if (!typeLevel1 && !typeLevel2 && !typeLevel3 && !typeLevel4) {
      return null;
    }
    const typeArray = [typeLevel1, typeLevel2, typeLevel3, typeLevel4];

    return typeArray.filter((item) => item !== undefined || item).join(' / ');
  })();

  const areChipsAbsent = !caseCondition && !caseStatus && !crmSystem;

  return (
    <div className="SummaryItem" data-testid="summary-item">
      <div className="IconContainer">
        <CaseIcon size="large" displayType="clear" />
      </div>
      <div className="MainContentContainer">
        {caseId && (<p><strong>{caseId}</strong></p>)}
        {parsedTitle && (<p>{parsedTitle}</p>)}
        {!areChipsAbsent && (
          <div className="ChipsContainer">
            <ConditionChip condition={caseCondition} />
            <StatusChip status={caseStatus} />
            <SystemChip system={crmSystem} />
          </div>
        )}
        {dueDate && (
          <p>
            Zurückgelegt bis:
            {' '}
            <strong>{dayjs(dueDate).format('DD.MM.YYYY HH:mm')}</strong>
          </p>
        )}
        {partyId && (
          <p>
            Kundennummer:
            {' '}
            <strong>{partyId}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(SummaryItem);
