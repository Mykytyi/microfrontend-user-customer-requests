import React from 'react';
import { MashroomPortalMessageBus } from '@mashroom/mashroom-portal/type-definitions';

export default React.createContext<MashroomPortalMessageBus | null>(
  null,
);
