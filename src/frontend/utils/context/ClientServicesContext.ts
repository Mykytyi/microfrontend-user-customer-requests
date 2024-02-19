import Raact from 'react';
import type { OneCockpitClientService } from '@a1/onecockpit-definitions';
import { MashroomPortalClientServices } from '@mashroom/mashroom-portal/type-definitions';

type ClientServicesContexType = {
  oneCockpitService?: OneCockpitClientService;
} & Partial<MashroomPortalClientServices>;

export const ClientServicesContext = Raact.createContext<ClientServicesContexType>({});
